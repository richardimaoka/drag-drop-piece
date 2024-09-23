"use client";

import { useState } from "react";
import { Blocks } from "./Blocks";
import styles from "./Space.module.css";
import { FreePiece } from "./FreePiece";
import { Rect } from "./lib/types";
import { center, distance, sameRect } from "./lib/functions";

function minIndex(dragRect: Rect, arr: (Rect | undefined)[]): number {
  let minIndex = 0;
  let minDistance: number | undefined = undefined;

  for (let index = 0; index < arr.length; index++) {
    const block = arr[index];
    const dist = block ? distance(center(dragRect), center(block)) : undefined;

    if (minDistance) {
      if (dist && dist < minDistance) {
        minIndex = index;
        minDistance = dist;
      }
    } else {
      if (dist) {
        minIndex = index;
        minDistance = dist;
      }
    }
  }
  return minIndex;
}

export function Space() {
  const [dragRect, setDragRect] = useState<Rect | undefined>(undefined);
  const [blocks, setBlocks] = useState<(Rect | undefined)[]>([
    undefined, //1
    undefined, //2
    undefined, //3
    undefined, //4
    undefined, //5
    undefined, //6
    undefined, //7
    undefined, //8
    undefined, //9
  ]);

  function onDrag(rect: Rect) {
    setDragRect(rect);
  }

  function onOverlap(n: number, rect: Rect) {
    const index = n - 1;
    if (blocks[index] && sameRect(blocks[index], rect)) {
      return;
    }

    const updated = [...blocks];
    updated[index] = rect;
    setBlocks(updated);
  }

  const minBlockIndex = dragRect ? minIndex(dragRect, blocks) : 0;
  const targetRect =
    minBlockIndex === 0 ? undefined : blocks[minBlockIndex - 1];

  console.log(
    "minBlockIndex",
    minBlockIndex,
    minBlockIndex === 0,
    "target rect",
    targetRect,
    blocks
  );

  return (
    <div className={styles.component}>
      <Blocks
        draggedRect={dragRect}
        onOverlap={onOverlap}
        closestBlockNum={minBlockIndex}
      />
      <FreePiece onDrag={onDrag} targetRect={targetRect} />
    </div>
  );
}
