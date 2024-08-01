import React, { useEffect, useState } from "react";
import Table from "../../../../components/table/index";
import HoldsTables from "./HoldsTables";
import {
    getDashboardData,
} from "../_redux/employeesBooks/employeesBooksCrud";
import Alert from "@material-ui/lab/Alert";
import { Grid, Box, Typography } from "@material-ui/core";
import DashbaordTable from './ApprovedHold';
import ValidateWire from './ValidateWire'

import {
    getHoldsForAdminDashboard,
    updatePropertyHoldStatus,
    createBookings,
    deletePropertyHold
} from "../apiCalls/DashboardCrud";

import getUserRoles from "../../../../api/getUserRoles";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: "rgba(255,255,255,0.1)"
            }
        },
        x: {
            beginAtZero: true,
            grid: {
                display: false
            }
        }
    },
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
        title: {
            display: false,
            text: '',
        },
    }
};

const labels = ['', '', '', '', '', '', ''];

export const data = {
    labels,
    datasets: [
        {
            label: '',
            data: [70, 50, 300, 220, 400, 350, 500],
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderColor: '#fff',
            tension: 0.4,
            pointHoverRadius: 0,
            pointRadius: 0,
        },
        {
            label: '',
            data: [100, 250, 280, 120, 340, 260, 350],
            backgroundColor: 'rgba(255,255,255,0.4)',
            cornerRadius: 4,
            borderColor: '#8cbaec',
            tension: 0.4,
            pointHoverRadius: 0,
            pointRadius: 0,
        },
    ],
};


