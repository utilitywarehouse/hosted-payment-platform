import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../../components/Button";
import { PageLayout } from "../../components/PageLayout";
import { useAccountNumber } from "../../hooks/useAccountNumber";
import { useTracking } from "../../hooks/useTracking";
import IceCreamImage from "../../public/ice-cream.svg";
import styles from "./styles.module.css";

const Error = () => {
  const { trackEvent } = useTracking();
  const { encodedAccountNumber } = useAccountNumber();

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
          <Link href={`/?id=${encodedAccountNumber}`}>
            <Button size="large">Try again</Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default Error;
