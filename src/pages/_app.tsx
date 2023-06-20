'use client'

import '@/core/theme/scss/index.scss';
import '@/styles/globals.css';

import DefaultLayout from '@/layouts/default';
import EmptyLayout from '@/layouts/empty';
import createEmotionCache from "@/utility/createEmotionCache";
import theme from "@/utility/theme";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";

const layouts = {
    default: DefaultLayout,
    empty: EmptyLayout
}

const clientSideEmotionCache = createEmotionCache();

// const router = useRouter();

// useEffect(() => {
//     const handleRouteChange = (url, { shallow }) => {
//         console.log(
//             `App is changing to ${url} ${shallow ? 'with' : 'without'
//             } shallow routing`,
//         );
//     };

//     router.events.on('routeChangeStart', handleRouteChange);

//     // If the component is unmounted, unsubscribe
//     // from the event with the `off` method:
//     return () => {
//         router.events.off('routeChangeStart', handleRouteChange);
//     };
// }, [router]);

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
    const Layout = layouts[Component.layout ?? 'default'] || ((children) => <>{children}</>);

    return <CacheProvider value={emotionCache}><ThemeProvider theme={theme}> <Layout><Component {...pageProps} /> </Layout> </ThemeProvider></CacheProvider>
}
