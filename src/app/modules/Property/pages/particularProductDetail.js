import React, { useState, useEffect } from 'react'
import { Formik } from 'formik';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useParams, useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { getPropertyCalendarEvents, getProperties } from "../apiCalls/propertyCrud";
import { ParticularProductDetailContent } from './style';
import TableSearchHandling from '../../../../components/tableSearchHandling';
import CustomFormControl from "../../../../components/formControl";
import CustomButton from '../../../../components/customButton/index'
import getEmployeeID from "../../../../api/getEmployeeID";
import { PropertyListContainer, Panel } from './style';
import getBrokerID from "../../../../api/getBrokerID";
import { BoxContainer, PrimaryHeading } from '../../../baseStyle';
import { eventsData } from './data';


const ParticularProductDetail = () => {
    const location = useLocation()
    const name = location.state
    const BrokerID = getBrokerID();
    const EmployeeID = getEmployeeID();
    const [CalendarEvents, setCalendarEvents] = useState([]);
    const { propertyIdParam, transactionIdParam } = useParams();
    const [CalendarRowData, setCalendarRowData] = useState(null);
    console.log('location', location)

    const initialValues = { startBlock: '', endBlock: '', note: '' }
    const propertyValues = { startdate: '', enddate: '', amount: '' }

    const calendarEventClick = (info) => {
        const newInfo = { ...info.event.extendedProps, title: info.event.title }
        setCalendarEvents(newInfo)
    }

    useEffect(() => {
        getProperties(BrokerID, transactionIdParam)
            .then((data) => {
                const selectedProperty = data.Data.find((id) => id.propertyID == propertyIdParam)
                setCalendarRowData(selectedProperty);
            })
            .catch((err) => {
                console.log(err);
            })

        return () => setCalendarRowData(null)

    }, []);


    useEffect(() => {
        if (CalendarRowData) {
            getPropertyCalendarEvents(CalendarRowData.propertyID, EmployeeID).then(
                (data) => {
                    let d = [];
                    for (const datum of data.Data) {
                        d.push({
                            allDay: datum.allDay,
                            // backgroundColor: datum.backgroundColor,
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

        return () => setCalendarEvents([])

    }, [CalendarRowData, EmployeeID]);


    const handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
        // console.log(arg.view.getCurrentData(), 'arg')
    }

    return (
        <ParticularProductDetailContent>
            <BoxContainer>
                <TableSearchHandling />
                <CustomButton type='button' text='Create Property' />
            </BoxContainer>
            <div className='particularProductDetailContent_heading'>
                <PrimaryHeading>{name}</PrimaryHeading>
            </div>
            <div className='particularProductDetailContent_tables'>
                <div className='particularProductDetailContent_tables_left'>
                    <FullCalendar
                        selectable={true}
                        events={CalendarEvents}
                        initialView="dayGridMonth"
                        dateClick={handleDateClick}
                        plugins={[interactionPlugin, dayGridPlugin]}
                    // eventClick={calendarEventClick}
                    // customButtons={{
                    //     myCustomButton: {
                    //         text: 'Today',

                    //         click: function () {
                    //             alert('clicked the custom button!');
                    //         }
                    //     }
                    // }}
                    // headerToolbar={{
                    //     start: 'title',
                    //     center: 'myCustomButton',
                    //     end: "prev,next",
                    // }}

                    />
                    <div className="particularProductDetailContent_tables_left_form">
                        <Formik
                            initialValues={initialValues}
                        >
                            {(formik) => (
                                <form
                                    autoComplete="off"
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div className="custom_form_fields">
                                        <CustomFormControl
                                            control="date"
                                            name="blockStart"
                                            placeholder="Select Date"
                                            label="Block Start:"
                                        />
                                        <CustomFormControl
                                            control="date"
                                            name="blockEnd"
                                            placeholder="Select Date"
                                            label="Block End:"
                                        />
                                    </div>

                                    <CustomFormControl
                                        control="input"
                                        type="text"
                                        name="note"
                                        placeholder="Note"
                                        label='Note:'
                                    />

                                    <CustomButton type='submit' width='130px' text="Block" />
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className='particularProductDetailContent_tables_right'>
                    <div className='particularProductDetailContent_tables_right_title'>
                        <h1>Change Property Price</h1>
                    </div>
                    <Formik
                        initialValues={propertyValues}
                    >
                        {(formik) => (
                            <form
                                autoComplete='off'
                                onSubmit={formik.handleSubmit}
                            >
                                <div className="custom_form_fields">
                                    <CustomFormControl
                                        control="date"
                                        name="startDate"
                                        label="Start Date:"
                                        placeholder="Select Date"
                                    />
                                    <CustomFormControl
                                        control="date"
                                        name="endDate"
                                        label="End Date:"
                                        placeholder="Select Date"
                                    />
                                </div>
                                <div className="property-amount">
                                    <CustomFormControl
                                        control="input"
                                        type="number"
                                        name="amount"
                                        label='Amount:'
                                        placeholder="$54,321"
                                    />
                                </div>
                                <div className="control-buttons">
                                    <CustomButton type='button' color='#555BB3' bgColor='transparent' width='130px' text="Cancel" />
                                    <CustomButton type='submit' color='#FFFFFF' bgColor='#555BB3' text="Submit" />
                                </div>
                            </form>
                        )}
                    </Formik>
                    <div className='particularProductDetailContent_tables_right_data'>
                        <Typography component='p'>
                            Price:
                            <Typography component='span'>{CalendarEvents.title}</Typography>
                        </Typography>

                        <Typography component='p'>
                            Note:
                            <Typography component='span'>{CalendarEvents.note}</Typography>
                        </Typography>

                        <Typography component='p'>
                            Description:
                            <Typography component='span'>{CalendarEvents.description}</Typography>
                        </Typography>

                        <Typography component='p'>
                            Date Range:
                            <Typography component='span'>----</Typography>
                        </Typography>

                        <Typography component='p'>
                            Property Name:
                            <Typography component='span'>{CalendarEvents.propertyFriendlyName}</Typography>
                        </Typography>
                        <Typography component='p'>
                            Amount:
                            <Typography component='span'>----</Typography>
                        </Typography>

                        <Typography component='p'>
                            Agent Name:
                            <Typography component='span'>----</Typography>
                        </Typography>

                        <Typography component='p'>
                            Lead Name:
                            <Typography component='span'>{CalendarEvents.leadName}</Typography>
                        </Typography>

                        <Typography component='p'>
                            Lead Phone:
                            <Typography component='span'>{CalendarEvents.leadPhone}</Typography>
                        </Typography>
                    </div>
                </div>
            </div>
        </ParticularProductDetailContent >
    )
}

export default ParticularProductDetail