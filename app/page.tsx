import Welcome from "@/components/welcome";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.blurCircle1}></div>
      <div className={styles.blurCircle2}></div>

      <Welcome />
    </div>
  );
}
