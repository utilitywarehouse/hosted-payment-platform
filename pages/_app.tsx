import { ApolloProvider } from "@apollo/client";
import * as Sentry from "@sentry/react";
import mixpanel from "mixpanel-browser";
import getConfig from "next/config";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "../components/Layout";
import { use404Tracking } from "../hooks";
import { useApollo } from "../lib/apolloClient";
import store from "../store";
import "../styles/app.css";
import "../styles/globals.css";
import Oops from "./oops";

Sentry.init({
  dsn:
    "https://d278eedbda2548509dee9b37315cce37@o380586.ingest.sentry.io/5666398",
  environment: getConfig().publicRuntimeConfig?.NODE_ENV,
});

mixpanel.init(getConfig().publicRuntimeConfig?.MIXPANEL_TOKEN, {
  api_host: "https://api-eu.mixpanel.com",
  debug: getConfig().publicRuntimeConfig?.NODE_ENV !== "production",
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  use404Tracking();

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Sentry.ErrorBoundary fallback={Oops}>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Layout>
              <Component persistor={persistor} {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </Sentry.ErrorBoundary>
  );
}

App.getInitialProps = () => ({});

export default App;
