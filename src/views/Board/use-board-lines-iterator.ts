import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import type { Line } from 'src/lib/drawing-board/drawables/line';
import { Queue } from './queue';

export function useBoardLinesIterator(token: string) {
  const socket = useMemo(
    () =>
      io('http://localhost:3000/', {
        extraHeaders: {
          Authorization: token,
        },
      }),
    [],
  );
  const queue = useMemo(() => new Queue<Line>(), []);
  const listen = useMemo(() => queue[Symbol.asyncIterator](), [queue]);

  useEffect(() => {
    const handler = (data: Line) => {
      queue.push({ points: data.points });
    };

    socket.on('LineAdded', handler);

    return () => {
      socket.off('LineAdded', handler);
      socket.disconnect();
    };
  }, [socket, queue]);

  return listen;
}
