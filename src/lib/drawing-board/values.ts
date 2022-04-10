export interface Position {
  x: number;
  y: number;
}

export interface Line {
  points: Position[];
}

export class LineEditable implements Line {
  constructor(public points: Position[] = []) {}

  addPoint(point: Position) {
    this.points.push(point);
  }
}
