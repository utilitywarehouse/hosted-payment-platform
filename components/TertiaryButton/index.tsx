import classNames from "classnames";
import React, { FunctionComponent, HTMLAttributes } from "react";
import styles from "./styles.module.css";

interface TertiaryButtonProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  target?: string;
}

export const TertiaryButton: FunctionComponent<TertiaryButtonProps> = ({
  children,
  className,
  href,
  target,
  ...rest
}) => (
  <span className={classNames(styles.tertiaryButton, className)} {...rest}>
    {href ? (
      <a href={href} target={target} className={styles.link}>
        {children}
      </a>
    ) : (
      children
    )}
  </span>
);
