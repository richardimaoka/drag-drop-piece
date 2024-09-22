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

  function onDragStart(e: React.MouseEvent) {
    console.log("drag start", e.clientX, e.clientY);
    setDrag({
      status: "Dragged",
      currentX: e.clientX,
      currentY: e.clientY,
    });
  }

  function onDrag(e: React.MouseEvent) {
    if (drag.status === "Dragged") {
      const diffX = e.clientX - drag.currentX;
      const diffY = e.clientY - drag.currentY;
      setPos({ x: pos.x + diffX, y: pos.y + diffY });
      setDrag({
        status: "Dragged",
        currentX: e.clientX,
        currentY: e.clientY,
      });
    }
  }

  function onDragEnd(e: React.MouseEvent) {
    if (drag.status === "Dragged") {
      console.log("drag finished");
      const diffX = e.clientX - drag.currentX;
      const diffY = e.clientY - drag.currentY;
      setPos({ x: pos.x + diffX, y: pos.y + diffY });
      setDrag({ status: "Undragged" });
    }
  }

  return (
    <div className={styles.component}>
      <Blocks />
      <div
        draggable
        className={styles.free}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ top: pos.y, left: pos.x }}
      >
        free
      </div>
    </div>
  );
}
