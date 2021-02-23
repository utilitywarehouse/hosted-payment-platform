import { CleaveOptions } from "cleave.js/options";
import Cleave from "cleave.js/react";
import React, { forwardRef, InputHTMLAttributes } from "react";
import { InputWrapper } from "./InputWrapper";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prefix?: string;
  cleaveOptions?: CleaveOptions;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, label, prefix, cleaveOptions, ...rest }, ref) =>
    Boolean(label) ? (
      <InputWrapper
        className={className}
        name={name}
        label={label}
        prefix={prefix}
      >
        {!!cleaveOptions ? (
          <Cleave id={name} name={name} options={cleaveOptions} {...rest} />
        ) : (
          <input id={name} name={name} {...rest} />
        )}
      </InputWrapper>
    ) : (
      <InputWrapper className={className} prefix={prefix}>
        <input id={name} name={name} ref={ref} {...rest} />
      </InputWrapper>
    )
);
