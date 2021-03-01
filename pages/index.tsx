import { Grid } from "@material-ui/core";
import { CreditCardType } from "cleave.js/options/creditCard";
import { Base64 } from "js-base64";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ContinueButtons } from "../components/ContinueButtons";
import { PageLayout } from "../components/PageLayout";
import { PaymentJourneySelection } from "../components/PaymentJourneySelection";
import { PaymentMethod } from "../components/PaymentMethod";
import styles from "../styles/Home.module.css";

const NAME = "John Smith";
const OVERDUE_BALANCE = 185.89;
const LAST_FOUR_DIGITS = "1234";

const ACCEPTED_CARD_TYPES: CreditCardType[] = ["visa", "mastercard"];

export type PaymentJourneyType = "full" | "partial" | null;

const Home = () => {
  const [paymentJourney, setPaymentJourney] = useState<PaymentJourneyType>();
  const [paymentAmount, setPaymentAmount] = useState<number>();
  const [name, setName] = useState<string>();
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
    !!paymentJourney &&
    paymentAmount &&
    isCardValid &&
    isExpiryDateValid &&
    isSecurityCodeValid;

  const handleEdit = () => {
    setPaymentJourney(null);
    setPaymentAmount(0);
    setCardNumber("");
    setCardType(null);
    setExpiryDate("");
    setSecurityCode("");
  };

  const getSummaryUrl = () => {
    const amount = paymentAmount?.toFixed(2);
    const queryString = `${OVERDUE_BALANCE},${amount},${LAST_FOUR_DIGITS}`;
    const base64QueryString = Base64.btoa(queryString);
    const encodedQueryString = encodeURIComponent(base64QueryString);
    return `/summary?q=${encodedQueryString}`;
  };

  return (
    <PageLayout title="Debt Payment - UW">
      <Grid container className={styles.grid}>
        <Grid item xs={12} md={4}>
          <h3 className={styles.greeting}>Hi {NAME}</h3>
          <h1 className={styles.heading}>Make a payment</h1>
          <hr className={styles.horizontalRule} />
        </Grid>
        <Grid item xs={12} md={8}>
          <PaymentJourneySelection
            fullAmount={OVERDUE_BALANCE}
            paymentJourney={paymentJourney}
            paymentAmount={paymentAmount}
            onPaymentJourneyChange={setPaymentJourney}
            onPaymentAmountChange={setPaymentAmount}
            onEdit={handleEdit}
          />
          <PaymentMethod
            show={!!paymentAmount}
            name={name}
            cardNumber={cardNumber}
            cardType={cardType}
            expiryDate={expiryDate}
            securityCode={securityCode}
            isCardValid={isCardValid}
            isCardTypeValid={isCardTypeValid}
            isExpiryDateValid={isExpiryDateValid}
            isSecurityCodeValid={isSecurityCodeValid}
            onNameChange={setName}
            onCardNumberChange={setCardNumber}
            onCardTypeChange={setCardType}
            onExpiryDateChange={setExpiryDate}
            onSecurityCodeChange={setSecurityCode}
          />
        </Grid>
        <Grid item xs={12}>
          <ContinueButtons>
            <Link href={getSummaryUrl()}>
              <Button size="large" disabled={!isReadyToProceed}>
                Continue
              </Button>
            </Link>
          </ContinueButtons>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default Home;
