import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableBodyRow } from "material-table";
import { makeStyles } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import { getInquiries } from "../apiCalls/inquiryCrud";
import { BoxContainer, PrimaryHeading, tableContent, lastColumnsContent, useStyles } from '../../../baseStyle'

import CustomButton from '../../../../components/customButton/index';
import CustomDropDown from '../../../../components/customDropDown'
import CustomPagination from '../../../../components/pagination/Pagination';
import TableSearchHandling from '../../../../components/tableSearchHandling'
import { InquiriesListContainer } from './style'


const List = ({ EmployeeID, BrokerID, TransactionStatusID }) => {
  const classes = useStyles()
  const history = useHistory()
  const [ListData, setListData] = useState(null);
  const [loadingCarsData, setloadingCarsData] = useState(true)
  const [searchInputValue, setsearchInputValue] = useState('')
  const [searchSelectedValue, setsearchSelectedValue] = useState('employeeFirstName')
  const tableOptions = ['Matched Properties', 'Inquiries Share', 'View Details', 'Edit'];

  const tableColumn = [
    {
      title: 'Agent', field: 'agent',
      cellStyle: tableContent,
      headerStyle: { fontFamily: 'Manrope' }
    },
    {
      title: 'Lead', field: 'lead',
      cellStyle: tableContent,
      headerStyle: { fontFamily: 'Manrope' }
    },
    {
      title: 'Event', field: 'event',
      cellStyle: lastColumnsContent,
      headerStyle: { fontFamily: 'Manrope' }
    },
    {
      title: 'Check In', field: 'checkin',
      cellStyle: lastColumnsContent,
      headerStyle: { fontFamily: 'Manrope' }
    },
    {
      title: 'Check Out', field: 'checkout',
      cellStyle: lastColumnsContent,
      headerStyle: { fontFamily: 'Manrope' }
    },
    {
      title: 'Max Budget', field: 'maxBudget',
      cellStyle: lastColumnsContent,
      headerStyle: { fontFamily: 'Manrope' }
    },
    {
      title: 'Status', field: 'status',
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
      id: item.inquiryID,
      agent: `${item.employeeFirstName} ${item.employeeLastName}`,
      lead: `${item.leadFirstName} ${item.leadLastName}`,
      checkin: item.startDate,
      checkout: item.endDate,
      maxBudget: item.maxBudget,
      status: item.status,
    }
  })


  const tableMunuHandler = (option, value) => {
    if (option === 'Matched Properties') {
      history.push('/inquiry/matchedProperties')
    }
    else if (option === 'Inquiries Shares') {
      history.push('/inquiry/inquiriShared')
    }
    else if (option === 'View Details') {
      history.push(`/inquiry/viewinquirydetail/${value.id}`)
    }
    else if (option === 'Edit') {
      history.push(`/inquiry/editinquiry/${value.id}`)
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
    history.push('/inquiry/addnewinquiry')
  }

  useEffect(() => {
    if (ListData?.length === 0 || !ListData) {
      getInquiries(BrokerID, EmployeeID)
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
    <InquiriesListContainer>
      <BoxContainer>
        <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
        <CustomButton type='button' click={navigateHandler} text='Create Inquiry' />
      </BoxContainer>
      <div className='inquiriesListing_content' >
        <div className='inquiriesListing_heading' >
          <PrimaryHeading>Inquiries</PrimaryHeading>
        </div>
        <MaterialTable
          data={tableData}
          columns={tableColumn}
          isLoading={loadingCarsData}
          options={{ search: false, toolbar: false, showTitle: false }}
          components={{
            // Pagination: (props) => {
            //   return <CustomPagination {...props} />;
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
    </InquiriesListContainer>
  )
}

export default List;