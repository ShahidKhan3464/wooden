import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core';

import DataTable from "../../../../components/dataTable";
import Create from './create';
import Update from './update';
import getUserRoles from "../../../../api/getUserRoles";
import { get3rdPartyAgents, read3rdPartyAgent } from '../apiCalls/3rdpartyagentsCrud';

const List = ({
    EmployeeID,
    BrokerID,
}) => {
    const [ModalState, setModalState] = useState(false);
    const [CreateModal, setCreateModal] = useState(false);
    const [UpdateModal, setUpdateModal] = useState(false);
    const [ListData, setListData] = useState([]);
    const [rowData, setRowData] = useState(null);
    const [brokerID, setBrokerID] = useState(null);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        if (ListData?.length === 0 || !ListData) {
            get3rdPartyAgents().then((data) => {
                // console.log("data broker", BrokerID);
                setListData(data.Data);
                setBrokerID(BrokerID);
            }).catch((err) => {
                console.log(err)
            }).then(() => {
                setLoading(false);
            });
        }
    }, [ListData])
    let role = getUserRoles();
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
        // console.log("boker id", brokerID)
        setModalState(false);
        setUpdateModal(false);
        setCreateModal(false);
        setRowData(null);
    };

    const getRowData = (rowID) => {
        read3rdPartyAgent(rowID).then((data) => {
            // console.log("row Data", data.Data);
         
            let employeeData=data.Data.filter((element)=>element.employeeID===rowID)
            setRowData(employeeData[0]);
        })
    }

    const useStyles = makeStyles((theme) => ({
        buttons: {
            marginBottom: "20px",
        }
    }));

    const classes = useStyles();
    return (
        !Loading ?
            <>
                <div className={classes.buttons}>
                    {!role.includes("superAdmin") && (
                        <Create
                            rowData={rowData}
                            setRowData={setRowData}
                            brokerID={brokerID}
                            employeeID={EmployeeID}
                            ModalState={ModalState && CreateModal}
                            handleSubmitModal={handleSubmitModal}
                            handleCloseModal={handleCloseModal}
                            handleOpenModal={handleOpenModal}
                            setCreateModal={setCreateModal}
                        />
                    )}
                    <Update
                        rowData={rowData}
                        setRowData={setRowData}
                        brokerID={brokerID}
                        employeeID={EmployeeID}
                        ModalState={ModalState && UpdateModal}
                        handleSubmitModal={handleSubmitModal}
                        handleCloseModal={handleCloseModal}
                       
                    />
                </div>
                <DataTable
                    getRowData={getRowData}
                    rowID="employeeID"
                    Update
                    handleOpenModal={handleOpenModal}
                    setUpdateModal={setUpdateModal}
                    //Delete={<Delete rowData={rowData} setRowData={setRowData} />}
                    columns={[
                        { title: "Name", field: "emloyeeLastName",  render: rowData => rowData.employeeFirstName + " " + rowData.employeeLastName
                    },
                        { title: "Brokerage", field: "brokerage" },
                        { title: "Email", field: "email" },
                    ]}
                    title={'3rd Party Agents'}
                    data={ListData}
                />
            </>
            :
            <div className={'container'}>
                <div className="container spinner-center spinner spinner-primary spinner-lg mr-15"></div>
            </div>
    );
}

export default List;