import React from 'react';
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Update = ({
    EmployeeID,
    BrokerID,
    TransactionStatusID,
    rowData,
    handleShowSecondaryImages,
    Locations,
    Owners,
    AssignedEmployees,
    PropertySearchTypes,
    Amenities,
    PropertyCategoryTypes,
    ModalState,
    handleOpenModal,
    handleSubmitModal,
    handleCloseModal
}) => {
    return(
        <FormModal
            title={"Update Property"}
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

                    Locations={Locations}
                    Owners={Owners}
                    AssignedEmployees={AssignedEmployees}
                    PropertySearchTypes={PropertySearchTypes}
                    Amenities={Amenities}
                    PropertyCategoryTypes={PropertyCategoryTypes}
                    handleShowSecondaryImages={handleShowSecondaryImages}
                    handleSubmitModal={handleSubmitModal}
                    handleCloseModal={handleCloseModal}
                />
            }
        />
    )
}

export default (Update);