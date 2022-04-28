import type { Character } from 'src/types/types';
import { midPoint, segments } from './utils';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

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
    for (const segment of segments(this.points)) {
      const mid = midPoint(segment[0], segment[1]);
      context.quadraticCurveTo(segment[0].x, segment[0].y, mid.x, mid.y);
    }

    context.lineTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
    context.stroke();
    context.closePath();
  }
}

export interface Token {
  position: Position;
  size: Size;
  image: HTMLImageElement;
}

export class TokenEditable implements Drawable<Token> {
  constructor(public position: Position, public size: Size, public image: HTMLImageElement) {}

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.drawImage(this.image, this.position.x, this.position.y);
    context.closePath();
  }
  move(position: Position) {
    this.position = {
      x: position.x - this.size.width / 2,
      y: position.y - this.size.height / 2,
    };
  }
}

interface Drawable<T> {
  draw(context: CanvasRenderingContext2D): void;
  applyStyle?(context: CanvasRenderingContext2D): void;
}
