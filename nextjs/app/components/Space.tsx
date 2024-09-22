"use client";

import { useState } from "react";
import { Blocks } from "./Blocks";
import styles from "./Space.module.css";
import { FreePiece } from "./FreePiece";
import { Rect } from "./types";

export function Space() {
  const [freeRect, setRect] = useState<Rect | undefined>(undefined);

  function dragRect(rect: Rect) {
    setRect(rect);
  }

  return (
    <div className={styles.component}>
      <Blocks free={freeRect} />
      <FreePiece onDrag={dragRect} targetPos={{ x: 200, y: 500 }} />
    </div>
  );
}
