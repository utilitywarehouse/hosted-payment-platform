import { useLazyQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { CreditCardType } from "cleave.js/options/creditCard";
import { isAfter, parse } from "date-fns";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Persistor } from "redux-persist/es/types";
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
import { useIp, useTracking, useWindowSize } from "../hooks";
import styles from "../styles/Home.module.css";
import {
  updateAccountId,
  updateAccountNumber,
  updateCardType,
  updateExternalPaymentToken,
  updateLastFourDigits,
  updateOverdueBalance,
  updatePaymentAmount,
} from "./paymentSlice";

interface HomeProps {
  persistor: Persistor;
}

const ACCEPTED_CARD_TYPES: CreditCardType[] = ["visa", "mastercard", "maestro"];
const SPREEDLY_URL = `https://core.spreedly.com/v1/payment_methods.json?environment_key=${
  getConfig().publicRuntimeConfig?.SPREEDLY_ENVIRONMENT_KEY
}`;

export type PaymentJourneyType = "full" | "partial" | null;

const Home: FunctionComponent<HomeProps> = ({ persistor }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isPhone } = useWindowSize();
  const { identify, trackEvent } = useTracking();

  useIp();

  const [getAccount, { data }] = useLazyQuery<
    GetAccountResponseInterface,
    GetAccountVariablesInterface
  >(GET_ACCOUNT, {
    onCompleted: ({ getAccount: { accountId, overdueBalance } }) => {
      const overdue = parseFloat(overdueBalance.value);
      setOverdueBalance(overdue);
      dispatch(updateAccountId(accountId));
      dispatch(updateOverdueBalance(overdue));
    },
    onError: () => {
      router.push("/404");
    },
  });

  const [accountNumber, setAccountNumber] = useState<string>();
  const [paymentJourney, setPaymentJourney] = useState<PaymentJourneyType>();
  const [overdueBalance, setOverdueBalance] = useState<number>();
  const [paymentAmount, setPaymentAmount] = useState<number>();
  const [name, setName] = useState<string>("");
  const [cardType, setCardType] = useState<CreditCardType>();
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [securityCode, setSecurityCode] = useState<string>("");

  useEffect(() => {
    persistor.purge();
  }, []);

  useEffect(() => {
    if (!!router.query && !router.query["id"]) {
      router.replace("https://uw.co.uk");
      return;
    }

    const encodedAccountNumber = router.query["id"] as string;
    const account = decodeURIComponent(atob(encodedAccountNumber));

    if (!!account) {
      setAccountNumber(account);
      dispatch(updateAccountNumber(account));
      getAccount({ variables: { accountNumber: account } });
    }
  }, [router.query]);

  useEffect(() => {
    if (typeof overdueBalance === "number") {
      identify(accountNumber);
      trackEvent("payments-page-viewed", {
        overdue_balance: overdueBalance,
      });

      if (overdueBalance <= 0) {
        router.push("/no-debt");
      }
    }
  }, [overdueBalance]);

  const isCardTypeValid = ACCEPTED_CARD_TYPES.includes(cardType);

  const isCardValid =
    cardNumber.split(" ").join("").length === 16 &&
    ACCEPTED_CARD_TYPES.includes(cardType);

  const isExpiryDateValid =
    expiryDate.length === 5 &&
    isAfter(parse(expiryDate, "MM/yy", new Date()), new Date());

  const isSecurityCodeValid =
    securityCode.length === 3 && /^[0-9]*$/.test(securityCode);

  const isReadyToProceed =
    !!paymentJourney &&
    paymentAmount &&
    !!name.trim() &&
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

      dispatch(updateCardType(cardType));
      dispatch(updatePaymentAmount(paymentAmount));
      dispatch(
        updateExternalPaymentToken(data?.transaction.payment_method.token)
      );
      dispatch(
        updateLastFourDigits(data?.transaction.payment_method.last_four_digits)
      );

      if (data?.transaction.succeeded) {
        trackEvent("payments-method-confirmed", { card_type: cardType });
        router.push("/summary");
      }
    } catch (error) {
      router.push(`/oops?id=${encodeURIComponent(btoa(accountNumber))}`);
    }
  };

  return (
    <PageLayout title="Debt payment - UW">
      <Grid container className={styles.grid}>
        <Grid item xs={12} lg={4}>
          <h3 className={styles.greeting}>
            Hi {data?.getAccount.accountLabel}
          </h3>
          <h1 className={styles.heading}>Make a payment</h1>
          <hr className={styles.horizontalRule} />
        </Grid>
        <Grid item xs={12} lg={8}>
          <PaymentJourneySelection
            overdueBalance={overdueBalance}
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
