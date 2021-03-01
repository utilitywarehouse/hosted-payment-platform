import React, { FunctionComponent } from "react";
import LockIcon from "../../public/icons/large/lock.svg";
import styles from "./styles.module.css";

export const ContinueButtons: FunctionComponent = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.safeAndSecureMessage}>
      <LockIcon />
      <p className={styles.safeAndSecure}>
        Our payment system is safe and secure.
      </p>
    </div>
    <div className={styles.buttonsContainer}>{children}</div>
  </div>
);
