import React from "react";
import { InputErrorMessage } from './style';
const Errormsg = (props) => {
    return <InputErrorMessage >{props.children}</InputErrorMessage>;
};
export default Errormsg;