function DashboardPage({ EmployeeID, BrokerID }) {
    const [employeesData] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [NotApprovedHolds, setNotApprovedHolds] = useState(null);
    const [ApprovedHolds, setApprovedHolds] = useState(null);
    const [UnConfirmedHolds, setUnConfirmedHolds] = useState(null);


    const [successNotificationShow, setSuccessNotificationShow] = useState(false);
    const [errorNotificationShow, setErrorNotificationShow] = useState(false);
    const [successNotificationMessage, setSuccessNotificationMessage] = useState(null);
    const [errorNotificationMessage, setErrorNotificationMessage] = useState(null);

    let role = getUserRoles();
    useEffect(() => {
        if (role.includes("leadsAdmin")) {
            getHoldsForAdminDashboard(
                EmployeeID,
                BrokerID,
                "leadsAdmin" /*role*/,
                1 /*HoldStatusID*/
            ).then((data) => {
                setNotApprovedHolds(data.Data);
            }).catch(() => {
                console.log("error")
            });
        }

        if (role.includes("regularAgent")) {
            getHoldsForAdminDashboard(
                EmployeeID,
                BrokerID,
                "regularAgent" /*role*/,
                2 /*HoldStatusID*/
            ).then((data) => {
                setApprovedHolds(data.Data);
            }).catch(() => {
                console.log("error")
            });
        }

        if (role.includes("financeAdmin")) {
            getHoldsForAdminDashboard(
                EmployeeID,
                BrokerID,
                "financeAdmin" /*role*/,
                4 /*HoldStatusID*/
            ).then((data) => {
                setUnConfirmedHolds(data.Data);
            }).catch(() => {
                console.log("No Holds for finance admin")
            });
        }

        getDashboardDatum();
    }, [EmployeeID, BrokerID, role]);

    useEffect(() => {
        if (role.includes("leadsAdmin") && !NotApprovedHolds) {
            getHoldsForAdminDashboard(
                EmployeeID,
                BrokerID,
                "leadsAdmin" /*role*/,
                1 /*HoldStatusID*/
            ).then((data) => {
                setNotApprovedHolds(data.Data);
            }).catch(() => {
                console.log('error')
            });
        }

        if (role.includes("regularAgent") && !ApprovedHolds) {
            getHoldsForAdminDashboard(
                EmployeeID,
                BrokerID,
                "regularAgent" /*role*/,
                2 /*HoldStatusID*/
            ).then((data) => {
                setApprovedHolds(data.Data);
            }).catch(() => {
                console.log('error');
            });
        }

        if (role.includes("financeAdmin") && !UnConfirmedHolds) {
            getHoldsForAdminDashboard(
                EmployeeID,
                BrokerID,
                "financeAdmin" /*role*/,
                4 /*HoldStatusID*/
            ).then((data) => {
                setUnConfirmedHolds(data.Data);
            }).catch(() => {
                console.log('error');
            });
        }
    }, [
        NotApprovedHolds,
        ApprovedHolds,
        UnConfirmedHolds,
        EmployeeID,
        BrokerID,
        role,
    ]);
    const setNotification = (type, message) => {
        // setSuccessNotificationShow(false);
        // setErrorNotificationShow(false);
        if (type == "success") {
            setSuccessNotificationShow(true);
            setSuccessNotificationMessage(message)
        } else {
            setErrorNotificationShow(true);
            setErrorNotificationMessage(message);
        }
        setTimeout(() => {
            setSuccessNotificationShow(false);
            setErrorNotificationShow(false);
        }, 2000)
    };
    const handlePriceOverride = (price, changedHoldIndex) => {
        let myNotApprovedHolds = [...NotApprovedHolds];
        myNotApprovedHolds[changedHoldIndex].totalHoldPrice = price;
        setNotApprovedHolds([...myNotApprovedHolds]);
    };

    const handleUnConfirmedPriceOverride = (price, changedHoldIndex) => {
        let myNotApprovedHolds = [...UnConfirmedHolds];
        myNotApprovedHolds[changedHoldIndex].totalHoldPrice = price;
        setUnConfirmedHolds([...myNotApprovedHolds]);
    };
    const handleApproveNoteOverride = (note, changedHoldIndex) => {
        let myNotApprovedHolds = [...ApprovedHolds];
        myNotApprovedHolds[changedHoldIndex].note = note;
        setApprovedHolds([...myNotApprovedHolds]);
    };


    const handleDeletePropertyHold = (propertyHoldID) => {
        if (window.confirm('Are you sure you want to delete hold?')) {
            deletePropertyHold(propertyHoldID, EmployeeID).then((data) => {
                setApprovedHolds(null);
                setNotApprovedHolds(null);
                setUnConfirmedHolds(null);
                setNotification('success', 'Successfully submitted.');
            }).catch(() => {
                console.log('error');
                setNotification('success', 'Error. Plesae try again later.');
            });
        }
    };


    const handleApproveButton = (propertyHoldID, totalHoldPrice, note) => {
        //if (PriceOverride >= 1) {
        let data = {
            propertyHoldID,
            totalHoldPrice,
            holdStatusID: 2,
            note,
        };
        if (window.confirm('Are you sure you want to confirm?')) {
            updatePropertyHoldStatus(EmployeeID, BrokerID, data).then(() => {
                //setPriceOverride(null);
                setNotApprovedHolds(null);
                setNotification('success', 'Successfully submitted.');
            }).catch(() => {
                console.log('error');
                setNotification('success', 'Error. Plesae try again later.');
            });
        }


    };

    const handleUnconfirmedFunding = (propertyHoldID, totalHoldPrice, note) => {
        let data = {
            propertyHoldID,
            totalHoldPrice,
            holdStatusID: 4,
            note,
        };
        if (window.confirm('Are you sure you want to request for validation?')) {
            updatePropertyHoldStatus(EmployeeID, BrokerID, data).then(() => {
                setApprovedHolds(null);
                setUnConfirmedHolds(null);
                setNotification('success', 'Successfully submitted.');
            }).catch(() => {
                console.log('error')
                setNotification('success', 'Error. Plesae try again later.');
            });
        }
    };

    const handleBook = (
        startDate,
        endDate,
        propertyID,
        dailyPrice,
        inquiryID
    ) => {
        let data = {
            startDate,
            endDate,
            propertyID,
            employeeID: EmployeeID,
            dailyPrice,
            inquiryID,
            brokerID: BrokerID,
        };
        if (window.confirm('Are you sure you want to book?')) {
            createBookings(data).then(() => {
                setNotApprovedHolds(null);
                setUnConfirmedHolds(null);
                setNotification('success', 'Successfully submitted.');
            }).catch(() => {
                console.log('error');
                setNotification('success', 'Error. Plesae try again later.');
            });
        }
    };

    const handleConfirmFunding = (
        propertyHoldID,
        totalHoldPrice,
        note,

        startDate,
        endDate,
        propertyID,
        dailyPrice,
        inquiryID
    ) => {
        let data = {
            propertyHoldID,
            totalHoldPrice,
            holdStatusID: 5,
            note,
        };
        if (window.confirm('Are you sure you want to confirm funding?')) {
            updatePropertyHoldStatus(EmployeeID, BrokerID, data).then(() => {
                handleBook(startDate, endDate, propertyID, dailyPrice, inquiryID);
                setNotification('success', 'Successfully submitted.');
            }).catch(() => {
                console.log("error");
                setNotification('success', 'Error. Plesae try again later.');
            });
        }
    };



    const getDashboardDatum = () => {
        getDashboardData()
            .then((data) => {
                setDashboardData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };





    return (
        <div className={"bg-world col-12"}>
            {dashboardData ? (
                <>
                    <Box>
                        <Grid container spacing={4}>
                            <Grid item sm={12} md={6} lg={6}>
                                <div className="graphBox">
                                    <Line options={options} data={data} />
                                </div>
                            </Grid>
                            <Grid item sm={12} md={6} lg={6}>
                                <Grid container spacing={4}>
                                    <Grid item sm={12} md={6} lg={6}>
                                        <Box bgcolor='white' p='34px 24px'>
                                            <Typography style={{ fontSize: '16px', color: '#121212', fontFamily: 'Denish', fontWeight: '700' }} >Number of Properties</Typography>
                                            <Typography style={{ fontSize: '40px', fontWeight: '500', fontFamily: 'Avenir LT Std' }} >20</Typography>
                                            <Typography style={{ fontSize: '14px', color: '#939393', fontFamily: 'Avenir LT Std', fontWeight: '700' }} >0 Yearly Sales</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={12} md={6} lg={6}>
                                        <Box bgcolor='white' p='34px 24px'>
                                            <Typography style={{ fontSize: '16px', color: '#121212', fontFamily: 'Denish', fontWeight: '700' }} >September Leads</Typography>
                                            <Typography style={{ fontSize: '40px', fontWeight: '500', fontFamily: 'Avenir LT Std' }} >0</Typography>
                                            <Typography style={{ fontSize: '14px', color: '#939393', fontFamily: 'Avenir LT Std', fontWeight: '700' }} >1 New Inquiries</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={12} md={6} lg={6}>
                                        <Box bgcolor='white' p='34px 24px'>
                                            <Typography style={{ fontSize: '16px', color: '#121212', fontFamily: 'Denish', fontWeight: '700' }} >September Bookings</Typography>
                                            <Typography style={{ fontSize: '40px', fontWeight: '500', fontFamily: 'Avenir LT Std' }} >10</Typography>
                                            <Typography style={{ fontSize: '14px', color: '#939393', fontFamily: 'Avenir LT Std', fontWeight: '700' }} >0 Days Booked</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sm={12} md={6} lg={6}>
                                        <Box bgcolor='white' p='34px 24px'>
                                            <Typography style={{ fontSize: '16px', color: '#121212', fontFamily: 'Denish', fontWeight: '700' }} >September Sales</Typography>
                                            <Typography style={{ fontSize: '40px', fontWeight: '500', fontFamily: 'Avenir LT Std' }} >0</Typography>
                                            <Typography style={{ fontSize: '14px', color: '#939393', fontFamily: 'Avenir LT Std', fontWeight: '700' }} >0 Yearly Sales</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                    {successNotificationShow == true ? (
                        <Alert key="success" className="fade alert alert-success show" variant='success'>
                            {successNotificationMessage}
                        </Alert>
                    ) : null}
                    {errorNotificationShow == true ? (
                        <Alert key="error" className="fade alert alert-danger show" variant='error'>
                            {errorNotificationMessage}
                        </Alert>
                    ) : null}

                    <Box bgcolor='white' py={4} px={3} mt={5} sx={{ overflow: 'scroll' }}>
                        <Box>
                            <h1 style={{ color: '#121212', fontWeight: '700', fontSize: '24px', fontFamily: 'Manrope', marginBottom: '30px' }} >Approve Holds</h1>
                            <DashbaordTable
                                role={role}
                                NotApprovedHolds={NotApprovedHolds}
                                ApprovedHolds={ApprovedHolds}
                                UnConfirmedHolds={UnConfirmedHolds}
                                handleDeletePropertyHold={handleDeletePropertyHold}
                                handlePriceOverride={handlePriceOverride}
                                handleUnConfirmedPriceOverride={handleUnConfirmedPriceOverride}
                                handleApproveNoteOverride={handleApproveNoteOverride}
                                handleApproveButton={handleApproveButton}
                                handleBook={handleBook}
                                handleUnconfirmedFunding={handleUnconfirmedFunding}
                                handleConfirmFunding={handleConfirmFunding}

                            />
                        </Box>
                        <Box mt={5}>
                            <h1 style={{ color: '#121212', fontWeight: '700', fontSize: '24px', fontFamily: 'Manrope', marginBottom: '30px' }} > Validate Wire</h1>
                            <ValidateWire
                                role={role}
                                NotApprovedHolds={NotApprovedHolds}
                                ApprovedHolds={ApprovedHolds}
                                UnConfirmedHolds={UnConfirmedHolds}
                                handleDeletePropertyHold={handleDeletePropertyHold}
                                handlePriceOverride={handlePriceOverride}
                                handleUnConfirmedPriceOverride={handleUnConfirmedPriceOverride}
                                handleApproveNoteOverride={handleApproveNoteOverride}
                                handleApproveButton={handleApproveButton}
                                handleBook={handleBook}
                                handleUnconfirmedFunding={handleUnconfirmedFunding}
                                handleConfirmFunding={handleConfirmFunding}

                            />
                        </Box>
                    </Box>
                </>
            ) : (
                <div className={"container"}>
                    <div className="container spinner-center spinner spinner-primary spinner-lg mr-15"></div>
                </div>
            )}
            {employeesData && (
                <div className={"row"}>
                    <Table
                        columns={[
                            "Employee",
                            "# of Bookings",
                            "# of Days Booked",
                            "Total Sales",
                        ]}
                        allowedColumns={[
                            "employeeFirstName",
                            "numberOfBookings",
                            "numberOfDaysBooked",
                            "totalSales",
                        ]}
                        title={"Monthly Bookings By Employee"}
                        rows={employeesData.Data}
                    />
                    <Table
                        columns={[
                            "Employee",
                            "# of Bookings",
                            "# of Days Booked",
                            "Total Sales",
                        ]}
                        allowedColumns={[
                            "employeeFirstName",
                            "numberOfBookings",
                            "numberOfDaysBooked",
                            "totalSales",
                        ]}
                        title={"Monthly Bookings By Employee"}
                        rows={employeesData.Data}
                    />
                    <Table
                        columns={[
                            "Employee",
                            "# of Bookings",
                            "# of Days Booked",
                            "Total Sales",
                        ]}
                        allowedColumns={[
                            "employeeFirstName",
                            "numberOfBookings",
                            "numberOfDaysBooked",
                            "totalSales",
                        ]}
                        title={"Monthly Bookings By Employee"}
                        rows={employeesData.Data}
                    />
                    <Table
                        columns={[
                            "Employee",
                            "# of Bookings",
                            "# of Days Booked",
                            "Total Sales",
                        ]}
                        allowedColumns={[
                            "employeeFirstName",
                            "numberOfBookings",
                            "numberOfDaysBooked",
                            "totalSales",
                        ]}
                        title={"Monthly Bookings By Employee"}
                        rows={employeesData.Data}
                    />
                </div>
            )}
        </div>
    );
}

export default DashboardPage;
