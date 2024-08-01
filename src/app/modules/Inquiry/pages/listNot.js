import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";

import { makeStyles } from "@material-ui/core";

import DataTable from "../../../../components/dataTable";
import Create from "./create";
import Update from "./update";
import { getInquiries, readAnInquiry } from "../apiCalls/inquiryCrud";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginBottom: "20px",
  },
}));

const List = ({
  EmployeeID,
  BrokerID,
  TransactionStatusID,
  Leads,
  Zipcodes,
  Amenities,
}) => {
  const classes = useStyles();

  const [ModalState, setModalState] = useState(false);
  const [CreateModal, setCreateModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [ListData, setListData] = useState([]);
  const [rowData, setRowData] = useState(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (ListData?.length === 0 || !ListData) {
      getInquiries(EmployeeID, BrokerID)
        .then((data) => {
          setListData(data.Data);
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [ListData, EmployeeID, BrokerID]);

  const getRowData = (rowID) => {
    readAnInquiry(EmployeeID, rowID).then((data) => {
      setRowData(data.Data[0]);
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

  if (ListData) {
    const customListData = [...ListData];

    customListData.map((row) => {
      let myObj = {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      };
      row.maxBudget = row.maxBudget.toLocaleString("en-US", myObj);
      row.leadFullName = row.leadFirstName + " " + row.leadLastName;
      row.agentFullName = row.employeeFirstName + " " + row.employeeLastName;
    });
  }

  return !Loading ? (
    <>
      <div className={classes.buttons}>
        <Create
          EmployeeID={EmployeeID}
          BrokerID={BrokerID}
          TransactionStatusID={TransactionStatusID}
          Leads={Leads}
          Zipcodes={Zipcodes}
          Amenities={Amenities}
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
          Leads={Leads}
          Zipcodes={Zipcodes}
          Amenities={Amenities}
          ModalState={ModalState && UpdateModal}
          handleSubmitModal={handleSubmitModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <DataTable
        getRowData={getRowData}
        rowID="inquiryID"
        Update
        Link
        InquiriesShare
        EmployeeID={EmployeeID}
        BrokerID={BrokerID}
        handleOpenModal={handleOpenModal}
        setUpdateModal={setUpdateModal}
        columns={[
          { title: "Agent", field: "agentFullName"},
          { title: "Lead", field: "leadFullName" },
          { title: "Event", field: "description" },
          {
            render: (row) => {
              return dateFormat(row.startDate, "mm/dd/yyyy");
            },
            title: "Check In",
            field: "startDate",
          },
          {
            render: (row) => {
              return dateFormat(row.endDate, "mm/dd/yyyy");
            },
            title: "Check Out",
            field: "endDate",
          },
          { title: "Max Budget", field: "maxBudget" },
          { title: "City/District", field: "city" },
          { title: "Status", field: "status" },
        ]}
        title={"Inquiries"}
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
