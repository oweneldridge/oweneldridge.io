import styles from "./reconciliation.module.css";

// Two records of the same week that should agree and don't. The figures
// are invented; the habit is the point: when a difference divides evenly
// by nine, look for two swapped digits. Opening the disclosure marks the
// row (CSS :has on the open <details>), so it needs no script.
const rows = [
  { day: "Mon", ledger: "2,418.60", bank: "2,418.60" },
  { day: "Tue", ledger: "975.25", bank: "975.25" },
  { day: "Wed", ledger: "1,240.00", bank: "1,204.00", off: true },
  { day: "Thu", ledger: "3,062.40", bank: "3,062.40" },
  { day: "Fri", ledger: "512.75", bank: "512.75" },
];

export function Reconciliation({ className = "" }: { className?: string }) {
  return (
    <figure className={`aside ${styles.recon} ${className}`}>
      <figcaption className={styles.caption}>
        Two records of the same week (invented figures)
      </figcaption>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">
              <span className={styles.hidden}>Day</span>
            </th>
            <th scope="col">Ledger</th>
            <th scope="col">Bank</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.day} className={row.off ? styles.off : undefined}>
              <th scope="row">{row.day}</th>
              <td>{row.ledger}</td>
              <td>{row.bank}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td>8,209.00</td>
            <td>8,173.00</td>
          </tr>
        </tfoot>
      </table>
      <details className={styles.details}>
        <summary>Off by 36.00. Where?</summary>
        <p>
          Wednesday: 1,240.00 in the ledger, 1,204.00 at the bank. A
          difference that divides evenly by 9 is the old bookkeeping hint
          that two digits got swapped.
        </p>
      </details>
    </figure>
  );
}
