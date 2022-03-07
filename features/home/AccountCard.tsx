import styles from '@features/home/Home.module.css';
import {FC, useMemo} from 'react';
import {Address} from '@signumjs/core';
import {useNetworkMetadata} from '@app/hooks/useNetworkMetadata';
// @ts-ignore
import hashicon from "hashicon";

interface Props {
    publicKey: string;
}

export const AccountCard: FC<Props> = ({publicKey}) => {
    const {data} = useNetworkMetadata()

    const address = useMemo(() => {
        if (!data) return null;

        try {
            return Address.fromPublicKey(publicKey, data.addressPrefix)
        } catch (e) {
            console.error(e)
            return null
        }

    }, [publicKey, data])

    const iconUrl = useMemo(() => {
        if (!address) return "";
        return hashicon(address.getNumericId(), { size: 36 }).toDataURL();
    }, [address]);


    return address && (
        <div className={styles.card}>
            <div className={styles.account}>
                <img src={iconUrl} alt={`account-${address.getNumericId()}`}/>
                <code className={styles.code}>{address.getReedSolomonAddress()}</code>
            </div>
        </div>
    )

}
