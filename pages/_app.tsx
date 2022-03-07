import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {AppContextProvider} from '@app/contexts/AppContext';
import {AppInitializer} from '@app/components/AppInitializer';
import {Provider as ReduxProvider} from "react-redux";
import {isClientSide} from '@app/isClientSide';
import {store} from '@app/states/store';

function App({Component, pageProps}: AppProps) {
    return (
        <AppContextProvider>
            <ReduxProvider store={store}>
                {isClientSide()
                    ? (<>
                            <AppInitializer/>
                            <Component {...pageProps} />
                        </>
                    )
                    : <Component {...pageProps} />
                }
            </ReduxProvider>
        </AppContextProvider>
    )
}

export default App
