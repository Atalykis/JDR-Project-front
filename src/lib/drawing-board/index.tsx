import React, { useRef, useEffect } from 'react';
import type { Line } from './drawables/line';
import  type { Token } from './drawables/token';
import { Scene } from './scene';

interface DrawingBoardProps {
  id: number;
  lines: Line[];

  tokens: Token[]
  onDraw?: (line: Line) => void;

  OnTokenMove?: (token: Token) => void


  linesListen?: AsyncIterableIterator<Line>;

  tokensListen?: AsyncIterableIterator<Token>;
}

export function DrawingBoard({ id, onDraw, OnTokenMove, lines, tokens, linesListen, tokensListen }: DrawingBoardProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  
  const scene = useRef<Scene>()

  useEffect(() => {
    if (!canvas.current) return;
    scene.current = new Scene(canvas.current, onDraw, OnTokenMove, lines, tokens, linesListen, tokensListen);
    return () => scene.current?.destroy();
  }, [canvas, onDraw, OnTokenMove, linesListen, tokensListen])

  useEffect(() => {
    if(!scene.current) return;
    scene.current.defineLines(lines)
    scene.current.defineTokens(tokens)
  }, [lines, tokens])
  
  return <canvas className="w-[800px] h-[800px] border cursor-none" width={800} height={800} ref={canvas}></canvas>;
}