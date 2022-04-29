import { Board } from './board';
import { Line, LineEditable } from './drawables/line';
import { Token, TokenEditable } from './drawables/token';
import { Renderer } from './renderer';
import { closeable } from './utils';
import type { Position } from './values';

const characterToken = new TokenEditable({ x: 10, y: 10 }, { width: 50, height: 50 }, new Image(50, 50));
characterToken.image.src = 'https://dummyimage.com/50x50/000/ffffff';
export class Scene {
  private renderer: Renderer;
  private board: Board;
  private closeableListen?: AsyncIterableIterator<Line> & { close: () => Promise<void> };

  private tokens: Token[] = [characterToken];
  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly onDraw: (line: Line) => void = () => {},
    private lines: Line[],
    private listen?: AsyncIterableIterator<Line>,
  ) {
    this.board = new Board(this.onDraw, this.lines, this.tokens);
    this.renderer = new Renderer(this.canvas);
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
    const mousePosition = this.capture(event);
    const token = this.tokenPresence(mousePosition);
    if (token) {
      this.board.startMoveToken(token, mousePosition);
    } else {
      this.board.updateBrush(mousePosition);
      this.board.startLine(this.board.brush.position);
    }
  };

  onMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    if (this.board.currentToken) {
      this.board.moveToken(this.capture(event));
      this.render();
    } else {
      this.board.updateBrush(this.capture(event));
      this.board.continueLine(this.board.brush.position);
      this.render();
    }
  };
  onMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    if (this.board.currentToken) {
      this.board.endMoveToken(this.capture(event));
      this.render();
    } else {
      this.board.endLine(this.board.brush.position);
      this.render();
    }
  };

  tokenPresence(mousePosition: Position) {
    for (const token of this.board.tokens) {
      if (mousePosition.x < token.position.x || mousePosition.y < token.position.y) return;
      if (mousePosition.x > token.position.x + token.size.width || mousePosition.y > token.position.y + token.size.height) return;
      return token;
    }
  }

  render() {
    this.renderer.clear();
    this.renderer.draw(this.board.chain);
    this.renderer.draw(this.board.pointer);
    this.renderer.draw(this.board.brush);
    if (this.board.currentLine) {
      this.renderer.draw(this.board.currentLine);
    }
    this.renderer.drawMany([...this.board.lines]);
    this.renderer.drawMany([...this.board.tokens]);
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
