import classNames from "classnames";
import { FocusEvent, forwardRef, InputHTMLAttributes, useState } from "react";
import SuccessOutlinedIcon from "../../public/icons/small/success-outlined.svg";
import styles from "./styles.module.css";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  prefix?: string;
  isValid?: boolean;
  showSuccessIcon?: boolean;
}

export const InputWrapper = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      children,
      className,
      name,
      label,
      prefix,
      isValid,
      showSuccessIcon,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [focused, setFocused] = useState<boolean>(false);

    const hasLabel = Boolean(label);
    const hasPrefix = Boolean(prefix);

    const handleMouseEnter = () => {
      setHovered(true);
    };

    const handleMouseLeave = () => {
      setHovered(false);
    };

    const handleFocus = () => {
      setFocused(true);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      if (typeof onBlur === "function") {
        onBlur(event);
      }
    };

    const renderLabel = () =>
      hasLabel ? <label htmlFor={name}>{label}</label> : null;

    const renderPrefix = () =>
      hasPrefix ? <span className={styles.prefix}>{prefix}</span> : null;

    const renderSuffix = () =>
      !!showSuccessIcon && isValid ? (
        <span className={styles.suffix}>
          <SuccessOutlinedIcon />
        </span>
      ) : null;

    return (
      <div
        className={classNames(
          {
            [styles.withLabel]: hasLabel,
            [styles.withoutLabel]: !hasLabel,
            [styles.hovered]: hovered,
            [styles.focused]: focused,
            [styles.prefixed]: hasPrefix,
            [styles.isValid]: isValid,
          },
          className
        )}
        {...rest}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
      >
        {renderLabel()}
        {renderPrefix()}
        {children}
        {renderSuffix()}
        {!!label && <hr />}
      </div>
    );
  }
);
