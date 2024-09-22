import { useRef, useState } from "react";
import styles from "./Block.module.css";
import { Rect } from "./types";

type Props = {
  number: number;
  free?: Rect;
};

export function Block(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState<string | undefined>(undefined);

  if (ref.current && props.free) {
    const block = ref.current.getBoundingClientRect();
    const blockX = block.left + block.right;
    const blockY = block.top + block.bottom;

    const freeCenterX = props.free.x1 + props.free.x2;
    const freeCenterY = props.free.y1 + props.free.y2;

    const diffX = freeCenterX - blockX;
    const diffY = freeCenterY - blockY;
    const d = Math.sqrt(diffX * diffX + diffY + diffY).toFixed(2);

    // check distance change to avoid infinite loop
    if (distance !== d) {
      setDistance(d);
    }
  }

  return (
    <div ref={ref} className={styles.component}>
      <span className={styles.number}>{props.number}</span>
      {distance && <span className={styles.distance}>{distance}</span>}
    </div>
  );
}
