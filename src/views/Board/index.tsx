import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import type { Line } from 'src/lib/drawing-board/values';
import { DrawingBoard as DB } from '../../lib/drawing-board';
import { Queue } from './queue';
import { Board, useBoard, useDraw } from './use-board';
import { useBoardLinesIterator } from './use-board-lines-iterator';

const p = [
  {
    points: [
      { x: 222.99053954946172, y: 222.0273975356266 },
      { x: 222.99053954946172, y: 222.0273975356266 },
    ],
  },
  {
    points: [
      { x: 575.023327792797, y: 225.79185368104424 },
      { x: 575.023327792797, y: 225.79185368104424 },
    ],
  },
  {
    points: [
      { x: 196.11690258910158, y: 499.18041757573803 },
      { x: 196.11690258910158, y: 499.18041757573803 },
      { x: 196.6422306992919, y: 499.67635492147593 },
      { x: 198.78909369796585, y: 501.60316703366567 },
      { x: 201.00466598558447, y: 503.4983909147101 },
      { x: 204.55943018717758, y: 506.26823381515663 },
      { x: 209.0059512373974, y: 509.3732997701558 },
      { x: 215.6021928317354, y: 513.496680447109 },
      { x: 224.8907554135772, y: 518.4548403697249 },
      { x: 238.10273790862055, y: 524.1646443814278 },
      { x: 253.76539268896784, y: 529.6020771994564 },
      { x: 272.772971831758, y: 534.8032672960467 },
      { x: 292.04851191249077, y: 538.8141365599945 },
      { x: 315.48036731887976, y: 542.0858131984357 },
      { x: 339.287204614911, y: 544.6485539337226 },
      { x: 358.1509513111798, y: 546.1176882119491 },
      { x: 379.04132522233795, y: 546.9675594818568 },
      { x: 400.00529163826997, y: 547.272582770646 },
      { x: 421.0080307385443, y: 546.8961078962201 },
      { x: 446.0673432929343, y: 545.5941846839277 },
      { x: 466.15921183490553, y: 543.9869581239559 },
      { x: 487.3147890305198, y: 541.6017685527204 },
      { x: 507.2948716024685, y: 539.4221961403944 },
      { x: 526.2170172049216, y: 537.6534529142275 },
      { x: 543.2463111982335, y: 535.9568589466488 },
      { x: 553.2466168758615, y: 534.9599261791568 },
      { x: 557.3045287855015, y: 534.5100036995406 },
      { x: 557.3045287855015, y: 534.5100036995406 },
      { x: 557.3045287855015, y: 534.5100036995406 },
    ],
  },
];

const BG =
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25b7ba9a-dc48-4015-923b-cb47a37af504/dawoesj-b8fe4a88-cfaf-4223-83d9-33019a12a273.jpg/v1/fill/w_1024,h_705,q_75,strp/grid_para_rpg_de_mesa_by_rarameth_dawoesj-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzA1IiwicGF0aCI6IlwvZlwvMjViN2JhOWEtZGM0OC00MDE1LTkyM2ItY2I0N2EzN2FmNTA0XC9kYXdvZXNqLWI4ZmU0YTg4LWNmYWYtNDIyMy04M2Q5LTMzMDE5YTEyYTI3My5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.evP5wSLH6dEQpQtat60ENqWTW7QkvTwQBFMq-_vE6ng';

export async function* linemaker() {
  let i = 0;
  while (true) {
    await new Promise((r) => setTimeout(r, 1000));

    const points = [...Array(100)].map((_, j) => ({ x: i * 10 + j * 2, y: j * 2 }));

    yield {
      points: points,
    };
    i++;
  }
}

export function DrawingBoard({ id, token, room }: { id: number; token: string; room: string }) {
  const { loading, data } = useBoard(token, room);
  const draw = useDraw(token, room);

  const listen = useBoardLinesIterator(token);

  const onDraw = useCallback(
    (line: any) => {
      draw({
        variables: { line: { ...line, thickness: 3, color: '#000000' }, roomName: room },
        context: {
          headers: {
            Authorization: token,
          },
        },
      });
    },
    [room, token, draw],
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Board not found</div>;
  }

  return <DB id={id} onDraw={onDraw} lines={data.board.lines} listen={listen} />;
}

/**
 *
 * <LazyBoard existingLines={Line[]} onDraw={(line) => {}} listen={iterator} />
 *
 */
