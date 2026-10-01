import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={`frame ${styles.wrap}`}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.note}>
        Nothing is published at this address. The{" "}
        <Link href="/">home page</Link> lists every project.
      </p>
    </div>
  );
}
