import React, { useEffect } from "react";
import { PageLayout } from "../../components/PageLayout";
import { TertiaryButton } from "../../components/TertiaryButton";
import { useTracking } from "../../hooks/useTracking";
import ThinkingImage from "../../public/thinking.svg";
import styles from "./styles.module.css";

const PaymentFailed = () => {
  const trackEvent = useTracking();

  useEffect(() => {
    trackEvent("payments-unknown-outcome-page-viewed");
  }, []);

  return (
    <PageLayout title="Payment failed - UW">
      <div className={styles.container}>
        <div className={styles.card}>
          <ThinkingImage />
          <h2>There may be an issue processing your payment</h2>
          <p>
            Please don’t try again though as there’s a chance that your payment
            has already gone through.
          </p>
          <p>
            Please call us on{" "}
            <TertiaryButton href="tel:03337773215">
              0333 777 3215
            </TertiaryButton>{" "}
            so that we can check this for you.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentFailed;
