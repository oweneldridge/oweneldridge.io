import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Fraunces and Newsreader, vendored under src/fonts (OFL, license files
// alongside) so nothing is fetched from Google at build time or ever.
const display = localFont({
  variable: "--font-display",
  adjustFontFallback: "Times New Roman",
  src: [
    {
      path: "../fonts/fraunces-latin-standard-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/fraunces-latin-standard-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
});

// Newsreader ships upright only; the few italic accents on the site use
// Fraunces italic instead, which saves the single heaviest font file.
const text = localFont({
  variable: "--font-text",
  adjustFontFallback: "Times New Roman",
  src: [
    {
      path: "../fonts/newsreader-latin-standard-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oweneldridge.io"),
  title: {
    default: "Owen Eldridge",
    template: "%s · Owen Eldridge",
  },
  description:
    "Full-stack engineer. Healthcare infrastructure by day, a rack of self-hosted software the rest of the time.",
};

// Runs before first paint so a saved theme choice never flashes.
// Only touches the attribute when the visitor has actually picked a side;
// otherwise the CSS follows prefers-color-scheme on its own.
const themeInit = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

// The whole behavior layer of the site: the theme toggle. Everything else
// is plain documents, so the framework runtime gets stripped from the
// static export (scripts/strip-runtime.mjs) and this stays.
const themeToggle = `(function(){
var b=document.getElementById("theme-toggle");if(!b)return;
function cur(){var t=document.documentElement.dataset.theme;
if(t==="light"||t==="dark")return t;
return matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}
function label(){b.setAttribute("aria-label",
cur()==="dark"?"Switch to the light theme":"Switch to the dark theme")}
b.addEventListener("click",function(){
var n=cur()==="dark"?"light":"dark";
document.documentElement.dataset.theme=n;
try{localStorage.setItem("theme",n)}catch(e){}
label()});
matchMedia("(prefers-color-scheme: dark)").addEventListener("change",label);
label()})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${display.variable} ${text.variable}`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script dangerouslySetInnerHTML={{ __html: themeToggle }} />
      </body>
    </html>
  );
}
