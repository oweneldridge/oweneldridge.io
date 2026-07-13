import styles from "./theme-toggle.module.css";

// Plain markup; the click behavior is a small inline script in the layout.
// The site ships no framework JavaScript, so this can't be a client
// component, and it doesn't need to be: the icon swap is CSS driven by
// the html data-theme attribute and the system preference.
export function ThemeToggle() {
  return (
    <button
      type="button"
      id="theme-toggle"
      className={styles.toggle}
      aria-label="Switch color theme"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <circle cx="10" cy="10" r="4.5" className={styles.sunCore} />
        <g className={styles.rays}>
          <line x1="10" y1="1.5" x2="10" y2="3.5" />
          <line x1="10" y1="16.5" x2="10" y2="18.5" />
          <line x1="1.5" y1="10" x2="3.5" y2="10" />
          <line x1="16.5" y1="10" x2="18.5" y2="10" />
          <line x1="4" y1="4" x2="5.4" y2="5.4" />
          <line x1="14.6" y1="14.6" x2="16" y2="16" />
          <line x1="16" y1="4" x2="14.6" y2="5.4" />
          <line x1="5.4" y1="14.6" x2="4" y2="16" />
        </g>
        <path
          className={styles.moon}
          d="M15.5 11.6a6 6 0 1 1-7.1-7.1 4.8 4.8 0 1 0 7.1 7.1Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    </button>
  );
}
