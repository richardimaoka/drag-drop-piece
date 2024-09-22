import styles from "./Blocks.module.css";

export function Blocks() {
  return (
    <div className={styles.component}>
      <div className={styles.grid}>
        <div className={styles.block}>1</div>
        <div className={styles.block}>2</div>
        <div className={styles.block}>3</div>
        <div className={styles.block}>4</div>
        <div className={styles.block}>5</div>
        <div className={styles.block}>6</div>
        <div className={styles.block}>7</div>
        <div className={styles.block}>8</div>
        <div className={styles.block}>9</div>
      </div>
    </div>
  );
}
