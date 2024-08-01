import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Create = ({
    EmployeeID,
    BrokerID,
    TransactionStatusID,

    EmployeeTitles,
    Countries,
    States,
    Roles,
    CommissionRateTypes,

    ModalState,
    handleOpenModal,
    setCreateModal,
    handleSubmitModal,
    handleCloseModal
}) => (
    <FormModal
        title={"Add Employee"}
        type={"Create"}
        button_color={"secondary"}

        ModalState={ModalState}
        handleOpenModal={handleOpenModal}
        setCreateModal={setCreateModal}
        handleCloseModal={handleCloseModal}
        form={
            <Form
                type="Create"
                EmployeeID={EmployeeID}
                BrokerID ={BrokerID}
                TransactionStatusID ={TransactionStatusID}

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

export default (Create);