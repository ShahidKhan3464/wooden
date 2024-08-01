import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core';

import DataTable from "../../../../components/dataTable";
import Create from './create';
import Update from './update';
import getUserRoles from "../../../../api/getUserRoles";
import { getBrokers, readABroker } from '../apiCalls/brokerCrud';

const List = (props) => {
    // console.log("List",props)
    const [ModalState, setModalState] = useState(false);
    const [CreateModal, setCreateModal] = useState(false);
    const [UpdateModal, setUpdateModal] = useState(false);
    const [ListData, setListData] = useState([]);
    const [rowData, setRowData] = useState(null);
    const [brokerID, setBrokerID] = useState(null);
    const [Loading, setLoading] = useState(true);

    let role = getUserRoles();
    // console.log("role",role);

    useEffect(() => {
        if (ListData?.length === 0 || !ListData) {
            getBrokers().then((data) => {
                if (role.includes("brokerAdmin")) {
                    const broker = data.Data.filter((element) => element.brokerID == props.BrokerID)
                    setListData(broker);
                    setBrokerID(broker[0].brokerID);
                    // console.log("broker",broker)
                }
                else {
                    setListData(data.Data);
                    setBrokerID(data.Data[0].brokerID);
                }
            }).catch((err) => {
                console.log(err)
            }).then(() => {
                setLoading(false);
            });
        }
    }, [ListData])

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

    const getRowData = (rowID) => {
        // console.log("row id",rowID, brokerID)
        readABroker(brokerID, rowID).then((data) => {
            // console.log("Data", data.Data[0])
            setRowData(data.Data[0]);
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
                    {role.includes("superAdmin") && (
                        <Create
                            rowData={rowData}
                            setRowData={setRowData}
                            brokerID={brokerID}
                            employeeID={props.EmployeeID}
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
                        employeeID={props.EmployeeID}
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
                    // Update={<Update rowData={rowData} setRowData={setRowData} />}
                    //Delete={<Delete rowData={rowData} setRowData={setRowData} />}
                    columns={[
                        {
                            title: "Name", render: rowData => rowData.brokerFirstName + " " + rowData.brokerLastName
                        },
                        { title: "Brokerage", field: "brokerage" },
                        { title: "Email", field: "email" },
                    ]}
                    title={'Brokers'}
                    data={ListData}
                />
            </>
            :
            <div className={'container'}>
                <div className="container  spinner-center spinner spinner-primary spinner-lg mr-15"></div>
            </div>
    );
}

export default List;