import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import "../styles/globals.css"
import PasswordUpdatedModal from "../components/auth/PasswordUpdatedModal";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();


  return (
    <SessionProvider session={pageProps.session}>
        <PasswordUpdatedModal />
        <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
