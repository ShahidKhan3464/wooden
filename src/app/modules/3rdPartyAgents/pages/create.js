import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Create = (props) =>{ 
   
    return (
    <FormModal
        setRowData={props.setRowData}
        title={"Add 3rd Party Agent"}
        type={"Create"}
        button_color={"secondary"}
        ModalState={props.ModalState}
        handleOpenModal={props.handleOpenModal}
        setCreateModal={props.setCreateModal}
        handleCloseModal={props.handleCloseModal}
        form={
            <Form
                type="Create"
                rowData={props.rowData}
                brokerID={props.brokerID}
                handleSubmitModal={props.handleSubmitModal}
                handleCloseModal={props.handleCloseModal}
            />
        }
    />
) }

export default (Create);