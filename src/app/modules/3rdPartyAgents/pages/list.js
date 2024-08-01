import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableBodyRow } from "material-table";
import { Box } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import { get3rdPartyAgents } from "../apiCalls/3rdpartyagentsCrud";
import { BoxContainer, PrimaryHeading, tableContent, lastColumnsContent, useStyles } from '../../../baseStyle'

import CustomButton from '../../../../components/customButton/index';
import CustomDropDown from '../../../../components/customDropDown'
import CustomPagination from '../../../../components/pagination/Pagination'
import TableSearchHandling from '../../../../components/tableSearchHandling'
import { PartyListContainer } from './style'


const List = ({ EmployeeID, BrokerID, TransactionStatusID }) => {
    const classes = useStyles()
    const history = useHistory()
    const [ListData, setListData] = useState(null);
    const [loadingCarsData, setloadingCarsData] = useState(true)
    const [searchInputValue, setsearchInputValue] = useState('')
    const [searchSelectedValue, setsearchSelectedValue] = useState('employeeFirstName')
    const tableOptions = ['View Details', 'Edit']

    const tableColumn = [
        {
            title: 'Name', field: 'name',
            cellStyle: tableContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Brokerage', field: 'brokerage',
            cellStyle: tableContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Email', field: 'email',
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
            id: item.employeeID,
            name: item.employeeFirstName + item.employeeLastName,
            brokerage: item.brokerage,
            email: item.email,
        }
    })

    const tableMunuHandler = (option, value) => {
        if (option === 'View Details') {
            history.push(`/3rd-party-agents/viewpartyagentdetail/${value.id}`)
        }
        else if (option === 'Edit') {
            history.push(`/3rd-party-agents/editpartyagent/${value.id}`)
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
            const sorted = ListData.sort((a, b) => a.employeeFirstName.toLowerCase() > b.employeeFirstName.toLowerCase() ? 1 : -1);
            setListData([...sorted])
        }
        else if (order === 'dsc') {
            const sorted = ListData.sort((a, b) => a.employeeFirstName.toLowerCase() < b.employeeFirstName.toLowerCase() ? 1 : -1);
            setListData([...sorted])
        }
    }

    const navigateHandler = () => {
        history.push('/3rd-party-agents/addnewpartyagent')
    }

    useEffect(() => {
        if (ListData?.length === 0 || !ListData) {
            get3rdPartyAgents(BrokerID, EmployeeID)
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
        <PartyListContainer>
            <BoxContainer>
                <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
                <CustomButton type='button' text='Create 3rd Party Agent' click={navigateHandler} />
            </BoxContainer>
            <div className='partyListing_content' >
                <div className='partyListing_heading' >
                    <PrimaryHeading>3rd Party Agents</PrimaryHeading>
                </div>
                <MaterialTable
                    data={tableData}
                    columns={tableColumn}
                    isLoading={loadingCarsData}
                    options={{
                        search: false,
                        showTitle: false,
                        toolbar: false,
                    }}
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
        </PartyListContainer >
    )
}

export default List;