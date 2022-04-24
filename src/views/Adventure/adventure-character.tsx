import { CharacterCard } from "../CharacterCard";
import type { AdventureProps } from "./index";
import { useCharacters } from "./use-characters";
import React from "react";


export interface AdventureCharactersProps extends AdventureProps {}

export function AdventureCharacters({ token, adventure }: AdventureCharactersProps) {
  const characters = useCharacters(token, adventure);

  console.log(characters);
  return (
    <>
      <h2>Characters : </h2>
      <ul>
        {characters.map((character) => {
          return (
            <li key={character.name}>
              <CharacterCard character={character} />
            </li>
          );
        })}
      </ul>
    </>
  );
}