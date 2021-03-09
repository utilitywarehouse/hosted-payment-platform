import classNames from "classnames";
import React, { FunctionComponent, HTMLAttributes } from "react";
import styles from "./styles.module.css";

export const TertiaryButton: FunctionComponent<
  HTMLAttributes<HTMLParagraphElement>
> = ({ children, className, ...rest }) => (
  <span className={classNames(styles.tertiaryButton, className)} {...rest}>
    {children}
  </span>
);
