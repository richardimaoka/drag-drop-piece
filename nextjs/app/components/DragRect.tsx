import styles from "./DragRect.module.css";
import { useEffect, useRef, useState } from "react";
import { Position, Rect } from "./lib/types";

type Dragged = {
  status: "Dragged";
  dragStartX: number;
  dragStartY: number;
};

type Static = {
  status: "Static";
};

type AnimationTrigger = {
  status: "AnimationTrigger";
  targetRect: Rect;
};

type Animating = {
  status: "Animating";
  targetRect: Rect;
};

type Status = Dragged | Static | AnimationTrigger | Animating;

type Props = {
  // onDragStart?: (dragRect: Rect) => void;
  onDrag?: (dragRect: Rect) => void;
  onDragEnd?: (dragRect: Rect) => void;
  closestBlockRect?: Rect;
};

function calcAnimationDuration(
  dragRectElem: HTMLDivElement,
  distance: number
): number {
  return 0.3;
}

export function DragRect(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<Status>({
    status: "Static",
  });
  const [topLeftCorner, setTopLeft] = useState<Position>({ x: 0, y: 0 });

  function onDragStart(e: React.MouseEvent) {
    setStatus({
      status: "Dragged",
      dragStartX: e.clientX,
      dragStartY: e.clientY,
    });

    // if (props.onDragStart) {
    //   props.onDragStart(e.clientX, e.clientY);
    // }
  }

  function onDrag(e: React.MouseEvent) {
    // This happens at the end of drag somehow...
    if (e.clientX === 0 && e.clientY === 0) {
      return;
    }

    if (ref.current && status.status === "Dragged") {
      const diffX = e.clientX - status.dragStartX;
      const diffY = e.clientY - status.dragStartY;
      const beforeDragRect = ref.current.getBoundingClientRect();

      const rect = {
        x1: beforeDragRect.left + diffX,
        x2: beforeDragRect.right + diffX,
        y1: beforeDragRect.top + diffY,
        y2: beforeDragRect.bottom + diffY,
      };

      if (props.onDrag) {
        props.onDrag(rect);
      }
    }
  }

  function onDragEnd(e: React.MouseEvent) {
    if (status.status === "Dragged") {
      const dragMovementX = e.clientX - status.dragStartX;
      const dragMovementY = e.clientY - status.dragStartY;

      // console.log("target rect", props.closestBlockRect, "pos", pos);

      if (props.closestBlockRect) {
        setStatus({
          status: "AnimationTrigger",
          targetRect: props.closestBlockRect,
        });

        console.log("drag end", {
          x: topLeftCorner.x + dragMovementX,
          y: topLeftCorner.y + dragMovementY,
        });
        setTopLeft({
          x: topLeftCorner.x + dragMovementX,
          y: topLeftCorner.y + dragMovementY,
        });
      } else {
        setTopLeft({
          x: topLeftCorner.x + dragMovementX,
          y: topLeftCorner.y + dragMovementY,
        });
      }
    }
  }

  function onAnimationEnd() {
    setStatus({ status: "Static" });
  }

  useEffect(() => {
    if (status.status === "AnimationTrigger") {
      setStatus({ status: "Animating", targetRect: status.targetRect });

      console.log("AnimationTrigger", topLeftCorner, {
        x: status.targetRect.x1,
        y: status.targetRect.y1,
      });

      setTopLeft({
        x: status.targetRect.x1,
        y: status.targetRect.y1,
      });
    }
  }, [topLeftCorner, status]);

  return (
    <div
      className={
        styles.component +
        (status.status === "Animating" ? " " + styles.animate : "")
      }
      ref={ref}
      draggable
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      style={
        status.status === "Animating"
          ? {
              top: topLeftCorner.y,
              left: topLeftCorner.x,
              // transitionDuration: calcAnimationDuration(),
            }
          : { top: topLeftCorner.y, left: topLeftCorner.x }
      }
      onTransitionEnd={onAnimationEnd}
    >
      free
    </div>
  );
}
