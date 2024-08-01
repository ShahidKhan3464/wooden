import React, { useState, useEffect, useCallback } from 'react';
import MaterialTable, { MTableBodyRow } from "material-table";
import { useHistory } from 'react-router-dom'
import { getOwners, updateOwner } from "../apiCalls/ownerCrud";
import { BoxContainer, PrimaryHeading, tableContent, lastColumnsContent, useStyles } from '../../../baseStyle'

import CustomButton from '../../../../components/customButton/index';
import CustomDropDown from '../../../../components/customDropDown'
import CustomPagination from '../../../../components/pagination/Pagination'
import TableSearchHandling from '../../../../components/tableSearchHandling';
import CustomAlert from '../../../../components/customAlert'
import { OwnerListContainer } from './style'


const List = ({ EmployeeID, BrokerID }) => {
  const classes = useStyles()
  const history = useHistory()
  const [ListData, setListData] = useState(null);
  const [loadingCarsData, setloadingCarsData] = useState(true)
  const [searchInputValue, setsearchInputValue] = useState('')
  const [searchSelectedValue, setsearchSelectedValue] = useState('firstName')
  const tableOptions = ['View Details', 'Edit', 'Delete']


  useEffect(() => {
    if (ListData?.length === 0 || !ListData) {
      getOwners(BrokerID, EmployeeID)
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
      id: item.ownerID,
      name: item.firstName + item.lastName,
      email: item.email,
      phone: item.phone,
    }
  })

  const tableMunuHandler = (option, value) => {
    if (option === 'View Details') {
      history.push(`/owner/viewownerdetail/${value.id}`)
    }
    else if (option === 'Edit') {
      history.push(`/owner/editowner/${value.id}`)
    }
    else if (option === 'Delete') {
      const selectedOwner = ListData.find((item) => item.ownerID === value.id)
      ownerDeleteHandler(selectedOwner)
    }
  }


  const ownerDeleteHandler = useCallback((values) => {
    setloadingCarsData(true);
    updateOwner(EmployeeID, BrokerID, { ...values, transactionStatusID: 0 }).then((res) => {
      getOwners(BrokerID, EmployeeID)
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
          CustomAlert('Some thing went wrong')
        });
    })
      .catch((err) => {
        CustomAlert('Some thing went wrong')
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
      const sorted = ListData.sort((a, b) => a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1);
      setListData([...sorted])
    }
    else if (order === 'dsc') {
      const sorted = ListData.sort((a, b) => a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1);
      setListData([...sorted])
    }
  }

  const navigateHandler = () => {
    history.push('/owner/addnewowner')
  }


  return (
    <OwnerListContainer>
      <BoxContainer>
        <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
        <CustomButton type='button' text='Create Owner' click={navigateHandler} />
      </BoxContainer>
      <div className='ownerListing_content' >
        <div className='ownerListing_heading' >
          <PrimaryHeading>Owners</PrimaryHeading>
        </div>
        <MaterialTable
          data={tableData}
          columns={tableColumn}
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
    </OwnerListContainer >
  )
}

export default List;