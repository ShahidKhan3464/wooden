import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
//import { Tooltip } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import NestedGrid from "../../../../components/NestedGrid";
import DataTable from "../../../../components/dataTable";
import Create from "./create";
import Update from "./update";
import moment from "moment";
import getUserRoles from "./../../../../api/getUserRoles";

import {
  getProperties,
  readAProperty,
  getPropertyCalendarEvents,
  createBlockedCalendarDates,
  updatePropertyPrice,
  getPropertyCategoryTypes
} from "./../apiCalls/propertyCrud";
import dateFormat from "dateformat";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginBottom: "20px",
    display: "flex",
    gap: '5px',
    // justifyContent: "space-between",
    "& .eventDataCard": {
      position: "fixed",
      margin: "0 auto",
      left: "10px",
      top: "10px",
      display: "flex",
      zIndex: "100000",
      flexWrap: "wrap",
      justifyContent: "space-between",
      flexBasis: "auto",
      //maxWidth: "33.33%",
      borderRadius: "5px",
      padding: "5px 10px",
      background: "white",
      boxShadow: `
        0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%),
        0px 1px 5px 0px rgb(0 0 0 / 12%)
      `,
      "& h4": {
        marginBottom: "0",
      },
      "& h4:not(last-of-type)": {
        marginRight: "20px",
      },
    },
  },
  calender: {
    flexBasis: "50%",
    border: "none",
    background: "white",
    padding: "10px",
    borderRadius: "5px",
    // boxShadow: `
    //     0px 3px 1px -2px rgb(0 0 0 / 20%),
    //     0px 2px 2px 0px rgb(0 0 0 / 14%),
    //     0px 1px 5px 0px rgb(0 0 0 / 12%)
    //   `,
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    "& h3": {
      marginBottom: "20px",
      "& span": {
        color: "#3699FF",
        display: "inline-block",
        marginLeft: "20px",
        textTransform: "capitalize"
      },
    },
    "@media (max-width: 767px)": {
      marginTop: "10px",
    }
  },
  body: {
    display: "flex",
    alignItems: "flex-start",
    "& .DataTable": {
      flexBasis: "50%",
      marginBottom: "20px",
    },
    "& .myfc": {
      flexBasis: "50%",
      border: "none",
      background: "white",
      padding: "10px",
      borderRadius: "5px",
      boxShadow: `
        0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%),
        0px 1px 5px 0px rgb(0 0 0 / 12%)
      `,
      "& h3": {
        marginBottom: "20px",
        "& span": {
          color: "red",
          display: "inline-block",
          marginLeft: "20px",
        },
      },
    },
  },
  blockControlsPanel: {
    //boxSizing: "border-box",
    ////width: "49%",
    marginTop: "20px",
    //marginLeft: "auto",
    //display: "flex",
    //flexWrap: "wrap",
    padding: "20px 20px",
    borderTop: "1px solid #d5d5d5",
    //borderRadius: "5px",
    //background: "white",
    //boxShadow: `
    //  0px 3px 1px -2px rgb(0 0 0 / 20%),
    //  0px 2px 2px 0px rgb(0 0 0 / 14%),
    //  0px 1px 5px 0px rgb(0 0 0 / 12%)
    //`,
  },
  blockControls: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  TextField: {
    marginBottom: "20px",
    width: "48%",
    "& .MuiFormHelperText-root": {
      width: "fit-content",
      padding: "0 5px",
      backgroundColor: "white",
      color: "#3783e7",
      position: "absolute",
      top: "-10px",
    },
    "@media (max-width: 767px)": {
      width: "100%",
    }
  },
  Alert: {
    width: "100%",
    marginBottom: "20px",
  },
  DataTable: {
    ".MuiTableCell-head": {
      display: "none !important"
    }
  }
}));

