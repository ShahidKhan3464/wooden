import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box } from "@material-ui/core";
import { useParams } from 'react-router-dom';



import getEmployeeID from "../../../../api/getEmployeeID";
import getBrokerID from "../../../../api/getBrokerID";
import { getPropertyCalendarEvents, getProperties } from "../apiCalls/propertyCrud";
import TableSearchHandling from '../../../../components/tableSearchHandling';
import CustomButton from '../../../../components/customButton/index';

import { PerticulerProductDetailContainer } from './style'

const PropertyProductDetail = () => {

    const { propertyIdParam, transactionIdParam } = useParams();

    const searchInputHandler = () => null
    const searchSelctionHanlder = () => null
    const sortingHadler = () => null


    const EmployeeID = getEmployeeID();
    const BrokerID = getBrokerID();



    const [CalendarEvents, setCalendarEvents] = useState([]);
    const [CalendarRowData, setCalendarRowData] = useState(null);

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





    console.log(CalendarEvents, 'CalendarEvents');




    return (
        <PerticulerProductDetailContainer>
            <Box display='flex' justifyContent='space-between' mb={5} >
                <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
                <CustomButton text='CREATE Property' radius='10px' color='white' bgColor='#5C58A5' width='191px' height='51px' fontSize='14px' />
            </Box>
            <div className='perticulerProductDetail_content' >
                <div className='perticulerProductDetail_content_tables' >
                    <div className='perticulerProductDetail_content_tables_one' >
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={CalendarEvents}
                        />
                    </div>
                    <div className='perticulerProductDetail_content_tables_two' >
                        <div className='perticulerProductDetail_content_tables_two_content' >
                            <div className='perticulerProductDetail_content_tables_two_content_propertyPrice' >
                                <h1>Change Property Price</h1>
                                <div className='perticulerProductDetail_content_tables_two_content_propertyPrice_form' >
                                    {/* <h1>Form</h1> */}
                                </div>
                            </div>
                            <div className='perticulerProductDetail_content_tables_two_content_heading' ></div>
                        </div>
                    </div>
                </div>
            </div>
        </PerticulerProductDetailContainer>
    )
}

export default PropertyProductDetail