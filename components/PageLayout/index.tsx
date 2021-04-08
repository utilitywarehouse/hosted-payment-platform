import classNames from "classnames";
import Head from "next/head";
import React, { FunctionComponent } from "react";
import styles from "./styles.module.css";

interface PageLayoutProps {
  title: string;
  className?: string;
  isEmpty?: boolean;
}

export const PageLayout: FunctionComponent<PageLayoutProps> = ({
  children,
  title,
  isEmpty,
  className,
}) => (
  <div className={classNames(styles.container, className)}>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <script src="https://core.spreedly.com/iframe/iframe-v1.min.js" />
    </Head>
    {isEmpty ? null : children}
  </div>
);
