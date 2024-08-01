import React, { useState } from 'react';
import MaterialTable from "material-table";
import { useHistory } from 'react-router-dom';
import CustomButton from '../../../../components/customButton/index';
import { BoxContainer, PrimaryHeading } from '../../../baseStyle';
import CustomDropDown from '../../../../components/customDropDown';
import CustomPagination from '../../../../components/pagination/Pagination';
import TableSearchHandling from '../../../../components/tableSearchHandling';
import { MatchedPropertyContainer, StatusComponent } from './style';
import { tableData } from './data'

const MatchedProperties = () => {
  const history = useHistory()
  const [ListData, setListData] = useState(null);
  const [searchInputValue, setsearchInputValue] = useState('')
  const [searchSelectedValue, setsearchSelectedValue] = useState('')
  const tableOptions = ['MATCHED PROPERTIES', 'INQUIRIES SHARE', 'VIEW DETAILS', 'EDIT'];

  const tableColumn = [
    { title: 'Property Name', field: 'propertyName', },
    { title: 'City', field: 'city' },
    { title: 'from', field: 'from' },
    { title: 'to', field: 'to' },
    { title: 'price', field: 'price' },
    {
      title: 'status', field: 'status',
      render: item => <StatusComponent status={item.status}>{item.status}</StatusComponent>
    },
    {
      title: '', field: 'action',
      render: item => (
        <CustomDropDown tableOptions={tableOptions} tableMunuHandler={tableMunuHandler} data={item} />
      ),
    }
  ]

  const tableMunuHandler = (option, value) => {
    if (option === 'VIEW DETAILS') {
      history.push(`/car/viewCarDetail/${value.id}`)
    }
    else if (option === 'EDIT') {
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
    history.push('/inquiry/createinquiryshare')
  }

  return (
    <MatchedPropertyContainer>
      <BoxContainer>
        <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
        <CustomButton type='button' click={navigateHandler} text='Create Inquiry Share' />
      </BoxContainer>
      <div className='matchedProperty_content'>
        <div className='matchedProperty_heading'>
          <PrimaryHeading>Matched Properties</PrimaryHeading>
        </div>
        <MaterialTable
          data={tableData}
          columns={tableColumn}
          options={{ selection: true, search: false, toolbar: false, showTitle: false }}
          components={{
            // Pagination: (props) => {
            //   return <CustomPagination{...props} />;
            // },
          }}
        //   onSelectionChange={onSelectionChange}
        //   detailPanel={props.nestedFields ? detailPanel : null}
        //   onRowClick={handleRowClick}
        />
      </div>
    </MatchedPropertyContainer>
  )
}

export default MatchedProperties