import type { NextPage } from "next";
import { useAppSelector } from "@app/hooks/useAppSelector";
import { selectWalletState } from "@app/states/walletState";
import { requestWalletConnection } from "@app/requestWalletConnection";
import { AccountCard } from "./components/AccountCard";
import { AccountTypeCard } from "./components/AccountTypeCard";
import { HostCard } from "./components/HostCard";
import { SendTestMessageCard } from "./components/SendTestMessageCard";
import { SendEncryptedMessageCard } from "./components/SendEncryptedMessageCard";

import Head from "next/head";
import Image from "next/image";

import styles from "./Home.module.css";

export const Home: NextPage = () => {
  const { isWalletConnected, walletPublicKey, walletNodeHost, watchOnly } =
    useAppSelector(selectWalletState);

  const connectWallet = () => {
    requestWalletConnection();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Signum DApp</title>
        <meta name="description" content="My awesome Signum DApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://signum.network">
            <u>Signum!</u>
          </a>
        </h1>

        {isWalletConnected ? (
          <div className={styles.description}>
            <p>Yay! You are connected to XT Wallet</p>
          </div>
        ) : (
          <div className={styles.description}>
            <p>You are not connected to XT Wallet</p>
            <button
              type="button"
              className={styles.button}
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </div>
        )}

        <div className={styles.grid} style={{ flexDirection: "column" }}>
          {walletPublicKey && <AccountCard publicKey={walletPublicKey} />}

          {isWalletConnected && <AccountTypeCard watchOnly={watchOnly} />}

          {walletNodeHost && <HostCard url={walletNodeHost} />}

          {isWalletConnected && !watchOnly && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <SendTestMessageCard />
              <SendEncryptedMessageCard />
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://signum.network"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/poweredbysignum.svg"
            alt="Powered by Signum Logo"
            width={128}
            height={48}
          />
          <Image
            src="/signumjs.svg"
            alt="SignumJS Logo"
            width={42}
            height={42}
          />
        </a>
      </footer>
    </div>
  );
};
