import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import {
  createEmployee,
  updateEmployee,
  readAnEmployee,
} from "./../apiCalls/EmployeeCrud";
import CustomAlert from "../../../../components/customAlert";
import CustomButton from "../../../../components/customButton/index";
import FormControl from "../../../../components/formControl";
import { ButtonBox, CustomFormField, PrimaryHeading, UploadedImages } from "../../../baseStyle";
import CustomuploadFile from "../../../../components/CustomuploadFile";
import { EmployeeCreateContainer } from "./style";
import detailImg from '../../../../img/detailImg.png'

const CreateEmployee = ({
  EmployeeID,
  BrokerID,
  TransactionStatusID,
  rowData,
  type,
  EmployeeTitles,
  CommissionRateTypes,
  Countries,
  States,
  Roles,
}) => {
  const history = useHistory();
  const routeParams = window.location.pathname.split("/");
  const selectedLeadId = routeParams[3];
  const viewemployeedetail = routeParams[2];

  const initialValues = {
    brokerID: BrokerID,
    transactionStatusID: TransactionStatusID,
    employeeFirstName: "",
    employeeLastName: "",
    phone: "",
    address: "",
    city: "",
    countryID: "",
    zipCode: "",
    email: "",
    stateOrProvince: "",
    dob: "",
    imageFileName: "",
    employeeTitleID: "",
    available3rdPartyAgentname: "",
    brokerCommissionRate: "",
    coManagedCommissionRate: "",
    brokerOwned: "",
  };

  const [fetchedCountry, setfetchedCountry] = useState([]);
  const [roles, setroles] = useState([]);
  const [updatedRoles, setupdatedRoles] = useState([]);
  const [ListData, setListData] = useState(null);
  const [getDataLoading, setgetDataLoading] = useState(false);
  const [submitFromLoading, setsubmitFromLoading] = useState(false);
  const [browsedImages, setbrowsedImages] = useState([]);

  useEffect(() => {
    setgetDataLoading(true);
    if (Countries) {
      setgetDataLoading(false);

      const getCountries = Countries?.map((item) => {
        return {
          itemName: item.country,
          itemId: item.countryID,
        };
      });

      setfetchedCountry(getCountries);
    }
  }, [Countries]);

  useEffect(() => {
    if (selectedLeadId) {
      setgetDataLoading(true);
      readAnEmployee(EmployeeID, selectedLeadId)
        .then((res) => {
          setgetDataLoading(false);
          setListData(res.Data[0]);

          const data = JSON.parse("[" + res.Data[0].roles + "]");
          setupdatedRoles(data);
          setroles(data);
        })
        .catch((err) => {
          setgetDataLoading(false);
          console.log(err);
        });
    }
  }, [selectedLeadId]);

  const navigateHandler = () => {
    history.push(`/Employee/editemployee/${selectedLeadId}`);
  };
  const changePath = () => {
    history.push("/Employee/list");
  };
  const onSubmit = (value, { resetForm }) => {
    setsubmitFromLoading(true);
    const selectedRoles = roles.toString();
    const yatchFromDAta = {
      ...value,
      roles: selectedRoles,
      "commissionRatesList[0][commissionRateTypeID]": 1,
      "commissionRatesList[0][commissionRate]":
        value.available3rdPartyAgentname,
      "commissionRatesList[1][commissionRateTypeID]": 2,
      "commissionRatesList[1][commissionRate]": value.brokerCommissionRate,
      "commissionRatesList[2][commissionRateTypeID]": 3,
      "commissionRatesList[2][commissionRate]": value.coManagedCommissionRate,
      "commissionRatesList[3][commissionRateTypeID]": 4,
      "commissionRatesList[3][commissionRate]": value.brokerOwned,
    };

    if (selectedRoles === "") {
      CustomAlert("Roles are required", "warning");
    } else {
      if (viewemployeedetail === "editemployee") {
        updateEmployee(EmployeeID, BrokerID, yatchFromDAta)
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
        createEmployee(EmployeeID, yatchFromDAta)
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
    }
  };

  const handleCheckBox = (values) => {
    if (roles.includes(values)) {
      const filteredArray = roles.filter((item) => item !== values);
      setroles(filteredArray);
    } else {
      setroles([...roles, values]);
    }
  };


  console.log(ListData, 'ListDataListData');
  console.log(Roles, "Roles")

  return (
    <EmployeeCreateContainer>
      {getDataLoading ? (
        <div className={"container"}>
          <div className='container spinner-center spinner spinner-primary spinner-lg mr-15'></div>
        </div>
      ) : (
        <div className='createEmployeeContent'>
          <div className='createEmployeeContent_heading'>
            {viewemployeedetail === "viewemployeedetail" ? (
              <div className='createEmployeeContent_heading_view'>
                <PrimaryHeading>Employee Details</PrimaryHeading>
                <CustomButton type='button' width='95px' click={navigateHandler} text='Edit' />
              </div>
            ) : (
              <PrimaryHeading>
                {viewemployeedetail === "editemployee"
                  ? "Edit Employee"
                  : "Add Employee"}
              </PrimaryHeading>
            )}
          </div>
          <div className='createEmployeeContent_form'>
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
                        name='employeeFirstName'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        placeholder='Enter First Name'
                        label='First Name*'
                        className={
                          formik.errors.employeeFirstName &&
                            formik.touched.employeeFirstName
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='text'
                        name='employeeLastName'
                        placeholder='Enter Last Name'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        label='Last Name*'
                        className={
                          formik.errors.employeeLastName &&
                            formik.touched.employeeLastName
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='number'
                        name='employeeTitleID'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        label='Title*'
                        placeholder="Choose Title"
                        className={
                          formik.errors.employeeTitleID &&
                            formik.touched.employeeTitleID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={phoneType}
                      />
                      <FormControl
                        control='input'
                        type='email'
                        name='email'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        placeholder='Enter Email'
                        label='Email'
                        className={
                          formik.errors.email && formik.touched.email
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='number'
                        name='phone2'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        label='Phone Type*'
                        placeholder="Choose Phone Type"
                        className={
                          formik.errors.phone2 && formik.touched.phone2
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={phoneType}
                      />
                      <FormControl
                        control='input'
                        type='text'
                        name='phone'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        placeholder='Enter Phone Number'
                        label='Phone'
                        className={
                          formik.errors.phone && formik.touched.phone
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='countryID'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        label='Country'
                        placeholder="Choose Country"
                        className={
                          formik.errors.countryID && formik.touched.countryID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedCountry}
                      />
                      <FormControl
                        control='input'
                        type='text'
                        name='city'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        placeholder='Enter City'
                        label='City'
                        className={
                          formik.errors.city && formik.touched.city
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='text'
                        name='stateOrProvince'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        placeholder='Enter State or Province'
                        label='State or Province'
                        className={
                          formik.errors.stateOrProvince &&
                            formik.touched.stateOrProvince
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='text'
                        name='zipCode'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        placeholder='Enter Zipcode'
                        label='Zipcode - 5 digits'
                        className={
                          formik.errors.zipCode && formik.touched.zipCode
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='date'
                        name='dob'
                        label='DOB*'
                        placeholder="mm/dd/yyyy"
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        className={
                          formik.errors.dob && formik.touched.dob
                            ? "is-invalid"
                            : ""
                        }
                      />
                      <div style={{ width: '100%' }}></div>
                    </CustomFormField>

                    {viewemployeedetail === 'viewemployeedetail' ? (
                      <UploadedImages>
                        <Typography component='h6'>Upload Images*</Typography>
                        <div className='images'>
                          <img src={detailImg} alt="upload-img" />
                          <img src={detailImg} alt="upload-img" />
                        </div>
                      </UploadedImages>
                    ) : <CustomuploadFile setbrowsedImages={setbrowsedImages} />
                    }

                    <h1 className='createEmployeeContent_form_propertyType_heading'>
                      Commission Rate by Property Type
                    </h1>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='available3rdPartyAgentname'
                        placeholder='Enter Broker Manager'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        label='Commission Rate For: Broker Managed *'
                        className={
                          formik.errors.available3rdPartyAgentname &&
                            formik.touched.available3rdPartyAgentname
                            ? "is-invalid"
                            : "customInput"
                        }
                      />

                      <FormControl
                        control='input'
                        type='number'
                        name='brokerCommissionRate'
                        placeholder='Enter Broker Managed'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        label='Broker Managed'
                        className={
                          formik.errors.brokerCommissionRate &&
                            formik.touched.brokerCommissionRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='coManagedCommissionRate'
                        disabled={viewemployeedetail === "viewemployeedetail"}
                        placeholder='Enter Co Manager'
                        label='Commission Rate For: Co Managed*'
                        className={
                          formik.errors.coManagedCommissionRate &&
                            formik.touched.coManagedCommissionRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />

                      <FormControl
                        control='input'
                        type='number'
                        name='brokerOwned'
                        disabled={viewemployeedetail === "viewpartyagentdetail"}
                        placeholder='Enter Broker Owner'
                        label='Broker Owned*'
                        className={
                          formik.errors.brokerOwned &&
                            formik.touched.brokerOwned
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <div className='createEmployeeContent_form_roles'>
                      <h1>Roles</h1>
                      <div className='createEmployeeContent_form_amentities_form'>
                        {Roles?.map((checkBox, index) => {
                          if (ListData && updatedRoles.length === 0) {
                            return null
                          }
                          let checked = updatedRoles?.some(
                            (CheckedRole) => CheckedRole === checkBox.roleID
                          );
                          return (
                            <FormControlLabel
                              key={index}
                              className='controlLabel'
                              control={
                                ListData ? (
                                  <Checkbox
                                    size='large'
                                    color='secondary'
                                    defaultChecked={checked}
                                    className='checkbox'
                                    name={checkBox.roleName}
                                    onChange={(e) =>
                                      handleCheckBox(checkBox.roleID)
                                    }
                                  />
                                ) : (
                                  <Checkbox
                                    size='large'
                                    color='secondary'
                                    className='checkbox'
                                    name={checkBox.roleName}
                                    onChange={(e) =>
                                      handleCheckBox(checkBox.roleID)
                                    }
                                  />
                                )
                              }
                              label={
                                <span className='checkboxLabel'>
                                  {checkBox.roleName}
                                </span>
                              }
                            />
                          );
                        })}
                      </div>
                    </div>

                    {viewemployeedetail === "viewemployeedetail" ? null : (
                      <ButtonBox>
                        <CustomButton type='button' color='#121212' bgColor='#F5F5F5' width='136px' border='none' text='Cancel' />
                        <CustomButton type='submit' disabled={submitFromLoading} text={viewemployeedetail === 'editemployee' ? 'Update Employee' : 'Create Employee'} />
                      </ButtonBox>
                    )}
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </EmployeeCreateContainer>
  );
};

export default CreateEmployee;
const phoneRegExp = /^[0-9]+$/;
const validationSchema = Yup.object({
  employeeFirstName: Yup.string().required("First name is required!"),
  employeeLastName: Yup.string().required("Last name is required!"),
  email: Yup.string()
    .required("Email is required!")
    .email("Email should be valid"),
  phone: Yup.string()
    .required("Phone is required!")
    .matches(phoneRegExp, "Phone number should be numbers only"),
  countryID: Yup.string().required("Country is required!"),
  city: Yup.string().required("City is required!"),
  zipCode: Yup.string().required("Zipcode is required!"),
  stateOrProvince: Yup.string()
    .required("State or Province is required!")
    .nullable(),
  // dob: Yup.date()
  //   .max(new Date(Date.now() - 567648000000), 'You must be at least 18 years')
  //   .required('Date of birth is required'),
  dob: Yup.string().required("Date of birth is required"),
  employeeTitleID: Yup.string().required("Title is required!"),
  available3rdPartyAgentname: Yup.string().required(
    "Available 3rd party agents is required!"
  ),
  brokerCommissionRate: Yup.string().required(
    "Commission rate for: Broker managed is required!"
  ),
  coManagedCommissionRate: Yup.string().required(
    "Commission rate for: Co-managed is required!"
  ),
  brokerOwned: Yup.string().required("Broker owned is required!"),
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
