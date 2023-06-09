import { signIn, signOut, useSession } from "next-auth/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {

  return (
    <Html data-theme="winter">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

