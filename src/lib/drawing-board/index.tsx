import React, { useRef, useEffect } from 'react';
import { DrawingScene } from './scene';
import { Line, Position, Token, TokenEditable } from './values';

const token = new TokenEditable({x: 10,y: 10}, {width: 50, height: 50}, new Image(50, 50));
token.image.src = 'https://dummyimage.com/50x50/000/ffffff';

interface DrawingBoardProps {
  id: number;
  lines: Line[];
  onDraw?: (line: Line) => void;
  listen?: AsyncIterableIterator<Line>;
}

export function DrawingBoard({ id, onDraw, lines, listen }: DrawingBoardProps) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) return;
    const scene = new DrawingScene(canvas.current, onDraw, lines, listen);
    // const tokenScene = new TokenScene(canvas.current, [token]);
    return () => scene.destroy();
  }, [canvas, id, onDraw, lines, listen]);

  return <canvas className="w-[800px] h-[800px] border cursor-none" width={800} height={800} ref={canvas}></canvas>;
}





// class TokenScene {
//   private currentToken: TokenEditable | undefined;
//   constructor(private canvas: HTMLCanvasElement, private tokens: TokenEditable[]){
//     canvas.addEventListener('mousedown', this.onMouseDown);
//     canvas.addEventListener('mouseup', this.onMouseUp);
//     canvas.addEventListener('mousemove', this.onMouseMove);
//     this.renderTokens();
//   }

//   renderTokens(){
//     for(const token of this.tokens){
//       this.render(token);
//     }
//   }

//   render(token: TokenEditable){
//     const ctx = this.canvas.getContext('2d');
//     if (!ctx) return;
//     ctx.beginPath();
//     ctx.drawImage(token.image, token.position.x, token.position.y);
//     ctx.closePath();
//   }

//   onMouseDown = (event: MouseEvent) => {
//     event.preventDefault();
//     const mousePosition = this.capture(event)
//     const token = this.tokenPresence(mousePosition)
//     if(!token) return
//     this.currentToken = token
//   }

//   onMouseMove = (event: MouseEvent) => {
//     event.preventDefault();
//     const mousePosition = this.capture(event)
//     this.renderTokens()
//     if(!this.currentToken) return
//     this.currentToken.move(mousePosition);
//   }

//   onMouseUp = (event: MouseEvent) => {
//     event.preventDefault();
//     const mousePosition = this.capture(event)
//     if(!this.currentToken) return
//     this.currentToken.move(mousePosition);
//     this.currentToken = undefined;
//   }


  
//   tokenPresence(mousePosition: Position){
//     for(const token of this.tokens){
//       if(mousePosition.x < token.position.x || mousePosition.y < token.position.y) return;
//       if(mousePosition.x > (token.position.x + token.size.width) || mousePosition.y > (token.position.y + token.size.height)) return;
//       return token
//     }
//   }

//   capture(event: MouseEvent) {
//     const rect = this.canvas.getBoundingClientRect(); 
//     const scaleX = this.canvas.width / rect.width; 
//     const scaleY = this.canvas.height / rect.height; 

//     return {
//       x: (event.clientX - rect.left) * scaleX, 
//       y: (event.clientY - rect.top) * scaleY, 
//     };
//   }
// }