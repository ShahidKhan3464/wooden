import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { createLead, updateLead, readALead } from "./../apiCalls/leadCrud";
import CustomAlert from "../../../../components/customAlert";
import CustomButton from "../../../../components/customButton/index";
import FormControl from "../../../../components/formControl";
import { ButtonBox, CustomFormField, PrimaryHeading, UploadedImages } from "../../../baseStyle";
import CustomuploadFile from "../../../../components/CustomuploadFile";
import { LeadCreateContainer } from "./style";
import { Box, Typography } from "@material-ui/core";
import detailImg from '../../../../img/detailImg.png'

const CreateLead = ({
  EmployeeID,
  BrokerID,
  TransactionStatusID,
  rowData,
  type,
  LeadVerificationStatuses,
  AssignedEmployees,
  LeadSources,
  LeadProfessions,
  Countries,
  States,
}) => {
  const history = useHistory();
  const routeParams = window.location.pathname.split("/");
  const selectedLeadId = routeParams[3];
  const viewleaddetail = routeParams[2];

  const initialValues = {
    firstName: "",
    lastName: "",
    leadVerificationStatusID: "",
    brokerID: BrokerID,
    assignedEmployeeID: "",
    leadSourceID: "",
    leadProfessionID: "",
    email: "",
    phone: "",
    countryID: "",
    city: "",
    stateOrProvince: "",
    zipCode: "",
    contactPreferenceTypeID: "",

    address: "",
    dob: "",
    transactionStatusID: "1",
    imageFileName: "",
    stateID: "",
  };



  const [fetchedLeadSource, setfetchedLeadSource] = useState([]);
  const [fetchedAssignedEmployee, setfetchedAssignedEmployee] = useState([]);
  const [fetchedLeadVerification, setfetchedLeadVerification] = useState([]);
  const [fetchedCountry, setfetchedCountry] = useState([])
  const [fetchLeadProfession, setFetchedLeadProfession] = useState([])

  const [ListData, setListData] = useState(null);
  const [getDataLoading, setgetDataLoading] = useState(false);
  const [submitFromLoading, setsubmitFromLoading] = useState(false);
  const [browsedImages, setbrowsedImages] = useState([]);


  useEffect(() => {
    setgetDataLoading(true)
    if (AssignedEmployees && LeadProfessions && LeadVerificationStatuses && Countries && LeadSources) {
      setgetDataLoading(false)
      const getLeadSource = LeadSources.map((item) => {
        return {
          itemName: item.leadSource,
          itemId: item.leadSourceID
        }
      })
      const getCountries = Countries?.map((item) => {
        return {
          itemName: item.country,
          itemId: item.countryID,
        };
      });

      const getLeadProfession = LeadProfessions?.map((item) => {
        return {
          itemName: item.leadProfession,
          itemId: item.leadProfessionID,
        };
      });
      const getAssignedEmployee = AssignedEmployees?.map((item) => {
        return {
          itemName: item.employeeFirstName + item.employeeLastName,
          itemId: item.employeeID,
        };
      });
      const getLeadVarification = LeadVerificationStatuses?.map((item) => {
        return {
          itemName: item.leadVerificationStatus,
          itemId: item.leadVerificationStatusID,
        };
      });
      setfetchedCountry(getCountries)
      setfetchedLeadVerification(getLeadVarification);
      setFetchedLeadProfession(getLeadProfession);
      setfetchedLeadSource(getLeadSource)
      setfetchedAssignedEmployee(getAssignedEmployee);
    }
  }, [AssignedEmployees, LeadProfessions, LeadVerificationStatuses, Countries, LeadSources]);


  useEffect(() => {
    if (selectedLeadId) {
      setgetDataLoading(true);
      readALead(EmployeeID, selectedLeadId)
        .then((res) => {
          setgetDataLoading(false);
          setListData(res.Data[0]);
        })
        .catch((err) => {
          setgetDataLoading(false);
          console.log(err);
        });
    }
  }, [selectedLeadId]);




  const navigateHandler = () => {
    history.push(`/lead/editlead/${selectedLeadId}`);
  };
  const changePath = () => {
    history.push("/lead/list");
  };
  const onSubmit = (value, { resetForm }) => {
    setsubmitFromLoading(true);

    const yatchFromDAta = { ...value, secondaryImagesList: browsedImages };

    if (viewleaddetail === "editlead") {
      updateLead(EmployeeID, BrokerID, value)
        .then((res) => {
          setsubmitFromLoading(false);
          resetForm();
          CustomAlert("Lead update successfully", "success", changePath);
        })
        .catch((error) => {
          console.log("error");
          setsubmitFromLoading(false);
          CustomAlert("Some thing went wrong", "error");
        });
    } else {
      createLead(EmployeeID, value)
        .then((res) => {
          setsubmitFromLoading(false);
          resetForm();
          CustomAlert("Lead created successfully", "success", changePath);
        })
        .catch((error) => {
          console.log("error");
          setsubmitFromLoading(false);
          CustomAlert("Some thing went wrong", "error");
        });
    }
  };


  return (
    <LeadCreateContainer>
      {getDataLoading ? (
        <div className={"container"}>
          <div className='container spinner-center spinner spinner-primary spinner-lg mr-15'></div>
        </div>
      ) : (
        <div className='createLeadContent'>
          <div className='createLeadContent_heading'>
            {viewleaddetail === "viewleaddetail" ? (
              <div className='createLeadContent_heading_view'>
                <PrimaryHeading>Lead Details</PrimaryHeading>
                <CustomButton type='button' width='95px' click={navigateHandler} text='Edit' />
              </div>
            ) : (
              <PrimaryHeading>
                {viewleaddetail === "editlead" ? "Edit Lead" : "Add Lead"}
              </PrimaryHeading>
            )}
          </div>
          <div className='createLeadContent_form'>
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
                        control='input'
                        type='text'
                        name='firstName'
                        disabled={viewleaddetail === "viewleaddetail"}
                        placeholder='Enter First Name'
                        label='First Name*'
                        className={
                          formik.errors.firstName && formik.touched.firstName
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='text'
                        name='lastName'
                        placeholder='Enter Last Name'
                        disabled={viewleaddetail === "viewleaddetail"}
                        label='Last Name*'
                        className={
                          formik.errors.lastName && formik.touched.lastName
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='leadVerificationStatusID'
                        disabled={viewleaddetail === "viewleaddetail"}
                        label='Leads Verification Status*'
                        placeholder="Choose Option"
                        className={
                          formik.errors.leadVerificationStatusID &&
                            formik.touched.leadVerificationStatusID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedLeadVerification}
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='assignedEmployeeID'
                        disabled={viewleaddetail === "viewleaddetail"}
                        label='Assigned Employee*'
                        placeholder="Choose Employee"
                        className={
                          formik.errors.assignedEmployeeID &&
                            formik.touched.assignedEmployeeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedAssignedEmployee}
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='leadSourceID'
                        disabled={viewleaddetail === "viewleaddetail"}
                        label='Leads Source*'
                        placeholder="Choose Leads Source"
                        className={
                          formik.errors.leadSourceID &&
                            formik.touched.leadSourceID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedLeadSource}
                      />

                      <FormControl
                        control='select'
                        type='text'
                        name='leadProfessionID'
                        disabled={viewleaddetail === "viewleaddetail"}
                        label='Profession*'
                        placeholder="Choose Profession"
                        className={
                          formik.errors.leadProfessionID &&
                            formik.touched.leadProfessionID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchLeadProfession}
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='email'
                        name='email'
                        disabled={viewleaddetail === "viewleaddetail"}
                        placeholder='Enter Email'
                        label='Email'
                        className={
                          formik.errors.email && formik.touched.email
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='select'
                        type='number'
                        name='phone2'
                        disabled={viewleaddetail === "viewleaddetail"}
                        label='Phone Type*'
                        placeholder="Choose Phone Type"
                        className={
                          formik.errors.phone2 && formik.touched.phone2
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={phoneType}
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='text'
                        name='phone'
                        disabled={viewleaddetail === "viewleaddetail"}
                        placeholder='Enter Phone Number'
                        label='Phone'
                        className={
                          formik.errors.phone && formik.touched.phone
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='countryID'
                        disabled={viewleaddetail === "viewleaddetail"}
                        label='Country'
                        placeholder="Choose Country"
                        className={
                          formik.errors.countryID &&
                            formik.touched.countryID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedCountry}
                      />


                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='text'
                        name='city'
                        disabled={viewleaddetail === "viewleaddetail"}
                        placeholder='Enter City'
                        label='City'
                        className={
                          formik.errors.city && formik.touched.city
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='text'
                        name='stateOrProvince'
                        disabled={viewleaddetail === "viewleaddetail"}
                        placeholder='Enter State or Province'
                        label='State or Province'
                        className={
                          formik.errors.stateOrProvince &&
                            formik.touched.stateOrProvince
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='text'
                        name='zipCode'
                        disabled={viewleaddetail === "viewleaddetail"}
                        placeholder='Enter Zipcode'
                        label='Zipcode - 5 digits'
                        className={
                          formik.errors.zipCode && formik.touched.zipCode
                            ? "is-invalid"
                            : "customInput"
                        }
                      />


                      <FormControl
                        control='select'
                        type='text'
                        name='contactPreferenceTypeID'
                        disabled={viewleaddetail === "viewleaddetail"}
                        label='Contact Preference'
                        placeholder="Choose Contact Preference"
                        className={
                          formik.errors.contactPreferenceTypeID &&
                            formik.touched.contactPreferenceTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={contactPreferences}
                      />


                    </CustomFormField>

                    {
                      viewleaddetail === 'viewleaddetail' ? (
                        <UploadedImages>
                          <Typography component='h6'>Upload Images*</Typography>
                          <div className='images'>
                            <img src={detailImg} alt="upload-img" />
                            <img src={detailImg} alt="upload-img" />
                          </div>
                        </UploadedImages>
                      ) : <CustomuploadFile setbrowsedImages={setbrowsedImages} />
                    }

                    {
                      viewleaddetail === 'viewleaddetail' ? null :
                        <ButtonBox>
                          <CustomButton type='button' color='#121212' bgColor='#F5F5F5' width='136px' border='none' click={changePath} text='Cancel' />
                          <CustomButton type='submit' disabled={submitFromLoading} text={viewleaddetail === "editlead" ? "Update Lead" : "Create Lead"} />
                        </ButtonBox>
                    }
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </LeadCreateContainer>
  );
};

export default CreateLead;

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required!"),
  lastName: Yup.string().required("Last name is required!"),
  leadVerificationStatusID: Yup.string().required(
    "Leads verificaton status is required!"
  ),
  leadSourceID: Yup.string().required("Leads source is required!"),
  leadProfessionID: Yup.string().required("Profession is required!"),
  email: Yup.string()
    .required("Email is required!")
    .email("Email should be valid"),
  phone: Yup.string().required("Phone is required!"),
  countryID: Yup.string().required("Country is required!"),
  city: Yup.string().required("City is required!"),
  zipCode: Yup.string().required("Zipcode is required!"),
  assignedEmployeeID: Yup.string().required("Assigned employee is required!"),
  stateOrProvince: Yup.string().required("State or province is required!"),
  contactPreferenceTypeID: Yup.string().required(
    "Contact preference is required!"
  ),
});

const phoneType = [
  {
    itemName: "USA",
    itemId: 1,
  },
  {
    itemName: "International",
    itemId: 1,
  },
];
const contactPreferences = [
  {
    itemName: "Email",
    itemId: '1',
  },
  {
    itemName: "Phone Call",
    itemId: '2',
  },
  {
    itemName: "Text Message",
    itemId: '3',
  },
];
