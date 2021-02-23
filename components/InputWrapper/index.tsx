import classNames from "classnames";
import { FocusEvent, forwardRef, InputHTMLAttributes, useState } from "react";
import styles from "./styles.module.css";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  prefix?: string;
}

export const InputWrapper = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ children, className, name, label, prefix, onBlur, ...rest }, ref) => {
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

    const renderPrefix = () => (hasPrefix ? <span>{prefix}</span> : null);

    return (
      <div
        className={classNames(
          {
            [styles.withLabel]: hasLabel,
            [styles.withoutLabel]: !hasLabel,
            [styles.hovered]: hovered,
            [styles.focused]: focused,
            [styles.prefixed]: hasPrefix,
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
        {!!label && <hr />}
      </div>
    );
  }
);
