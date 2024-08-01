import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import Create from "./create";
import Createhold from "./createhold";
import getUserRoles from "./../../../../api/getUserRoles";

import { useHistory } from 'react-router-dom'
import { CalendarListContainer } from './style'
import Button from '../../../../components/customButton/index'

import {
  getPropertyCalendarEventResources,
  getPropertyCalendarEvents,
  deleteCalenderEvent,
  deleteCalenderEventHolds,
  deactivateBlockedCalendarDates
} from "../apiCalls/CalendarViewCrud";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginBottom: "20px",
    minHeight: "150px",
    "& .eventDataCard": {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      flexBasis: "auto",
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
  body: {
    display: "flex",
    alignItems: "flex-start",
    "& .DataTable": {
      flexBasis: "50%",
      marginRight: "20px",
    }
  },
  myfc: {
    marginTop: '40px',
    padding: "24px",
    background: "white",
    borderRadius: "5px",
    boxShadow: `
      0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%),
      0px 1px 5px 0px rgb(0 0 0 / 12%)
    `,
  },
  blockControlsPanel: {
    marginTop: "20px",
    padding: "20px 20px",
    borderTop: "1px solid #d5d5d5",
  },
  blockControls: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

  TextField: {
    marginRight: "10px",
  },
  Alert: {
    width: "100%",
    marginBottom: "20px",
  },

}));

