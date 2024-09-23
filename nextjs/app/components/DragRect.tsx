import styles from "./DragRect.module.css";
import { useRef, useState } from "react";
import { Position, Rect } from "./lib/types";

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
  onDragEnd?: (dragRect: Rect) => void;
  targetRect?: Rect;
};

export function DragRect(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [drag, setDrag] = useState<Dragged | Undragged>({
    status: "Undragged",
  });
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

  function onDragStart(e: React.MouseEvent) {
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
      const dragStartRect = ref.current.getBoundingClientRect();

      const rect = {
        x1: dragStartRect.left + diffX,
        x2: dragStartRect.right + diffX,
        y1: dragStartRect.top + diffY,
        y2: dragStartRect.bottom + diffY,
      };

      if (props.onDrag) {
        props.onDrag(rect);
      }
    }
  }

  function onDragEnd(e: React.MouseEvent) {
    if (drag.status === "Dragged") {
      const diffX = e.clientX - drag.startX;
      const diffY = e.clientY - drag.startY;

      console.log("target rect", props.targetRect, "pos", pos);

      if (props.targetRect) {
        setPos({ x: props.targetRect.x1, y: props.targetRect.y1 });
      } else {
        setPos({ x: pos.x + diffX, y: pos.y + diffY });
      }
      setDrag({ status: "Undragged" });
      // if (props.onDragEnd) {
      //   props.onDragEnd(e.clientX, e.clientY);
      // }
    }
  }

  return (
    <div
      className={styles.component + " " + styles.target}
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
