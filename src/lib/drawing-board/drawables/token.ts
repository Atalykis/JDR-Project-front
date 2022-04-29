import type { Position, Size } from '../values';

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
