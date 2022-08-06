import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import type { Line } from 'src/lib/drawing-board/drawables/line';
import { Queue } from './queue';
import type { TokenInput } from './use-board';

export function useBoardIterators(token: string, room: string) {
  const socket = useMemo(
    () =>
      io('http://localhost:3000/', {
        extraHeaders: {
          Authorization: token,
          room: room
        },
      }),
    [],
  );

  const linesQueue = useMemo(() => new Queue<Line>(), []);
  const linesListen = useMemo(() => linesQueue[Symbol.asyncIterator](), [linesQueue]);

  const tokensQueue = useMemo(() => new Queue<TokenInput>(), []);
  const tokensListen = useMemo(() => tokensQueue[Symbol.asyncIterator](), [tokensQueue]);

  useEffect(() => {
    const lineHandler = (data: Line) => {
      linesQueue.push({ points: data.points });
    };

    const tokenHandler = (data: TokenInput) => {
      tokensQueue.push(data);
    };

    socket.on('LineAdded', lineHandler);
    socket.on('TokenMoved', tokenHandler);

    return () => {
      socket.off('LineAdded', lineHandler);
      socket.off('TokenMoved', tokenHandler);
      socket.disconnect();
    };
  }, [socket, linesQueue, tokensQueue]);

  return {
    linesListen : linesListen,
    tokensListen: tokensListen
  };
}

