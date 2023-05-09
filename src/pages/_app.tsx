import createEmotionCache from "@/utility/createEmotionCache";
import theme from "@/utility/theme";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
    return <CacheProvider value={emotionCache}><ThemeProvider theme={theme}><Component {...pageProps} />  </ThemeProvider></CacheProvider>
}
