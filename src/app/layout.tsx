import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Atkinson Hyperlegible Next, vendored under src/fonts (OFL, license file
// alongside) so nothing is fetched from Google at build time or ever. The
// Braille Institute drew it so characters people commonly confuse (I, l
// and 1; O and 0; rn and m) stay distinct, which suits a site about
// numbers that have to agree. Upright only: nothing on the site is set
// in italic, so the italic file would be 37 KB nobody downloads for.
const sans = localFont({
  variable: "--font-sans",
  adjustFontFallback: "Arial",
  src: [
    {
      path: "../fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2",
      weight: "200 800",
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
    "Full-stack engineer working on money in regulated industries: payments infrastructure, now pharmacy claims, and proving the numbers still reconcile.",
  authors: [{ name: "Owen Eldridge", url: "https://oweneldridge.io" }],
  openGraph: {
    siteName: "Owen Eldridge",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
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
      <body className={sans.variable}>
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
