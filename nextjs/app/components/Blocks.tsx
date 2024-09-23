import styles from "./Blocks.module.css";
import { Block } from "./Block";
import { Rect } from "./lib/types";

type Props = {
  onOverlap?: (n: number, rect: Rect) => void;
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
            isClosest={props.closestBlockNum === n}
            onRender={props.onOverlap}
          />
        ))}
      </div>
    </div>
  );
}
