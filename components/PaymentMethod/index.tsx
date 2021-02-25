import classNames from "classnames";
import { CreditCardType } from "cleave.js/options/creditCard";
import Cleave from "cleave.js/react";
import React, { ChangeEvent, FunctionComponent } from "react";
import MasterCardIcon from "../../public/icons/small/mastercard.svg";
import VisaIcon from "../../public/icons/small/visa.svg";
import { Input } from "../Input";
import { InputWrapper } from "../InputWrapper";
import styles from "./styles.module.css";

interface PaymentMethodProps {
  show: boolean;
  cardNumber: string;
  cardType: CreditCardType;
  expiryDate: string;
  securityCode: string;
  isCardValid: boolean;
  isCardTypeValid: boolean;
  isExpiryDateValid: boolean;
  isSecurityCodeValid: boolean;
  onCardNumberChange: (cardNumber: string) => void;
  onCardTypeChange: (cardType: CreditCardType) => void;
  onExpiryDateChange: (expiryDate: string) => void;
  onSecurityCodeChange: (securityCode: string) => void;
}

export const PaymentMethod: FunctionComponent<PaymentMethodProps> = ({
  show,
  cardNumber,
  cardType,
  expiryDate,
  securityCode,
  isCardValid,
  isCardTypeValid,
  isExpiryDateValid,
  isSecurityCodeValid,
  onCardNumberChange,
  onCardTypeChange,
  onExpiryDateChange,
  onSecurityCodeChange,
}) => {
  const handleExpiryDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    onExpiryDateChange(event.target.value);
  };

  const handleSecurityCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSecurityCodeChange(event.target.value);
  };

  return (
    <section
      className={classNames(styles.paymentMethod, {
        [styles.show]: show,
      })}
    >
      <h4>Payment method</h4>
      {show && (
        <>
          <InputWrapper
            className={styles.cardInput}
            label="Card number"
            isValid={isCardValid}
          >
            <Cleave
              placeholder="16 digits"
              value={cardNumber}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onCardNumberChange(event.target.value);
              }}
              options={{
                creditCard: true,
                onCreditCardTypeChanged: onCardTypeChange,
              }}
            />
            <div className={styles.acceptedCards}>
              {!isCardTypeValid && (
                <>
                  <VisaIcon />
                  <MasterCardIcon />
                </>
              )}
              {cardType === "visa" && <VisaIcon />}
              {cardType === "mastercard" && <MasterCardIcon />}
            </div>
          </InputWrapper>
          <div className={styles.cardDetailsContainer}>
            <Input
              label="Expiry date"
              placeholder="e.g. 01/23"
              value={expiryDate}
              isValid={isExpiryDateValid}
              showSuccessIcon={true}
              cleaveOptions={{ date: true, datePattern: ["m", "y"] }}
              onChange={handleExpiryDateChange}
            />
            <Input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              label="CV number"
              placeholder="3 digits"
              maxLength={3}
              value={securityCode}
              isValid={isSecurityCodeValid}
              showSuccessIcon={true}
              onChange={handleSecurityCodeChange}
            />
          </div>
        </>
      )}
    </section>
  );
};
