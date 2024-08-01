import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableBodyRow } from "material-table";
import { useHistory } from 'react-router-dom'
import { getDiscountRange } from "../apiCalls/discountSettingCrud";
import { BoxContainer, PrimaryHeading, tableContent, lastColumnsContent, useStyles } from '../../../baseStyle'

import CustomButton from '../../../../components/customButton/index';
import CustomDropDown from '../../../../components/customDropDown'
import CustomPagination from '../../../../components/pagination/Pagination'
import TableSearchHandling from '../../../../components/tableSearchHandling'
import { DiscountListContainer } from './style'


const List = ({ EmployeeID, BrokerID, TransactionStatusID }) => {
    const classes = useStyles()
    const history = useHistory()
    const [ListData, setListData] = useState(null);
    const [loadingDiscountState, setLoadingDiscountState] = useState(true)
    const [searchInputValue, setsearchInputValue] = useState('')
    const [searchSelectedValue, setsearchSelectedValue] = useState('firstName')
    const tableOptions = ['View Details', 'Edit'];

    const tableColumn = [
        {
            title: 'Discount Range Id', field: 'propertyDiscountDateRangeID',
            cellStyle: tableContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Discount Range Name', field: 'dateRangeName',
            cellStyle: tableContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Transaction Status Date', field: 'transactionStatusDate',
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
            propertyDiscountDateRangeID: item.propertyDiscountDateRangeID,
            dateRangeName: item.dateRangeName,
            transactionStatusDate: item.transactionStatusDate,
        }
    })

    const tableMunuHandler = (option, value) => {
        if (option === 'View Details') {
            history.push(`/discountSetting/viewDiscountdetail/${value.propertyDiscountDateRangeID}`)
        }
        else if (option === 'Edit') {
            history.push(`/discountSetting/editDiscount/${value.propertyDiscountDateRangeID}`)
        }
    }





    const navigateHandler = () => {
        history.push('/discountSetting/create')
    }

    useEffect(() => {
        if (ListData?.length === 0 || !ListData) {
            getDiscountRange(3, BrokerID)
                .then((data) => {
                    if (data.Data != null) {
                        setListData(data.Data);
                    } else {
                        setListData([]);
                    }
                    setLoadingDiscountState(false);
                })
                .catch((err) => {
                    setLoadingDiscountState(false);
                    console.log(err);
                });
        }
    }, [ListData, BrokerID, EmployeeID]);

    return (
        <DiscountListContainer>
            <BoxContainer>
                <h1>select</h1>
                <CustomButton type='button' text='Create Discount Range' click={navigateHandler} />
            </BoxContainer>
            <div className='leadListing_content' >
                <div className='leadListing_heading' >
                    <PrimaryHeading>Discount Setting</PrimaryHeading>
                </div>
                <MaterialTable
                    data={tableData}
                    columns={tableColumn}
                    isLoading={loadingDiscountState}
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
        </DiscountListContainer>
    )
}

export default List;