"use client";

import { useState } from "react";
import { Blocks } from "./Blocks";
import styles from "./Space.module.css";
import { FreePiece } from "./FreePiece";
import { Rect } from "./lib/types";

function minIndex(arr: (number | undefined)[]): number {
  let minIndex = 0;
  let minDistance: number | undefined = undefined;

  for (let index = 0; index < arr.length; index++) {
    const distance = arr[index];
    if (minDistance) {
      if (distance && distance < minDistance) {
        minIndex = index;
        minDistance = distance;
      }
    } else {
      if (distance) {
        minIndex = index;
        minDistance = distance;
      }
    }
  }
  return minIndex;
}

export function Space() {
  const [dragRect, setDragRect] = useState<Rect | undefined>(undefined);
  const [blockDistances, setBlockDistances] = useState<(number | undefined)[]>([
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

  function onOverlap(n: number, distance: number) {
    if (blockDistances[n] !== distance) {
      const updated = [...blockDistances];
      updated[n] = distance;
      setBlockDistances(updated);
    }
  }

  const minBlockIndex = minIndex(blockDistances);

  return (
    <div className={styles.component}>
      <Blocks
        draggedRect={dragRect}
        onOverlap={onOverlap}
        closestBlockNum={minBlockIndex}
      />
      <FreePiece
        onDrag={onDrag}
        targetPos={{ x: 647.7272338867188, y: 497.272705078125 }}
      />
    </div>
  );
}
