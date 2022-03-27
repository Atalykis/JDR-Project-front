import React, { useEffect, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

export function Board({ width, height }: { width: number; height: number }) {
  const [brush, setBrush] = useState(5);
  const [disable, setDisable] = useState(true);
  const [hideInterface, setHideInterface] = useState(true);
  const [backgroundImg, setBackgroundImg] = useState(
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25b7ba9a-dc48-4015-923b-cb47a37af504/dawoesj-b8fe4a88-cfaf-4223-83d9-33019a12a273.jpg/v1/fill/w_1024,h_705,q_75,strp/grid_para_rpg_de_mesa_by_rarameth_dawoesj-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzA1IiwicGF0aCI6IlwvZlwvMjViN2JhOWEtZGM0OC00MDE1LTkyM2ItY2I0N2EzN2FmNTA0XC9kYXdvZXNqLWI4ZmU0YTg4LWNmYWYtNDIyMy04M2Q5LTMzMDE5YTEyYTI3My5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.evP5wSLH6dEQpQtat60ENqWTW7QkvTwQBFMq-_vE6ng',
  );
  const [canvas, setCanvas] = useState<any>(null);

  const setDraw = () => {
    setDisable(!disable);
    setHideInterface(!hideInterface);
  };

  const undo = () => {
    canvas.undo();
  };

  const clear = () => {
    canvas.clear();
  };

  const onChange = () => {
    console.log('I trigger now');
  };

  return (
    <>
      <div className="absolute top-0 left-0 z-10">
        <button className="bg-rose-500 rounded-md p-1" onClick={() => setDraw()}>
          Draw
        </button>
        <button className="bg-rose-500 rounded-md p-1" onClick={() => undo()}>
          Undo
        </button>
        <button className="bg-rose-500 rounded-md p-1" onClick={() => clear()}>
          Clear
        </button>
      </div>
      <CanvasDraw
        ref={(canvasDraw) => setCanvas(canvasDraw)}
        onChange={() => onChange()}
        canvasHeight={height}
        canvasWidth={width}
        brushColor={'#58b0d6'}
        hideGrid={true}
        imgSrc={backgroundImg}
        brushRadius={brush}
        hideInterface={hideInterface}
        disabled={disable}
        className={'absolute top-0 left-0'}
      />
    </>
  );
}
