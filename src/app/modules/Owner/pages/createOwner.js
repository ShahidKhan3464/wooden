import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { createOwner, updateOwner, readAnOwner } from "./../apiCalls/ownerCrud";
import CustomAlert from "../../../../components/customAlert";
import CustomButton from "../../../../components/customButton/index";
import FormControl from "../../../../components/formControl";
import { ButtonBox, CustomFormField, PrimaryHeading, UploadedImages } from "../../../baseStyle";
import CustomuploadFile from "../../../../components/CustomuploadFile";
import { OwnerCreateContainer } from "./style";
import { Box, Typography } from "@material-ui/core";
import detailImg from '../../../../img/detailImg.png'

const CreateOwner = ({
    EmployeeID,
    BrokerID,
    TransactionStatusID,
    Countries,
    States,
}) => {
    const history = useHistory();
    const routeParams = window.location.pathname.split("/");
    const selectedLeadId = routeParams[3];
    const viewownerdetail = routeParams[2];
    console.log(viewownerdetail, 'viewownerdetail')




    const initialValues = {
        firstName: "",
        lastName: "",
        allowsMultipleBrokers: "",
        email: "",
        phone: "",
        address: "",
        zipCode: "",
        countryID: "",
        dob: "",
        city: "",
        stateOrProvince: "",

        imageFileName: "",
        brokerID: BrokerID,
        transactionStatusID: TransactionStatusID,
    };



    const [fetchedCountry, setfetchedCountry] = useState([])

    const [ListData, setListData] = useState(null);
    const [getDataLoading, setgetDataLoading] = useState(false);
    const [submitFromLoading, setsubmitFromLoading] = useState(false);
    const [browsedImages, setbrowsedImages] = useState([]);


    useEffect(() => {
        if (Countries) {
            const getCountries = Countries?.map((item) => {
                return {
                    itemName: item.country,
                    itemId: item.countryID,
                };
            });
            setfetchedCountry(getCountries)
        }
    }, [Countries])



    useEffect(() => {
        if (selectedLeadId) {
            setgetDataLoading(true);
            readAnOwner(EmployeeID, selectedLeadId)
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


    console.log(ListData, 'ListData');





    const navigateHandler = () => {
        history.push(`/owner/editowner/${selectedLeadId}`);
    };
    const changePath = () => {
        history.push("/owner/list");
    };
    const onSubmit = (value, { resetForm }) => {
        setsubmitFromLoading(true);


        const ownerFormData = { ...value, imageFileName: browsedImages[0]?.imageFilePath };

        if (viewownerdetail === "editowner") {
            updateOwner(EmployeeID, BrokerID, ownerFormData)
                .then((res) => {
                    setsubmitFromLoading(false);
                    resetForm();
                    CustomAlert("Owner update successfully", "success", changePath);
                })
                .catch((error) => {
                    console.log("error");
                    setsubmitFromLoading(false);
                    CustomAlert("Some thing went wrong", "error");
                });
        } else {
            createOwner(EmployeeID, ownerFormData)
                .then((res) => {
                    setsubmitFromLoading(false);
                    resetForm();
                    CustomAlert("Owner created successfully", "success", changePath);
                })
                .catch((error) => {
                    console.log("error");
                    setsubmitFromLoading(false);
                    CustomAlert("Some thing went wrong", "error");
                });
        }
    };


    return (
        <OwnerCreateContainer>
            {getDataLoading ? (
                <div className={"container"}>
                    <div className='container spinner-center spinner spinner-primary spinner-lg mr-15'></div>
                </div>
            ) : (
                <div className='createOwnerContent'>
                    <div className='createOwnerContent_heading'>
                        {viewownerdetail === "viewownerdetail" ? (
                            <div className='createOwnerContent_heading_view'>
                                <PrimaryHeading>Owner Details</PrimaryHeading>
                                <CustomButton type='button' width='95px' click={navigateHandler} text='Edit' />
                            </div>
                        ) : (
                            <PrimaryHeading>
                                {viewownerdetail === "editowner" ? "Edit Owner" : "Add Owner"}
                            </PrimaryHeading>
                        )}
                    </div>
                    <div className='createOwnerContent_form'>
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
                                                disabled={viewownerdetail === "viewownerdetail"}
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
                                                disabled={viewownerdetail === "viewownerdetail"}
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
                                                name='allowsMultipleBrokers'
                                                disabled={viewownerdetail === "viewownerdetail"}
                                                label='Allow Multiple Brokers*'
                                                placeholder="Choose Option"
                                                className={
                                                    formik.errors.allowsMultipleBrokers &&
                                                        formik.touched.allowsMultipleBrokers
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                                options={allowsMultipleBrokersList}
                                            />
                                            <FormControl
                                                control='input'
                                                type='email'
                                                name='email'
                                                disabled={viewownerdetail === "viewownerdetail"}
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
                                                type='text'
                                                name='leadSourceID'
                                                disabled={viewownerdetail === "viewownerdetail"}
                                                label='Phone Type'
                                                placeholder="Choose Phone Type"
                                                className={
                                                    formik.errors.leadSourceID &&
                                                        formik.touched.leadSourceID
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                                options={phoneType}
                                            />

                                            <FormControl
                                                control='input'
                                                type='text'
                                                name='phone'
                                                disabled={viewownerdetail === "viewownerdetail"}
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
                                                disabled={viewownerdetail === "viewownerdetail"}
                                                label='Country'
                                                placeholder="Choose Country Type"
                                                className={
                                                    formik.errors.countryID &&
                                                        formik.touched.countryID
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                                options={fetchedCountry}
                                            />

                                            <FormControl
                                                control='input'
                                                type='text'
                                                name='city'
                                                disabled={viewownerdetail === "viewownerdetail"}
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
                                                disabled={viewownerdetail === "viewownerdetail"}
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
                                                type='number'
                                                name='zipCode'
                                                disabled={viewownerdetail === "viewownerdetail"}
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
                                                type='text'
                                                name='dob'
                                                label='DOB*'
                                                placeholder='mm/dd/yyyy'
                                                disabled={viewownerdetail === "viewownerdetail"}
                                                className={
                                                    formik.errors.dob &&
                                                        formik.touched.dob
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />
                                            <div style={{ width: '100%' }}></div>

                                        </CustomFormField>
                                        {viewownerdetail === 'viewownerdetail' ? (
                                            <UploadedImages>
                                                <Typography component='h6'>Owner Headshot Image Upload</Typography>
                                                <div className='images'>
                                                    <img src={detailImg} alt="upload-img" />
                                                    <img src={detailImg} alt="upload-img" />
                                                </div>
                                            </UploadedImages>
                                        ) : <CustomuploadFile title='Owner Headshot Image Upload' setbrowsedImages={setbrowsedImages} />
                                        }


                                        {viewownerdetail === "viewownerdetail" ? null : (
                                            <ButtonBox>
                                                <CustomButton type='button' color='#121212' bgColor='#F5F5F5' width='136px' border='none' click={changePath} text='Cancel' />
                                                <CustomButton type='submit' disabled={submitFromLoading} text={viewownerdetail === 'editowner' ? 'Update Owner' : 'Create Owner'} />
                                            </ButtonBox>
                                        )}
                                    </form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            )}
        </OwnerCreateContainer>
    );
};

export default CreateOwner;
const phoneRegExp = /^[0-9]+$/;
const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required!"),
    lastName: Yup.string().required("Last name is required!"),

    allowsMultipleBrokers: Yup.string().required(
        "Allow multiple broker is required!"
    ),
    email: Yup.string()
        .required("Email is required!")
        .email("Email should be valid"),
    phone: Yup.string().required("Phone is required!").matches(
        phoneRegExp,
        'Phone number should be numbers only'
    ),
    countryID: Yup.string().required("Country is required!"),
    city: Yup.string().required("City is required!").nullable(),
    zipCode: Yup.string().required("Zipcode is required!").nullable(),
    dob: Yup.string().required("Date of birth is required!"),
    stateOrProvince: Yup.string().required(
        "State or province is required!"
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
const allowsMultipleBrokersList = [
    {
        itemName: "Yes",
        itemId: true,
    },
    {
        itemName: "No",
        itemId: false,
    },

];
