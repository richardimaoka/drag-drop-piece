import styles from "./Blocks.module.css";

export function Blocks() {
  return (
    <div className={styles.component}>
      <div className={styles.grid}>
        <div className={styles.block}>
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
