import React from "react";
import { PageLayout } from "../../components/PageLayout";
import { TertiaryButton } from "../../components/TertiaryButton";
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
          Remember, you can keep up to date with your monthly bills via the{" "}
          <TertiaryButton href="https://uwclubhouse.page.link/app">
            UW app
          </TertiaryButton>
          , logging in to{" "}
          <TertiaryButton href="https://uw.co.uk/login?redirect_back=https://uw.co.uk/clubhouse/myServices">
            your account
          </TertiaryButton>{" "}
          online or by setting up a{" "}
          <TertiaryButton href="http://uw.link/direct-debit-set-up">
            Direct Debit
          </TertiaryButton>
          .
        </p>
      </div>
    </div>
  </PageLayout>
);

export default NoDebt;
