export class Styles {
  applyLineStyle(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#000000';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
  }

  applyBrushStyle(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
  }

  applyPointerStyle(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 1;
    ctx.fillStyle = '#000000';
  }

  applyChainStyle(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
  }
}
