"use client";

import { useState } from "react";
import { Blocks } from "./Blocks";
import styles from "./Space.module.css";
import { FreePiece } from "./FreePiece";
import { Rect } from "./lib/types";

type BlockData = {
  n: number;
  distance: number | undefined;
};

export function Space() {
  const [freeRect, setRect] = useState<Rect | undefined>(undefined);
  const [blocks, setBlocks] = useState<BlockData[]>(
    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
      n: n,
      distance: undefined,
    }))
  );

  function dragRect(rect: Rect) {
    setRect(rect);
  }

  function onOverlap(n: number, distance: number) {
    if (blocks[n] && blocks[n].distance !== distance) {
      const updated = { ...blocks };
      updated[n] = { n: n, distance: distance };
      setBlocks(updated);
    }
  }

  return (
    <div className={styles.component}>
      <Blocks free={freeRect} onOverlap={onOverlap} />
      <FreePiece onDrag={dragRect} targetPos={{ x: 200, y: 500 }} />
    </div>
  );
}
