import { useMutation } from "@apollo/client";
import classNames from "classnames";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CONTINUE_3DS_PAYMENT } from "../../gql/mutation";
import {
  Continue3DSPaymentResponseInterface,
  Continue3DSPaymentVariablesInterface,
} from "../../gql/types";
import { usePayment } from "../../pages/paymentSlice";
import {
  updateExternalTransactionToken,
  useSummary,
} from "../../pages/summary/summarySlice";
import LoadingGif from "../../public/loading.gif";
import { Loader } from "../Loader";
import styles from "./styles.module.css";

interface ThreeDSChallengeProps {}

interface ThreeDSStatusEventInterface {
  action: ThreeDSActionType;
}

type ThreeDSActionType =
  | "challenge"
  | "error"
  | "finalization-timeout"
  | "succeeded";

const HIDDEN_IFRAME_ID = "device-fingerprint";
const CHALLENGE_IFRAME_ID = "challenge-container";

export const ThreeDSChallenge: FunctionComponent<ThreeDSChallengeProps> = ({
  children,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    correlationId,
    accountReference,
    externalTransactionToken,
  } = useSummary();

  const { accountId, accountNumber, paymentAmount } = usePayment();

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showChallenge, setShowChallenge] = useState<boolean>(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);

  const [continuePayment, { loading }] = useMutation<
    Continue3DSPaymentResponseInterface,
    Continue3DSPaymentVariablesInterface
  >(CONTINUE_3DS_PAYMENT, {
    onCompleted: ({ continueChallengedPayment: { success } }) => {
      if (success) {
        setPaymentConfirmed(true);
        setTimeout(() => {
          setShowLoader(false);
          setPaymentConfirmed(false);
          router.push("/success");
        }, 1400);
      } else {
        router.push(`/oops?id=${encodeURIComponent(btoa(accountNumber))}`);
      }
    },
    onError: () => {
      router.push(`/payment-failed`);
    },
  });

  const handleStatusUpdate = async ({
    action,
  }: ThreeDSStatusEventInterface) => {
    const commonVariables: Omit<
      Continue3DSPaymentVariablesInterface,
      "continue"
    > = {
      correlationId,
      accountReference,
      accountId,
      externalTransactionToken,
      amount: { currency: "GBP", value: String(paymentAmount) },
    };

    const optimisticResponse: Continue3DSPaymentResponseInterface = {
      continueChallengedPayment: {
        success: false,
        failureCode: "FAILURE_INVALID_PAYMENT_METHOD",
        internalTransactionToken: "",
        paymentMethod: null,
        __typename: "ContinuePayment",
      },
    };

    switch (action) {
      case "succeeded":
        dispatch(updateExternalTransactionToken(null));
        continuePayment({
          variables: {
            ...commonVariables,
            continue: true,
          },
        });
        break;
      case "error":
        setShowLoader(false);
        dispatch(updateExternalTransactionToken(null));
        continuePayment({
          optimisticResponse,
          variables: {
            ...commonVariables,
            continue: false,
          },
        });
        break;
      case "finalization-timeout":
        setShowLoader(false);
        dispatch(updateExternalTransactionToken(null));
        continuePayment({
          optimisticResponse,
          variables: {
            ...commonVariables,
            continue: false,
          },
        });
        break;
      case "challenge":
        setShowChallenge(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!externalTransactionToken) return;

    const lifecycle = new window.Spreedly.ThreeDS.Lifecycle({
      environmentKey: getConfig().publicRuntimeConfig?.SPREEDLY_ENVIRONMENT_KEY,
      hiddenIframeLocation: HIDDEN_IFRAME_ID,
      challengeIframeLocation: CHALLENGE_IFRAME_ID,
      transactionToken: externalTransactionToken,
      challengeIframeClasses: styles.challengeIframe,
    });

    lifecycle.start();

    window.Spreedly.on("3ds:status", handleStatusUpdate);

    return () => {
      window.Spreedly.removeHandlers();
    };
  }, [externalTransactionToken]);

  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    }
  }, [loading]);

  return (
    <div className={styles.container}>
      <div
        id={HIDDEN_IFRAME_ID}
        className={classNames({ [styles.hidden]: !showChallenge })}
      />
      <div
        id={CHALLENGE_IFRAME_ID}
        className={classNames(styles.challengeModal, {
          [styles.hidden]: !showChallenge,
        })}
      />
      <Loader show={showLoader} done={paymentConfirmed}>
        {paymentConfirmed ? "Payment confirmed" : "Processing payment"}
      </Loader>
      {showChallenge ? (
        <div className={styles.loading3ds}>
          <img src={LoadingGif} width={100} />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
