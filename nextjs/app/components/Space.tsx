"use client";

import { useState } from "react";
import { Blocks } from "./Blocks";
import styles from "./Space.module.css";
import { DragRect } from "./DragRect";
import { Rect } from "./lib/types";
import { center, distance, isOverlapped, sameRect } from "./lib/functions";
import { nonNullArray } from "./lib/nonNullArray";

// function minIndex(
//   dragRect: Rect,
//   arr: (Rect | undefined)[]
// ): number | undefined {
//   let minIndex: number | undefined = undefined;
//   let minDistance: number | undefined = undefined;

//   for (let index = 0; index < arr.length; index++) {
//     const block = arr[index];
//     const dist = block ? distance(center(dragRect), center(block)) : undefined;

//     if (minDistance) {
//       if (dist && dist < minDistance) {
//         minIndex = index;
//         minDistance = dist;
//       }
//     } else {
//       if (dist) {
//         minIndex = index;
//         minDistance = dist;
//       }
//     }
//   }

//   return minIndex;
// }

function minDistanceBlock(dragRect: Rect, blocks: Block[]): Block | undefined {
  // console.log("minDistanceBlock started", dragRect, blocks);

  let minDistance: number | undefined = undefined;
  let minBlock: Block | undefined = undefined;

  for (let index = 0; index < blocks.length; index++) {
    const currentBlock = blocks[index];
    const currentDistance = distance(
      center(dragRect),
      center(currentBlock.rect)
    );

    if (minDistance) {
      // both minDistance && dist exists
      if (currentDistance && currentDistance < minDistance) {
        minDistance = currentDistance;
        minBlock = currentBlock;
      }
    } else {
      if (currentDistance) {
        minDistance = currentDistance;
        minBlock = currentBlock;
      }
    }
  }

  if (minBlock && minDistance) {
    return minBlock;
  } else {
    // console.log("minDistanceBlock return undefined", minBlock, minDistance);
    return undefined;
  }
}

function calcClosestOverlap(
  dragRect: Rect | undefined,
  blocksWithUndefined: (Block | undefined)[]
): Block | undefined {
  // console.log("calcClosestOverlap", dragRect, blocksWithUndefined);
  if (!dragRect) {
    // console.log("!dragRect return undefined");
    return undefined;
  }

  const blocks = nonNullArray(blocksWithUndefined).filter((b) =>
    isOverlapped(b.rect, dragRect)
  );

  return minDistanceBlock(dragRect, blocks);
}

type Block = {
  number: number;
  rect: Rect;
};

export function Space() {
  const [dragRect, setDragRect] = useState<Rect | undefined>(undefined);
  const [blocks, setBlocks] = useState<(Block | undefined)[]>([
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
    // console.log("on drag", rect);
    setDragRect(rect);
  }

  function onRender(n: number, blockRect: Rect) {
    // console.log("on overlap");
    const index = n - 1;
    const b = blocks[index];
    if (b && sameRect(b.rect, blockRect)) {
      return;
    }

    const updated = [...blocks];
    updated[index] = { number: n, rect: blockRect };
    setBlocks(updated);
  }

  const closestOverlappingBlock = calcClosestOverlap(dragRect, blocks);
  // console.log("closestOverlappingBlock", closestOverlappingBlock);
  return (
    <div className={styles.component}>
      <Blocks
        onOverlap={onRender}
        closestBlockNum={closestOverlappingBlock?.number}
      />
      <DragRect
        onDrag={onDrag}
        closestBlockRect={closestOverlappingBlock?.rect}
      />
    </div>
  );
}
