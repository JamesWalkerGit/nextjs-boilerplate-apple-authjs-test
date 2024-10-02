'use client';
import Image from "next/image";
import { StyleSheet } from "./styles/Stylesheet";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const styles = createStyles();
  const session = useSession();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div style={styles.container}>

          {session?.status !== 'authenticated' ?
            <>
              <button
                style={styles.button}
                onClick={() => {
                  signIn('github');
                }}>
                🧑‍💻 Github Login
              </button>

              <button
                style={styles.button}
                onClick={() => {
                  signIn('apple');
                }}>
                🍎 Apple Login
              </button>
            </>
            : null
          }

          {session?.data?.user ? <>Logged in as: {session?.data?.user?.email}</> : null}

          {session?.status === 'authenticated' ?
            <>
              <button
                style={styles.button}
                onClick={() => {
                  signOut()
                }}>
                ⬅️ Sign Out
              </button>
            </>
            : null
          }

        </div>
      </main>
    </div>
  );
}

const createStyles = () => {
  return StyleSheet.create({
    button: {
      backgroundColor: 'white',
      color: 'black',
      width: 100,
      margin: 5
    },
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
  });
}