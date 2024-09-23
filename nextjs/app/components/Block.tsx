import { useRef } from "react";
import styles from "./Block.module.css";
import { Rect } from "./lib/types";
import { center, distance, isOverlapped, toRect } from "./lib/functions";

type Props = {
  number: number;
  free?: Rect;
};

export function Block(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function calcDistance(): number | undefined {
    if (ref.current && props.free) {
      const blockRect = toRect(ref.current.getBoundingClientRect());

      if (isOverlapped(blockRect, props.free)) {
        return distance(center(blockRect), center(props.free));
      }
    }

    // if cannnot calculate, undefined
    return undefined;
  }

  const dist = calcDistance();

  return (
    <div
      ref={ref}
      className={styles.component + (dist ? " " + styles.overlapped : "")}
    >
      <span className={styles.number}>{props.number}</span>
      {dist && <span className={styles.distance}>{dist.toFixed(2)}</span>}
    </div>
  );
}
