import styles from "./Blocks.module.css";
import { Block } from "./Block";
import { Rect } from "./lib/types";

type Props = {
  draggedRect?: Rect;
  onOverlap?: (n: number, rect: Rect) => void;
  offOverlap?: (n: number) => void;
  closestBlockNum?: number;
};

export function Blocks(props: Props) {
  return (
    <div className={styles.component}>
      <div className={styles.grid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <Block
            key={n}
            number={n}
            draggedRect={props.draggedRect}
            isClosest={props.closestBlockNum === n}
            onOverlap={props.onOverlap}
            offOverlap={props.offOverlap}
          />
        ))}
      </div>
    </div>
  );
}