const List = ({
  BrokerID,
  EmployeeID,
}) => {

  const classes = useStyles();
  const history = useHistory();
  const [ModalState, setModalState] = useState(false);
  const [CreateModal, setCreateModal] = useState(false);
  const [ListData, setListData] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [EventData, setEventData] = useState(null);
  const [Resources, setResources] = useState(null);
  const [Events, setEvents] = useState(null);
  const [selectEvents, setSelectEvents] = useState(null);
  const [deleteNote, setDeleteNote] = useState(null);
  const [deleteNoteValid, setDeleteNoteValid] = useState(true);
  const [height, setHeight] = useState('600px');


  const [HoldModalState, setHoldModalState] = useState(false);
  const [HoldCreateModal, setHoldCreateModal] = useState(false);


  const ref = useRef(null);
  const getPropertiesResources = (EmployeeID, BrokerID) => {
    getPropertyCalendarEventResources(EmployeeID, BrokerID)
      .then((data) => {
        setResources(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let role = getUserRoles();

  const getPropertiesEvents = (EmployeeID) => {
    getPropertyCalendarEvents(EmployeeID)
      .then((data) => {
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
            inquiryID: datum.inquiryID,
            propertyId: datum.resourceId
          })
        }
        setEvents(d);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getPropertiesResources(EmployeeID, BrokerID);
    getPropertiesEvents(EmployeeID);

  }, [EmployeeID, BrokerID]);

  useEffect(() => {
    if (ref.current !== null) {
      setHeight(`${ref.current.clientHeight}px`)
    }

  })

  const handleOpenModal = () => {
    setModalState(true);
  };

  const handleOpenModalHold = () => {
    setHoldModalState(true);
  };

  const handleSubmitModal = () => {
    setModalState(false);
    setCreateModal(false);
    setRowData(null);
    setListData(null);
    getPropertiesEvents(EmployeeID);
  };

  const handleSubmitModalHold = () => {
    setHoldModalState(false);
    setHoldCreateModal(false);
    setRowData(null);
    setListData(null);
    getPropertiesEvents(EmployeeID);
  };

  const handleCloseModal = () => {
    setModalState(false);
    setCreateModal(false);
    setRowData(null);
  };

  const handleCloseModalHold = () => {
    setHoldModalState(false);
    setHoldCreateModal(false);
    setRowData(null);
  };

  const eventMouseEnter = (info) => {
    setEventData({
      title: info.event.title,
      allDay: info.event.allDay,
      description: info.event.extendedProps.description,
      propertyFriendlyName: info.event.extendedProps.propertyFriendlyName,
      bookedPrice: info.event.extendedProps.bookedPrice,
      start: info.event._instance.range.start,
      end: info.event._instance.range.end,
      agentName: `${info.event.extendedProps.employeeFirstName} ${info.event.extendedProps.employeeLastName}`,
      leadName: info.event.extendedProps.leadName,
      leadPhone: info.event.extendedProps.leadPhone,
    });
  };

  const calenderEventClick = (info) => {
    if (!role.includes("regularAgent")) {
      if (info.event.extendedProps.description === "Booked" || info.event.extendedProps.description === "On Hold" || info.event.extendedProps.description === "Blocked") {

        let newInfo = { ...info.event.extendedProps };
        if (info.event.extendedProps.description === "Booked") {
          newInfo.type = "Booking";
        } else if (info.event.extendedProps.description === "On Hold") {
          newInfo.type = "Hold";

        } else if (info.event.extendedProps.description === "Blocked") {
          newInfo.type = "Blocked";

        }
        setDeleteNote(null)
        setDeleteNoteValid(true)
        setModalState(true);
        setSelectEvents(newInfo)
      }
    }
  };

  const eventMouseLeave = () => {
    setEventData(null);
  };

  const handleDeleteNote = () => {
    if (deleteNote !== null) {

      if (selectEvents.description === "Booked") {
        deleteCalenderEvent({ employeeID: EmployeeID, brokerID: BrokerID, note: deleteNote, inquiryId: selectEvents.inquiryID }).then((data) => {
          console.log(data);
          setSelectEvents(null);
          getPropertiesEvents(EmployeeID);
        });
      } else if (selectEvents.description === "On Hold") {
        deleteCalenderEventHolds({ employeeID: EmployeeID, brokerID: BrokerID, note: deleteNote, inquiryId: selectEvents.inquiryID }).then((data) => {
          console.log(data);
          setSelectEvents(null);
          getPropertiesEvents(EmployeeID);
        });
      } else if (selectEvents.description === "Blocked") {
        deactivateBlockedCalendarDates({ propertyID: selectEvents.propertyId, blockedStart: selectEvents.startDate, blockNote: deleteNote, blockedEnd: selectEvents.endDate }, EmployeeID).then((data) => {
          console.log(data);
          setSelectEvents(null);
          getPropertiesEvents(EmployeeID);
        });
      }

    } else {
      setDeleteNoteValid(false)
    }
  }

  let eventDataCard = null;
  if (EventData) {
    eventDataCard = (
      <div className="eventDataCard">
        <h4>Price: {EventData.title}</h4>
        <h4>All Day: {EventData.allDay ? "Yes" : "No"}</h4>
        <h4>Description: {EventData.description}</h4>

        <h4>Property Name: {EventData.propertyFriendlyName}</h4>
        <h4>Amount: {EventData.bookedPrice}</h4>
        <h4>
          Date Range: {EventData.start} - {EventData.end}
        </h4>
        <h4>Agent Name: {EventData.agentName}</h4>
        <h4>Lead Name: {EventData.leadName}</h4>
        <h4>Lead Phone: {EventData.leadPhone}</h4>
      </div>
    );
  }

  let eventDelete = null;
  if (selectEvents !== null) {
    eventDelete = (
      <div className="modal fade show" style={{ display: "block", top: '100px' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Remove {selectEvents.type}</h5>
            </div>
            <form>
              <div className="modal-body">
                <div className="">
                  <label className="col-form-label">Property name: </label>
                  {selectEvents.propertyFriendlyName}
                </div>
                <div className="">
                  <label className="col-form-label">Start Date: </label>
                  {selectEvents.startDate}
                </div>
                <div className="">
                  <label className="col-form-label">End Date: </label>
                  {selectEvents.endDate}
                </div>

                <div className="form-group">
                  <label className="col-form-label">Note:</label>
                  <textarea onChange={(e) => { setDeleteNote(e.target.value) }} className={`form-control ${!deleteNoteValid ? "is-invalid" : ""}`}></textarea>
                  {!deleteNoteValid ? (
                    <div className="invalid-feedback">Please enter note.</div>
                  ) : null}

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => { setSelectEvents(null) }}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleDeleteNote}>Remove {selectEvents.type}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const createQuickBook = () => {
    history.push('/CalendarView/createQuickBook')
  }

  const createQuickHold = () => {
    history.push('/CalendarView/createQuickHold')
  }


  return Events ? (
    <>
      {/* <div style={{ marginLeft: "32px", display: "inline-block" }}>
        {(role.includes("superAdmin") || role.includes("leadsAdmin") || role.includes("financeAdmin")) && (

          <Create
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            Properties={Resources}
            ModalState={ModalState && CreateModal}
            handleSubmitModal={handleSubmitModal}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            setCreateModal={setCreateModal}
          />

        )}
      </div>
      <div style={{ marginLeft: "16px", display: "inline-block" }}>
        {(role.includes("superAdmin") || role.includes("leadsAdmin") || role.includes("financeAdmin") || role.includes("regularAgent")) && (

          <Createhold
            EmployeeID={EmployeeID}
            BrokerID={BrokerID}
            Properties={Resources}
            ModalState={HoldModalState && HoldCreateModal}
            handleSubmitModal={handleSubmitModalHold}
            handleCloseModal={handleCloseModalHold}
            handleOpenModal={handleOpenModalHold}
            setCreateModal={setHoldCreateModal}
          />

        )}
      </div> */}
      {/* {eventDelete} */}
      <CalendarListContainer>
        <div className="calendarList_content">
          <div className="calendarList_content_buttons">
            <Button type='button' click={createQuickBook} text="Create a Quickbook" />
            <Button type='button' click={createQuickHold} text="Create a Quickhold" />
          </div>

          <div
            // className={classes.myfc}
            className="calendarList_content_fullCalendar"
            ref={ref}
          >
            <FullCalendar
              schedulerLicenseKey="0767391820-fcs-1619616036"
              resourceGroupField="location"
              resourceOrder='location,propertyCategoryTypeID,monthlySuggestedPrice,title'
              height={height}
              stickyFooterScrollbar="true"
              resourcesInitiallyExpanded={false}
              plugins={[resourceTimelinePlugin]}
              resourceAreaWidth={(window.innerWidth <= 500) ? "37%" : "18%"}
              initialView="resourceTimelineMonth"
              resources={Resources}
              events={Events}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth",
              }}
              buttonText={{
                day: 'days',
                month: 'months',
                week: 'weeks',
              }}


              slotLabelFormat={[
                { month: "long", year: "numeric" }, // top level of text
                { weekday: "short" }, // lower level of text
                { day: "numeric" },
              ]}
              resourceAreaHeaderContent="Properties"
              eventMouseEnter={eventMouseEnter}
              eventMouseLeave={eventMouseLeave}
              eventClick={calenderEventClick}
            />
          </div>
        </div>
      </CalendarListContainer>
      {/*</div>*/}
    </>
  ) : (
    <div className={"container"}>
      <div className="container spinner-center spinner spinner-primary spinner-lg mr-15"></div>
    </div>
  );
};

export default List;
/*
..
let calendar = new Calendar(calendarEl, {
  plugins: [ resourceTimelinePlugin ],
  initialView: 'resourceTimeline',
  resources: [
    // your resource list
  ]
});
...
*/
