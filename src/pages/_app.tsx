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

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
    const Layout = layouts[Component.layout ?? 'default'] || ((children) => <>{children}</>);

    return <CacheProvider value={emotionCache}><ThemeProvider theme={theme}> <Layout><Component {...pageProps} /> </Layout> </ThemeProvider></CacheProvider>
}
