"use client";
import styles from "./DragTest.module.css";

export default function DragTest() {
  return (
    <div>
      <div className={styles.dropzone}>
        <div
          id="draggable"
          draggable="true"
          onDragStart={(event) => {
            // store a ref. on the dragged elem
            console.log("on drag start", event.target);
          }}
          onDragOver={(event) => {
            // prevent default to allow drop
            console.log("on drag over 1", event.target);
            event.preventDefault();
          }}
        >
          This div is draggable
        </div>
      </div>
      <div
        className={styles.dropzone}
        id="droptarget"
        onDragOver={(event) => {
          // prevent default to allow drop
          console.log("on drag over 2", event.target);
          event.preventDefault();
        }}
      >
        target
      </div>
    </div>
  );
}
