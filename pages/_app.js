import { ApolloProvider } from '@apollo/client';
import * as Sentry from "@sentry/react";
import mixpanel from "mixpanel-browser";
import getConfig from 'next/config';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { use404Tracking } from '../hooks/use404Tracking';
import { useApollo } from '../lib/apolloClient';
import '../styles/app.css';
import '../styles/globals.css';

Sentry.init({
  dsn: "https://d278eedbda2548509dee9b37315cce37@o380586.ingest.sentry.io/5666398",
  environment: getConfig().publicRuntimeConfig?.NODE_ENV,
});

mixpanel.init(getConfig().publicRuntimeConfig?.MIXPANEL_TOKEN, {
  api_host: "https://api-eu.mixpanel.com",
  debug: getConfig().publicRuntimeConfig?.NODE_ENV !== "production",
});

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  use404Tracking();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

App.getInitialProps = () => ({});

export default App;
