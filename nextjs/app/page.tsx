import DragTest from "./components/DragTest";
import { Space } from "./components/Space";
// import styles from "./page.module.css";

export default function Home() {
  return true ? <Space /> : <DragTest />;
}
