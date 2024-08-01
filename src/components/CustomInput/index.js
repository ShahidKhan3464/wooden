import React from "react";
import ErrorMsg from "../ErrorMessage";
import { Field, ErrorMessage } from "formik";
import { CustomInputContaienr, NumberIcon } from "./style";

const Index = (props) => {
  const {
    label,
    type,
    name,
    prefix,
    disabled,
    maxLength,
    className,
    placeholder,
    defaultValue,
    increment,
    decrement,
    onKeyPress,
    formik,
    ...rest
  } = props;


  // console.log(defaultValue, 'defaultValue');
  return (
    <CustomInputContaienr>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name}>
        {({ field }) => (
          <>
            <input
              readonly
              {...rest}
              {...field}
              type={type}
              name={name}
              disabled={disabled}
              // onKeyPress={onKeyPress}
              maxLength={maxLength}
              className={className}
              placeholder={placeholder}
              onfocus="this.removeAttribute('readonly');"
            />
            {type === 'number' &&
              <NumberIcon>
                <button type="button" onClick={() => increment(name, formik)}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.53596 1.56721C5.79224 1.31093 6.20776 1.31093 6.46404 1.56721L10.4015 5.50471C10.6578 5.76099 10.6578 6.17651 10.4015 6.43279C10.1453 6.68907 9.72974 6.68907 9.47346 6.43279L6 2.95933L2.52654 6.43279C2.27026 6.68907 1.85474 6.68907 1.59846 6.43279C1.34218 6.17651 1.34218 5.76099 1.59846 5.50471L5.53596 1.56721Z" fill="#555BB3" stroke="#555BB3" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
                <button type="button" onClick={() => decrement(name, formik)}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.59846 1.56721C1.85474 1.31093 2.27026 1.31093 2.52654 1.56721L6 5.04067L9.47346 1.56721C9.72974 1.31093 10.1453 1.31093 10.4015 1.56721C10.6578 1.82349 10.6578 2.23901 10.4015 2.49529L6.46404 6.43279C6.20776 6.68907 5.79224 6.68907 5.53596 6.43279L1.59846 2.49529C1.34218 2.23901 1.34218 1.82349 1.59846 1.56721Z" fill="#555BB3" stroke="#555BB3" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </NumberIcon>
            }
          </>
        )}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </CustomInputContaienr>
  );
};

export default Index;
