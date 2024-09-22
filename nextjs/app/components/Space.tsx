"use client";

import { Blocks } from "./Blocks";
import styles from "./Space.module.css";

export function Space() {
  return (
    <div className={styles.component}>
      <Blocks />
      <div className={styles.free}>free</div>
    </div>
  );
}
