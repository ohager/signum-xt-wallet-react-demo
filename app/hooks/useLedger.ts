import {useMemo} from 'react';
import {useAppContext} from '@app/hooks/useAppContext';
import {useAppSelector} from '@app/hooks/useAppSelector';
import {selectWalletNodeHost} from '@app/states/walletState';
import {LedgerClientFactory} from '@signumjs/core';

export const useLedger = () => {
    const nodeHost = useAppSelector(selectWalletNodeHost)
    return useMemo(() => {
        if (!nodeHost) return null
        console.debug('Connected to new host', nodeHost)
        return LedgerClientFactory.createClient({nodeHost})
    }, [nodeHost])
}
