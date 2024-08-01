import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableBodyRow } from "material-table";
import { Box, makeStyles } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import { getBrokers } from "../apiCalls/brokerCrud";
import { BoxContainer, PrimaryHeading, tableContent, lastColumnsContent, useStyles } from '../../../baseStyle'

import CustomButton from '../../../../components/customButton/index';
import CustomDropDown from '../../../../components/customDropDown'
import CustomPagination from '../../../../components/pagination/Pagination'
import TableSearchHandling from '../../../../components/tableSearchHandling'
import { BrokerListContainer } from './style'
import { set } from 'lodash';


const List = ({ EmployeeID, BrokerID, TransactionStatusID }) => {
  const classes = useStyles()
  const history = useHistory()
  const [ListData, setListData] = useState(null);
  const [loadingCarsData, setloadingCarsData] = useState(true)
  const [searchInputValue, setsearchInputValue] = useState('')
  const [searchSelectedValue, setsearchSelectedValue] = useState('brokerFirstName')
  const tableOptions = ['View Details', 'Edit']

  const searchedValue = ListData?.filter((item) => searchInputValue === '' ? item : item[searchSelectedValue].toLowerCase().includes(searchInputValue?.toLowerCase()))
  console.log(searchedValue, 'searchedValue')
  const tableData = searchedValue?.map((item) => {
    return {
      id: item.brokerID,
      name: item.brokerFirstName + item.brokerLastName,
      brokerage: item.brokerage,
      email: item.email,
    }
  })

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

  const tableMunuHandler = (option, value) => {
    if (option === 'View Details') {
      history.push(`/broker/viewbrokerdetail/${value.id}`)
    }
    else if (option === 'Edit') {
      history.push(`/broker/editbroker/${value.id}`)
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
      const sorted = ListData.sort((a, b) => a.brokerFirstName.toLowerCase() > b.brokerFirstName.toLowerCase() ? 1 : -1);
      setListData([...sorted])
    }
    else if (order === 'dsc') {
      const sorted = ListData.sort((a, b) => a.brokerFirstName.toLowerCase() < b.brokerFirstName.toLowerCase() ? 1 : -1);
      setListData([...sorted])
    }
  }

  const navigateHandler = () => {
    history.push('/broker/addnewbroker')
  }

  useEffect(() => {
    if (ListData?.length === 0 || !ListData) {
      getBrokers(BrokerID, EmployeeID)
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
    <BrokerListContainer>
      <BoxContainer>
        <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
        <CustomButton type='button' click={navigateHandler} text='Create Broker' />
      </BoxContainer>
      <div className='brokerListing_content' >
        <div className='brokerListing_heading' >
          <PrimaryHeading>Brokers</PrimaryHeading>
        </div>
        <MaterialTable
          columns={tableColumn}
          data={tableData}
          isLoading={loadingCarsData}
          //   actions={actions}
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
    </BrokerListContainer>
  )
}

export default List;