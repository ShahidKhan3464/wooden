import React from "react";
import Input from "./CustomInput";
import Select from "./customSelect";
import Datepicker from './customDatePicker';
import Textarea from './CustomTextArea';
import CustomCheckbox from './customCheckbox'
// import PasswordInput from './CustomPasswordInput/Index'


const Formickcontroller = (props) => {
    const { control, ...rest } = props;
    // console.log("enter to controller");
    switch (control) {
        case "input":
            return <Input {...rest} />;
        // case "inputmask":
        //     return <CommonInputMask {...rest} />;

        case "select":
            return <Select {...rest} />;
        case "checkbox":
            return <CustomCheckbox {...rest} />;
        // case "password":
        //     return <PasswordInput {...rest} />;
        case "textarea":
            return <Textarea {...rest} />;

        // case "radio":
        //   return <Radio {...rest} />;
        case "date":
            return <Datepicker {...rest} />;
        default:
            return null;
    }
};

export default Formickcontroller;
