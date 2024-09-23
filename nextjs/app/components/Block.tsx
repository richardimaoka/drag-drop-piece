import { useEffect, useRef } from "react";
import styles from "./Block.module.css";
import { Rect } from "./lib/types";
import { center, distance, isOverlapped, toRect } from "./lib/functions";

type Props = {
  number: number;
  draggedRect?: Rect;
  onOverlap?: (n: number, distance: number) => void;
  isClosest?: boolean;
};

export function Block(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function calcDistance(): number | undefined {
    if (ref.current && props.draggedRect) {
      const blockRect = toRect(ref.current.getBoundingClientRect());

      if (isOverlapped(blockRect, props.draggedRect)) {
        return distance(center(blockRect), center(props.draggedRect));
      }
    }

    // if cannnot calculate, undefined
    return undefined;
  }

  const dist = calcDistance();

  // useEffect to avoid the following error:
  //   `Cannot update a component while rendering a different component`
  useEffect(() => {
    if (dist && props.onOverlap) {
      props.onOverlap(props.number, dist);
    }
  }, [dist, props]);

  return (
    <div
      ref={ref}
      className={
        styles.component +
        (props.isClosest
          ? " " + styles.closest
          : dist
          ? " " + styles.overlapped
          : "")
      }
    >
      <span className={styles.number}>{props.number}</span>
      {dist && <span className={styles.distance}>{dist.toFixed(2)}</span>}
    </div>
  );
}
