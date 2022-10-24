import styles from '@features/home/Home.module.css';
import {useCallback, useState} from 'react';
import {Address} from '@signumjs/core';
import {useLedger} from '@app/hooks/useLedger';
import {useExtensionWallet} from '@app/hooks/useExtensionWallet';
import {useAppContext} from '@app/hooks/useAppContext';

export const SendEncryptedMessageCard = () => {
    const ledger = useLedger()
    const wallet = useExtensionWallet()
    const [isSending, setIsSending] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const {Ledger} = useAppContext()

    const sendTestMessage = useCallback(async () => {
        if (!ledger || !wallet || !wallet.connection) return;

        try {
            setIsSending(true)
            setTransactionId('')
            const address = Address.fromPublicKey(wallet.connection?.publicKey || '')
            const {transactionId: txId} = await wallet.sendEncryptedMessage({
                message: 'This message is encrypted',
                recipientPublicKey: address.getPublicKey()
            })
            setTransactionId(txId);
            alert('Successfully sent encrypted message')
        } catch (e: any) {
            console.error(e)
            alert(`Oh no, something failed: ${e.message}`)
        } finally {
            setIsSending(false)
        }

    }, [ledger, wallet])

    return (
        <div className={styles.card}>
            <div style={{display: 'flex', flexDirection: 'column', textAlign:'center'}}>
                <button type="button" className={styles.button} onClick={sendTestMessage} disabled={isSending}>
                    {isSending ? "Sending message..." : "🔒 Send Encrypted Message"}
                </button>
                {transactionId &&
                  <a className={styles.link} href={`${Ledger.Explorer}/tx/${transactionId}`} target='_blank'
                     rel="noopener noreferrer">See in
                    Explorer </a>
                }
            </div>
        </div>
    )

}
