import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Update = (props) => {
    // console.log("update props", props);
    return(
        
        <FormModal
        setRowData={props.setRowData}
        title={"Update 3rd Party Agent"}
        type={"Update"}
        button_color={"secondary"}
        ModalState={props.ModalState}
        handleOpenModal={props.handleOpenModal}
        setUpdateModal={props.setUpdateModal}
        handleCloseModal={props.handleCloseModal}
        form={
            <Form
                type="Update"
                rowData={props.rowData}
                brokerID={props.brokerID}
                handleSubmitModal={props.handleSubmitModal}
                handleCloseModal={props.handleCloseModal}
            />
        }
    />
    )
}

export default (Update);
