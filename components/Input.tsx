import { CleaveOptions } from "cleave.js/options";
import Cleave from "cleave.js/react";
import React, { forwardRef, InputHTMLAttributes } from "react";
import { InputWrapper } from "./InputWrapper";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefix?: string;
  isValid?: boolean;
  errorMessage?: string;
  showSuccessIcon?: boolean;
  showErrorIcon?: boolean;
  cleaveOptions?: CleaveOptions;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      name,
      label,
      prefix,
      isValid,
      errorMessage,
      showSuccessIcon,
      showErrorIcon,
      cleaveOptions,
      ...rest
    },
    ref
  ) =>
    Boolean(label) ? (
      <InputWrapper
        className={className}
        name={name}
        label={label}
        prefix={prefix}
        isValid={isValid}
        errorMessage={errorMessage}
        showSuccessIcon={showSuccessIcon}
        showErrorIcon={showErrorIcon}
      >
        {!!cleaveOptions ? (
          <Cleave
            id={name}
            name={name}
            options={cleaveOptions}
            htmlRef={(r) => ((ref as any).current = r)}
            {...rest}
          />
        ) : (
          <input id={name} name={name} ref={ref} {...rest} />
        )}
      </InputWrapper>
    ) : (
      <InputWrapper className={className} prefix={prefix}>
        <input id={name} name={name} ref={ref} {...rest} />
      </InputWrapper>
    )
);
