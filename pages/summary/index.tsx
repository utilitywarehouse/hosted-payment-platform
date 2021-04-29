import { useMutation } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { CreditCardType } from "cleave.js/options/creditCard";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../components/Button";
import { ContinueButtons } from "../../components/ContinueButtons";
import { InfoMessage } from "../../components/InfoMessage";
import { Loader } from "../../components/Loader";
import { PageLayout } from "../../components/PageLayout";
import { TertiaryButton } from "../../components/TertiaryButton";
import { ThreeDSChallenge } from "../../components/ThreeDSChallenge";
import { MAKE_PAYMENT } from "../../gql/mutation";
import {
  MakePaymentResponseInterface,
  MakePaymentVariablesInterface,
} from "../../gql/types";
import { useTracking, useWindowSize } from "../../hooks";
import LeftChevronIcon from "../../public/icons/small/chevron-left.svg";
import { getBrowserInfo } from "../../utils/browser";
import { formatGBP } from "../../utils/currency";
import { getHost } from "../../utils/host";
import { uuid } from "../../utils/uuid";
import { usePayment } from "../paymentSlice";
import styles from "./styles.module.css";
import {
  updateAccountReference,
  updateCorrelationId,
  updateExternalTransactionToken,
} from "./summarySlice";

const PAYMENT_TIMEOUT = 64000; // 64 seconds

const PaymentSummary = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isPhone } = useWindowSize();
  const { trackEvent } = useTracking();

  const {
    accountId,
    accountNumber,
    cardType,
    externalPaymentToken,
    ip,
    lastFourDigits,
    overdueBalance,
    paymentAmount,
  } = usePayment();

  const timer = useRef() || { current: 0 as any };

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);

  const balanceAfterPayment = overdueBalance - paymentAmount;

  const [makePayment, { loading, error }] = useMutation<
    MakePaymentResponseInterface,
    MakePaymentVariablesInterface
  >(MAKE_PAYMENT, {
    onCompleted: ({ makePayment: { success, requiredAction } }) => {
      clearTimeout(timer.current);
      if (success) {
        setPaymentConfirmed(true);
        setTimeout(() => {
          router.push("/success");
        }, 2000);
      } else if (!!requiredAction) {
        setShowLoader(false);
        dispatch(
          updateExternalTransactionToken(
            requiredAction.externalTransactionToken
          )
        );
      } else {
        router.push(`/oops?id=${encodeURIComponent(btoa(accountNumber))}`);
      }
    },
    onError: async () => {
      clearTimeout(timer.current);
      router.push(`/payment-failed`);
    },
  });

  const handlePayment = () => {
    const correlationId = uuid();
    const accountReference = `//uw.co.uk/customer/account-number/${accountNumber}`;

    dispatch(updateCorrelationId(correlationId));
    dispatch(updateAccountReference(accountReference));

    trackEvent("payments-payment-submitted", {
      card_type: cardType as CreditCardType,
      required_amount: Number(overdueBalance),
      paid_amount: Number(paymentAmount),
    });

    timer.current = setTimeout(() => {
      router.push(`/payment-failed`);
    }, PAYMENT_TIMEOUT);

    makePayment({
      variables: {
        ip,
        accountId,
        correlationId,
        accountReference,
        externalPaymentToken,
        clientFingerprint: getBrowserInfo(),
        redirectUrl: getHost(),
        amount: { currency: "GBP", value: String(paymentAmount) },
      },
    });
  };

  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    }
  }, [loading]);

  if (error) {
    router.push(`/payment-failed`);
  }

  return (
    <ThreeDSChallenge>
      <PageLayout title="Payment summary - UW">
        <Grid container className={styles.grid}>
          <Grid item xs={12}>
            <h1 className={styles.title}>Payment summary</h1>
            <span className={styles.subtitle}>
              Please check and confirm payment
            </span>
          </Grid>
          <Grid item md={1} />
          <Grid item xs={12} md={10}>
            <div className={styles.cardTop}>
              <div className={styles.item}>
                <span>Overdue balance</span>
                <span>{formatGBP(Number(overdueBalance))}</span>
              </div>
              <hr className={styles.divider} />
              <div className={styles.item}>
                <span>Payment amount of:</span>
                <span>{formatGBP(Number(paymentAmount))}</span>
              </div>
              <div className={styles.cardNumber}>
                <span>Card number:</span>
                <span>xxxx xxxx xxxx {lastFourDigits}</span>
              </div>
            </div>
            <div className={styles.cardBottom}>
              <span>Overdue balance after payment:</span>
              <span className={styles.outstandingBalanceAfterPayment}>
                {formatGBP(balanceAfterPayment)}
              </span>
            </div>
            {balanceAfterPayment > 0 && (
              <InfoMessage className={styles.summaryInfo}>
                <p>
                  Please remember, if the full debt isn’t cleared, your services
                  may be suspended and won’t be switched on again until the
                  total overdue balance is paid.
                </p>
              </InfoMessage>
            )}
          </Grid>
          <ContinueButtons>
            <div className={styles.continueButtonsContainer}>
              <TertiaryButton
                className={styles.backButton}
                onClick={() => {
                  router.back();
                }}
              >
                <LeftChevronIcon /> Back
              </TertiaryButton>
              <Button
                size="large"
                onClick={handlePayment}
                className={styles.confirmButton}
                fullWidth={isPhone}
              >
                Confirm payment
              </Button>
            </div>
          </ContinueButtons>
        </Grid>
      </PageLayout>
      <Loader show={showLoader} done={paymentConfirmed}>
        {paymentConfirmed ? "Payment confirmed" : "Processing payment"}
      </Loader>
    </ThreeDSChallenge>
  );
};

export default PaymentSummary;
