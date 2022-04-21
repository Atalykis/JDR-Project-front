import { Catenary } from 'catenary-curve';
import type { Position } from 'src/types/types';
import type { Styles } from './styles';
import { midPoint, segments } from './utils';
import type { Line } from './values';

export class Renderer {
  private catenary = new Catenary({
    segments: 10,
    iterationLimit: 100,
  });
  context: CanvasRenderingContext2D;

  constructor(private styles: Styles, private canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!;
  }

  drawChain(brush: Position, pointer: Position) {
    this.context.beginPath();
    this.styles.applyChainStyle(this.context);
    this.catenary.drawToCanvas(this.context, brush, pointer, 50);
    this.context.stroke();
    this.context.closePath();
  }

  drawBrush(brush: Position) {
    const position = brush;
    this.context.beginPath();
    this.styles.applyBrushStyle(this.context);
    this.context.arc(position.x, position.y, 5, 0, 2 * Math.PI);
    this.context.fill();

    this.context.stroke();
    this.context.closePath();
  }

  drawPointer(brush: Position) {
    const position = brush;
    this.context.beginPath();
    this.styles.applyPointerStyle(this.context);
    this.context.arc(position.x, position.y, 3, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
  }

  drawLine(line: Line) {
    if (!line) return;
    const points = line.points;

    this.styles.applyLineStyle(this.context);

    this.context.beginPath();
    for (const segment of segments(points)) {
      const mid = midPoint(segment[0], segment[1]);
      this.context.quadraticCurveTo(segment[0].x, segment[0].y, mid.x, mid.y);
    }

    this.context.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    this.context.stroke();
    this.context.closePath();
  }

  drawLines(lines: Line[]) {
    this.styles.applyLineStyle(this.context);
    for (const line of lines) {
      this.drawLine(line);
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#000';
  }
}
