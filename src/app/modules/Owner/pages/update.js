import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Update = ({
    EmployeeID,
    BrokerID,
    TransactionStatusID,
    rowData,

    Countries,
    States,

    ModalState,
    handleOpenModal,
    handleSubmitModal,
    handleCloseModal
}) => {
    return(
        <FormModal
            title={"Update owner"}
            type={"Update"}
            ModalState={ModalState}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            form={
                <Form
                    type="Update"
                    EmployeeID ={EmployeeID}
                    BrokerID ={BrokerID}
                    TransactionStatusID ={TransactionStatusID}
                    rowData={rowData}

                    Countries={Countries}
                    States={States}

                    handleSubmitModal={handleSubmitModal}
                    handleCloseModal={handleCloseModal}
                />
            }
        />
    )
}

export default (Update);
