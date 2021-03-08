import { ApolloProvider } from '@apollo/client';
import * as Sentry from "@sentry/react";
import React from 'react';
import Layout from '../components/Layout';
import { useApollo } from '../lib/apolloClient';
import '../styles/app.css';
import '../styles/globals.css';

Sentry.init({
  dsn: "https://d278eedbda2548509dee9b37315cce37@o380586.ingest.sentry.io/5666398",
  environment: process.env.NODE_ENV,
});

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  React.useEffect(() => {
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

export default App;
