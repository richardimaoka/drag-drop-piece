"use client";

import { useState } from "react";
import { Blocks } from "./Blocks";
import styles from "./Space.module.css";
import { FreePiece } from "./FreePiece";
import { Rect } from "./lib/types";
import { center, distance, sameRect } from "./lib/functions";

function minIndex(
  dragRect: Rect,
  arr: (Rect | undefined)[]
): number | undefined {
  let minIndex: number | undefined = undefined;
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
    console.log("on drag");
    setDragRect(rect);
  }

  function onOverlap(n: number, rect: Rect) {
    console.log("on overlap");
    const index = n - 1;
    const block = blocks[index];
    if (block && sameRect(block, rect)) {
      return;
    }

    const updated = [...blocks];
    updated[index] = rect;
    setBlocks(updated);
  }

  function offOverlap(n: number) {
    console.log("off overlap");
    const index = n - 1;
    const block = blocks[index];
    if (block) {
      const updated = [...blocks];
      updated[index] = undefined;
      setBlocks(updated);
    }
  }

  const minBlockIndex = dragRect ? minIndex(dragRect, blocks) : undefined;
  const minBlockNumber =
    typeof minBlockIndex === "number" ? minBlockIndex + 1 : undefined;
  const targetRect =
    typeof minBlockIndex === "number" ? blocks[minBlockIndex] : undefined;

  console.log("minBlockIndex", minBlockIndex, "targetRect", targetRect, blocks);

  return (
    <div className={styles.component}>
      <Blocks
        draggedRect={dragRect}
        onOverlap={onOverlap}
        offOverlap={offOverlap}
        closestBlockNum={minBlockNumber}
      />
      <FreePiece onDrag={onDrag} targetRect={targetRect} />
    </div>
  );
}
