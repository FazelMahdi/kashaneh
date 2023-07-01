import "@/core/theme/scss/index.scss";
import "@/styles/globals.css";

import DefaultLayout from "@/layouts/default";
import EmptyLayout from "@/layouts/empty";
import createEmotionCache from "@/utility/createEmotionCache";
import theme from "@/utility/theme";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import useLoading from "@/components/utils/useLoading";
import Image from "next/image";

const layouts = {
  default: DefaultLayout,
  empty: EmptyLayout,
};

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

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const router = useRouter();
  const isLoading = useLoading();
  const Layout =
    layouts[Component.layout ?? "default"] || ((children) => <>{children}</>);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {" "}
        <Layout>
          {isLoading ? (
            <div className="text-center mt-10">
              <div className="mx-auto text-center rounded-xl py-10">
                <Image
                  src="/loading.gif"
                  alt="کاشانه"
                  width={80}
                  height={80}
                  priority
                  className="mx-auto mb-3"
                />
                <p className="font-extrabold text-center text-orange-800 mb-2">
                  کارخانه آجر کاشانه
                </p>
                <span className="font-light">در حال بارگزاری</span>{" "}
              </div>
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>{" "}
      </ThemeProvider>
    </CacheProvider>
  );
}
