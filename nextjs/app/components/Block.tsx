import { useRef } from "react";
import styles from "./Block.module.css";
import { Rect } from "./lib/types";
import { center, distance, isOverlapped, toRect } from "./lib/functions";

type Props = {
  number: number;
  free?: Rect;
  onOverlap?: (n: number, distance: number, blockRect: Rect) => void;
  closest?: boolean;
};

type Overlap = {
  blockRect: Rect;
  distance: number;
};

export function Block(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function calcOverlap(): Overlap | undefined {
    if (ref.current && props.free) {
      const blockRect = toRect(ref.current.getBoundingClientRect());

      if (isOverlapped(blockRect, props.free)) {
        return {
          blockRect: blockRect,
          distance: distance(center(blockRect), center(props.free)),
        };
      }
    }

    // if cannnot calculate, undefined
    return undefined;
  }

  const overlap = calcOverlap();

  if (overlap && props.onOverlap) {
    props.onOverlap(props.number, overlap.distance, overlap.blockRect);
  }

  return (
    <div
      ref={ref}
      className={
        styles.component +
        (props.closest
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
