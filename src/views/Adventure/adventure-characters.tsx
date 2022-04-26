import { CharacterCard } from "../CharacterCard";
import type { AdventureProps } from "./index";
import { useCharacters } from "./hooks/use-characters";
import React from "react";
import type { Character } from "src/types/types";


export interface AdventureCharactersProps extends AdventureProps {}

export function AdventureCharacters({ token, adventure }: AdventureCharactersProps) {
  const {loading, data} = useCharacters(token, adventure);

  if (loading) {
    return <div>Loading your Characters...</div>;
  }

  if (!data) {
    return <div>No Character owned found in {adventure}</div>;
  }

  return (
    <>
      <h2>Characters : </h2>
      <ul>
        {data.characters.map((character: Character) => {
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