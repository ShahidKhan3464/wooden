import React from "react";
import { Field, ErrorMessage } from "formik";
import { CustomDatePickerContainer } from "./style";
import ErrorMsg from "../ErrorMessage";
import moment from "moment";
import DatePicker from "react-datepicker";

const Index = (props) => {
  const {
    label,
    prefix,
    maxLength,
    disabled,
    placeholder,
    className,
    name,
    ...rest
  } = props;

  const yesterday = moment().subtract(0, "day");
  const disabledDate = (current) => {
    if (
      current._d
        ?.toISOString()
        ?.toString()
        .includes(new Date().toISOString().substring(0, 10))
    )
      return false;
    return current.isBefore(yesterday);
    // return false;
  };

  return (
    <CustomDatePickerContainer>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest}>
        {({ field, form, meta }) => {
          return (
            <div className='customInputDatepicker'>
              {/* <input
                type='date'
                {...field}
                defaultValue={new Date()}
                value={new Date()}
                onfocus="this.removeAttribute('readonly');"
                disabledDate={disabledDate}
              /> */}
              <DatePicker
                {...field}
                placeholderText={placeholder}
                onChange={(value) => form.setFieldValue(name, moment(value).format('L'))}
                onfocus="this.removeAttribute('readonly')"
                disabledDate={disabledDate}
                disabled={disabled}
              />
            </div>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </CustomDatePickerContainer>
  );
};

export default Index;
