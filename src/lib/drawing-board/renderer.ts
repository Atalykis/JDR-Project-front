import { Catenary } from 'catenary-curve';

export class Renderer {
  private catenary = new Catenary({
    segments: 10,
    iterationLimit: 100,
  });
  context: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')!;
  }

  draw(drawable: Drawable) {
    drawable.draw(this.context);
  }

  drawMany(drawables: Drawable[]) {
    for (const drawable of drawables) {
      drawable.draw(this.context);
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = '#000';
  }
}
