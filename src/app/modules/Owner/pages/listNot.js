import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

import DataTable from "../../../../components/dataTable";
import Create from "./createNot";
import Update from "./update";
import { getOwners, readAnOwner } from "../apiCalls/ownerCrud";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginBottom: "20px",
  },
}));

const List = ({
  EmployeeID,
  BrokerID,
  TransactionStatusID,

  Countries,
  States,
}) => {
  const classes = useStyles();

  const [ModalState, setModalState] = useState(false);
  const [CreateModal, setCreateModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [ListData, setListData] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ListData) {
      getOwners(BrokerID)
        .then((data) => {
          setListData(data.Data);
        })
        .catch((err) => {
          console.log(err);
        }).then(() => {
        setLoading(false);
      });
    }
  }, [ListData, BrokerID]);

  const getRowData = (rowID) => {
    readAnOwner(EmployeeID, rowID).then((data) => {
      setRowData(data.Data[0]);
    });
  };
  console.log(rowData);

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
  //console.log(ListData);
  return !Loading ? (
    <>
      <div className={classes.buttons}>
        <Create
          EmployeeID={EmployeeID}
          BrokerID={BrokerID}
          TransactionStatusID={TransactionStatusID}
          Countries={Countries}
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
          Countries={Countries}
          States={States}
          ModalState={ModalState && UpdateModal}
          handleSubmitModal={handleSubmitModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <DataTable
        getRowData={getRowData}
        rowID="ownerID"
        Update
        handleOpenModal={handleOpenModal}
        setUpdateModal={setUpdateModal}
        columns={[
          { title: "Name", field: "firstName" },
          { title: "Phone", field: "phone" },
          { title: "Email", field: "email" },
        ]}
        title={"Owners"}
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
