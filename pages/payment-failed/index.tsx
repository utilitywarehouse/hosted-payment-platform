import React from "react";
import { PageLayout } from "../../components/PageLayout";
import ThinkingImage from "../../public/thinking.svg";
import styles from "./styles.module.css";

const PaymentFailed = () => {
  return (
    <PageLayout title="Payment failed - UW">
      <div className={styles.container}>
        <div className={styles.card}>
          <ThinkingImage />
          <h2>We’re having trouble processing your payment</h2>
          <p>
            There’s a chance that your payment has already gone through. Please
            call us on 0800&nbsp;xxx&nbsp;xxxx so that we can check this for
            you.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentFailed;