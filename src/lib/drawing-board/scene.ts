import { Board } from './board';
import { Renderer } from './renderer';
import { Styles } from './styles';
import { closeable } from './utils';
import { Line, LineEditable } from './values';

export class Scene {
  private styles = new Styles();
  private renderer: Renderer;
  private board: Board;
  private closeableListen?: AsyncIterableIterator<Line> & { close: () => Promise<void> };

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly onDraw: (line: Line) => void = () => {},
    private lines: Line[],
    private listen?: AsyncIterableIterator<Line>,
  ) {
    this.board = new Board(this.onDraw, this.lines);
    this.renderer = new Renderer(this.styles, this.canvas);
    canvas.addEventListener('mousedown', this.onMouseDown);
    canvas.addEventListener('mouseup', this.onMouseUp);
    canvas.addEventListener('mousemove', this.onMouseMove);
    this.render();
    if (this.listen) {
      this.closeableListen = closeable(this.listen);
      this.watchLines();
      this.render();
    }
  }

  capture(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect(); // abs. size of element
    const scaleX = this.canvas.width / rect.width; // relationship bitmap vs. element for X
    const scaleY = this.canvas.height / rect.height; // relationship bitmap vs. element for Y

    return {
      x: (event.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
      y: (event.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    };
  }

  onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    this.board.updateBrush(this.capture(event));
    this.board.startLine(this.board.brush);
  };

  onMouseUp = (event: MouseEvent) => {
    event.preventDefault();

    this.board.endLine(this.board.brush);
  };

  onMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    this.board.updateBrush(this.capture(event));
    this.board.continueLine(this.board.brush);
    this.render();
  };

  render() {
    this.renderer.clear();
    this.renderer.drawLine(this.board.currentLine!);
    this.renderer.drawBrush(this.board.brush);
    this.renderer.drawPointer(this.board.pointer);
    this.renderer.drawChain(this.board.brush, this.board.pointer);
    this.renderer.drawLines(this.board.lines);
  }

  destroy() {
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mouseup', this.onMouseUp);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.closeableListen?.close();
  }

  async watchLines() {
    if (!this.closeableListen) {
      return;
    }
    for await (const lineInput of this.closeableListen) {
      const line = new LineEditable();
      this.board.lines.push(line);
      for (const point of lineInput.points) {
        line.addPoint(point);
        this.render();
        await new Promise((r) => setTimeout(r, 5));
      }
    }
  }
}
