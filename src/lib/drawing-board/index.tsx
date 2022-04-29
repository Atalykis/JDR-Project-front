import React, { useRef, useEffect } from 'react';
import type { Line } from './drawables/line';
import { Token, TokenEditable } from './drawables/token';
import { Scene } from './scene';



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
    const scene = new Scene(canvas.current, onDraw, lines, listen);
    return () => scene.destroy();
  }, [canvas, id, onDraw, lines, listen]);

  return <canvas className="w-[800px] h-[800px] border cursor-none" width={800} height={800} ref={canvas}></canvas>;
}