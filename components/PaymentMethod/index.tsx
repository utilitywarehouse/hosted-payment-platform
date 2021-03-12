import { Collapse } from "@material-ui/core";
import classNames from "classnames";
import { CreditCardType } from "cleave.js/options/creditCard";
import Cleave from "cleave.js/react";
import React, { ChangeEvent, FunctionComponent, useRef } from "react";
import MaestroIcon from "../../public/icons/small/maestro.svg";
import MasterCardIcon from "../../public/icons/small/mastercard.svg";
import VisaIcon from "../../public/icons/small/visa.svg";
import { Input } from "../Input";
import { InputWrapper } from "../InputWrapper";
import styles from "./styles.module.css";

interface PaymentMethodProps {
  show: boolean;
  name: string;
  cardNumber: string;
  cardType: CreditCardType;
  expiryDate: string;
  securityCode: string;
  isCardValid: boolean;
  isCardTypeValid: boolean;
  isExpiryDateValid: boolean;
  isSecurityCodeValid: boolean;
  onNameChange: (name: string) => void;
  onCardNumberChange: (cardNumber: string) => void;
  onCardTypeChange: (cardType: CreditCardType) => void;
  onExpiryDateChange: (expiryDate: string) => void;
  onSecurityCodeChange: (securityCode: string) => void;
}

export const PaymentMethod: FunctionComponent<PaymentMethodProps> = ({
  show,
  name,
  cardNumber,
  cardType,
  expiryDate,
  securityCode,
  isCardValid,
  isCardTypeValid,
  isExpiryDateValid,
  isSecurityCodeValid,
  onNameChange,
  onCardNumberChange,
  onCardTypeChange,
  onExpiryDateChange,
  onSecurityCodeChange,
}) => {
  const expiryDateInput = useRef<HTMLInputElement>();
  const securityCodeInput = useRef<HTMLInputElement>();

  const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCardNumberChange(event.target.value);
    if (event.target.value.length === 19) {
      expiryDateInput.current.focus();
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onNameChange(event.target.value);
  };

  const handleExpiryDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    onExpiryDateChange(event.target.value);
    if (event.target.value.length === 5) {
      securityCodeInput.current.focus();
    }
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
      <Collapse in={show} className={styles.collapse}>
        <Input
          className={styles.cardInput}
          label="Name on card"
          value={name}
          isValid={!!name?.trim()}
          showSuccessIcon={true}
          showErrorIcon={true}
          onChange={handleNameChange}
          autoFocus={true}
          errorMessage={!name?.trim() && "Invalid cardholder name"}
        />
        <InputWrapper
          className={styles.cardInput}
          label="Card number"
          isValid={isCardValid}
          errorMessage={!isCardValid && "Invalid card number"}
        >
          <Cleave
            placeholder="16 digits"
            value={cardNumber}
            onChange={handleCardNumberChange}
            options={{
              creditCard: true,
              onCreditCardTypeChanged: onCardTypeChange,
            }}
          />
          <div
            className={classNames(styles.acceptedCards, {
              [styles.invalid]: !isCardTypeValid,
            })}
          >
            {!isCardTypeValid && (
              <>
                <VisaIcon />
                <MasterCardIcon />
                <MaestroIcon />
              </>
            )}
            {cardType === "visa" && <VisaIcon />}
            {cardType === "mastercard" && <MasterCardIcon />}
            {cardType === "maestro" && <MaestroIcon />}
          </div>
        </InputWrapper>
        <div className={styles.cardDetailsContainer}>
          <Input
            label="Expiry date"
            placeholder="e.g. 01/23"
            value={expiryDate}
            isValid={isExpiryDateValid}
            showSuccessIcon={true}
            showErrorIcon={true}
            cleaveOptions={{ date: true, datePattern: ["m", "y"] }}
            onChange={handleExpiryDateChange}
            errorMessage={!isExpiryDateValid && "Invalid expiry date"}
            ref={expiryDateInput}
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
            showErrorIcon={true}
            showSuccessIcon={true}
            onChange={handleSecurityCodeChange}
            errorMessage={!isSecurityCodeValid && "Invalid CV number"}
            ref={securityCodeInput}
          />
        </div>
      </Collapse>
    </section>
  );
};
