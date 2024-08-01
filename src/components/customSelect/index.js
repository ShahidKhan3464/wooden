import React from "react";
import { Field, ErrorMessage } from "formik";
import ErrorMsg from "../ErrorMessage";
import { CustomSelectContainer } from "./style";

const SelectComp = (props) => {
    const { name, placeholder, onSelect = null, disabled, defaultValue, label, options, ...rest } = props;

    const dyanamicOption = [{ itemId: '', itemName: placeholder }, ...options]

    const OptionsArr = dyanamicOption?.map((option) => {
        return (
            <option key={option.itemId} value={option.itemId}>
                {option.itemName}
            </option>
        );
    });

    return (
        <CustomSelectContainer>
            <label htmlFor={name}>{label}</label>
            <Field name={name} id={name} {...rest}>
                {({ field, form, meta }) => {
                    return (
                        <span className="custom-select-inner">
                            <Field as="select"
                                id={name}
                                {...rest}
                                name={name}
                                disabled={disabled}
                                className="customSelect"
                                defaultValue={defaultValue}
                                onChange={({ target }) => {
                                    form.setFieldValue(name, target.value);
                                    if (onSelect) {
                                        onSelect(target.value)
                                    }
                                }}
                            >
                                {OptionsArr}
                            </Field>
                        </span>
                    );
                }}
            </Field>
            <ErrorMessage name={name} component={ErrorMsg} />
        </CustomSelectContainer>
    );
};

export default SelectComp;
