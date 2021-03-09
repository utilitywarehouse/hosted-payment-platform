import { useLazyQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { CreditCardType } from "cleave.js/options/creditCard";
import { isAfter, parse } from "date-fns";
import { Base64 } from "js-base64";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ContinueButtons } from "../components/ContinueButtons";
import { PageLayout } from "../components/PageLayout";
import { PaymentJourneySelection } from "../components/PaymentJourneySelection";
import { PaymentMethod } from "../components/PaymentMethod";
import { GET_ACCOUNT } from "../gql/query";
import {
  GetAccountResponseInterface,
  GetAccountVariablesInterface,
} from "../gql/types";
import { useWindowSize } from "../hooks";
import { useTracking } from "../hooks/useTracking";
import styles from "../styles/Home.module.css";
import { getIpAddress } from "../utils/ip";

const ACCEPTED_CARD_TYPES: CreditCardType[] = ["visa", "mastercard", "maestro"];
const SPREEDLY_URL = `https://core.spreedly.com/v1/payment_methods.json?environment_key=${process.env.SPREEDLY_ENVIRONMENT_KEY}`;

export type PaymentJourneyType = "full" | "partial" | null;

const Home = () => {
  const router = useRouter();
  const { isPhone } = useWindowSize();
  const trackEvent = useTracking();

  const queryString = router.query["id"] as string;

  const [getAccount, { data, error }] = useLazyQuery<
    GetAccountResponseInterface,
    GetAccountVariablesInterface
  >(GET_ACCOUNT);

  const [ip, setIp] = useState<string>();
  const [paymentJourney, setPaymentJourney] = useState<PaymentJourneyType>();
  const [paymentAmount, setPaymentAmount] = useState<number>();
  const [name, setName] = useState<string>("");
  const [cardType, setCardType] = useState<CreditCardType>();
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [securityCode, setSecurityCode] = useState<string>("");
  const [isCardValid, setIsCardValid] = useState<boolean>(false);
  const [isExpiryDateValid, setIsExpiryDateValid] = useState<boolean>(false);
  const [isSecurityCodeValid, setIsSecurityCodeValid] = useState<boolean>(
    false
  );

  const overdueBalance = data?.getAccount.overdueBalance.value;

  const getAccountNumber = () => {
    try {
      return queryString ? decodeURIComponent(Base64.atob(queryString)) : "";
    } catch (error) {
      router.push("/404");
    }
  };

  const setIpAddress = async () => {
    const ipAddress = await getIpAddress();
    setIp(ipAddress);
  };

  if (error) {
    router.push("/404");
  }

  useEffect(() => {
    if (!window.location.search) {
      router.replace("https://uw.co.uk");
    }
    setIpAddress();
  }, []);

  useEffect(() => {
    const accountNumber = getAccountNumber();
    if (!!accountNumber) {
      getAccount({ variables: { accountNumber } });
    }
  }, [queryString]);

  useEffect(() => {
    const balance = Number(overdueBalance);
    if (!!balance) {
      trackEvent("payments-page-viewed", { overdue_balance: balance });
    }
  }, [overdueBalance]);

  useEffect(() => {
    setIsCardValid(cardNumber.split(" ").join("").length === 16);
  }, [cardNumber]);

  useEffect(() => {
    setIsExpiryDateValid(
      expiryDate.length === 5 &&
        isAfter(parse(expiryDate, "MM/yy", new Date()), new Date())
    );
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
    setName("");
  };

  const handleSubmit = async () => {
    const [month, yearShort] = expiryDate.split("/");

    try {
      const { data } = await axios.post(SPREEDLY_URL, {
        payment_method: {
          credit_card: {
            full_name: name,
            number: cardNumber.split(" ").join(""),
            verification_value: securityCode,
            month,
            year: `20${yearShort}`,
          },
        },
      });

      if (data?.transaction.succeeded) {
        trackEvent("payments-method-confirmed", { card_type: cardType });
        router.push(
          getSummaryUrl(
            data?.transaction.payment_method.token,
            data?.transaction.payment_method.last_four_digits
          )
        );
      }
    } catch (error) {
      router.push(`/oops?id=${Base64.btoa(getAccountNumber())}`);
    }
  };

  const getSummaryUrl = (token: string, lastFourDigits: string) => {
    const amount = paymentAmount?.toFixed(2);
    const queryString = `${getAccountNumber()},${
      data?.getAccount.accountId
    },${cardType},${overdueBalance},${amount},${lastFourDigits},${token},${ip}`;
    const base64QueryString = Base64.btoa(queryString);
    const encodedQueryString = encodeURIComponent(base64QueryString);
    return `/summary?q=${encodedQueryString}`;
  };

  return (
    <PageLayout title="Debt payment - UW">
      <Grid container className={styles.grid}>
        <Grid item xs={12} lg={4}>
          <h3 className={styles.greeting}>
            Hi {data?.getAccount.customerFirstName}
          </h3>
          <h1 className={styles.heading}>Make a payment</h1>
          <hr className={styles.horizontalRule} />
        </Grid>
        <Grid item xs={12} lg={8}>
          <PaymentJourneySelection
            overdueBalance={Number(overdueBalance)}
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
            <Button
              size="large"
              disabled={!isReadyToProceed}
              onClick={handleSubmit}
              fullWidth={isPhone}
            >
              Continue
            </Button>
          </ContinueButtons>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default Home;
