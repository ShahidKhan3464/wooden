import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

import DataTable from "../../../../components/dataTable";
import Create from "./create";
import Update from "./update";
import { getLeads, readALead, contactPreferences } from "../apiCalls/leadCrud";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginBottom: "20px",
  },
}));

const List = ({
  EmployeeID,
  BrokerID,
  TransactionStatusID,

  LeadVerificationStatuses,
  AssignedEmployees,
  LeadSources,
  LeadProfessions,
  Countries,
  States,
}) => {
  const classes = useStyles();

  const [ModalState, setModalState] = useState(false);
  const [CreateModal, setCreateModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [ListData, setListData] = useState([]);
  const [ContactPreference, setContactPreference] = useState([]);
  const [rowData, setRowData] = useState(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (ListData?.length === 0 || !ListData) {
      getLeads(EmployeeID, BrokerID, TransactionStatusID)
        .then((data) => {
          setListData(data.Data);
        })
        .catch((err) => {
          console.log(err);
        }).then(() => {
          setLoading(false);
        });
    }
  }, [ListData, EmployeeID, BrokerID]);

  useEffect(()=>{
    if(ContactPreference.length===0){
      contactPreferences().then(resp=>{
        setContactPreference(resp.Data)
      })
    }
    
  },[BrokerID])

  const getRowData = (rowID) => {
    readALead(EmployeeID, rowID).then((data) => {
      setRowData(data.Data[0]);
    });
  };
  //console.log(rowData);

  const handleOpenModal = () => {
    setModalState(true);
  };

  const handleSubmitModal = () => {
    setModalState(false);
    setUpdateModal(false);
    setCreateModal(false);
    setRowData(null);
    setListData(null);
  };

  const handleCloseModal = () => {
    setModalState(false);
    setUpdateModal(false);
    setCreateModal(false);
    setRowData(null);
  };

  return !Loading ? (
    <>
      <div className={classes.buttons}>
        <Create
          EmployeeID={EmployeeID}
          BrokerID={BrokerID}
          TransactionStatusID={TransactionStatusID}
          LeadVerificationStatuses={LeadVerificationStatuses}
          AssignedEmployees={AssignedEmployees}
          LeadSources={LeadSources}
          LeadProfessions={LeadProfessions}
          Countries={Countries}
          ContactPreference={ContactPreference}
          States={States}
          ModalState={ModalState && CreateModal}
          handleSubmitModal={handleSubmitModal}
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenModal}
          setCreateModal={setCreateModal}
        />
        <Update
          EmployeeID={EmployeeID}
          BrokerID={BrokerID}
          TransactionStatusID={TransactionStatusID}
          rowData={rowData}
          LeadVerificationStatuses={LeadVerificationStatuses}
          AssignedEmployees={AssignedEmployees}
          LeadSources={LeadSources}
          LeadProfessions={LeadProfessions}
          Countries={Countries}
          ContactPreference={ContactPreference}
          States={States}
          ModalState={ModalState && UpdateModal}
          handleSubmitModal={handleSubmitModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <DataTable
        getRowData={getRowData}
        rowID="leadID"
        Update
        handleOpenModal={handleOpenModal}
        setUpdateModal={setUpdateModal}
        columns={[
          {
            render: (owner) => {
              return `${owner?.firstName} ${owner?.lastName}`;
            },
            title: "Name",
            field: "firstName",
            defaultSort: "asc",
          },
          { title: "Email", field: "email" },
          { title: "Phone", field: "phone" },
          { title: "Lead Revenue", field: "revenueFromLead" },
        ]}
        title={"Leads"}
        data={ListData}
      />
    </>
  ) : (
    <div className={"container"}>
      <div className="container spinner-center spinner spinner-primary spinner-lg mr-15"></div>
    </div>
  );
};

export default List;
