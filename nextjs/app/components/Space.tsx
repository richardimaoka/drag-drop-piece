"use client";

import { useState } from "react";
import { Blocks } from "./Blocks";
import styles from "./Space.module.css";
import { FreePiece } from "./FreePiece";
import { Rect } from "./lib/types";

export function Space() {
  const [freeRect, setRect] = useState<Rect | undefined>(undefined);
  const [dummy, setDummy] = useState(0);

  function dragRect(rect: Rect) {
    setRect(rect);
  }

  function onOverlap(n: number, distance: number, blockRect: Rect) {
    setDummy(dummy + n);
  }

  return (
    <div className={styles.component}>
      <Blocks free={freeRect} onOverlap={onOverlap} />
      <FreePiece onDrag={dragRect} targetPos={{ x: 200, y: 500 }} />
    </div>
  );
}
