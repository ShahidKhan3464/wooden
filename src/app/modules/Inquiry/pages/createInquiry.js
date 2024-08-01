import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Checkbox, FormControlLabel, Box } from '@material-ui/core'



import { createInquiry, updateInquiry, readAnInquiry } from "./../apiCalls/inquiryCrud";
import CustomAlert from "../../../../components/customAlert";
import CustomButton from "../../../../components/customButton/index";
import { CustomFormField, PrimaryHeading, ButtonBox } from "../../../baseStyle"
import FormControl from "../../../../components/formControl";
import { InquiriesCreateContainer } from "./style";

const CreateInquiries = ({ EmployeeID, BrokerID, TransactionStatusID }) => {
  const history = useHistory();
  const routeParams = window.location.pathname.split("/");
  const selectedInquiryId = routeParams[3];
  const viewInquiryDetail = routeParams[2];

  const initialValues = {
    inquiryID: '',
    startDate: '',
    endDate: '',
    leadID: "",
    cityID: '',
    minBudget: 5000,
    maxBudget: 100000,
    numberOfGuests: "",
    numberOfCars: "",
    carRental: "",
    boatRental: "",
    transactionStatusID: TransactionStatusID,
    specialRequest: "",
    districtID: "",
    // description: "Business Meeting2",
    description: "",
  };



  const { locationSlice } = useSelector((state) => state);

  const [fetchedLocations, setfetchedLocations] = useState([]);
  const [ListData, setListData] = useState(null);
  const [getDataLoading, setgetDataLoading] = useState(false);
  const [submitFromLoading, setsubmitFromLoading] = useState(false);
  const [fetchedAmentities, setfetchedAmentities] = useState([])
  const [selectedAmentities, setselectedAmentities] = useState([])

  useEffect(() => {
    const locationData = locationSlice.locations?.map((item) => {
      return {
        itemId: item.locationID,
        itemName: item.location,
      };
    });
    setfetchedLocations(locationData);

    setfetchedAmentities(locationSlice?.allAmenties)
  }, [locationSlice]);

  useEffect(() => {
    if (selectedInquiryId) {
      setgetDataLoading(true);
      readAnInquiry(EmployeeID, selectedInquiryId)
        .then((res) => {
          setgetDataLoading(false);
          setListData(res.Data[0]);
        })
        .catch((err) => {
          setgetDataLoading(false);
          console.log(err);
        });
    }
  }, [selectedInquiryId]);


  console.log(fetchedAmentities, 'ListDataListDataListData');

  const navigateHandler = () => {
    history.push(`/inquiry/editinquiry/${selectedInquiryId}`);
  };
  const changePath = () => {
    history.push('/inquiry/list')
  }
  const onSubmit = (value, { resetForm }) => {
    setsubmitFromLoading(true);

    if (viewInquiryDetail === "editinquiry") {
      updateInquiry(EmployeeID, BrokerID, value)
        .then((res) => {
          setsubmitFromLoading(false);
          resetForm();
          CustomAlert("Inquiri update successfully", "success", changePath);
        })
        .catch((error) => {
          console.log("error");
          setsubmitFromLoading(false);
          CustomAlert("Some thing went wrong", "error");
        });
    } else {
      createInquiry(EmployeeID, BrokerID, value)
        .then((res) => {
          setsubmitFromLoading(false);
          resetForm();
          CustomAlert("Inquiri created successfully", "success", changePath);
        })
        .catch((error) => {
          console.log("error");
          setsubmitFromLoading(false);
          CustomAlert("Some thing went wrong", "error");
        });
    }
  };


  const handleCheckBox = (selectedAmeniti) => {
    setselectedAmentities([...selectedAmentities, selectedAmeniti])

  }
  return (
    <InquiriesCreateContainer>
      {getDataLoading ? (
        <div className={"container"}>
          <div className='container spinner-center spinner spinner-primary spinner-lg mr-15'></div>
        </div>
      ) : (
        <div className='createInquiriesContent'>
          <div className='createInquiriesContent_heading'>
            {viewInquiryDetail === "viewinquirydetail" ? (
              <div className='createInquiriesContent_heading_view'>
                <PrimaryHeading>Inquiry Details</PrimaryHeading>
                <CustomButton type='button' width='95px' click={navigateHandler} text='Edit' />
              </div>
            ) : (
              <PrimaryHeading>
                {viewInquiryDetail === "editinquiry" ? "Edit Inquiry" : "Add Inquiry"}
              </PrimaryHeading>
            )}
          </div>
          <div className='createInquiriesContent_form'>
            <Formik
              initialValues={ListData ? ListData : initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
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
                    <CustomFormField>
                      <FormControl
                        control='date'
                        type='text'
                        name='startDate'
                        placeholder='mm/dd/yyyy'
                        label='Start Date *'
                        className={
                          formik.errors.startDate &&
                            formik.touched.startDate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='date'
                        type='text'
                        name='endDate'
                        placeholder='mm/dd/yyyy'
                        label='End Date *'
                        className={
                          formik.errors.endDate &&
                            formik.touched.endDate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='leadID'
                        placeholder='Choose Leads'
                        label='Leads'
                        className={
                          formik.errors.leadID && formik.touched.leadID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedLocations}
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='cityID'
                        placeholder='Choose City'
                        label='City*'
                        className={
                          formik.errors.cityID && formik.touched.cityID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedLocations}
                      />
                    </CustomFormField>


                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='numberOfGuests'
                        label='Minimum Budget*'
                        placeholder="Enter Minimum Budget"
                        className={
                          formik.errors.numberOfGuests &&
                            formik.touched.numberOfGuests
                            ? "is-invalid"
                            : "customInput"
                        }
                      />

                      <FormControl
                        control='input'
                        type='number'
                        name='numberOfGuests'
                        label='Maximum Budget*'
                        placeholder="Enter Maximum Budget"
                        className={
                          formik.errors.numberOfGuests &&
                            formik.touched.numberOfGuests
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>



                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='locationID'
                        label='Active'
                        placeholder="Choose Option"
                        className={
                          formik.errors.locationID && formik.touched.locationID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedLocations}
                      />

                      <FormControl
                        control='input'
                        type='number'
                        name='numberOfGuests'
                        placeholder='Enter Number of Guests'
                        label='Number of Guests*'
                        className={
                          formik.errors.numberOfGuests &&
                            formik.touched.numberOfGuests
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='numberOfCars'
                        placeholder='Choose Number of Cars'
                        label='Number of Cars*'
                        className={
                          formik.errors.numberOfCars &&
                            formik.touched.numberOfCars
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='carRental'
                        label='Car Rental*'
                        placeholder="Choose Option"
                        className={
                          formik.errors.carRental && formik.touched.carRental
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedLocations}
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='boatRental'
                        label='Boot Rental*'
                        placeholder="Choose Option"
                        className={
                          formik.errors.boatRental && formik.touched.boatRental
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedLocations}
                      />

                      <div style={{ width: '100%' }}></div>
                    </CustomFormField>

                    <div className='createInquiriesContent_form_amentities' >
                      <h1>Amenities</h1>
                      <div className='createInquiriesContent_form_amentities_form' >
                        {fetchedAmentities?.map((checkBox, index) => (
                          <FormControlLabel key={index} className="controlLabel"
                            control={
                              <Checkbox
                                size="large"
                                color="secondary"
                                className='checkbox'
                                name={checkBox.amenity}
                                onChange={(e) => handleCheckBox(checkBox.amenityID)}
                              //   checked={checkBox.checked}
                              />
                            }
                            label={<span className='checkboxLabel'>{checkBox.amenity}</span>}
                          />
                        ))}
                      </div>
                    </div>

                    {/* <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='specialRequest'
                        label=''
                        placeholder="Special Request"
                        className={
                          formik.errors.specialRequest &&
                            formik.touched.specialRequest
                            ? "is-invalid"
                            : "customInput"
                        }
                      />

                      <FormControl
                        control='input'
                        type='text'
                        name='description'
                        label=''
                        placeholder="Description"
                        className={
                          formik.errors.description &&
                            formik.touched.description
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField> */}

                    {
                      viewInquiryDetail === 'viewinquirydetail' ? null : (
                        <ButtonBox>
                          <CustomButton type='button' color='#121212' bgColor='#F5F5F5' width='136px' border='none' text='Cancel' />
                          <CustomButton type='submit' disabled={submitFromLoading} text={viewInquiryDetail === "editinquiry" ? "Update Inquiry" : "Create Inquiry"} />
                        </ButtonBox>
                      )
                    }
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </InquiriesCreateContainer>
  );
};

export default CreateInquiries;

const validationSchema = Yup.object({
  startDate: Yup.date().min(new Date(), 'Please choose future date')
    .required("Start date is required!")
  ,
  endDate: Yup
    .date()
    .when('startDate',
      (startDate, schema) => {
        if (startDate) {
          const dayAfter = new Date(startDate.getTime() + 86400000);

          return schema.min(dayAfter, 'End date has to be after than start date');
        }

        return schema;

      }).required("Last date is required!"),
  leadID: Yup.string()
    .required("Lead is required!"),
  cityID: Yup.string()
    .required("City is required!"),
  numberOfGuests: Yup.string()
    .required("No of guests is required!"),
  numberOfCars: Yup.string()
    .required("No of cars is required!"),
  carRental: Yup.string()
    .required("Car rental is required!"),

  boatRental: Yup.string()
    .required("Boot rental is required!"),

});
