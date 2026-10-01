import styles from "./live-preview-demo.module.css";

// Basalt's live preview, approximated with HTML and CSS: the Markdown
// syntax on a line stays hidden until the "caret" is on that line. Each
// line is a radio button in one group, so the demo is a single tab stop
// and the arrow keys move between lines, the way a caret would. The
// lines come from the note in Basalt's own test harness.

type Part = { syntax: string } | { text: string; as?: "strong" | "link" };

const lines: { kind: string; parts: Part[] }[] = [
  { kind: "h1", parts: [{ syntax: "# " }, { text: "The shape of good tools" }] },
  {
    kind: "p",
    parts: [
      {
        text: "A tool earns trust when it behaves the same way on the thousandth use as the first.",
      },
    ],
  },
  {
    kind: "calloutTitle",
    parts: [{ syntax: "> [!note] " }, { text: "Working definition" }],
  },
  {
    kind: "calloutBody",
    parts: [
      { syntax: "> " },
      { text: "Durability is a feature you can only observe in hindsight." },
    ],
  },
  {
    kind: "li",
    parts: [
      { syntax: "- **" },
      { text: "Plain formats", as: "strong" },
      { syntax: "**" },
      { text: " outlive clever ones, see " },
      { syntax: "[[" },
      { text: "File over app", as: "link" },
      { syntax: "]]" },
    ],
  },
];

function render(part: Part, i: number) {
  if ("syntax" in part) {
    return (
      <span key={i} className={styles.syntax}>
        {part.syntax}
      </span>
    );
  }
  if (part.as === "strong") return <strong key={i}>{part.text}</strong>;
  if (part.as === "link")
    return (
      <span key={i} className={styles.wikilink}>
        {part.text}
      </span>
    );
  return <span key={i}>{part.text}</span>;
}

export function LivePreviewDemo() {
  return (
    <fieldset className={styles.editor}>
      <legend className={styles.hidden}>
        Live preview demo: choose a line to see its Markdown
      </legend>
      {lines.map((line, i) => (
        <label key={i} className={`${styles.line} ${styles[line.kind]}`}>
          <input
            type="radio"
            name="live-preview-caret"
            className={styles.caret}
          />
          {line.parts.map(render)}
        </label>
      ))}
    </fieldset>
  );
}
