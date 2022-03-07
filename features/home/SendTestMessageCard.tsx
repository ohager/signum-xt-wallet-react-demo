import styles from '@features/home/Home.module.css';
import {FC, useCallback, useMemo, useState} from 'react';
import {Address, UnsignedTransaction} from '@signumjs/core';
import {useNetworkMetadata} from '@app/hooks/useNetworkMetadata';
// @ts-ignore
import hashicon from "hashicon";
import {useLedger} from '@app/hooks/useLedger';
import {useExtensionWallet} from '@app/hooks/useExtensionWallet';
import {Amount} from '@signumjs/util';

export const SendTestMessageCard = () => {
    const ledger = useLedger()
    const wallet = useExtensionWallet()
    const [isSending, setIsSending] = useState(false)


    const sendTestMessage = useCallback(async () => {
        if (!ledger || !wallet || !wallet.connection) return;

        try {
            setIsSending(true)
            const address = Address.fromPublicKey(wallet.connection?.publicKey || '')
            const {unsignedTransactionBytes} = await ledger.message.sendMessage({
                message: "This is a test message from the XT Demo DApp",
                feePlanck: Amount.fromSigna(0.01).getPlanck(),
                messageIsText: true,
                senderPublicKey: address.getPublicKey(),
                recipientId: address.getNumericId(),
            }) as UnsignedTransaction

            await wallet.confirm(unsignedTransactionBytes)
            alert('Sent sucessfully')
        } catch (e: any) {
            console.error(e)
            alert(`Oh no, something failed: ${e.message}`)
        } finally {
            setIsSending(false)
        }

    }, [ledger, wallet])

    return (
        <div className={styles.card}>
            <button type="button" className={styles.button} onClick={sendTestMessage} disabled={isSending}>
                {isSending ? "Sending message..." : "Send a Test Message"}
            </button>
        </div>
    )

}
