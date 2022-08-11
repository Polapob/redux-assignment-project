import { useEffect, ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { ThemeProvider, CssBaseline } from "@mui/material";

import createEmotionCache from "../utility/createEmotionCache";
import lightTheme from "../styles/theme/theme";
import "../styles/globals.css";
import { AppProps } from "next/app";
import store from "../src/store/store";
import { Provider } from "react-redux";

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (props: AppPropsWithLayout) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
/*
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp; */
