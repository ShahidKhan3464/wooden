import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Update = ({
    EmployeeID,
    BrokerID,
    TransactionStatusID,
    rowData,

    Leads,
    Zipcodes,
    Amenities,

    ModalState,
    handleOpenModal,
    handleSubmitModal,
    handleCloseModal
}) => {
    return(
        <FormModal
            title={"Update Inquiry"}
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
                    Leads={Leads}
                    Zipcodes={Zipcodes}
                    Amenities={Amenities}
                    handleSubmitModal={handleSubmitModal}
                    handleCloseModal={handleCloseModal}
                />
            }
        />
    )
}

export default (Update);
