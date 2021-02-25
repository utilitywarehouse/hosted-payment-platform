import React from "react";
import { PaymentJourneyType } from "../../pages";
import EditIcon from "../../public/icons/small/edit.svg";
import { formatGBP } from "../../utils/currency";
import { InfoMessage } from "../InfoMessage";
import { TertiaryButton } from "../TertiaryButton";
import styles from "./styles.module.css";

interface PaymentJourneySelectionProps {
  fullAmount: number;
  paymentJourney: PaymentJourneyType;
  onPaymentJourneyChange: (paymentJourney: PaymentJourneyType) => void;
  onPaymentAmountChange: (paymentAmount: number) => void;
  onEdit: () => void;
}

export const PaymentJourneySelection: React.FC<PaymentJourneySelectionProps> = ({
  fullAmount,
  paymentJourney,
  onPaymentJourneyChange,
  onPaymentAmountChange,
  onEdit,
}) => {
  const renderJourney = () => {
    switch (paymentJourney) {
      case "full":
        return (
          <>
            <div className={styles.fullAmountHeadingContainer}>
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
        return <div>Other amount</div>;
      default:
        return (
          <>
            <h4>Payment amount</h4>
            <p className={styles.subheading}>How much would you like to pay?</p>
            <div className={styles.cardsContainer}>
              <div
                className={styles.card}
                onClick={() => {
                  onPaymentJourneyChange("full");
                }}
              >
                <p>Full amount</p>
                <p className={styles.fullAmount}>{formatGBP(fullAmount)}</p>
              </div>
              <div
                className={styles.card}
                onClick={() => {
                  onPaymentJourneyChange("partial");
                }}
              >
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
