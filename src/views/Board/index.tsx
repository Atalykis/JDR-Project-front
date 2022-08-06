import React, { useCallback } from 'react';
import type { Token } from 'src/lib/drawing-board/drawables/token';
import { DrawingBoard as DB } from '../../lib/drawing-board';
import { TokenInput, useBoard, useDraw, useMove } from './use-board';
import { useBoardIterators } from './use-board-iterators';

const BG =
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25b7ba9a-dc48-4015-923b-cb47a37af504/dawoesj-b8fe4a88-cfaf-4223-83d9-33019a12a273.jpg/v1/fill/w_1024,h_705,q_75,strp/grid_para_rpg_de_mesa_by_rarameth_dawoesj-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzA1IiwicGF0aCI6IlwvZlwvMjViN2JhOWEtZGM0OC00MDE1LTkyM2ItY2I0N2EzN2FmNTA0XC9kYXdvZXNqLWI4ZmU0YTg4LWNmYWYtNDIyMy04M2Q5LTMzMDE5YTEyYTI3My5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.evP5wSLH6dEQpQtat60ENqWTW7QkvTwQBFMq-_vE6ng';

export function DrawingBoard({ id, token, room }: { id: number; token: string; room: string }) {
  const { loading, data } = useBoard(token, room);
  const draw = useDraw();
  const move = useMove();
  
  const {linesListen, tokensListen} = useBoardIterators(token, room);
  
  
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

    const onMove = useCallback(
      (characterToken: any) => {
        
        move({
          variables: { token: { id : { name: characterToken.id.name, owner: characterToken.id.owner, adventure: characterToken.id.adventure}, position: characterToken.position, size: {width: characterToken.size.width, height: characterToken.size.height}, imageSrc: characterToken.image.src}, roomName: room },
          context: {
            headers: {
              Authorization: token,
            },
          },
        });
      }, [room, token, move]
    )
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (!data) {
      return <div>Board not found</div>;
    }

  return <DB id={id} onDraw={onDraw} OnTokenMove={onMove} lines={data.board.lines} tokens={data.board.tokens} linesListen={linesListen} tokensListen={tokensListen} />;
}
