import React from "react";
import FormModal from "../../../../components/Modal/index";
import Form from "./form";

const Create = ({
  EmployeeID,
  BrokerID,
  TransactionStatusID,

  LeadVerificationStatuses,
  AssignedEmployees,
  LeadSources,
  LeadProfessions,
  Countries,
  States,
  ContactPreference,

  ModalState,
  handleOpenModal,
  setCreateModal,
  handleSubmitModal,
  handleCloseModal,
}) => (
  <FormModal
    title={"Add Lead"}
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
        BrokerID={BrokerID}
        TransactionStatusID={TransactionStatusID}
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

export default Create;
