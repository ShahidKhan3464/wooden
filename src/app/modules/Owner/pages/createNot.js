import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Create = ({
    EmployeeID,
    BrokerID,
    TransactionStatusID,

    Countries,
    States,

    ModalState,
    handleOpenModal,
    setCreateModal,
    handleSubmitModal,
    handleCloseModal
}) => (
    <FormModal
        title={"Add owner"}
        type={"Create"}
        button_color={"secondary"}

        ModalState={ModalState}
        handleOpenModal={handleOpenModal}
        setCreateModal={setCreateModal}
        handleCloseModal={handleCloseModal}
        form={
            <Form
                type="Create"
                EmployeeID ={EmployeeID}
                BrokerID ={BrokerID}
                TransactionStatusID ={TransactionStatusID}
                
                Countries ={Countries}
                States ={States}

                handleSubmitModal={handleSubmitModal}
                handleCloseModal={handleCloseModal}
            />
        }
    />
)

export default (Create);