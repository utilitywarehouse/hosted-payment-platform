import { Grid } from "@material-ui/core";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { PaymentJourneySelection } from "../components/PaymentJourneySelection";
import { PaymentMethod } from "../components/PaymentMethod";
import { TertiaryButton } from "../components/TertiaryButton";
import ChevronLeftIcon from "../public/icons/small/chevron-left.svg";
import styles from "../styles/Home.module.css";

const NAME = "John Smith";
const FULL_DEBT_AMOUNT = 185.89;

export type PaymentJourneyType = "full" | "partial";

const Home = () => {
  const [
    paymentJourney,
    setPaymentJourney,
  ] = useState<PaymentJourneyType | null>();
  const [paymentAmount, setPaymentAmount] = useState<number>();

  useEffect(() => {
    if (paymentJourney === "full") {
      setPaymentAmount(FULL_DEBT_AMOUNT);
    }
  }, [paymentJourney]);

  const handleResetJourney = () => {
    setPaymentAmount(0);
    setPaymentJourney(null);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Debt Payment - UW</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <Grid container className={styles.grid}>
        <Grid item xs={12} md={4}>
          <h3 className={styles.greeting}>Hi {NAME}</h3>
          <h1 className={styles.heading}>Make a payment</h1>
          <hr className={styles.horizontalRule} />
          <p className={styles.safeAndSecure}>
            Our payment system is safe and secure.
          </p>
        </Grid>
        <Grid item xs={12} md={8}>
          <PaymentJourneySelection
            paymentJourney={paymentJourney}
            fullAmount={FULL_DEBT_AMOUNT}
            onPaymentJourneyChange={setPaymentJourney}
          />
          <PaymentMethod
            show={!!paymentAmount && paymentJourney !== "partial"}
          />
          <div className={styles.buttonsContainer}>
            {!!paymentJourney && (
              <TertiaryButton onClick={handleResetJourney}>
                <ChevronLeftIcon />
                Back
              </TertiaryButton>
            )}
            <Button size="large" disabled={!paymentJourney}>
              Continue
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
