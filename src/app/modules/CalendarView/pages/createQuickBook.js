import React, { useState, useEffect, useCallback } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useSelector } from "react-redux";

import { getPropertyCalendarEventResources, createQuickBook } from "../apiCalls/CalendarViewCrud";

import CustomButton from "../../../../components/customButton/index";
import CustomFormControl from "../../../../components/formControl";
import CustomAlert from '../../../../components/customAlert'
import { CustomFormField, PrimaryHeading, ButtonBox } from "../../../baseStyle";
import { QuickBookAddContainer } from "./style";

const CreateQuickBook = ({ EmployeeID, BrokerID }) => {
  const { locationSlice } = useSelector((state) => state);

  const [leadsData, setleadsData] = useState([]);
  const [propertyResources, setpropertyResources] = useState([])
  const [leadFrom, setleadFrom] = useState(false);
  const [formLoading, setformLoading] = useState(true)

  useEffect(() => {
    if (locationSlice?.allLeads?.length) {
      const changeArray = locationSlice.allLeads.map((lead) => {
        return {
          itemId: lead.brokerID,
          itemName: `${lead.employeeFirstName}  ${lead.employeeLastName}`,
        };
      });
      setleadsData(changeArray);
    }
  }, [locationSlice]);

  const getPropertyResources = useCallback(async () => {
    const properties = await getPropertyCalendarEventResources(EmployeeID, BrokerID);
    setformLoading(false)
    const filterData = properties.Data.map((pro) => {
      return {
        itemId: pro.propertyCategoryTypeID,
        itemName: pro.title
      }
    })

    setpropertyResources(filterData)
  }, [getPropertyCalendarEventResources]);



  useEffect(() => {
    getPropertyResources();
  }, [getPropertyResources]);

  const leadsHandler = () => {
    setleadFrom(!leadFrom);
  };

  const initialValues = {
    cityID: "",
    startDate: "",
    endDate: "",
    numberOfGuests: "",
    numberOfCars: "",
    specialRequest: "",
    description: "",
    price: "",
    propertyID: "",
  };

  const quickBookValues = {
    leadFirstName: "",
    leadLastName: "",
    email: "",
    phone: "",
    leadID: 0,
    leadVerificationStatusID: "",

    cityID: "",
    startDate: "",
    endDate: "",
    numberOfGuests: "",
    numberOfCars: "",
    specialRequest: "",
    description: "",
    price: "",
    propertyID: "",
  }

  const onSubmit = (values) => {

    createQuickBook(values, BrokerID, EmployeeID)
      .then((res) => {
        console.log(res, 'resres');
      })
      .catch((err) => {
        CustomAlert('Some thing went wrong', 'error')
      })
  }



  return (
    <QuickBookAddContainer>
      <div className='addQuickBookContent_heading'>
        <PrimaryHeading>Create QuickBook</PrimaryHeading>
      </div>
      <div className='addQuickBookContent'>
        {formLoading ? (
          <div className={"container"}>
            <div className='container spinner-center spinner spinner-primary spinner-lg mr-15'></div>
          </div>
        ) : (
          <Formik
            enableReinitialize={true}
            initialValues={leadFrom ? quickBookValues : initialValues}
            validationSchema={leadFrom ? quickBookValuesSchema : validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <form
                  name='basic'
                  onSubmit={formik.handleSubmit}
                  autoComplete='off'
                //   validateMessages={validationSchema}
                >
                  <div className='addQuickBookContent_form'>
                    <div className='addQuickBookContent_form_container'>
                      <CustomFormField>
                        <CustomFormControl
                          type='text'
                          name='propertyID'
                          control='select'
                          label='Property*'
                          options={propertyResources}
                          placeholder="Choose Property"
                        // defaultValue={ListData?.location}
                        />
                        <CustomFormControl
                          type='number'
                          control='input'
                          name='price'
                          label='Price*'
                          placeholder='Enter Price'
                        />
                      </CustomFormField>

                      <CustomFormField>
                        <CustomFormControl
                          control='date'
                          name='startDate'
                          label='Book Start Date*'
                          placeholder='mm/dd/yyyy'
                        />
                        <CustomFormControl
                          control='date'
                          name='endDate'
                          label='Book End Date*'
                          placeholder='mm/dd/yyyy'
                        />
                      </CustomFormField>

                      <CustomFormField>
                        <CustomFormControl
                          type='number'
                          control='input'
                          name='numberOfGuests'
                          label='Number of Guests*'
                          placeholder='Enter No of Guests'
                        />
                        <CustomFormControl
                          type='number'
                          control='input'
                          name='numberOfCars'
                          label='Number of Cars*'
                          placeholder='Enter No of Cars'
                        />
                      </CustomFormField>

                      <CustomFormField>
                        <CustomFormControl
                          type='text'
                          control='input'
                          name='description'
                          label='Description*'
                          placeholder='Enter Description'
                        />
                        <CustomFormControl
                          type='text'
                          control='input'
                          name='specialRequest'
                          label='Special Request*'
                          placeholder='Enter Special Request'
                        />
                      </CustomFormField>

                      <div className='addQuickBookContent_form_container_lead'>
                        {
                          leadFrom ? null : (
                            <div className='addQuickBookContent_form_container_lead_formField'>
                              <CustomFormControl
                                name='lead'
                                label='Lead*'
                                control='select'
                                placeholder='Lead'
                                options={leadsData}
                              />
                            </div>
                          )
                        }

                        <CustomButton
                          type='button'
                          click={leadsHandler}
                          color={leadFrom ? "#000000" : "#FFFFFF"}
                          bgColor={leadFrom ? "#FAFAFA" : "#555BB3"}
                          text={leadFrom ? "Use Existed Lead" : "Create a New Lead"}
                        />
                      </div>
                      {leadFrom ? (
                        <>
                          <CustomFormField>
                            <CustomFormControl
                              type='text'
                              control='input'
                              name='leadFirstName'
                              label='First Name*'
                              placeholder='Enter First Name'
                            />
                            <CustomFormControl
                              type='text'
                              control='input'
                              name='leadLastName'
                              label='Last Name*'
                              placeholder='Enter Last Name'
                            />
                          </CustomFormField>
                          <CustomFormField>
                            <CustomFormControl
                              type='email'
                              control='input'
                              name='email'
                              label='Email'
                              placeholder='Enter Email'
                            />
                            <CustomFormControl
                              type='select'
                              name='leadVerificationStatusID'
                              label='Lead Source*'
                              control='select'
                              placeholder='Lead Source'
                              options={leadsData}
                            />
                          </CustomFormField>
                          <CustomFormField>
                            <CustomFormControl
                              name='leadVerificationStatusID'
                              label='Phone Type'
                              control='select'
                              placeholder='Phone'
                              options={leadsData}
                            />
                            <CustomFormControl
                              type='number'
                              control='input'
                              name='phone'
                              label='Phone'
                              placeholder='Enter Phone Number'
                            />
                          </CustomFormField>
                        </>
                      ) : null}

                      {/* <div className='addQuickBookContent_form_addQuickBookButtons'> */}
                      <ButtonBox>
                        <CustomButton type='button' color='#121212' bgColor='#F5F5F5' width='136px' border='none' text='Cancel' />
                        <CustomButton type='submit' text='Create a QuickBook' />
                      </ButtonBox>
                      {/* </div> */}
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
        )}
      </div>
    </QuickBookAddContainer>
  );
};

export default CreateQuickBook;

const validationSchema = Yup.object({
  startDate: Yup.string().required("Start Date is required!"),
  endDate: Yup.string().required("End Date is required!"),
  numberOfGuests: Yup.string().required("No of guests is required!"),
  numberOfCars: Yup.string().required("No of Cars is required!"),
  specialRequest: Yup.string().required("Special Request is required!"),
  description: Yup.string().required("Description is required!"),
  price: Yup.string().required("Price is required!"),
  propertyID: Yup.string().required("Property is required!"),
});
const phoneRegExp = /^[0-9]+$/;
const quickBookValuesSchema = Yup.object({
  leadFirstName: Yup.string().required("First Name is required!"),
  leadLastName: Yup.string().required("Last Name is required!"),
  email: Yup.string().required("Email is required!").email('Email should be valid'),
  phone: Yup.string().required("Phone is required!").matches(
    phoneRegExp,
    'Phone number should be numbers only'
  ),
  leadVerificationStatusID: Yup.string().required("Lead Source is required!"),
  startDate: Yup.string().required("Start Date is required!"),
  endDate: Yup.string().required("End Date is required!"),
  numberOfGuests: Yup.string().required("No of guests is required!"),
  numberOfCars: Yup.string().required("No of Cars is required!"),
  specialRequest: Yup.string().required("Special Request is required!"),
  description: Yup.string().required("Description is required!"),
  price: Yup.string().required("Price is required!"),
  propertyID: Yup.string().required("Property is required!"),
})