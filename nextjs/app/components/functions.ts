import { Rect } from "./types";

export function isOverlapped(rect1: Rect, rect2: Rect): boolean {
  // rect1 bottom-right corner resieds within the area drawn by rect2 top and left
  const cond1 = rect2.x1 < rect1.x2 && rect2.y1 < rect1.y2;

  // rect2 top-left corner resieds within the area drawn by rect2 bottom and right
  const cond2 = rect1.x1 < rect2.x2 && rect1.y1 < rect2.y2;

  return cond1 && cond2;
}

export function toRect(d: DOMRect): Rect {
  return {
    x1: d.left,
    x2: d.right,
    y1: d.top,
    y2: d.bottom,
  };
}
