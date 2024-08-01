import React, { useState, useEffect, useCallback } from 'react';
import MaterialTable, { MTableBodyRow } from "material-table";
import { useHistory } from 'react-router-dom'
import { getYachts, updateYacht } from "../apiCalls/yachtCrud";
import CustomDropDown from '../../../../components/customDropDown'
import CustomButton from '../../../../components/customButton/index';
import CustomPagination from '../../../../components/pagination/Pagination';
import TableSearchHandling from '../../../../components/tableSearchHandling'
import { YachtListContainer } from './style'
import { BoxContainer, PrimaryHeading, tableContent, lastColumnsContent, useStyles } from "../../../baseStyle"


const List = ({ EmployeeID, BrokerID }) => {
    const classes = useStyles()
    const history = useHistory()
    const [ListData, setListData] = useState(null);
    const [loadingCarsData, setloadingCarsData] = useState(true)
    const [searchInputValue, setsearchInputValue] = useState('')
    const [searchSelectedValue, setsearchSelectedValue] = useState('friendlyName')
    const tableOptions = ['View Details', 'Edit', 'Delete'];


    useEffect(() => {
        if (ListData?.length === 0 || !ListData) {
            getYachts(BrokerID, EmployeeID)
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
            title: 'Total Feet', field: 'totalfeet',
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
            totalfeet: item.totalFeet,
        }
    })

    const tableMunuHandler = (option, value) => {
        if (option === 'View Details') {
            history.push(`/yacht/viewYachtDetail/${value.id}`)
        }
        else if (option === 'Edit') {
            history.push(`/yacht/editYacht/${value.id}`)
        }
        else if (option === 'Delete') {
            const selectedYacth = ListData.find((item) => item.transportationObjectID === value.id)
            yatchDeleteHandler(selectedYacth)
        }
    }

    const yatchDeleteHandler = useCallback((values) => {
        setloadingCarsData(true)
        updateYacht(EmployeeID, BrokerID, { ...values, transactionStatusID: 0 })
            .then((res) => {
                getYachts(BrokerID, EmployeeID)
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
            })
            .catch((err) => {
                alert('some thing')
            })
    }, [])

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
        history.push('/yacht/addNewYatch')
    }



    return (
        <YachtListContainer>
            <BoxContainer>
                <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
                <CustomButton type='button' click={navigateHandler} text='Create Yacht' />
            </BoxContainer>
            <div className='yachtListing_content' >
                <div className='yachtListing_heading' >
                    <PrimaryHeading>Yacht</PrimaryHeading>
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
        </YachtListContainer>
    )
}

export default List;