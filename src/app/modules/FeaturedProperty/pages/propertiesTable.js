import React, { useState, useCallback } from 'react';
import MaterialTable from "material-table";
import { useHistory, Link } from 'react-router-dom';
import { deleteProperty, updateFeatureProperty } from '../apiCalls/propertyCrud'
import CustomPagination from '../../../../components/pagination/Pagination';
import CustomDropDown from '../../../../components/customDropDown';
import CustomAlert from '../../../../components/customAlert';
import rightArrow from '../../../../img/rightArrow.png';
import { nopicture } from '../../../../img'
import { tableContent, lastColumnsContent } from '../../../baseStyle';



const PropertyTable = ({ BrokerID, EmployeeID, TransactionStatusID, data, PropertyTransactionStatusID }) => {
    const history = useHistory();
    const tableOptions = ['Unfeatured', 'View Details', 'Edit'];
    const [selectedProperty, setselectedProperty] = useState({})
    const bodyCellImage = { width: '119px', height: '88px', objectFit: 'contain' }
    const bodyCellLink = { fontFamily: 'Manrope', fontWeight: '700', fontSize: '16px', color: '#555BB3', lineHeight: '24px' }


    // const deletePropertyHandler = useCallback(async () => {
    //     await deleteProperty(EmployeeID, BrokerID).then((res) => {
    //         CustomAlert('Successfuly Deleted', 'success')
    //     }).catch((err) => {
    //         CustomAlert(JSON.parse(err.body).Message, 'error')
    //     })
    // }, [])


    // const featuredPropertyHandler = useCallback(async () => {

    //     const newObj = {
    //         propertyID: selectedProperty.propertyId,
    //         locationID: selectedProperty.location === 'Aspen' ? 1 : selectedProperty.location === 'Miami' ? 3 : selectedProperty.location === 'Fort Lauderdale' ? 6 : 1,
    //         brokerID: BrokerID,
    //         transactionStatusID: TransactionStatusID
    //     }

    //     await updateFeatureProperty(EmployeeID, newObj).then((res) => {
    //         console.log(res, 'here is response');
    //         CustomAlert(res.Messages[0], 'success')
    //     })
    //         .catch((err) => {
    //             CustomAlert('Some thing went wrong', 'error')
    //         })
    // }, [])


    const tableMunuHandler = (option, value) => {
        setselectedProperty(value)
        console.log(value);
        const propertyId = value.propertyId
        if (option === 'View Details') {
            history.push(`/property/propertyDetail/${propertyId}/${PropertyTransactionStatusID}`)
        }
        else if (option === 'Edit') {
            history.push(`/property/editProperty/${propertyId}`)
        }
        else if (option === 'Unfeatured') {
            alert(option)
        }
    }

    const tableColumn = [
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
                    <Link style={bodyCellLink} to={`/property/propertycalender/${item.propertyId}/${PropertyTransactionStatusID}`}>Property Calendar</Link>
                    <img src={rightArrow} alt="right-arrow" />
                </div>
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

    const tableData = data?.map((item) => {
        return {
            propertyId: item.propertyID,
            image: item.imageFilePath ? <img style={bodyCellImage} src={item.imageFilePath} alt='tableListProduct' /> : <img style={bodyCellImage} src={nopicture} alt='nopicture' />,
            name: item.propertyFriendlyName,
            city: item.locationID === 1 ? 'Aspen' : item.locationID === 3 ? 'Miami' : item.locationID === 6 ? 'Fort Lauderdale' : null,
            location: '---',
            calender: 'Property Calendar',
        }
    })

    return (
        <MaterialTable
            data={tableData}
            isLoading={!data}
            columns={tableColumn}
            options={{ search: false, toolbar: false, showTitle: false }}
            components={{
                // Pagination: (props) => {
                //     // return <CustomPagination {...props} />;
                // },
            }}
        //   onSelectionChange={onSelectionChange}
        //   detailPanel={props.nestedFields ? detailPanel : null}
        //   onRowClick={handleRowClick}
        />
    )
}

export default PropertyTable;