const List = ({
  BrokerID,
  EmployeeID,
  TransactionStatusID,
  Locations,
  Owners,
  AssignedEmployees,
  PropertySearchTypes,
  Amenities,
}) => {
  const classes = useStyles();

  const history = useHistory()
  const [ModalState, setModalState] = useState(false);
  const [CreateModal, setCreateModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [ListData, setListData] = useState([]);
  const [rowData, setRowData] = useState(null);
  const [CalendarRowData, setCalendarRowData] = useState(null);
  const [CalendarEvents, setCalendarEvents] = useState([]);
  const [EventData, setEventData] = useState(null);
  const [BlockStartDate, setBlockStartDate] = useState(null);
  const [BlockEndDate, setBlockEndDate] = useState(null);
  const [BlockNote, setBlockNote] = useState("");
  const [MessageState, setMessageState] = useState("");
  const [MessageSuccess, setMessageSuccess] = useState("");
  const [Loading, setLoading] = useState(true);
  const [selectEvents, setSelectEvents] = useState(null);
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [eventStartDateValidation, setEventStartDateValidation] = useState('');
  const [eventEndDateValidation, setEventEndDateValidation] = useState('');
  const [eventAmount, setEventAmount] = useState(0);
  const [eventAmountValidation, setEventAmountValidation] = useState('');
  const [PropertyCategoryTypes, setPropertyCategoryTypes] = useState([]);
  const [PropertyTransactionStatusID, setPropertyTransactionStatusID] = useState(TransactionStatusID);



  console.log(PropertyTransactionStatusID, 'TransactionStatusID');

  let role = getUserRoles();
  useEffect(() => {
    if (ListData?.length === 0 || !ListData) {
      getProperties(BrokerID, PropertyTransactionStatusID)
        .then((data) => {
          setListData(data.Data);
        })
        .catch((err) => {
          console.log(err);
        }).then(() => {
          setLoading(false);
        });
    }

    if (ListData) {
      setCalendarRowData(ListData[0]);
    }
  }, [ListData, BrokerID]);
  useEffect(() => {
    getProperties(BrokerID, PropertyTransactionStatusID)
      .then((data) => {
        setListData(data.Data);
        setCalendarRowData(data.Data[0]);
      })
      .catch((err) => {
        console.log(err);
      }).then(() => {
        setLoading(false);
      });
  }, [PropertyTransactionStatusID]);

  useEffect(() => {
    if (PropertyCategoryTypes.length === 0) {
      getPropertyCategoryTypes().then(resp => {
        setPropertyCategoryTypes(resp.Data)
      })
    }

  }, [BrokerID])

  useEffect(() => {
    setCalendarEvents([]);
    if (CalendarRowData) {
      getPropertyCalendarEvents(CalendarRowData.propertyID, EmployeeID).then(
        (data) => {
          let d = [];
          for (const datum of data.Data) {
            d.push({
              allDay: datum.allDay,
              backgroundColor: datum.backgroundColor,
              bookedPrice: datum.bookedPrice,
              description: datum.description,
              employeeFirstName: datum.employeeFirstName,
              employeeLastName: datum.employeeLastName,
              start: datum.start + 'T12:00:00',
              end: datum.end + 'T24:00:00',
              leadName: datum.leadName,
              startDate: datum.start,
              endDate: datum.end,
              leadPhone: datum.leadPhone,
              note: datum.note,
              propertyFriendlyName: datum.propertyFriendlyName,
              resourceId: datum.resourceId,
              title: datum.title,
            })
          }
          setCalendarEvents(d);
        }
      );
    }
  }, [CalendarRowData, EmployeeID]);

  const getRowData = (rowID) => {
    readAProperty(rowID).then((data) => {
      setRowData(data.Data);
      console.log("hello", data.Data)
    });
  };
  //console.log(rowData);

  const handleOpenModal = () => {
    setModalState(true);
    // history.push("/property/list/create")
  };

  const handleShowSecondaryImages = () => {
    alert("this is a test");
  }

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

  const handlePropertyCalendarButton = (propertyID, propertyFriendlyName) => {
    setCalendarRowData({
      propertyID: propertyID,
      propertyFriendlyName: propertyFriendlyName,
    });

    setBlockStartDate(null);
    setBlockEndDate(null);
    let BlockStartDateField = document.querySelector("#BlockStartDateField");
    let BlockEndDateField = document.querySelector("#BlockEndDateField");
    BlockStartDateField.value = '';
    BlockEndDateField.value = '';
  };

  const getFormattedDateFromStandard = (date) => {
    alert(date);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    alert(day);
    if (day < 10) {
      day = "0" + day;
    }
    var year = date.getFullYear();
    return year + "/" + month + "/" + day;
  };
  const handleChangeEventPrice = () => {
    setEventStartDateValidation("");
    setEventEndDateValidation("");
    let flag = true;
    if (eventAmount == "" || eventAmount == 0) {
      setEventAmountValidation("Amount must be grater than 0");
      flag = false;
    }
    if (eventStartDate == "") {
      setEventStartDateValidation("Start date can not be blank.");
      flag = false;
    }
    if (eventEndDate == "") {
      setEventEndDateValidation("End date can not be blank.");
      flag = false;
    }
    if (eventStartDate > eventEndDate) {
      setEventEndDateValidation('End date must be grater than or same as start date');
      flag = false;
    }
    if (flag) {
      updatePropertyPrice(EmployeeID, {
        propertyID: selectEvents.resourceId,
        startDate: eventStartDate,
        endDate: eventEndDate,
        dailyMinimumPrice: eventAmount,
        dailySuggestedPrice: eventAmount
      }).then((data) => {
        setSelectEvents(null);
        setCalendarRowData({
          propertyID: selectEvents.resourceId
        });
      });
    }
  };

  const calenderEventClick = (info) => {
    let newInfo = { ...info.event.extendedProps };
    newInfo = { ...newInfo };
    setEventStartDate(newInfo.startDate);
    setEventEndDate(newInfo.endDate);

    let numbAr = info.event.title.match(/\d/g);
    let amount = numbAr.join("");
    setEventAmount(amount)
    newInfo.title = info.event.title;
    // setEventStartDate(`${moment(newInfo.startDate).format("MM/DD/Y")}`);

    setSelectEvents(newInfo)
  };

  let eventPrice = null;
  if (selectEvents != null) {
    eventPrice = (
      <div className="modal fade show" style={{ display: "block", top: '100px' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Property Price</h5>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">Start Date:</label>
                    <input type="date" value={eventStartDate} onChange={(e) => { setEventStartDate(e.target.value) }} className={`form-control ${eventStartDateValidation != "" ? "is-invalid" : ""}`} />
                    {eventStartDateValidation != "" ? (
                      <div className="invalid-feedback">{eventStartDateValidation}</div>
                    ) : null}

                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">End Date:</label>
                    <input type="date" value={eventEndDate} onChange={(e) => { setEventEndDate(e.target.value) }} className={`form-control ${eventEndDateValidation != "" ? "is-invalid" : ""}`} />
                    {eventEndDateValidation != "" ? (
                      <div className="invalid-feedback">{eventEndDateValidation}</div>
                    ) : null}

                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="col-form-label">Amount:</label>
                    <input type="number" value={eventAmount} onChange={(e) => { setEventAmount(e.target.value) }} className={`form-control ${eventAmountValidation != "" ? "is-invalid" : ""}`} />
                    {eventAmountValidation != "" ? (
                      <div className="invalid-feedback">{eventAmountValidation}</div>
                    ) : null}

                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => { setSelectEvents(null) }}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleChangeEventPrice}>Submit</button>
            </div>

          </div>
        </div>
      </div>
    );
  }



  const eventMouseEnter = (info) => {
    let finalStartDate = info.event.extendedProps.startDate;
    let finalEndDate = info.event.extendedProps.endDate;
    let addedDaysToEndDate = info.event.title !== 'BLOCKED' ? 1 : 0;
    finalEndDate = moment(finalEndDate).add(addedDaysToEndDate, "d").format("MM/DD/Y");
    setEventData({
      title: info.event.title,
      note: info.event.extendedProps.note,
      description: info.event.extendedProps.description,
      propertyFriendlyName: info.event.extendedProps.propertyFriendlyName,
      bookedPrice: info.event.extendedProps.bookedPrice,
      start: `${moment(finalStartDate).format("MM/DD/Y")}`,
      end: `${finalEndDate}`,
      agentName: `${info.event.extendedProps.employeeFirstName} ${info.event.extendedProps.employeeLastName}`,
      leadName: info.event.extendedProps.leadName,
      leadPhone: info.event.extendedProps.leadPhone,
    });
  };

  const eventMouseLeave = () => {
    setEventData(null);
  };

  let eventDataCard = null;
  if (EventData) {
    eventDataCard = (
      <div className="eventDataCard">
        <NestedGrid data={[[
          { data: EventData.title, title: 'Price' },
          { data: EventData.note, title: 'Note' },
          { data: EventData.description, title: 'Description' },
        ], [
          { data: `${EventData.start} - ${EventData.end}`, title: 'Date Range' },
          { data: EventData.propertyFriendlyName, title: 'Property Name' },
          { data: EventData.bookedPrice, title: 'Amount' },
        ],
        [
          { data: EventData.agentName, title: 'Agent Name' },
          { data: EventData.leadName, title: 'Lead Name' },
          { data: EventData.leadPhone, title: 'Lead Phone' },
        ]]
        } />
      </div>
    );
  }

  const checkDateValidation = () => {
    // var d1 = new Date(BlockStartDate);
    // var d2 = new Date(BlockEndDate);
    // return d1.getTime() < d2.getTime();
    let startDate = moment(BlockStartDate).format("Y-MM-DD");
    let endDate = moment(BlockEndDate).format("Y-MM-DD");
    return startDate < endDate;
  };

  const startDateValidation = () => {
    let currentDate = moment().format("Y-MM-DD");
    let startDate = moment(BlockStartDate).format("Y-MM-DD");

    return startDate >= currentDate;
  };

  const handleBlockButton = () => {
    if (startDateValidation()) {
      if (checkDateValidation()) {
        if (BlockNote !== "") {

          let data = {
            propertyID: CalendarRowData.propertyID,
            blockedStart: BlockStartDate,
            blockedEnd: BlockEndDate,
            blockNote: BlockNote,
          };
          setBlockNote('');
          console.log(data);
          setBlockStartDate(null);
          setBlockEndDate(null);
          let BlockStartDateField = document.querySelector(
            "#BlockStartDateField"
          );
          let BlockEndDateField = document.querySelector("#BlockEndDateField");
          BlockStartDateField.value = null;
          BlockEndDateField.value = null;
          createBlockedCalendarDates(EmployeeID, data)
            .then((response) => {
              // alert("ASD");
              if (response?.status === 200) {
                setMessageState("show");
                setMessageSuccess("success");
                getPropertyCalendarEvents(
                  CalendarRowData.propertyID,
                  EmployeeID
                ).then((data) => {
                  let d = [];
                  for (const datum of data.Data) {
                    d.push({
                      allDay: datum.allDay,
                      backgroundColor: datum.backgroundColor,
                      bookedPrice: datum.bookedPrice,
                      description: datum.description,
                      employeeFirstName: datum.employeeFirstName,
                      employeeLastName: datum.employeeLastName,
                      start: datum.start + 'T12:00:00',
                      end: datum.end + 'T24:00:00',
                      leadName: datum.leadName,
                      startDate: datum.start,
                      endDate: datum.end,
                      leadPhone: datum.leadPhone,
                      note: datum.note,
                      propertyFriendlyName: datum.propertyFriendlyName,
                      resourceId: datum.resourceId,
                      title: datum.title,
                    })
                  }
                  setCalendarEvents(d);
                }).catch(() => {
                  // alert("ASD");
                });
              } else {
                setMessageState("show");
                setMessageSuccess("failed");
              }
            })
            .catch((err) => {
              console.log(err);
              setMessageState("show");
              setMessageSuccess("failed");
            });
        } else {
          console.log("Note is missing");
          setMessageState("show");
          setMessageSuccess("missingNote");
        }
      } else {
        setMessageState("show");
        setMessageSuccess("notValid");
      }
    } else {
      setMessageState("show");
      setMessageSuccess("oldStartDate");
    }
  };

  let message = null;
  if (MessageState === "show" && MessageSuccess === "success") {
    message = (
      <Alert className={classes.Alert} severity="success">
        Shares created successfully
      </Alert>
    );
    setTimeout(() => {
      setMessageState("");
      setMessageSuccess("");
    }, 3000);
  }
  if (MessageState === "show" && MessageSuccess === "failed") {
    message = (
      <Alert className={classes.Alert} severity="error">
        Some Thing Went Wrong
      </Alert>
    );
    setTimeout(() => {
      setMessageState("");
      setMessageSuccess("");
    }, 3000);
  }
  if (MessageState === "show" && MessageSuccess === "notValid") {
    message = (
      <Alert className={classes.Alert} severity="error">
        End Date Must be After Start Date
      </Alert>
    );
    setTimeout(() => {
      setMessageState("");
      setMessageSuccess("");
    }, 3000);
  }
  if (MessageState === "show" && MessageSuccess === "missingNote") {
    message = (
      <Alert className={classes.Alert} severity="error">
        Note is Required
      </Alert>
    );
    setTimeout(() => {
      setMessageState("");
      setMessageSuccess("");
    }, 3000);
  }
  if (MessageState === "show" && MessageSuccess === "oldStartDate") {
    message = (
      <Alert className={classes.Alert} severity="error">
        Block cannot occur in the past
      </Alert>
    );
    setTimeout(() => {
      setMessageState("");
      setMessageSuccess("");
    }, 3000);
  }

  return !Loading ? (
    <>
      <div className={classes.buttons}>
        {!role.includes("regularAgent") && (
          <Create
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            TransactionStatusID={TransactionStatusID}
            Locations={Locations}
            Owners={Owners}
            AssignedEmployees={AssignedEmployees}
            PropertySearchTypes={PropertySearchTypes}
            Amenities={Amenities}
            PropertyCategoryTypes={PropertyCategoryTypes}
            ModalState={ModalState && CreateModal}
            handleShowSecondaryImages={handleShowSecondaryImages}
            handleSubmitModal={handleSubmitModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            setCreateModal={setCreateModal}
          />
        )}
        <button onClick={() => setPropertyTransactionStatusID(PropertyTransactionStatusID == 1 ? 2 : 1)} className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary">{PropertyTransactionStatusID == 1 ? 'Inactive' : 'Active'} Properties</button>

        <Update
          EmployeeID={EmployeeID}
          BrokerID={BrokerID}
          TransactionStatusID={TransactionStatusID}
          rowData={rowData}
          Locations={Locations}
          Owners={Owners}
          AssignedEmployees={AssignedEmployees}
          PropertySearchTypes={PropertySearchTypes}
          Amenities={Amenities}
          PropertyCategoryTypes={PropertyCategoryTypes}
          ModalState={ModalState && UpdateModal}
          handleShowSecondaryImages={handleShowSecondaryImages}
          handleSubmitModal={handleSubmitModal}
          handleCloseModal={handleCloseModal}
        />
        {eventDataCard}
      </div>
      {eventPrice}

      <div className="row">
        <div className="col-md-6 col-sm-12">
          <DataTable
            getRowData={getRowData}
            rowID="propertyID"
            Update={role.includes("regularAgent") ? false : true}
            handleOpenModal={handleOpenModal}
            setUpdateModal={setUpdateModal}
            openPropertyDetails
            handlePropertyCalendarButton={(propertyID, propertyFriendlyName) => {
              handlePropertyCalendarButton(propertyID, propertyFriendlyName);
            }}
            className={classes.DataTable}
            columns={[
              {
                title: "Property Name", field: "propertyFriendlyName",
              }
            ]}
            nestedFields={[
              { title: "city", field: "city" },
              { title: "image", field: "imageFilePath" },
              { title: "location", field: "location" },
            ]}
            title={PropertyTransactionStatusID == 1 ? 'Active Properties' : 'Inactive Properties'}
            data={ListData}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <div className={classes.calender}>
            <h3>
              Property Calendar for:
              <span>{CalendarRowData?.propertyFriendlyName}</span>
            </h3>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={CalendarEvents}
              // eventMouseEnter={eventMouseEnter}
              eventMouseLeave={eventMouseLeave}
              eventClick={calenderEventClick}
            />

            {!role.includes("regularAgent") && (
              <div className={classes.blockControlsPanel}>
                {message}
                <div className={classes.blockControls}>
                  <TextField
                    id="BlockStartDateField"
                    variant="outlined"
                    color="secondary"
                    value={BlockStartDate}
                    className={classes.TextField}
                    onChange={(e) => {
                      setBlockStartDate(e.target.value);
                    }}
                    type="date"
                    helperText="Block Start *"
                  />
                  <TextField
                    id="BlockEndDateField"
                    variant="outlined"
                    color="secondary"
                    value={BlockEndDate}
                    className={classes.TextField}
                    onChange={(e) => {
                      setBlockEndDate(e.target.value);
                    }}
                    type="date"
                    helperText="Block End *"
                  />
                  <TextField
                    required
                    id="BlockEndDateField"
                    label="Note"
                    variant="outlined"
                    color="secondary"
                    value={BlockNote}
                    className={classes.TextField}
                    onChange={(e) => {
                      setBlockNote(e.target.value);
                    }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.TextField}
                    onClick={handleBlockButton}
                  >
                    Block
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

    </>
  ) : (
    <div className={"container"}>
      <div className="container spinner-center spinner spinner-primary spinner-lg mr-15"></div>
    </div>
  );
};

export default List;
