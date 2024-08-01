import React, { useState, useEffect, useCallback } from "react";
import MaterialTable from "material-table";
import { useSelector } from "react-redux";

import {
  httpGetPropertiesDiscount,
  httpGetPropertyDiscountDateRange,
  httpCreatePropertyDiscount,
} from "../apiCalls/discountcrud";

import { DiscountListContainer, StyledInput } from "./style";
import { PrimaryHeading, tableContent } from "../../../baseStyle";
import CustomDropDown from "../../../../components/customDropDown";
import CustomButton from "../../../../components/customButton/index";
import CustomPagination from "../../../../components/pagination/Pagination";
import { inputSearch, slide } from "../../../../img";

const List = ({ BrokerID }) => {
  const { locations } = useSelector((state) => state.locationSlice);
  const [ListData, setListData] = useState([]);
  const [propertyDiscountRange, setpropertyDiscountRange] = useState(null);
  const [
    selectedDiscountsProperties,
    setselectedDiscountsProperties,
  ] = useState([]);

  const tableOptions = ["Clear Values", "View Details"];
  const bodyCellImage = { width: "120px", height: "88px", objectFit: "cover" };

  const getAllPropertiesDiscount = useCallback(
    (value) => {
      setListData([]);
      httpGetPropertiesDiscount(value, BrokerID)
        .then((res) => {
          if (res.Data?.length) {
            setListData(res.Data);
          } else {
            setListData([]);
          }
        })
        .catch((err) => {
          setListData([]);
        });
    },
    [BrokerID]
  );

  const getAllDiscountTypeRange = useCallback(
    (value) => {
      httpGetPropertyDiscountDateRange(value, BrokerID)
        .then((res) => {
          if (res.Data?.length) {
            setpropertyDiscountRange(res.Data);
          } else {
            setpropertyDiscountRange(null);
          }
        })
        .catch((err) => {
          setpropertyDiscountRange(null);
        });
    },
    [BrokerID]
  );

  useEffect(() => {
    getAllPropertiesDiscount(7);
    getAllDiscountTypeRange(1);
  }, [getAllPropertiesDiscount, getAllDiscountTypeRange]);

  const inputHandler = useCallback((id, newValue) => {
    setListData((prevListData) => {
      let updateListData = prevListData.map((item) => {
        if (item.propertyID === id) {
          return { ...item, percentDiscount: newValue };
        }
        return item;
      });
      return updateListData
    });
  }, [setListData]);


  const tableColumn = [
    {
      title: "Image",
      field: "image",
      render: (item) => (
        <img
          style={bodyCellImage}
          src={item.imageFilePath || slide}
          alt='discount-property'
        />
      ),
    },
    {
      title: "Name",
      field: "propertyFriendlyName",
      render: (item) => <p> {item.propertyID || "Not found"}</p>,
      cellStyle: tableContent,
    },
    {
      title: "Weekly Discount",
      field: "propertyDiscountDateRangeID",
      render: (item, i) => (
        <StyledInput
          value={item.percentDiscount}
          type='text'
          name={item.propertyID}
          key={item.propertyID}
          onChange={(e) => inputHandler(item.propertyID, e.target.value)}
        />
      ),
    },
    {
      title: "Monthly Discount",
      field: "transactionStatusEmployeeID",
      render: (item) => (
        <StyledInput
          value={item.percentDiscount}
          type='text'
          name={item.propertyID}
          key={item.propertyID}
          onChange={(e) => inputHandler(item.propertyID, e.target.value)}
        />
      ),
    },

    {
      title: "",
      field: "action",
      cellStyle: { textAlign: "right" },
      headerStyle: { textAlign: "right" },
      render: (item) => (
        <CustomDropDown
          tableOptions={tableOptions}
          tableMunuHandler={tableMunuHandler}
          data={item}
        />
      ),
    },
  ];

  const tableMunuHandler = (option, value) => {
    if (option === "View Details") {
      alert(option);
      // history.push(`/car/viewCarDetail/${value.id}`)
    } else if (option === "Edit") {
      alert(option);
      // history.push(`/car/editCar/${value.id}`)
    }
  };

  if (!ListData.length) {
    return <h1>Loading...</h1>;
  }

  const selectedDiscountProperty = (property) => {
    const modifiedPropertyArray = property.map((prop) => {
      return {
        propertyDiscountTypeID: prop.propertyDiscountTypeID,
        propertyID: prop.propertyID,
        brokerID: BrokerID,
        percentDiscount: 5,
        propertyDiscountDateRangeID: prop.propertyDiscountDateRangeID,
      };
    });
    setselectedDiscountsProperties(modifiedPropertyArray);
  };

  const propertySubmitHandler = () => {
    console.log(selectedDiscountsProperties);
  };

  return (
    <DiscountListContainer>
      <div className='discountListing_content'>
        <div className='discountListing_content_top'>
          <PrimaryHeading>Pre-Default Discounts</PrimaryHeading>

          <div className='discountListing_content_top_searchHandling'>
            <div className='groupTextField'>
              <div className='groupTextField_input'>
                <img src={inputSearch} alt='inputSearch' />
                <input type='text' placeholder='Search' />
              </div>
              <div className='groupTextField_select'>
                <select
                  onChange={(e) => getAllDiscountTypeRange(e.target.value)}
                >
                  <option>Select Location </option>
                  {locations.map((loc) => {
                    return (
                      <>
                        <option key={loc.locationID} value={loc.locationID}>
                          {loc.location}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className='discountListing_content_top_searchHandling_daterangeSelector'>
              <select
                onChange={(e) => getAllPropertiesDiscount(e.target.value)}
              >
                <option>Select Range </option>
                {propertyDiscountRange?.map((range) => {
                  return (
                    <>
                      <option value={range.propertyDiscountDateRangeID}>
                        {range.dateRangeName}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className='discountListing_table'>
          <MaterialTable
            data={ListData}
            columns={tableColumn}
            onSelectionChange={selectedDiscountProperty}
            options={{
              search: false,
              toolbar: false,
              showTitle: false,
              selection: true,
            }}
            components={{
              // Pagination: (props) => {
              //   return <CustomPagination {...props} />;
              // },
            }}
          />
          <div className='discountListing_table_btn'>
            <CustomButton
              click={propertySubmitHandler}
              type='button'
              text='Apply'
            />
          </div>
        </div>
      </div>
    </DiscountListContainer>
  );
};

export default List;
