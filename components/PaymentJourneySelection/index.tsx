import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "../../hooks";
import { useTracking } from "../../hooks/useTracking";
import { PaymentJourneyType } from "../../pages";
import EditIcon from "../../public/icons/small/edit.svg";
import { formatGBP } from "../../utils/currency";
import { Button } from "../Button";
import { InfoMessage } from "../InfoMessage";
import { Input } from "../Input";
import { TertiaryButton } from "../TertiaryButton";
import styles from "./styles.module.css";

interface PaymentJourneySelectionProps {
  overdueBalance: number;
  paymentJourney: PaymentJourneyType;
  paymentAmount: number;
  onPaymentJourneyChange: (paymentJourney: PaymentJourneyType) => void;
  onPaymentAmountChange: (paymentAmount: number) => void;
  onEdit: () => void;
}

export const PaymentJourneySelection: React.FC<PaymentJourneySelectionProps> = ({
  overdueBalance,
  paymentJourney,
  paymentAmount,
  onPaymentJourneyChange,
  onPaymentAmountChange,
  onEdit,
}) => {
  const { isPhone } = useWindowSize();
  const { trackEvent } = useTracking();

  const [partialAmount, setPartialAmount] = useState<number>(0);

  useEffect(() => {
    setPartialAmount(paymentAmount);
  }, [paymentAmount]);

  const handleSelectFullPayment = () => {
    onPaymentJourneyChange("full");
    onPaymentAmountChange(overdueBalance);
    trackEvent("payments-amount-selected", { full_amount: true });
    trackEvent("payments-amount-confirmed", { amount: overdueBalance });
  };

  const handleSelectPartialPayment = () => {
    onPaymentJourneyChange("partial");
    trackEvent("payments-amount-selected", { full_amount: false });
  };

  const handlePartialAmountChange = (event: any) => {
    setPartialAmount(Number(event.target.rawValue));
  };

  const handleConfirmPartialAmount = () => {
    onPaymentAmountChange(partialAmount);
    trackEvent("payments-amount-confirmed", { amount: partialAmount });
  };

  const isPartialAmountValid = partialAmount >= 5;

  const renderEditButton = () =>
    isPhone ? (
      <div className={styles.mobileEditIcon} onClick={onEdit}>
        <EditIcon />
      </div>
    ) : (
      <TertiaryButton onClick={onEdit}>
        <EditIcon />
        Edit
      </TertiaryButton>
    );

  const renderJourney = () => {
    switch (paymentJourney) {
      case "full":
        return (
          <>
            <div className={styles.amountSelectedContainer}>
              <h3>Full amount of {formatGBP(overdueBalance)}</h3>
              {renderEditButton()}
            </div>
            <InfoMessage>
              <p>
                This amount only includes the debt on your account, and may not
                include other recent bills added to your account.
              </p>
            </InfoMessage>
          </>
        );
      case "partial":
        return (
          <>
            {!!paymentAmount ? (
              <div className={styles.amountSelectedContainer}>
                <h3>Partial amount of {formatGBP(paymentAmount)}</h3>
                {renderEditButton()}
              </div>
            ) : (
              <>
                <h4>Enter payment amount</h4>
                <small>How much can you afford to pay?</small>
                <Input
                  className={styles.partialAmountInput}
                  label="Payment amount"
                  placeholder="0.00"
                  prefix="£"
                  autoFocus={true}
                  type="number"
                  name="paymentAmount"
                  cleaveOptions={{
                    numeral: true,
                    numeralThousandsGroupStyle: "thousand",
                    onValueChanged: handlePartialAmountChange,
                  }}
                  onChange={handlePartialAmountChange}
                />
                <div className={styles.partialAmountInputHelp}>£5 minimum</div>
                <Button
                  styling="secondary"
                  size="regular"
                  disabled={!isPartialAmountValid}
                  onClick={handleConfirmPartialAmount}
                >
                  Confirm amount
                </Button>
              </>
            )}
            <InfoMessage className={styles.partialAmountInfoMessage}>
              <p>We recommend you pay off the full debt on your account.</p>
              <p>
                If the full debt isn’t cleared, your services may be suspended
                (if not already) and won’t be switched on again until the full
                debt is paid.
              </p>
            </InfoMessage>
          </>
        );
      default:
        return (
          <>
            <h4>Payment amount</h4>
            <p className={styles.subheading}>How much would you like to pay?</p>
            <div className={styles.cardsContainer}>
              <div
                className={classNames(styles.card, styles.fullAmountCard)}
                onClick={handleSelectFullPayment}
              >
                <p>Full amount</p>
                <p className={styles.fullAmount}>{formatGBP(overdueBalance)}</p>
              </div>
              {overdueBalance > 5 && (
                <div
                  className={classNames(styles.card, styles.partialAmountCard)}
                  onClick={handleSelectPartialPayment}
                >
                  <p>Other amount</p>
                </div>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <section className={styles.amountSelection}>
      {renderJourney()}
      {!paymentJourney && (
        <InfoMessage>
          {overdueBalance <= 5 ? (
            <p>
              This amount only includes the debt on your account, and may not
              include other recent bills added to your account.
            </p>
          ) : (
            <>
              <p>We recommend you pay off the full debt on your account.</p>
              <p>
                If the full debt isn’t cleared, your services may be suspended
                (if not already) and won’t be switched on again until the full
                debt is paid.
              </p>
            </>
          )}
        </InfoMessage>
      )}
    </section>
  );
};
