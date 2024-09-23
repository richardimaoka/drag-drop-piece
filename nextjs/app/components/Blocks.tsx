import styles from "./Blocks.module.css";
import { Block } from "./Block";
import { Overlap, Rect } from "./lib/types";

type Props = {
  free?: Rect;
  onOverlap?: (n: number, o: Overlap) => void;
  closestNum?: number;
};

export function Blocks(props: Props) {
  return (
    <div className={styles.component}>
      <div className={styles.grid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <Block
            key={n}
            number={n}
            free={props.free}
            closest={props.closestNum === n}
            onOverlap={props.onOverlap}
          />
        ))}
      </div>
    </div>
  );
}
