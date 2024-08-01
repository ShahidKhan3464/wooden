import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Update = ({
    EmployeeID,
    BrokerID,
    TransactionStatusID,
    rowData,

    transportTypes,

    ModalState,
    handleOpenModal,
    handleSubmitModal,
    handleCloseModal
}) => {
    return (
        <FormModal
            title={"Update Car"}
            type={"Update"}
            ModalState={ModalState}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            form={
                <Form
                    type="Update"
                    EmployeeID={EmployeeID}
                    BrokerID={BrokerID}
                    TransactionStatusID={TransactionStatusID}
                    rowData={rowData}

                    transportTypes={transportTypes}

                    handleSubmitModal={handleSubmitModal}
                    handleCloseModal={handleCloseModal}
                />
            }
        />
    )
}

export default (Update);
