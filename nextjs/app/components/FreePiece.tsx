import styles from "./FreePiece.module.css";
import { useRef, useState } from "react";
import { Rect } from "./types";

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
  // onDragStart?: (dragRect: Rect) => void;
  onDrag?: (dragRect: Rect) => void;
  // onDragEnd?: (dragRect: Rect) => void;
};

export function FreePiece(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

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

    // if (props.onDragStart) {
    //   props.onDragStart(e.clientX, e.clientY);
    // }
  }

  function onDrag(e: React.MouseEvent) {
    if (ref.current && drag.status === "Dragged") {
      const diffX = e.clientX - drag.startX;
      const diffY = e.clientY - drag.startY;
      const initialRect = ref.current.getBoundingClientRect();

      const rect = {
        x1: initialRect.left + diffX,
        x2: initialRect.right + diffX,
        y1: initialRect.top + diffY,
        y2: initialRect.bottom + diffY,
      };

      if (props.onDrag) {
        props.onDrag(rect);
      }
    }
  }

  function onDragEnd(e: React.MouseEvent) {
    if (drag.status === "Dragged") {
      console.log("drag finished");
      const diffX = e.clientX - drag.startX;
      const diffY = e.clientY - drag.startY;
      setPos({ x: pos.x + diffX, y: pos.y + diffY });
      setDrag({ status: "Undragged" });

      // if (props.onDragEnd) {
      //   props.onDragEnd(e.clientX, e.clientY);
      // }
    }
  }

  return (
    <div
      className={styles.component}
      ref={ref}
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
