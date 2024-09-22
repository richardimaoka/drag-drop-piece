import { Blocks } from "./components/Blocks";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.component}>
      <Blocks />
    </div>
  );
}
