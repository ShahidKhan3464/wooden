import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableBodyRow } from "material-table";
import { useHistory } from 'react-router-dom'
import { getLeads } from "../apiCalls/leadCrud";
import { BoxContainer, PrimaryHeading, tableContent, lastColumnsContent, useStyles } from '../../../baseStyle'

import CustomButton from '../../../../components/customButton/index';
import CustomDropDown from '../../../../components/customDropDown'
import CustomPagination from '../../../../components/pagination/Pagination'
import TableSearchHandling from '../../../../components/tableSearchHandling'
import { LeadListContainer } from './style'


const List = ({ EmployeeID, BrokerID, TransactionStatusID }) => {
    const classes = useStyles()
    const history = useHistory()
    const [ListData, setListData] = useState(null);
    const [loadingCarsData, setloadingCarsData] = useState(true)
    const [searchInputValue, setsearchInputValue] = useState('')
    const [searchSelectedValue, setsearchSelectedValue] = useState('firstName')
    const tableOptions = ['View Details', 'Edit'];

    const tableColumn = [
        {
            title: 'Name', field: 'name',
            cellStyle: tableContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Email', field: 'email',
            cellStyle: tableContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Phone', field: 'phone',
            cellStyle: lastColumnsContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Lead Revenue', field: 'leadrevenue',
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
            id: item.leadID,
            name: item.firstName + item.lastName,
            email: item.email,
            phone: item.phone,
            leadrevenue: item.revenueFromLead
        }
    })

    const tableMunuHandler = (option, value) => {
        if (option === 'View Details') {
            history.push(`/lead/viewleaddetail/${value.id}`)
        }
        else if (option === 'Edit') {
            history.push(`/lead/editlead/${value.id}`)
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
            const sorted = ListData.sort((a, b) => a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1);
            setListData([...sorted])
        }
        else if (order === 'dsc') {
            const sorted = ListData.sort((a, b) => a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1);
            setListData([...sorted])
        }
    }

    const navigateHandler = () => {
        history.push('/lead/addnewlead')
    }

    useEffect(() => {
        if (ListData?.length === 0 || !ListData) {
            getLeads(BrokerID, EmployeeID)
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
        <LeadListContainer>
            <BoxContainer>
                <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
                <CustomButton type='button' text='Create Lead' click={navigateHandler} />
            </BoxContainer>
            <div className='leadListing_content' >
                <div className='leadListing_heading' >
                    <PrimaryHeading>Leads</PrimaryHeading>
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
        </LeadListContainer>
    )
}

export default List;