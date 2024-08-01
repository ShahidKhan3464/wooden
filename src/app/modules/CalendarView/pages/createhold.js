import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Formhold from "./form_hold";

const Createhold = ({
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
        title={"Create QuickHold"}
        type={"create a Quickhold"}
        button_color={"primary"}
        Properties={Properties}
        ModalState={ModalState}
        handleOpenModal={handleOpenModal}
        setCreateModal={setCreateModal}
        handleCloseModal={handleCloseModal}
        form={
            <Formhold
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

export default (Createhold);