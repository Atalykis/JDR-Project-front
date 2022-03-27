import React, { useState } from 'react';
import type { Character } from 'src/types/types';

export function CharacterToken({ character }: { character: Character }) {
  const token = document.getElementById(character.name + 'token');
  if (token) {
    token.addEventListener('drag', (event) => {
      token.style.top = event.pageY - 110 + 'px';
      token.style.left = event.pageX - 20 + 'px';
    });

    token.addEventListener('dragend', (event) => {
      token.style.top = event.pageY - 110 + 'px';
      token.style.left = event.pageX - 20 + 'px';
    });
  }

  return <img id={character.name + 'token'} className={'rounded-full absolute top-[50px] left-[50px]'} src="https://fakeimg.pl/50x50/"></img>;
}
