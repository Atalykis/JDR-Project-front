import { LazyBrush } from 'lazy-brush';
import { Line, Position, LineEditable } from './values';

export class Board {
  private lazyBrush = new LazyBrush({
    radius: 10,
    enabled: true,
  });

  public lines: LineEditable[];
  public currentLine: LineEditable | undefined;
  public last: LineEditable | undefined;

  constructor(private readonly onDraw: (line: Line) => void, lines: Line[] = []) {
    this.lines = lines.map((line) => new LineEditable(line.points));
  }

  startLine(position: Position) {
    this.currentLine = new LineEditable();
    this.currentLine.addPoint(position);
  }

  continueLine(position: Position) {
    this.currentLine?.addPoint(position);
  }

  endLine(position: Position) {
    this.currentLine?.addPoint(position);
    this.lines.push(this.currentLine!);
    this.onDraw(this.currentLine!);
    this.last = this.currentLine!;
    this.currentLine = undefined;
  }

  updateBrush(position: Position) {
    this.lazyBrush.update(position);
  }

  get brush() {
    return this.lazyBrush.getBrushCoordinates();
  }

  get pointer() {
    return this.lazyBrush.getPointerCoordinates();
  }
}
