import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button } from "../../components/Button";
import { PageLayout } from "../../components/PageLayout";
import { useTracking } from "../../hooks/useTracking";
import IceCreamImage from "../../public/ice-cream.svg";
import styles from "./styles.module.css";

const Error = () => {
  const router = useRouter();
  const trackEvent = useTracking();

  const queryString = (router.query["id"] as string) || "";

  useEffect(() => {
    trackEvent("payments-failure-page-viewed");
  }, []);

  return (
    <PageLayout title="Oops - UW">
      <div className={styles.container}>
        <div className={styles.card}>
          <IceCreamImage />
          <h2>Oops, something went wrong</h2>
          <p>
            That payment didn’t go through. But don’t worry, please check your
            card details or use a different payment method and try again.
          </p>
          <Link href={`/?id=${queryString}`}>
            <Button size="large">Try again</Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Error;
