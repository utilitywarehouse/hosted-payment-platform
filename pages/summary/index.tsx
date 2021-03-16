import { useMutation } from "@apollo/client";
import { Backdrop, Fade, Grid, Modal } from "@material-ui/core";
import { CreditCardType } from "cleave.js/options/creditCard";
import { Base64 } from "js-base64";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button";
import { ContinueButtons } from "../../components/ContinueButtons";
import { InfoMessage } from "../../components/InfoMessage";
import { PageLayout } from "../../components/PageLayout";
import { TertiaryButton } from "../../components/TertiaryButton";
import { MAKE_PAYMENT } from "../../gql/mutation";
import {
  MakePaymentResponseInterface,
  MakePaymentVariablesInterface,
} from "../../gql/types";
import { useWindowSize } from "../../hooks";
import { useTracking } from "../../hooks/useTracking";
import LeftChevronIcon from "../../public/icons/small/chevron-left.svg";
import LoadingGif from "../../public/loading.gif";
import TickGif from "../../public/tick.gif";
import { getBrowserInfo } from "../../utils/browser";
import { formatGBP } from "../../utils/currency";
import { getHost } from "../../utils/host";
import { uuid } from "../../utils/uuid";
import styles from "./styles.module.css";

const PAYMENT_TIMEOUT = 64000; // 64 seconds

const PaymentSummary = () => {
  const router = useRouter();
  const { isPhone } = useWindowSize();
  const trackEvent = useTracking();
  const timer = useRef() || { current: 0 as any };

  const queryString = (router.query["q"] as string) || "";
  const decodedQueryString = decodeURIComponent(Base64.atob(queryString));
  const [
    accountNumber,
    accountId,
    cardType,
    overdueBalance,
    paymentAmount,
    lastFourDigits,
    externalPaymentToken,
    ip,
  ] = decodedQueryString.split(",");

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);

  const balanceAfterPayment = Number(overdueBalance) - Number(paymentAmount);

  const [makePayment, { loading, error }] = useMutation<
    MakePaymentResponseInterface,
    MakePaymentVariablesInterface
  >(MAKE_PAYMENT, {
    onCompleted: ({ makePayment: { success } }) => {
      clearTimeout(timer.current);
      if (success) {
        setPaymentConfirmed(true);
        setTimeout(() => {
          router.push("/success");
        }, 2000);
      } else {
        redirectToErrorPage();
      }
    },
  });

  const redirectToErrorPage = () => {
    router.push(`/oops?id=${Base64.btoa(accountNumber)}`);
  };

  const handlePayment = () => {
    trackEvent("payments-payment-submitted", {
      card_type: cardType as CreditCardType,
      required_amount: Number(overdueBalance),
      paid_amount: Number(paymentAmount),
    });

    timer.current = setTimeout(() => {
      redirectToErrorPage();
    }, PAYMENT_TIMEOUT);

    makePayment({
      variables: {
        accountReference: `//uw.co.uk/customer/account-number/${accountNumber}`,
        accountId,
        externalPaymentToken,
        clientFingerprint: getBrowserInfo(),
        redirectUrl: getHost(),
        correlationId: uuid(),
        ip,
        amount: {
          currency: "GBP",
          value: paymentAmount,
        },
      },
    });
  };

  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    }
  }, [loading]);

  if (error) {
    redirectToErrorPage();
  }

  const getLoadingImage = () => (paymentConfirmed ? TickGif : LoadingGif);

  const getPaymentMessage = () =>
    paymentConfirmed ? "Payment confirmed" : "Processing payment";

  return (
    <>
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
      <Modal
        className={styles.modal}
        open={showLoader}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showLoader}>
          <div className={styles.paper}>
            <img src={getLoadingImage()} width={100} />
            <p>{getPaymentMessage()}</p>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default PaymentSummary;
