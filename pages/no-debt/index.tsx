import React from "react";
import { PageLayout } from "../../components/PageLayout";
import AwardImage from "../../public/award.svg";
import styles from "./styles.module.css";

const NoDebt = () => (
  <PageLayout title="No outstanding debt - UW">
    <div className={styles.container}>
      <div className={styles.card}>
        <AwardImage />
        <h2>Good news!</h2>
        <p>
          You don't currently have any outstanding debt on your account to pay.
        </p>
        <p>
          Remember, you can keep up to date with your monthly bills via the UW
          app, logging in to your account online or by setting up a Direct Debit
        </p>
      </div>
    </div>
  </PageLayout>
);

export default NoDebt;
