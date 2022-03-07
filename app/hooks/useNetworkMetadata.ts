import {useLedger} from '@app/hooks/useLedger';
import useSWR from 'swr'

export const useNetworkMetadata = () => {
    const ledger = useLedger();
    return useSWR(ledger ? `networkMetaInformation-${ledger.service.settings.nodeHost}` : null, async () => {
        if(!ledger) return null;
        return ledger.network.getNetworkInfo()
    })
}
