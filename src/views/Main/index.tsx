import React, { useEffect, useState } from 'react';
import { RoomForm } from './room-form';
import { useUserInfo } from './use-user-info';

export function Main({ token }: { token: string }) {
  const { name } = useUserInfo(token);

  return (
    <>
      <div>your name is {name}</div>
      <RoomForm token={token} />
    </>
  );
}
