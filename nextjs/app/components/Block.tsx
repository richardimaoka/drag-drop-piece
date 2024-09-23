import { useRef } from "react";
import styles from "./Block.module.css";
import { Rect } from "./types";
import { isOverlapped, toRect } from "./functions";

type Props = {
  number: number;
  free?: Rect;
};

export function Block(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function calcDistance(): number | undefined {
    if (ref.current && props.free) {
      const block = ref.current.getBoundingClientRect();
      const blockRect = toRect(block);
      const blockX = block.left + block.right;
      const blockY = block.top + block.bottom;

      if (isOverlapped(blockRect, props.free)) {
        const freeCenterX = props.free.x1 + props.free.x2;
        const freeCenterY = props.free.y1 + props.free.y2;

        const diffX = freeCenterX - blockX;
        const diffY = freeCenterY - blockY;

        return Math.sqrt(diffX * diffX + diffY * diffY);
      }
    }

    return undefined;
  }

  const distance = calcDistance();

  return (
    <div ref={ref} className={styles.component}>
      <span className={styles.number}>{props.number}</span>
      {distance && (
        <span className={styles.distance}>{distance.toFixed(2)}</span>
      )}
    </div>
  );
}
