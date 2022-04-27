import React, { useState } from "react";
import { Button } from "../Basic-component/button";
import { Input } from "../Basic-component/input";
import { useCreateAdventure } from "./hooks/use-create-adventure";

export function AdventureForm({ token }: { token: string }) {
  
  const [adventureName, setAdventureName] = useState('');
  const createAdventure = useCreateAdventure();
  const onCreateAdventure = (adventure: string) => {
    createAdventure({
      variables: { name: adventure },
      context: {
        headers: {
          Authorization: token,
        },
      },
    })
  }
  return (  
    <div>
      <h2>Create Adventure</h2>
      <Input id="adventureName" type="text" placeholder="Adventure Name" value={adventureName} onChange={(e) => setAdventureName(e.currentTarget.value)} />
      <Button onClick={() => onCreateAdventure(adventureName)}>Create</Button>
    </div>)
}