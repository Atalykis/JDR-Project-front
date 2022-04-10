import React, { useState } from 'react';
import type { Character } from 'src/types/types';

export function CharacterToken({ character }: { character: Character }) {
  const token = document.getElementById(character.name + 'token');
  if (token) {
    token.addEventListener('drag', (event) => {
      token.style.top = event.pageY + 'px';
      token.style.left = event.pageX + 'px';
    });

    token.addEventListener('dragend', (event) => {
      token.style.top = event.pageY + 'px';
      token.style.left = event.pageX + 'px';
    });
  }

  return <img id={character.name + 'token'} className={'rounded-full absolute top-[50px] left-[50px]'} src="https://fakeimg.pl/50x50/"></img>;
}
