import { Grid } from "@material-ui/core";
import { CreditCardType } from "cleave.js/options/creditCard";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { PaymentJourneySelection } from "../components/PaymentJourneySelection";
import { PaymentMethod } from "../components/PaymentMethod";
import LockIcon from "../public/icons/large/lock.svg";
import styles from "../styles/Home.module.css";

const NAME = "John Smith";
const FULL_DEBT_AMOUNT = 185.89;

const ACCEPTED_CARD_TYPES: CreditCardType[] = ["visa", "mastercard"];

export type PaymentJourneyType = "full" | "partial" | null;

const Home = () => {
  const [paymentJourney, setPaymentJourney] = useState<PaymentJourneyType>();
  const [paymentAmount, setPaymentAmount] = useState<number>();
  const [cardType, setCardType] = useState<CreditCardType>();
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [securityCode, setSecurityCode] = useState<string>("");
  const [isCardValid, setIsCardValid] = useState<boolean>(false);
  const [isExpiryDateValid, setIsExpiryDateValid] = useState<boolean>(false);
  const [isSecurityCodeValid, setIsSecurityCodeValid] = useState<boolean>(
    false
  );

  useEffect(() => {
    if (paymentJourney === "full") {
      setPaymentAmount(FULL_DEBT_AMOUNT);
    }
  }, [paymentJourney]);

  useEffect(() => {
    setIsCardValid(cardNumber.split(" ").join("").length === 16);
  }, [cardNumber]);

  useEffect(() => {
    setIsExpiryDateValid(expiryDate.length === 5);
  }, [expiryDate]);

  useEffect(() => {
    setIsSecurityCodeValid(
      securityCode.length === 3 && /^[0-9]*$/.test(securityCode)
    );
  }, [securityCode]);

  const isCardTypeValid = ACCEPTED_CARD_TYPES.includes(cardType);

  const isReadyToProceed =
    !!paymentJourney && isCardValid && isExpiryDateValid && isSecurityCodeValid;

  const handleEdit = () => {
    setPaymentJourney(null);
    setPaymentAmount(0);
    setCardNumber("");
    setCardType(null);
    setExpiryDate("");
    setSecurityCode("");
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
          <div className={styles.safeAndSecureMessage}>
            <LockIcon />
            <p className={styles.safeAndSecure}>
              Our payment system is safe and secure.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <PaymentJourneySelection
            paymentJourney={paymentJourney}
            fullAmount={FULL_DEBT_AMOUNT}
            onPaymentJourneyChange={setPaymentJourney}
            onPaymentAmountChange={() => {}}
            onEdit={handleEdit}
          />
          <PaymentMethod
            show={!!paymentAmount && paymentJourney === "full"}
            cardNumber={cardNumber}
            cardType={cardType}
            expiryDate={expiryDate}
            securityCode={securityCode}
            isCardValid={isCardValid}
            isCardTypeValid={isCardTypeValid}
            isExpiryDateValid={isExpiryDateValid}
            isSecurityCodeValid={isSecurityCodeValid}
            onCardNumberChange={setCardNumber}
            onCardTypeChange={setCardType}
            onExpiryDateChange={setExpiryDate}
            onSecurityCodeChange={setSecurityCode}
          />
          <div className={styles.buttonsContainer}>
            <Button size="large" disabled={!isReadyToProceed}>
              Continue
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
