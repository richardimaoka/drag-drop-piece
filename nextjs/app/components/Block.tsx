import { useEffect, useRef } from "react";
import styles from "./Block.module.css";
import { Rect } from "./lib/types";
import { center, distance, isOverlapped, toRect } from "./lib/functions";

type Props = {
  number: number;
  draggedRect?: Rect;
  onRender?: (n: number, rect: Rect) => void;
  offOverlap?: (n: number) => void;
  isClosest?: boolean;
};

type Overlap = {
  blockRect: Rect;
  distance: number;
};

export function Block(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function calcOverlap(): Overlap | undefined {
    if (ref.current && props.draggedRect) {
      const blockRect = toRect(ref.current.getBoundingClientRect());

      if (isOverlapped(blockRect, props.draggedRect)) {
        return {
          blockRect: blockRect,
          distance: distance(center(blockRect), center(props.draggedRect)),
        };
      }
    }

    // if cannnot calculate, undefined
    return undefined;
  }

  const overlap = calcOverlap();

  // useEffect to avoid the following error:
  //   `Cannot update a component while rendering a different component`
  const { number, onRender } = props;
  useEffect(() => {
    console.log("block useEffect", number);
    if (ref.current && onRender) {
      const blockRect = toRect(ref.current.getBoundingClientRect());
      onRender(number, blockRect);
    }
  }, [number, onRender]);

  return (
    <div
      ref={ref}
      className={
        styles.component +
        (props.isClosest
          ? " " + styles.closest
          : overlap
          ? " " + styles.overlapped
          : "")
      }
    >
      <span className={styles.number}>{props.number}</span>
      {overlap && (
        <span className={styles.distance}>{overlap.distance.toFixed(2)}</span>
      )}
    </div>
  );
}
