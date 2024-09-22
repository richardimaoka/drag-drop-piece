import { useRef } from "react";
import styles from "./Blocks.module.css";

export function Blocks() {
  const ref = useRef<HTMLDivElement>(null);
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    console.log("on drag over");
    if (ref.current) {
      const a = ref.current.getClientRects();
      console.log("client rect", a);
    }
  }

  function onDrop(e: React.DragEvent) {
    console.log("on drop", e);
    if (ref.current) {
      const a = ref.current.getClientRects();
      console.log("client rect", a);
    }
  }

  return (
    <div className={styles.component} onDragOver={onDragOver} onDrop={onDrop}>
      <div className={styles.grid}>
        <div ref={ref} className={styles.block}>
          <span className={styles.number}>1</span>
          <span className={styles.distance}>1.5478</span>
        </div>
        <div className={styles.block}>
          <span className={styles.number}>2</span>
        </div>
        <div className={styles.block}>
          <span className={styles.number}>3</span>
        </div>
        <div className={styles.block}>
          <span className={styles.number}>4</span>
        </div>
        <div className={styles.block}>
          <span className={styles.number}>5</span>
        </div>
        <div className={styles.block}>
          <span className={styles.number}>6</span>
        </div>
        <div className={styles.block}>
          <span className={styles.number}>7</span>
        </div>
        <div className={styles.block}>
          <span className={styles.number}>8</span>
        </div>
        <div className={styles.block}>
          <span className={styles.number}>9</span>
        </div>
      </div>
    </div>
  );
}
