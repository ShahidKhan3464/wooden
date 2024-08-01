import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import {
  createReview,
  getAnReviews,
  updateReview
} from "./../apiCalls/reviewsCrud";
import CustomAlert from "../../../../components/customAlert";
import CustomButton from "../../../../components/customButton/index";
import FormControl from "../../../../components/formControl";
import CustomuploadFile from "../../../../components/CustomuploadFile";
import { NewBrokerStyleContainer } from "./style";
import { Box } from "@material-ui/core";

const CreateBroker = ({ EmployeeID, BrokerID }) => {
  const history = useHistory();
  const routeParams = window.location.pathname.split("/");
  const selectedReviewId = routeParams[3];
  const viewreviewsdetail = routeParams[2];

  const initialValues = {
    authorFirstName: "",
    authorLastName: "",
    review: "",
    numberOfStars: '',
    displayOrder: '',
    email: '',
  };

  const [ListData, setListData] = useState(null);
  const [getDataLoading, setgetDataLoading] = useState(false);
  const [submitFromLoading, setsubmitFromLoading] = useState(false);
  const [browsedImages, setbrowsedImages] = useState([]);

  useEffect(() => {
    if (selectedReviewId) {
      setgetDataLoading(true);
      getAnReviews(EmployeeID, BrokerID)
        .then((res) => {
          setgetDataLoading(false);
          const filterData = res.Data.find(item => item.reviewID == selectedReviewId)
          setListData(filterData);
          setbrowsedImages([...browsedImages, { imageFilePath: filterData.Image, imageOrder: Math.random(9) }])
        })
        .catch((err) => {
          setgetDataLoading(false);
        });
    }
  }, [selectedReviewId]);




  const navigateHandler = () => {
    history.push(`/reviews/editreviews/${selectedReviewId}`);
  };
  const changePath = () => {
    history.push("/reviews/list");
  };
  const onSubmit = (value, { resetForm }) => {
    setsubmitFromLoading(true);




    const finalData = {
      ...value,
      brokerID: BrokerID,
      transactionStatusEmployeeID: 1,
      thumbnailImage: browsedImages[0]?.imageFilePath,
      transactionStatusID: 1
    }


    if (!finalData.thumbnailImage) {
      CustomAlert('Review image are required', 'warning')
    }
    else {

      if (viewreviewsdetail === 'editreviews') {
        updateReview(EmployeeID, finalData)
          .then((res) => {
            setsubmitFromLoading(false);
            resetForm();
            CustomAlert("Review updated successfully", "success", changePath);
          })
          .catch((error) => {
            console.log("error");
            setsubmitFromLoading(false);
            CustomAlert("Some thing went wrong", "error");
          });
      }
      else {
        createReview(EmployeeID, finalData)
          .then((res) => {
            setsubmitFromLoading(false);
            resetForm();
            CustomAlert("Review created successfully", "success", changePath);
          })
          .catch((error) => {
            console.log("error");
            setsubmitFromLoading(false);
            CustomAlert("Some thing went wrong", "error");
          });
      }

    }

  };

  return (
    <NewBrokerStyleContainer>
      {getDataLoading ? (
        <div className={"container"}>
          <div className='container spinner-center spinner spinner-primary spinner-lg mr-15'></div>
        </div>
      ) : (
        <div className='createYacthContent'>
          <div className='createYacthContent_heading'>
            {viewreviewsdetail === "viewreviewsdetail" ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h1>Review Details</h1>
                <CustomButton
                  click={navigateHandler}
                  type='button'
                  text='Edit'
                  radius='10px'
                  color='white'
                  bgColor='#5C58A5'
                  width='95px'
                  height='51px'
                  fontSize='14px'
                />
              </Box>
            ) : (
              <h1>
                {" "}
                {viewreviewsdetail === "editreviews"
                  ? "Edit Review"
                  : "Create Review"}{" "}
              </h1>
            )}
          </div>
          <div className='createYacthContent_form'>
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
                  //  validateMessages={validationSchema}
                  >
                    <div className='custom_form_fields'>
                      <FormControl
                        control='input'
                        type='text'
                        name='authorFirstName'
                        placeholder='First Name'
                        disabled={
                          viewreviewsdetail === "viewreviewsdetail"
                        }
                        label='First Name'
                        className={
                          formik.errors.brokerCommissionRate &&
                            formik.touched.brokerCommissionRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='text'
                        name='authorLastName'
                        placeholder='Last Name'
                        disabled={
                          viewreviewsdetail === "viewreviewsdetail"
                        }
                        label='Last Name'
                        className={
                          formik.errors.brokerCommissionRate &&
                            formik.touched.brokerCommissionRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </div>
                    <div className='custom_form_fields'>
                      <FormControl
                        control='input'
                        type='number'
                        name='numberOfStars'
                        placeholder='No of Stars'
                        disabled={
                          viewreviewsdetail === "viewreviewsdetail"
                        }
                        label='No of Stars'
                        className={
                          formik.errors.brokerCommissionRate &&
                            formik.touched.brokerCommissionRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='number'
                        name='displayOrder'
                        placeholder='Display Order'
                        disabled={
                          viewreviewsdetail === "viewreviewsdetail"
                        }
                        label='Display Order'
                        className={
                          formik.errors.brokerCommissionRate &&
                            formik.touched.brokerCommissionRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </div>
                    <div className='custom_form_fields'>
                      <FormControl
                        control='input'
                        type='email'
                        name='email'
                        placeholder='Email'
                        disabled={
                          viewreviewsdetail === "viewreviewsdetail"
                        }
                        label='Email'
                        className={
                          formik.errors.brokerCommissionRate &&
                            formik.touched.brokerCommissionRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </div>

                    <FormControl
                      control='textarea'
                      type='text'
                      name='review'
                      disabled={
                        viewreviewsdetail === "viewreviewsdetail"
                      }
                      placeholder='Review'
                      label='Review'
                      className={
                        formik.errors.coManagedCommissionRate &&
                          formik.touched.coManagedCommissionRate
                          ? "is-invalid"
                          : "customInput"
                      }
                    />

                    <CustomuploadFile browsedImages={browsedImages} setbrowsedImages={setbrowsedImages} />



                    {viewreviewsdetail === "viewreviewsdetail" ? null : (
                      <Box mt={4} sx={{ display: "flex", gridGap: "40px" }}>
                        <CustomButton
                          type='button'
                          text='CANCEL'
                          radius='10px'
                          color='black'
                          bgColor='#F5F5F5'
                          width='137px'
                          height='51px'
                          fontSize='14px'
                          click={changePath}
                        />
                        <CustomButton
                          disabled={submitFromLoading}
                          type='submit'
                          text={
                            viewreviewsdetail === "viewreviewsdetail"
                              ? "UPDATE Review"
                              : "CREATE Review"
                          }
                          radius='10px'
                          color='white'
                          bgColor='#5C58A5'
                          width='211px'
                          height='51px'
                          fontSize='14px'
                        />
                      </Box>
                    )}
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </NewBrokerStyleContainer>
  );
};

export default CreateBroker;
const validationSchema = Yup.object({
  authorFirstName: Yup.string().required(
    "First Name is required!"
  ),
  authorLastName: Yup.string().required(
    "Last Name is required!"
  ),
  review: Yup.string().max(120, 'Review message should be 120 character or less').required(
    "Review is required!"
  )
  ,
  numberOfStars: Yup.string().max(5, 'Review star should be 5 character or less').required(
    "No of Stars is required!"
  ),
  displayOrder: Yup.string().required(
    "Display Order is required!"
  ),
  email: Yup.string().email('Email should be valid').required(
    "Email is required!"
  )
});
