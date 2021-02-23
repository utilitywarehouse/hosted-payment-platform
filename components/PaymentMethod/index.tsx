import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { Input } from "../Input";
import styles from "./styles.module.css";

interface PaymentMethodProps {
  show: boolean;
}

export const PaymentMethod: FunctionComponent<PaymentMethodProps> = ({
  show,
}) => {
  return (
    <section
      className={classNames(styles.paymentMethod, {
        [styles.show]: show,
      })}
    >
      <h4>Payment method</h4>
      {show && (
        <>
          <Input
            label="Card number"
            placeholder="16 digits"
            cleaveOptions={{ creditCard: true }}
            className={classNames(styles.cardInput, ".input-card-number")}
          />
          <div className={styles.cardDetailsContainer}>
            <Input
              label="Expiry date"
              placeholder="e.g. 01/23"
              cleaveOptions={{ date: true, datePattern: ["m", "y"] }}
            />
            <Input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              label="CV number"
              placeholder="3 digits"
              maxLength={3}
            />
          </div>
        </>
      )}
    </section>
  );
};
