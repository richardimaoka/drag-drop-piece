"use client";

import { useState } from "react";
import { Blocks } from "./Blocks";
import styles from "./Space.module.css";
import { FreePiece } from "./FreePiece";

type Position = {
  x: number;
  y: number;
};

export function Space() {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

  function onDrag(x: number, y: number) {
    setPos({ x: x, y: y });
  }

  return (
    <div className={styles.component}>
      <Blocks freeX={pos.x} freeY={pos.y} />
      <FreePiece onDrag={onDrag} />
    </div>
  );
}
