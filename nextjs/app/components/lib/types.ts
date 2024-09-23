export type Rect = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export type Position = {
  x: number;
  y: number;
};

export type Overlap = {
  freeRect: Rect;
  blockRect: Rect;
  distance: number;
};
