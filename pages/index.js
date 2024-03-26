import React, { Children } from "react";

import SignupFrom from "./Components/SignupFrom";
import { useSession, signIn, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

import Layout from "./Layout";
export default function Home() {
  const { data: session } = useSession();
  return <Layout>Signed in as {session?.user.email}</Layout>;
}
