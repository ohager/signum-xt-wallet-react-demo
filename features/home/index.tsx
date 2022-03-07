import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './Home.module.css'
import {useAppSelector} from '@app/hooks/useAppSelector';
import {selectWalletState} from '@app/states/walletState';
import {requestWalletConnection} from '@app/requestWalletConnection';
import {AccountCard} from '@features/home/AccountCard';
import {HostCard} from '@features/home/HostCard';
import {SendTestMessageCard} from '@features/home/SendTestMessageCard';

export const Home: NextPage = () => {
    const {isWalletConnected, walletPublicKey, walletNodeHost} = useAppSelector(selectWalletState)

    const connectWallet = () => {
        requestWalletConnection()
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Signum DApp</title>
                <meta name="description" content="My awesome Signum DApp"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://signum.network">Signum!</a>
                </h1>

                {isWalletConnected
                    ? (
                        <div className={styles.description}>
                            <p>
                                Yay! You are connected to XT Wallet
                            </p>
                        </div>
                    )
                    : (
                        <div className={styles.description}>
                            <p>
                                You are not connected to XT Wallet
                            </p>
                            <button type="button" className={styles.button} onClick={connectWallet}>
                                Connect Wallet
                            </button>
                        </div>
                    )
                }

                <div className={styles.grid}>
                    {walletPublicKey && <AccountCard publicKey={walletPublicKey}/>}
                    {walletNodeHost && <HostCard url={walletNodeHost}/>}
                    {isWalletConnected && <SendTestMessageCard/>}
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://signum.network"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src="/poweredbysignum.svg" alt="Powered by Signum Logo" width={128} height={48}/>
                    <Image src="/signumjs.svg" alt="SignumJS Logo" width={42} height={42}/>
                </a>
            </footer>
        </div>
    )
}
