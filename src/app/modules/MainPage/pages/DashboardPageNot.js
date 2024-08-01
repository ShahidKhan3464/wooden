import React, { useEffect, useState } from "react";
import Card from "../../../../components/memo/index";
import Table from "../../../../components/table/index";
import HoldsTables from "./HoldsTables";
import {
  getDashboardData,
  //getEmployeesBooks,
} from "../_redux/employeesBooks/employeesBooksCrud";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import { Grid } from "@material-ui/core";


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
  const [employeesData /*setEmployeesData*/] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [NotApprovedHolds, setNotApprovedHolds] = useState(null);
  const [ApprovedHolds, setApprovedHolds] = useState(null);
  const [UnConfirmedHolds, setUnConfirmedHolds] = useState(null);


  const [successNotificationShow, setSuccessNotificationShow] = useState(false);
  const [errorNotificationShow, setErrorNotificationShow] = useState(false);
  const [successNotificationMessage, setSuccessNotificationMessage] = useState(null);
  const [errorNotificationMessage, setErrorNotificationMessage] = useState(null);
  //const [PriceOverride, setPriceOverride] = useState(null);

  let role = getUserRoles();
  //console.log(role);
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


  //const handleMouseLeave = () => {
  //  //setPriceOverride(null);
  //};

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
  //console.log(Holds);

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

  //const getEmployeesBooksData = () => {
  //  getEmployeesBooks()
  //    .then(function(data) {
  //      setEmployeesData(data);
  //    })
  //    .catch(function(error) {
  //      console.log(error);
  //    });
  //};

  const getDashboardDatum = () => {
    getDashboardData()
      .then((data) => {
        setDashboardData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //useEffect(() => {
  //  console.log("[Dashboard]: 4th useEffect");
  //  if (!employeesData) {
  //    getEmployeesBooksData();
  //  }
  //}, [employeesData]);



  return (
    <>
      <div className={"container bg-world col-12"}>
        {dashboardData ? (
          <>
            <Grid container spacing={2}>
              <Grid container item sm={12} md={7} spacing={2}>
                <Card
                  title={"Number of Properties"}
                  body={[
                    dashboardData.Data[0].propertyCount + " Properties",
                    "$ " + dashboardData.Data[0].salesThisYear + " Yearly Sales ",
                  ]}
                  image={
                    "https://realestate.eg/ckfinder/userfiles/images/Apartments-for-sale-in-scene-7/properties%20for%20sale%20in%20sene%207.jpg"
                  }
                />
                <Card
                  title={`${moment().format('MMMM')} Leads`}
                  body={[
                    dashboardData.Data[0].newLeadsThisMonth + "  New Leads",
                    dashboardData.Data[0].newInquiriesThisMonth +
                    " New Inquiries ",
                  ]}
                  image={
                    "https://img.freepik.com/free-photo/mand-holding-cup_1258-340.jpg?size=626&ext=jpg&ga=GA1.2.1562385141.1605484800"
                  }
                />
                <Card
                  title={`${moment().format('MMMM')} Bookings`}
                  body={[
                    dashboardData.Data[0].bookingsThisMonth + " Bookings",
                    dashboardData.Data[0].daysBookedThisMonth + " Days Booked ",
                  ]}
                  image={
                    "https://images-na.ssl-images-amazon.com/images/I/51GcBfqEE-L.jpg"
                  }
                />
                <Card
                  title={`${moment().format('MMMM')} Sales`}
                  body={[
                    dashboardData.Data[0].salesThisMonth + " Properties",
                    "0 Yearly Sales ",
                  ]}
                  image={"https://wallpaperaccess.com/full/333537.jpg"}
                />
              </Grid>
              <Grid item sm={12} md={5}>
                <div className="graphBox">
                  <Line height={200} options={options} data={data} />
                </div>
              </Grid>

            </Grid>
            {/* <div className={"row"} style={{ maxWidth: "650px" }}>
              <Card
                title={"Number of Properties"}
                body={[
                  dashboardData.Data[0].propertyCount + " Properties",
                  "$ " + dashboardData.Data[0].salesThisYear + " Yearly Sales ",
                ]}
                image={
                  "https://realestate.eg/ckfinder/userfiles/images/Apartments-for-sale-in-scene-7/properties%20for%20sale%20in%20sene%207.jpg"
                }
              />
              <Card
                title={`${moment().format('MMMM')} Leads`}
                body={[
                  dashboardData.Data[0].newLeadsThisMonth + "  New Leads",
                  dashboardData.Data[0].newInquiriesThisMonth +
                  " New Inquiries ",
                ]}
                image={
                  "https://img.freepik.com/free-photo/mand-holding-cup_1258-340.jpg?size=626&ext=jpg&ga=GA1.2.1562385141.1605484800"
                }
              />
              <Card
                title={`${moment().format('MMMM')} Bookings`}
                body={[
                  dashboardData.Data[0].bookingsThisMonth + " Bookings",
                  dashboardData.Data[0].daysBookedThisMonth + " Days Booked ",
                ]}
                image={
                  "https://images-na.ssl-images-amazon.com/images/I/51GcBfqEE-L.jpg"
                }
              />
              <Card
                title={`${moment().format('MMMM')} Sales`}
                body={[
                  dashboardData.Data[0].salesThisMonth + " Properties",
                  "0 Yearly Sales ",
                ]}
                image={"https://wallpaperaccess.com/full/333537.jpg"}
              />
            </div> */}

            {/*{Holds && (*/}
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
            <HoldsTables
              role={role}
              NotApprovedHolds={NotApprovedHolds}
              ApprovedHolds={ApprovedHolds}
              UnConfirmedHolds={UnConfirmedHolds}
              handleDeletePropertyHold={handleDeletePropertyHold}
              handlePriceOverride={handlePriceOverride}
              handleUnConfirmedPriceOverride={handleUnConfirmedPriceOverride}
              handleApproveNoteOverride={handleApproveNoteOverride}
              //PriceOverride={PriceOverride}
              //handleMouseLeave={handleMouseLeave}
              handleApproveButton={handleApproveButton}
              handleBook={handleBook}
              handleUnconfirmedFunding={handleUnconfirmedFunding}
              handleConfirmFunding={handleConfirmFunding}
            />
            {/*)}*/}
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
    </>
  );
}

export default DashboardPage;
