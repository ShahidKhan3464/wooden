import React from "react";
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Update = ({
  EmployeeID,
  BrokerID,
  TransactionStatusID,
  rowData,

  LeadVerificationStatuses,
  AssignedEmployees,
  LeadSources,
  LeadProfessions,
  Countries,
  States,
  ContactPreference,
  ModalState,
  handleOpenModal,
  handleSubmitModal,
  handleCloseModal,
}) => {
  return (
    <FormModal
      title={"Update Lead"}
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
          LeadVerificationStatuses={LeadVerificationStatuses}
          AssignedEmployees={AssignedEmployees}
          LeadSources={LeadSources}
          LeadProfessions={LeadProfessions}
          Countries={Countries}
          ContactPreferences={ContactPreference}
          States={States}
          handleSubmitModal={handleSubmitModal}
          handleCloseModal={handleCloseModal}
        />
      }
    />
  );
};

export default Update;
