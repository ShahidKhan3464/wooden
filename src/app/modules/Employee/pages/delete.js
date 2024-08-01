import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Delete = (props) => {
    return(
        <FormModal
            setRowData={props.setRowData}
            title={"Delete Employee"}
            type={"Delete"}
            form={
                <Form
                    type="Delete"
                    rowData={props.rowData}
                />
            }
        />
    )
}

export default (Delete);
