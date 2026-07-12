import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <p className="overline">404</p>
      <h1 className={styles.title}>No such page.</h1>
      <p className={styles.note}>
        Whatever was here has moved, or never was.{" "}
        <Link href="/">Back to the index</Link>.
      </p>
    </div>
  );
}
