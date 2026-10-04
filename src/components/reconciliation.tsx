import type { CSSProperties } from "react";
import styles from "./reconciliation.module.css";

// Two records of the same week that should agree and don't, and the
// check that finds out why: each row is compared in turn, Wednesday is
// the one that fails, and its two transposed digits trade places to show
// the ledger and bank figures are the same number keyed two ways. The
// figures are invented.
//
// Pure CSS. The resting styles are the finished check, so reduced motion
// (and any browser that skips the animation) gets the answer straight
// away. Replay works without script: the toggle switches every animation
// to an identical copy of its keyframes under another name, and a changed
// animation name starts over. The table exists once, so anything reading
// the page as text (a screen reader, a search engine, an AI assistant)
// sees it once.

const rows = [
  { day: "Mon", ledger: "2,418.60", bank: "2,418.60" },
  { day: "Tue", ledger: "975.25", bank: "975.25" },
  { day: "Wed", ledger: "1,240.00", bank: "1,204.00" },
  { day: "Thu", ledger: "3,062.40", bank: "3,062.40" },
  { day: "Fri", ledger: "512.75", bank: "512.75" },
];

// Wednesday's figures, split so the two transposed digits can be marked,
// and in the ledger, moved.
function Transposed({
  first,
  second,
  moves,
}: {
  first: string;
  second: string;
  moves: boolean;
}) {
  return (
    <>
      1,2
      <span className={`${styles.digit} ${moves ? styles.goesRight : ""}`}>
        {first}
      </span>
      <span className={`${styles.digit} ${moves ? styles.goesLeft : ""}`}>
        {second}
      </span>
      .00
    </>
  );
}

function Check() {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">
              <span className={styles.hidden}>Day</span>
            </th>
            <th scope="col">Ledger</th>
            <th scope="col">Bank</th>
            <th scope="col">
              <span className={styles.hidden}>Agrees?</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const off = row.ledger !== row.bank;
            return (
              <tr
                key={row.day}
                className={off ? styles.off : undefined}
                style={{ "--i": i } as CSSProperties}
              >
                <th scope="row">{row.day}</th>
                <td>
                  {off ? <Transposed first="4" second="0" moves /> : row.ledger}
                </td>
                <td>
                  {off ? (
                    <Transposed first="0" second="4" moves={false} />
                  ) : (
                    row.bank
                  )}
                </td>
                <td className={styles.mark}>
                  <span aria-hidden="true">{off ? "✗" : "✓"}</span>
                  <span className={styles.hidden}>
                    {off ? "does not match" : "matches"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td>8,209.00</td>
            <td>8,173.00</td>
            <td className={styles.mark}>
              <span aria-hidden="true">{"≠"}</span>
              <span className={styles.hidden}>does not match</span>
            </td>
          </tr>
        </tfoot>
      </table>
      <div className={styles.notes}>
        <p className={styles.checking} aria-hidden="true">
          The totals are 36.00 apart. Checking each row&hellip;
        </p>
        <p className={styles.found}>
          Off by 36.00, and 36 divides by 9: the usual sign of two swapped
          digits. Wednesday was keyed as 1,240.00 instead of 1,204.00.
        </p>
      </div>
    </div>
  );
}

export function Reconciliation({ className = "" }: { className?: string }) {
  return (
    <figure className={`aside ${styles.recon} ${className}`}>
      <figcaption className={styles.caption}>
        Two records of the same week, with invented figures.
      </figcaption>
      <Check />
      <label className={styles.replay}>
        <input type="checkbox" className={styles.toggle} />
        Replay the check
      </label>
    </figure>
  );
}
