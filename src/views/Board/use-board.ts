import { gql, useMutation, useQuery } from '@apollo/client';
import { stringifyForDisplay } from '@apollo/client/utilities';
import React, { useEffect, useMemo, useState } from 'react';

const GET_BOARD = gql`
  query GetBoard($roomName: String!) {
    board(roomName: $roomName) {
      roomName
      lines {
        points {
          x
          y
        }
        thickness
        color
      }
    }
  }
`;

const DRAW = gql`
  mutation Draw($roomName: String!, $line: LineInput!) {
    draw(roomName: $roomName, line: $line) {
      roomName
      lines {
        points {
          x
          y
        }
        thickness
        color
      }
    }
  }
`;

export interface LineInput {
  points: {
    x: number;
    y: number;
  }[];
  thickness?: number;
  color?: string;
}

export interface Board {
  roomName: string;
  lines: LineInput[];
}

export function useBoard(token: string, roomName: string) {
  return useQuery<{ board: Board }>(GET_BOARD, {
    variables: { roomName },
    context: {
      headers: {
        Authorization: token,
      },
    },
  });
}

export function useDraw(token: string, room: string) {
  const [draw] = useMutation(DRAW);

  return useMemo(() => draw, [draw]);
}
