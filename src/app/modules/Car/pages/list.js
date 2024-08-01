import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableBodyRow } from "material-table";
import { makeStyles } from "@material-ui/core";
import { useHistory } from 'react-router-dom'

import { getCars } from "../apiCalls/carCrud";
import CustomDropDown from '../../../../components/customDropDown'
import CustomButton from '../../../../components/customButton/index';
import { BoxContainer, PrimaryHeading, tableContent, lastColumnsContent, useStyles } from '../../../baseStyle'
import CustomPagination from '../../../../components/pagination/Pagination';
import TableSearchHandling from '../../../../components/tableSearchHandling'
import { CarListContainer } from './style'
import { gridColumnsTotalWidthSelector } from '@material-ui/data-grid';

const List = ({ EmployeeID, BrokerID }) => {
    const classes = useStyles()
    const history = useHistory()
    const [ListData, setListData] = useState(null);
    const [loadingCarsData, setloadingCarsData] = useState(true)
    const [searchInputValue, setsearchInputValue] = useState('')
    const [searchSelectedValue, setsearchSelectedValue] = useState('friendlyName')
    const tableOptions = ['View Details', 'Edit'];

    const tableColumn = [
        {
            title: 'Name', field: 'name',
            cellStyle: tableContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'No. of Seats', field: 'noOfSeats',
            cellStyle: tableContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Transmission Type', field: 'transmissionType',
            cellStyle: lastColumnsContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Daily Rate', field: 'dailyRate',
            cellStyle: lastColumnsContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: '0 to 60', field: 'digites',
            cellStyle: lastColumnsContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: '', field: 'action',
            cellStyle: { textAlign: 'right' },
            headerStyle: { textAlign: 'right' },
            render: item => (
                <CustomDropDown tableOptions={tableOptions} tableMunuHandler={tableMunuHandler} data={item} />
            ),
        }
    ]

    const searchedValue = ListData?.filter((item) => searchInputValue === '' ? item : item[searchSelectedValue].toLowerCase().includes(searchInputValue?.toLowerCase()))
    const tableData = searchedValue?.map((item) => {
        return {
            id: item.transportationObjectID,
            name: item.friendlyName,
            noOfSeats: item.numberOfSeats,
            transmissionType: item.transmissionType,
            dailyRate: item.dailyRate,
            digites: item.zeroTo60
        }
    })

    const tableMunuHandler = (option, value) => {
        if (option === 'View Details') {
            history.push(`/car/viewCarDetail/${value.id}`)
        }
        else if (option === 'Edit') {
            history.push(`/car/editCar/${value.id}`)
        }
    }

    const searchInputHandler = (value) => {
        setsearchInputValue(value.trim())
    }

    const searchSelctionHanlder = (value) => {
        if (value === 'name') {
            setsearchSelectedValue('propertyFriendlyName')
        }
        else if (value === 'city') {
            setsearchSelectedValue('city')
        }
        else if (value === 'location') {
            setsearchSelectedValue('location')
        }
    }

    const sortingHadler = (order) => {
        if (order === 'asc') {
            const sorted = ListData.sort((a, b) => a.friendlyName.toLowerCase() > b.friendlyName.toLowerCase() ? 1 : -1);
            setListData([...sorted])
        }
        else if (order === 'dsc') {
            const sorted = ListData.sort((a, b) => a.friendlyName.toLowerCase() < b.friendlyName.toLowerCase() ? 1 : -1);
            setListData([...sorted])
        }
    }

    const navigateHandler = () => {
        history.push('/car/addNewCar')
    }

    useEffect(() => {
        if (ListData?.length === 0 || !ListData) {
            getCars(BrokerID, EmployeeID)
                .then((data) => {
                    if (data.Data != null) {
                        setListData(data.Data);
                    } else {
                        setListData([]);
                    }
                    setloadingCarsData(false);
                })
                .catch((err) => {
                    setloadingCarsData(false);
                    console.log(err);
                });
        }
    }, [ListData, BrokerID, EmployeeID]);

    return (
        <CarListContainer>
            <BoxContainer>
                <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
                <CustomButton type='button' click={navigateHandler} text='Create Car' />
            </BoxContainer>
            <div className='carListing_content' >
                <div className='carListing_heading' >
                    <PrimaryHeading>Cars</PrimaryHeading>
                </div>
                <MaterialTable
                    data={tableData}
                    columns={tableColumn}
                    isLoading={loadingCarsData}
                    //   actions={actions}
                    options={{ search: false, toolbar: false, showTitle: false }}
                    components={{
                        // Pagination: (props) => {
                        //     return <CustomPagination {...props} />;
                        // },
                        Row: (props) => {
                            return <MTableBodyRow className={classes.tableRow} {...props} />
                        }
                    }}
                //   onSelectionChange={onSelectionChange}
                //   detailPanel={props.nestedFields ? detailPanel : null}
                //   onRowClick={handleRowClick}
                />
            </div>
        </CarListContainer>
    )
}

export default List;