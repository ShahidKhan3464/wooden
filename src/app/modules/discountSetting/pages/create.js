import React, { useEffect, useState } from "react";
import { DiscountSettingRangeContainer } from "./style";
import { Formik } from "formik";
import * as Yup from "yup";
import FormControl from "../../../../components/formControl";
import CustomButton from "../../../../components/customButton/index";
import CustomAlert from "../../../../components/customAlert";
import {
  createDiscountRange,
  getDiscountRange,
  updatePropertyDiscountRange
} from "../apiCalls/discountSettingCrud";
import {useHistory} from 'react-router-dom'

import { ButtonBox, CustomFormField } from "../../../baseStyle";

const DiscountSettingCrud = ({ EmployeeID, BrokerID, Locations }) => {
  const routeParams = window.location.pathname.split("/");
  const selectedItemId = routeParams[3];
  const viewIteamStatus = routeParams[2];
  const history = useHistory()
 
  
  const selectedRangeId = parseInt(selectedItemId);

  const [getLocations, setgetLocations] = useState([]);
  const [ListData, setListData] = useState(null);
  const [loadingDiscountState, setLoadingDiscountState] = useState(true);

  useEffect(() => {
    if (Locations) {
      const modifiedLocation = Locations.map((location) => {
        return {
          itemName: location.location,
          itemId: location.locationID,
        };
      });
      setgetLocations(modifiedLocation);
    }
  }, [Locations]);

  useEffect(() => {
    if (ListData?.length === 0 || !ListData) {
      getDiscountRange(3, BrokerID)
        .then((data) => {
          if (data.Data != null) {
            const currentDiscountDataRange = data.Data.find(
              (range) => range.propertyDiscountDateRangeID === selectedRangeId
            );

            setListData(currentDiscountDataRange);
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
  }, [ListData, BrokerID]);

  const initialValues = {
    dateRangeName: "",
    discountStartDate: "",
    discountEndDate: "",
    brokerID: BrokerID,
    locationID: "",
  };



  const submitHandler = (values, { resetForm }) => {

    const updateDiscountProperty = {
      propertyDiscountDateRangeID: selectedItemId,
      dateRangeName: values.dateRangeName,
      transactionStatusID: 1
    }

    if (viewIteamStatus === 'editDiscount') {
      updatePropertyDiscountRange(EmployeeID, updateDiscountProperty)
        .then((res) => {
          if (
            res.Messages[0] ===
            "The Property Discount Date Range: Summer 2023, already contains the desired date range."
          ) {
            CustomAlert(
              "The Property Discount Date Range: Summer 2023, already contains the desired date range. A PropertyDiscount Date Range was NOT created.",
              "warning"
            );
          } else if (
            res.Messages[0] === "A PropertyDiscount Date Range was created."
          ) {
            resetForm();
            CustomAlert("A PropertyDiscount Date Range was created.", "success");
          } else {
            CustomAlert(res.Messages[0] && res.Messages[1], "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      createDiscountRange(EmployeeID, values)
        .then((res) => {
          if (
            res.Messages[0] ===
            "The Property Discount Date Range: Summer 2023, already contains the desired date range."
          ) {
            CustomAlert(
              "The Property Discount Date Range: Summer 2023, already contains the desired date range. A PropertyDiscount Date Range was NOT created.",
              "warning"
            );
          } else if (
            res.Messages[0] === "A PropertyDiscount Date Range was created."
          ) {
            resetForm();
            CustomAlert("A PropertyDiscount Date Range was created.", "success");
          } else {
            CustomAlert(res.Messages[0] && res.Messages[1], "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }


   
    
    
  };

  const routeHandler = () => {
    history.push(`/discountSetting/editDiscount/${selectedItemId}`)
  }
  if (loadingDiscountState) {
    return <h1>Loading....</h1>;
  }

  return (
    <DiscountSettingRangeContainer>
      <div className='discount_range_heading'>
        <h1>Discount Setting</h1>
        <button onClick={routeHandler} className="discount_range_editbtn" >Edit</button>
      </div>
      <div className='discount_range_form'>
        <Formik
          initialValues={ListData ? ListData : initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={submitHandler}
        >
          {(formik) => {
            return (
              <form
                name='basic'
                onSubmit={formik.handleSubmit}
                autoComplete='off'
                validateMessages={validationSchema}
              >
                <CustomFormField>
                  <FormControl
                    control='input'
                    type='text'
                    name='dateRangeName'
                    placeholder='Enter Name'
                    label='Discount Range Name'
                    className={
                      formik.errors.dateRangeName &&
                      formik.touched.dateRangeName
                        ? "is-invalid"
                        : "customInput"
                    }
                    disabled={viewIteamStatus === 'viewDiscountdetail'}
                  />
                  <FormControl
                    control='select'
                    type='text'
                    name='locationID'
                    label='Location'
                    placeholder='Choose Option'
                    className={
                      formik.errors.locationID && formik.touched.locationID
                        ? "is-invalid"
                        : "customInput"
                    }
                    options={getLocations}
                    disabled={viewIteamStatus === 'viewDiscountdetail'}
                  />
                </CustomFormField>
                <CustomFormField>
                  <FormControl
                    control='date'
                    type='text'
                    name='discountStartDate'
                    placeholder='Enter Start Date'
                    label='Discount Start Date'
                    className={
                      formik.errors.discountStartDate &&
                      formik.touched.discountStartDate
                        ? "is-invalid"
                        : "customInput"
                    }
                    disabled={viewIteamStatus === 'viewDiscountdetail'}
                  />
                  <FormControl
                    control='date'
                    type='text'
                    name='discountEndDate'
                    placeholder='Enter Last Date'
                    label='Discount Last Date'
                    className={
                      formik.errors.discountEndDate &&
                      formik.touched.discountEndDate
                        ? "is-invalid"
                        : "customInput"
                    }
                    disabled={viewIteamStatus === 'viewDiscountdetail'}
                  />
                </CustomFormField>

                {
                  viewIteamStatus === 'viewDiscountdetail' ? null : (
                    <ButtonBox>
                      <CustomButton
                        type='button'
                        color='#121212'
                        bgColor='#F5F5F5'
                        width='136px'
                        border='none'
                        text='Cancel'
                      />
                      <CustomButton type='submit' text='Create' />
                    </ButtonBox>
                  ) 
                }

               
              </form>
            );
          }}
        </Formik>
      </div>
    </DiscountSettingRangeContainer>
  );
};

export default DiscountSettingCrud;

const validationSchema = Yup.object({
  dateRangeName: Yup.string().required("Range name is required!"),
  discountStartDate: Yup.string().required("Discount Start Date is required!"),
  discountEndDate: Yup.string().required("Discount End Date is required!"),
  locationID: Yup.string().required("Location is required!"),
});
