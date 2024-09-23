import { useEffect, useRef } from "react";
import styles from "./Block.module.css";
import { Rect } from "./lib/types";
import { toRect } from "./lib/functions";

type Props = {
  number: number;
  draggedRect?: Rect;
  onRender?: (n: number, rect: Rect) => void;
  offOverlap?: (n: number) => void;
  isClosest?: boolean;
};

export function Block(props: Props) {
  const ref = useRef<HTMLDivElement>(null);

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
        styles.component + (props.isClosest ? " " + styles.closest : "")
      }
    >
      <span className={styles.number}>{props.number}</span>
    </div>
  );
}
