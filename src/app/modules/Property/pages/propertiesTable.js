import React, { useCallback } from 'react';
import MaterialTable, { MTableBodyRow } from "material-table";
import { useHistory, Link } from 'react-router-dom';
import { deleteProperty, updateFeatureProperty } from '../apiCalls/propertyCrud';
import CustomPagination from '../../../../components/pagination/Pagination';
import CustomDropDown from '../../../../components/customDropDown';
import CustomAlert from '../../../../components/customAlert';
import rightArrow from '../../../../img/rightArrow.png';
import { nopicture } from '../../../../img';
import { tableContent, lastColumnsContent, useStyles } from '../../../baseStyle';
import { ContactSupportOutlined } from '@material-ui/icons';
import { useEffect } from 'react';

const PropertyTable = ({ BrokerID, EmployeeID, TransactionStatusID, data, PropertyTransactionStatusID }) => {
    const classes = useStyles()
    const history = useHistory();
    const tableOptions = ['Featured', 'View Details', 'Edit', 'Delete'];
    const bodyCellImage = { width: '120px', height: '88px', objectFit: 'cover' }
    const bodyCellLink = { fontFamily: 'Manrope', fontWeight: '700', fontSize: '16px', color: '#555BB3', lineHeight: '24px' }

    const tableColumn = [
        {
            title: 'Property ID', field: 'propertyId',
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Image', field: 'image',
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Name', field: 'name',
            cellStyle: tableContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'City', field: 'city',
            cellStyle: tableContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: 'Location', field: 'location',
            cellStyle: lastColumnsContent,
            headerStyle: { fontFamily: 'Manrope' }
        },
        {
            title: '', field: 'calender',
            render: item => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link style={bodyCellLink} to={{ pathname: `/property/propertycalender/${item.propertyId}/${PropertyTransactionStatusID}`, state: item.name }}>Property Calendar</Link>
                    <img src={rightArrow} alt="right-arrow" />
                </div >
            ),
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
    useEffect(() => {
        console.log('Data prop is Changed ', data);
    }, [data])
    const tableData = data?.map((item) => {
        return {
            propertyId: item.propertyID,
            image: item.imageFilePath ? <img style={bodyCellImage} src={item.imageFilePath} alt='tableListProduct' /> : <img style={bodyCellImage} src={nopicture} alt='nopicture' />,
            name: item.propertyFriendlyName,
            city: item.city,
            location: item.location,
            calender: 'Property Calendar',
        }
    })
    const deletePropertyHandler = useCallback(async () => {
        await deleteProperty(EmployeeID, BrokerID).then((res) => {
            CustomAlert('Successfuly Deleted', 'success')
        }).catch((err) => {
            CustomAlert(JSON.parse(err.body).Message, 'error')
        })
    }, [EmployeeID, BrokerID])

    const featuredPropertyHandler = useCallback(async (value) => {
        const newObj = {
            propertyID: value.propertyId,
            locationID: value.location === 'Aspen' ? 1 : value.location === 'Miami' ? 3 : value.location === 'Fort Lauderdale' ? 6 : 1,
            brokerID: BrokerID,
            transactionStatusID: TransactionStatusID
        }
        await updateFeatureProperty(EmployeeID, newObj).then((res) => {
            console.log(res)
            CustomAlert('New featured property by location has been created.', 'success')
        })
            .catch((err) => {
                CustomAlert('Some thing went wrong', 'error')
            })
    }, [TransactionStatusID, EmployeeID, BrokerID])
    const tableMunuHandler = (option, value) => {
        const propertyId = value.propertyId
        if (option === 'View Details') {
            history.push(`/property/propertyDetail/${propertyId}/${PropertyTransactionStatusID}`)
        }
        else if (option === 'Edit') {
            history.push(`/property/editProperty/${propertyId}`)
        }
        else if (option === 'Delete') {
            deletePropertyHandler()
        }
        else if (option === 'Featured') {
            featuredPropertyHandler(value)
        }
    }
    return (
        // <div className={classes.table}>
        <MaterialTable
            data={tableData}
            isLoading={!data}
            columns={tableColumn}
            //   actions={actions}
            options={{
                search: false, toolbar: false, showTitle: false,
                paginationType: 'stepped',
                pageSizeOptions: [2, 5, 10],
                showFirstLastPageButtons: false,
            }}
            // localization={{
            //     pagination: {
            //         labelDisplayedRows: (props) => `Showing ${props.from}-${props.to} of ${props.count} entries`,
            //         previousTooltip: '',
            //         nextTooltip: '',
            //         // labelRowsSelect: `Show entries `,
            //         labelRowsPerPage: 'Show entries'
            //     },
            //     // toolbar: {
            //     //     nRowsSelected: '{0} row(s) selected'
            //     // },
            // }}
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
        // </div>
    )
}
export default PropertyTable;