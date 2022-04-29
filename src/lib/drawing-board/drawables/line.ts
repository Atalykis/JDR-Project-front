import { midPoint, segments } from '../utils';
import type { Position } from '../values';

export interface Line {
  points: Position[];
}

export class LineEditable implements Drawable<Line> {
  constructor(public points: Position[] = []) {}

  addPoint(point: Position) {
    this.points.push(point);
  }

  applyStyle(context: CanvasRenderingContext2D): void {
    context.lineWidth = 10;
    context.strokeStyle = '#000000';
    context.lineJoin = 'round';
    context.lineCap = 'round';
  }
  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    this.applyStyle(context);
    for (const segment of segments(this.points)) {
      const mid = midPoint(segment[0], segment[1]);
      context.quadraticCurveTo(segment[0].x, segment[0].y, mid.x, mid.y);
    }

    context.lineTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
    context.stroke();
    context.closePath();
  }
}
