import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

import DataTable from "../../../../components/dataTable";
import Create from "./create";
import Update from "./update";
import getUserRoles from "../../../../api/getUserRoles";
import { getEmployees, readAnEmployee, getPropertyCategoryTypes, getCommissionRateTypes } from "../apiCalls/EmployeeCrud";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginBottom: "20px",
  },
}));

const List = ({
  EmployeeID,
  BrokerID,
  TransactionStatusID,

  EmployeeTitles,
  Countries,
  States,
  Roles,
}) => {
  const classes = useStyles();

  const [ModalState, setModalState] = useState(false);
  const [CreateModal, setCreateModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [ListData, setListData] = useState([]);
  const [rowData, setRowData] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [PropertyCategoryTypes, setPropertyCategoryTypes] = useState([]);
  const [CommissionRateTypes, setCommissionRateTypes] = useState([]);

  let role = getUserRoles();

  useEffect(() => {
    if (ListData?.length === 0 || !ListData) {
      getEmployees(EmployeeID, BrokerID, TransactionStatusID)
        .then((data) => {
          setListData(data.Data);
        }).catch((err) => {
          console.log(err);
        }).then(() => {
          setLoading(false);
      });
    }
  }, [ListData, EmployeeID, BrokerID, TransactionStatusID]);


  useEffect(()=>{
    if(PropertyCategoryTypes.length===0){
      getPropertyCategoryTypes().then(resp=>{
        setPropertyCategoryTypes(resp.Data)
      })
    }
    
  },[BrokerID])
  useEffect(()=>{
    if(CommissionRateTypes.length===0){
      getCommissionRateTypes().then(resp=>{
        let rates=[...resp.Data];
        setCommissionRateTypes(rates.splice(0,4))
      })
    }
    
  },[BrokerID])

  const getRowData = (rowID) => {
    readAnEmployee(EmployeeID, rowID).then((data) => {
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
        {(role.includes("employeesAdmin") || role.includes('brokerAdmin')) ? (
          <Create
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            EmployeeTitles={EmployeeTitles}
            Countries={Countries}
            States={States}
            Roles={Roles}
            ModalState={ModalState && CreateModal}
            CommissionRateTypes={CommissionRateTypes}
            handleSubmitModal={handleSubmitModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            setCreateModal={setCreateModal}
          />
        ) : null}
        <Update
          EmployeeID={EmployeeID}
          BrokerID={BrokerID}
          TransactionStatusID={TransactionStatusID}
          rowData={rowData}
          EmployeeTitles={EmployeeTitles}
          CommissionRateTypes={CommissionRateTypes}
          Countries={Countries}
          States={States}
          Roles={Roles}
          ModalState={ModalState && UpdateModal}
          handleSubmitModal={handleSubmitModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <DataTable
        getRowData={getRowData}
        rowID="employeeID"
        Update={(role.includes("employeesAdmin") || role.includes('brokerAdmin')) ? true : false}
        handleOpenModal={handleOpenModal}
        setUpdateModal={setUpdateModal}
        columns={[
          { title: "Name", field: "employeeFirstName" },
          { title: "Email", field: "email" },
        ]}
        title={"Employees"}
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
