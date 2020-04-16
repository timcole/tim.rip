import { AppProps } from "next/app";
import React, { FunctionComponent } from "react";

import { Layout } from "../components/layout";

import "isomorphic-fetch";

import "../global.css";
import { ThemeProvider } from "styled-components";

const theme = {
  background: "#242c39",
  darker: "#1f2734",
  accent: "#ffb53b",
  color: "#ffffff",
  grey: "#656d7a",
  error: "#bb3e3e",
};

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
