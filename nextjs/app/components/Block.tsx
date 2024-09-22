import { useRef, useState } from "react";
import styles from "./Block.module.css";

type Props = {
  number: number;
  freeX: number;
  freeY: number;
};

export function Block(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState<string | undefined>(undefined);

  function onDragOver(e: React.DragEvent) {
    // prevent default to allow drop
    e.preventDefault();

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.right;
      const centerY = rect.top + rect.bottom;

      const diffX = props.freeX - centerX;
      const diffY = props.freeY - centerY;
      const d = Math.sqrt(diffX * diffX + diffY + diffY).toFixed(2);
      console.log("drag over ", d);
      setDistance(d);
    }
  }

  function onDragLeave() {
    setDistance(undefined);
  }

  // function onDrop(e: React.DragEvent) {
  //   if (ref.current) {
  //     const a = ref.current.getClientRects();
  //   }
  // }

  return (
    <div
      ref={ref}
      className={styles.component}
      onDragOver={onDragOver}
      // onDrop={onDrop}
      onDragLeave={onDragLeave}
    >
      <span className={styles.number}>{props.number}</span>
      {distance && <span className={styles.distance}>{distance}</span>}
    </div>
  );
}
