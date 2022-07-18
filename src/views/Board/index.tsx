import React, { useCallback } from 'react';
import type { Token } from 'src/lib/drawing-board/drawables/token';
import { DrawingBoard as DB } from '../../lib/drawing-board';
import { useBoard, useDraw } from './use-board';
import { useBoardLinesIterator } from './use-board-lines-iterator';

const characterToken = { position: { x: 10, y: 10 }, size: { width: 50, height: 50 }, image: new Image(50, 50)};
characterToken.image.src = 'https://dummyimage.com/50x50/000/ff00ff';

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
  
  const linesListen = useBoardLinesIterator(token);


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

  return <DB id={id} onDraw={onDraw} lines={data.board.lines} tokens={[characterToken]} linesListen={linesListen} />;
}
