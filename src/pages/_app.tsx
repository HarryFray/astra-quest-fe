import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import GlobalLayout from "@/components/globalLayout";
import GlobalSpaceBackground from "@/components/globalSpaceBackground";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalSpaceBackground />
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </SessionProvider>
  );
}
