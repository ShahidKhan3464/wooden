import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

import DataTable from "../../../../components/dataTable";
import Create from "./create";
import Update from "./update";
import { getCars, GetTransportationTypesData, readAnCar } from "../apiCalls/carCrud";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginBottom: "20px",
  },
}));

const List = ({
  EmployeeID,
  BrokerID,
  TransactionStatusID
}) => {
  const classes = useStyles();

  const [ModalState, setModalState] = useState(false);
  const [CreateModal, setCreateModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [ListData, setListData] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [transportTypes, setTransportTypes] = useState(null);
  const [owners, setOwners] = useState(null);


  useEffect(() => {
    if (ListData?.length === 0 || !ListData) {
      getCars(BrokerID, EmployeeID)
        .then((data) => {
          if (data.Data != null) {
            setListData(data.Data);
          } else {
            setListData([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          //setLoading(false);
          console.log(err);
        });
    }
  }, [ListData, BrokerID, EmployeeID]);

  useEffect(() => {
    if (!transportTypes) {
      GetTransportationTypesData(BrokerID, TransactionStatusID)
        .then((data) => {
          setTransportTypes(data.Data);
        });
    }
  }, [transportTypes, BrokerID, TransactionStatusID]);

  const getRowData = (rowID) => {
    readAnCar(rowID, EmployeeID, BrokerID).then((data) => {
      setRowData(data.Data);
    });
  };

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
          transportTypes={transportTypes}
          owners={owners}
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
          transportTypes={transportTypes}
          rowData={rowData}
          owners={owners}
          ModalState={ModalState && UpdateModal}
          handleSubmitModal={handleSubmitModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <DataTable
        getRowData={getRowData}
        rowID="transportationObjectID"
        Update
        handleOpenModal={handleOpenModal}
        setUpdateModal={setUpdateModal}
        columns={[
          { title: "Name", field: "friendlyName" },
          { title: "No of seats", field: "numberOfSeats" },
          { title: "Transmission Type", field: "transmissionType" },
          { title: "Daily Rate", field: "dailyRate" },
          { title: "0 to 60", field: "zeroTo60" },
        ]}
        title={"Cars"}
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
