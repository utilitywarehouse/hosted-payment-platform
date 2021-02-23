import React, { FunctionComponent, HTMLAttributes } from "react";
import styles from "./styles.module.css";

export const TertiaryButton: FunctionComponent<
  HTMLAttributes<HTMLParagraphElement>
> = ({ children, ...rest }) => (
  <p className={styles.tertiaryButton} {...rest}>
    {children}
  </p>
);
