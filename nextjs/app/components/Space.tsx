"use client";

import { useState } from "react";
import { Blocks } from "./Blocks";
import styles from "./Space.module.css";

type Position = {
  x: number;
  y: number;
};

type Dragged = {
  status: "Dragged";
  currentX: number;
  currentY: number;
};

type Undragged = {
  status: "Undragged";
};

export function Space() {
  const [drag, setDrag] = useState<Dragged | Undragged>({
    status: "Undragged",
  });
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

  function onMouseDown(e: React.MouseEvent) {
    console.log("drag start");
    setDrag({
      status: "Dragged",
      currentX: e.clientX,
      currentY: e.clientY,
    });
  }

  function onMouseUp() {
    console.log("drag finished");
    setDrag({ status: "Undragged" });
  }

  function onMouseMove(e: React.MouseEvent) {
    if (drag.status === "Dragged") {
      console.log(e.clientX, e.clientY);
      const diffX = e.clientX - drag.currentX;
      const diffY = e.clientY - drag.currentY;
      setPos({ x: pos.x + diffX, y: pos.y + diffY });
      setDrag({ status: "Dragged", currentX: e.clientX, currentY: e.clientY });
    }
  }

  return (
    <div className={styles.component} onMouseMove={onMouseMove}>
      <Blocks />
      <div
        className={styles.free}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={{ top: pos.y, left: pos.x }}
      >
        free
      </div>
    </div>
  );
}
