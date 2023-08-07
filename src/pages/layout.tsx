import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SeanO Portfolio",
  description: "SeanO Portfolio Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="fixed top-0 left-0 right-0 p-4 w-screen flex items-center justify-between z-50">
          <link
            href="https://fonts.googleapis.com/css2?family=Prompt:wght@300&family=Ubuntu+Mono&display=swap"
            rel="stylesheet"
          />
          <Link
            href="/"
            className="text-4xl font-bold text-white hover:line-through"
          >
            SEAN O’NEILL
          </Link>
          <Link
            href="/contact"
            className="text-2xl font-bold hover:line-through text-white"
          >
            Contact
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
