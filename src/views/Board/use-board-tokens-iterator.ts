import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { Queue } from './queue';
import type { TokenInput } from './use-board';

// export function useBoardTokensIterator(token: string) {
//     const socket = useMemo(
//       () =>
//         io('http://localhost:3000/', {
//           extraHeaders: {
//             Authorization: token,
//           },
//         }),
//       [],
//     );
//     const queue = useMemo(() => new Queue<TokenInput>(), []);
//     const listen = useMemo(() => queue[Symbol.asyncIterator](), [queue]);
  
//     useEffect(() => {
//       const handler = (data: TokenInput) => {
//         queue.push(data);
//       };
  
//       socket.on('TokenMoved', handler);
  
//       return () => {
//         socket.off('TokenMoved', handler);
//         socket.disconnect();
//       };
//     }, [socket, queue]);
  
//     return listen;
//   }