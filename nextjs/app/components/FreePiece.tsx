import styles from "./FreePiece.module.css";
import { useState } from "react";

type Position = {
  x: number;
  y: number;
};

type Dragged = {
  status: "Dragged";
  startX: number;
  startY: number;
};

type Undragged = {
  status: "Undragged";
};

type Props = {
  onDragStart?: (x: number, y: number) => void;
  onDrag?: (x: number, y: number) => void;
  onDragEnd?: (x: number, y: number) => void;
};

export function FreePiece(props: Props) {
  const [drag, setDrag] = useState<Dragged | Undragged>({
    status: "Undragged",
  });
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

  function onDragStart(e: React.MouseEvent) {
    console.log("drag start", e.clientX, e.clientY);
    setDrag({
      status: "Dragged",
      startX: e.clientX,
      startY: e.clientY,
    });

    if (props.onDragStart) {
      props.onDragStart(e.clientX, e.clientY);
    }
  }

  function onDrag(e: React.MouseEvent) {
    if (props.onDrag) {
      props.onDrag(e.clientX, e.clientY);
    }
  }

  function onDragEnd(e: React.MouseEvent) {
    if (drag.status === "Dragged") {
      console.log("drag finished");
      const diffX = e.clientX - drag.startX;
      const diffY = e.clientY - drag.startY;
      setPos({ x: pos.x + diffX, y: pos.y + diffY });
      setDrag({ status: "Undragged" });

      if (props.onDragEnd) {
        props.onDragEnd(e.clientX, e.clientY);
      }
    }
  }

  return (
    <div
      className={styles.component}
      draggable
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      style={{ top: pos.y, left: pos.x }}
    >
      free
    </div>
  );
}
