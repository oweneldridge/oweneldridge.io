import type { Metadata } from "next";
import { Fraunces, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const text = Newsreader({
  variable: "--font-text",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
      </body>
    </html>
  );
}
