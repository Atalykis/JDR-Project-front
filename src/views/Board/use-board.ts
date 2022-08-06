import { gql, useMutation, useQuery } from '@apollo/client';
import { stringifyForDisplay } from '@apollo/client/utilities';
import React, { useEffect, useMemo, useState } from 'react';
import type { Position, Size } from 'src/types/types';

const GET_BOARD = gql`
  query GetBoard($roomName: String!) {
    board(roomName: $roomName) {
      roomName
      tokens {
        id {
          name
          owner
          adventure
        }
        position {
          x
          y
        }
        size{
          width
          height
        }
        imageSrc
      }
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

const MOVE = gql`
  mutation Move($roomName: String!, $token: TokenInput!) {
    move(roomName: $roomName, token: $token) {
      roomName
      tokens {
        id{
          name
          owner
          adventure
        }
        position{
          x
          y
        }
        size{
          height
          width
        }
        imageSrc
      }
    }
  }`;

export interface LineInput {
  points: {
    x: number;
    y: number;
  }[];
  thickness?: number;
  color?: string;
}

export interface TokenId {
  name: string, 
  owner: string, 
  adventure: string
}

export interface TokenInput {
  id: TokenId
  position: Position;
  size: Size;
  image?: HTMLImageElement;
  imageSrc: string
}

export interface Board {
  roomName: string;
  lines: LineInput[];
  tokens:TokenInput[]
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

export function useDraw() {
  const [draw] = useMutation(DRAW);

  return useMemo(() => draw, [draw]);
}

export function useMove() {
  const [move] = useMutation(MOVE);

  return  useMemo(() => move, [move])
}
