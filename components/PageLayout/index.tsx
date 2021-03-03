import Head from "next/head";
import React, { FunctionComponent } from "react";
import styles from "./styles.module.css";

interface PageLayoutProps {
  title: string;
}

export const PageLayout: FunctionComponent<PageLayoutProps> = ({
  children,
  title,
}) => (
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <script src="https://core.spreedly.com/iframe/iframe-v1.min.js" />
    </Head>
    {children}
  </div>
);
