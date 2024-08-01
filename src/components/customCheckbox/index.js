import React from 'react';
import { CustomCheckboxStyle } from './styled'
import ErrorMsg from "../ErrorMessage";
import { Field, ErrorMessage } from "formik";

const CustomCheckbox = (props) => {
    const {
        label,
        name,
        disabled,
        defaultValue,
        formik
    } = props;


    const handleCheck = (e) => {
        console.log(e.target.checked)
        console.log(name)
    }

    return (
        <CustomCheckboxStyle>

            <label htmlFor={name}>{label}</label>

            <Field name={name} id={name}>
                {({ field, form }) => (
                    <>
                        <input
                            onChange={(e) => formik.setFieldValue(name, e.target.checked)}
                            // onChange={(e) => handleCheck(e)}
                            type='checkbox'
                            name={name}
                            disabled={disabled}
                          defaultChecked={defaultValue}
                        />

                    </>
                )}
            </Field>
            <ErrorMessage name={name} component={ErrorMsg} />
        </CustomCheckboxStyle>
    )
}

export default CustomCheckbox