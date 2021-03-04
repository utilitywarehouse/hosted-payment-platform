import classNames from "classnames";
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import DropdownIcon from "../../public/icons/small/dropdown.svg";
import styles from "./styles.module.css";

type ButtonSize = "large" | "regular" | "small";
type ButtonStyling = "primary" | "secondary";
type ButtonTheme = "light" | "dark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  styling?: ButtonStyling;
  theme?: ButtonTheme;
  toggleable?: boolean;
  isOpen?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "regular",
      styling = "primary",
      theme = "light",
      toggleable,
      isOpen,
      children,
      className,
      ...rest
    },
    ref
  ) => (
    <button
      className={classNames(
        styles.button,
        styles[size],
        styles[styling],
        styles[theme],
        className,
        { [styles.isOpen]: isOpen }
      )}
      ref={ref}
      {...rest}
    >
      {children}
      {toggleable && <DropdownIcon className={styles.dropdownIcon} />}
    </button>
  )
);
