import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Create = ({
    EmployeeID,
    BrokerID,
    TransactionStatusID,

    Leads,
    Zipcodes,
    Amenities,

    ModalState,
    handleOpenModal,
    setCreateModal,
    handleSubmitModal,
    handleCloseModal
}) => (
    <FormModal
        title={"Add Inquiry"}
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

                Leads={Leads}
                Zipcodes={Zipcodes}
                Amenities={Amenities}

                handleSubmitModal={handleSubmitModal}
                handleCloseModal={handleCloseModal}
            />
        }
    />
)

export default (Create);