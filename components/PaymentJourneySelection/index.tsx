import React, { useEffect, useState } from "react";
import { PaymentJourneyType } from "../../pages";
import EditIcon from "../../public/icons/small/edit.svg";
import { formatGBP } from "../../utils/currency";
import { Button } from "../Button";
import { InfoMessage } from "../InfoMessage";
import { Input } from "../Input";
import { TertiaryButton } from "../TertiaryButton";
import styles from "./styles.module.css";

interface PaymentJourneySelectionProps {
  fullAmount: number;
  paymentJourney: PaymentJourneyType;
  paymentAmount: number;
  onPaymentJourneyChange: (paymentJourney: PaymentJourneyType) => void;
  onPaymentAmountChange: (paymentAmount: number) => void;
  onEdit: () => void;
}

export const PaymentJourneySelection: React.FC<PaymentJourneySelectionProps> = ({
  fullAmount,
  paymentJourney,
  paymentAmount,
  onPaymentJourneyChange,
  onPaymentAmountChange,
  onEdit,
}) => {
  const [partialAmount, setPartialAmount] = useState<number>(0);

  useEffect(() => {
    setPartialAmount(paymentAmount);
  }, [paymentAmount]);

  const handleSelectFullPayment = () => {
    onPaymentJourneyChange("full");
    onPaymentAmountChange(fullAmount);
  };

  const handleSelectPartialPayment = () => {
    onPaymentJourneyChange("partial");
  };

  const handlePartialAmountChange = (event: any) => {
    setPartialAmount(Number(event.target.rawValue));
  };

  const handleConfirmPartialAmount = () => {
    onPaymentAmountChange(partialAmount);
  };

  const isPartialAmountValid = partialAmount >= 5;

  const renderJourney = () => {
    switch (paymentJourney) {
      case "full":
        return (
          <>
            <div className={styles.amountSelectedContainer}>
              <p>Full amount of {formatGBP(fullAmount)}</p>
              <TertiaryButton onClick={onEdit}>
                <EditIcon />
                Edit
              </TertiaryButton>
            </div>
            <InfoMessage>
              <p>
                This amount only includes the overdue amount, and may not
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
                <p>Partial amount of {formatGBP(paymentAmount)}</p>
                <TertiaryButton onClick={onEdit}>
                  <EditIcon />
                  Edit
                </TertiaryButton>
              </div>
            ) : (
              <>
                <h4>Enter payment amount</h4>
                <small>How much would you like to pay?</small>
                <Input
                  className={styles.partialAmountInput}
                  label="Payment amount"
                  placeholder="0.00"
                  prefix="£"
                  autoFocus={true}
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
                and won’t be switched on again until the total overdue balance
                is paid.
              </p>
              <p>
                If you’d like to set up a payment plan, please call our Member
                Services team on 0333 777 0 777."
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
              <div className={styles.card} onClick={handleSelectFullPayment}>
                <p>Full amount</p>
                <p className={styles.fullAmount}>{formatGBP(fullAmount)}</p>
              </div>
              <div className={styles.card} onClick={handleSelectPartialPayment}>
                <p>Other amount</p>
              </div>
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
          <p>
            To avoid any disruption to your services, we recommend you paying
            the full outstanding amount on your account.
          </p>
        </InfoMessage>
      )}
    </section>
  );
};
