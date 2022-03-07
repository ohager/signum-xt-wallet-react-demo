import styles from '@features/home/Home.module.css';
import {FC} from 'react';
import {useNetworkMetadata} from '@app/hooks/useNetworkMetadata';
import {useAppContext} from '@app/hooks/useAppContext';

interface Props {
    url: string;
}

export const HostCard: FC<Props> = ({url}) => {
    const {Ledger} = useAppContext()
    const {data} = useNetworkMetadata()

    return (
        <div style={{flexDirection: 'column'}}>
            <p className={styles.card}>
                <div style={{flexDirection: 'row'}}>

                    <small className={styles.badge}>{data?.networkName}</small>
                    <code className={styles.code}>{url}</code>
                </div>
            </p>
            {Ledger.Network !== data?.networkName &&
              <small className={styles.error}>This DApp does not operate on this network</small>
            }
        </div>
    )
}
