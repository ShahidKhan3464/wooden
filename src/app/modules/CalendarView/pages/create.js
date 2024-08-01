import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Create = ({
    EmployeeID,
    BrokerID,
    Properties,
    ModalState,
    handleOpenModal,
    setCreateModal,
    handleSubmitModal,
    handleCloseModal
}) => (
    <FormModal
        title={"Create QuickBook"}
        type={"create a Quickbook"}
        button_color={"primary"}
        Properties={Properties}
        ModalState={ModalState}
        handleOpenModal={handleOpenModal}
        setCreateModal={setCreateModal}
        handleCloseModal={handleCloseModal}
        form={
            <Form
                type="Create"
                EmployeeID={EmployeeID}
                BrokerID={BrokerID}
                Properties={Properties}
                handleSubmitModal={handleSubmitModal}
                handleCloseModal={handleCloseModal}
            />
        }
    />
)

export default (Create);