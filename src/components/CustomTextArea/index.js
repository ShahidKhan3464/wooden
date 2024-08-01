import React from "react";
import { useField, ErrorMessage } from "formik";
import ErrorMsg from '../ErrorMessage'
import { CustomTextAreaContainer } from './style';


const Index = ({ placeholder, disabled , label, defaultValue, ...props }) => {

    const [field] = useField(props);

    return (
        <CustomTextAreaContainer>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea disabled={disabled} defaultValue={defaultValue} className="customInput" placeholder={placeholder} {...field} {...props} />
            <ErrorMessage name={props.name} component={ErrorMsg} />
        </CustomTextAreaContainer>
    );
};

export default Index;
