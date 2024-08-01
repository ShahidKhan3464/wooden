import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Update = ({
    EmployeeID,
    BrokerID,
    TransactionStatusID,
    rowData,

    EmployeeTitles,
    Countries,
    States,
    Roles,
    CommissionRateTypes,
    ModalState,
    handleOpenModal,
    handleSubmitModal,
    handleCloseModal
}) => {
    return(
        <FormModal
            title={"Update Employee"}
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

                    EmployeeTitles={EmployeeTitles}
                    Countries={Countries}
                    States={States}
                    Roles={Roles}
                    CommissionRateTypes={CommissionRateTypes}

                    handleSubmitModal={handleSubmitModal}
                    handleCloseModal={handleCloseModal}
                />
            }
        />
    )
}

export default (Update);
