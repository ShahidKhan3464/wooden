import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { createBroker, updateBroker, readABroker } from "./../apiCalls/brokerCrud";
import CustomAlert from "../../../../components/customAlert";
import CustomButton from "../../../../components/customButton/index";
import FormControl from "../../../../components/formControl";
import { ButtonBox, CustomFormField, PrimaryHeading, UploadedImages } from "../../../baseStyle"
import CustomuploadFile from "../../../../components/CustomuploadFile";
import { BrokerCreateContainer } from "./style";
import { Box, Typography } from "@material-ui/core";
import detailImg from '../../../../img/detailImg.png'

const CreateBroker = ({
    EmployeeID,
    BrokerID,
    TransactionStatusID,
    Countries,
    States,
}) => {
    const history = useHistory();
    const routeParams = window.location.pathname.split("/");
    const selectedLeadId = routeParams[3];
    const viewbrokerdetail = routeParams[2];




    const initialValues = {
        brokerFirstName: "",
        brokerLastName: "",
        allowsMultipleBrokers: "",
        email: "",
        phone: "",
        address: "",
        zipCode: "",
        brokerage: "Beckford Brokerage LLC",
        departureInstructions: "",
        cancelationPolicy: "",


        imageFileName: "",
        brokerPackageID: BrokerID,
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
            readABroker(EmployeeID, selectedLeadId)
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
        history.push(`/broker/editbroker/${selectedLeadId}`);
    };
    const changePath = () => {
        history.push("/owner/list");
    };
    const onSubmit = (value, { resetForm }) => {
        setsubmitFromLoading(true);

        const yatchFromDAta = { ...value, secondaryImagesList: browsedImages };

        if (viewbrokerdetail === "editbroker") {
            updateBroker(EmployeeID, BrokerID, value)
                .then((res) => {
                    setsubmitFromLoading(false);
                    resetForm();
                    CustomAlert("Broker update successfully", "success", changePath);
                })
                .catch((error) => {
                    console.log("error");
                    setsubmitFromLoading(false);
                    CustomAlert("Some thing went wrong", "error");
                });
        } else {
            createBroker(EmployeeID, value)
                .then((res) => {
                    setsubmitFromLoading(false);
                    resetForm();
                    CustomAlert("Broker created successfully", "success", changePath);
                })
                .catch((error) => {
                    console.log("error");
                    setsubmitFromLoading(false);
                    CustomAlert("Some thing went wrong", "error");
                });
        }
    };


    return (
        <BrokerCreateContainer>
            {getDataLoading ? (
                <div className={"container"}>
                    <div className='container spinner-center spinner spinner-primary spinner-lg mr-15'></div>
                </div>
            ) : (
                <div className='createBrokerContent'>
                    <div className='createBrokerContent_heading'>
                        {viewbrokerdetail === "viewbrokerdetail" ? (
                            <div className='createBrokerContent_heading_view'>
                                <PrimaryHeading>Broker Details</PrimaryHeading>
                                <CustomButton type='button' width='95px' click={navigateHandler} text='Edit' />
                            </div>
                        ) : (
                            <PrimaryHeading> {viewbrokerdetail === "editbroker" ? "Edit Broker" : "Add Broker"} </PrimaryHeading>
                        )}
                    </div>
                    <div className='createBrokerContent_form'>
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
                                        <CustomFormField>
                                            <FormControl
                                                control='input'
                                                type='text'
                                                name='brokerFirstName'
                                                disabled={viewbrokerdetail === "viewbrokerdetail"}
                                                placeholder='Enter First Name'
                                                label='First Name*'
                                                className={
                                                    formik.errors.brokerFirstName && formik.touched.brokerFirstName
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />
                                            <FormControl
                                                control='input'
                                                type='text'
                                                name='brokerLastName'
                                                placeholder='Enter Last Name'
                                                disabled={viewbrokerdetail === "viewbrokerdetail"}
                                                label='Last Name*'
                                                className={
                                                    formik.errors.brokerLastName && formik.touched.brokerLastName
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />
                                        </CustomFormField>

                                        <CustomFormField>
                                            <FormControl
                                                control='select'
                                                type='text'
                                                name='active'
                                                disabled={viewbrokerdetail === "viewbrokerdetail"}
                                                label='Active*'
                                                placeholder="Choose Option"
                                                className={
                                                    formik.errors.active &&
                                                        formik.touched.active
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                                options={allowsMultipleBrokersList}
                                            />
                                            <FormControl
                                                control='select'
                                                type='text'
                                                name='allowsMultipleBrokers'
                                                disabled={viewbrokerdetail === "viewbrokerdetail"}
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

                                        </CustomFormField>

                                        <CustomFormField>
                                            <FormControl
                                                control='input'
                                                type='email'
                                                name='email'
                                                disabled={viewbrokerdetail === "viewbrokerdetail"}
                                                placeholder='Enter Email'
                                                label='Email'
                                                className={
                                                    formik.errors.email && formik.touched.email
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />

                                            <FormControl
                                                control='input'
                                                type='text'
                                                name='phone'
                                                disabled={viewbrokerdetail === "viewbrokerdetail"}
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
                                                control='input'
                                                type='text'
                                                name='address'
                                                disabled={viewbrokerdetail === "viewbrokerdetail"}
                                                placeholder='Enter Your Address'
                                                label='Address'
                                                className={
                                                    formik.errors.address &&
                                                        formik.touched.address
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />
                                            <FormControl
                                                control='input'
                                                type='text'
                                                name='zipCode'
                                                disabled={viewbrokerdetail === "viewbrokerdetail"}
                                                placeholder='Enter Zipcode'
                                                label='Zipcode - 5 digits'
                                                className={
                                                    formik.errors.zipCode && formik.touched.zipCode
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />


                                        </CustomFormField>

                                        {viewbrokerdetail === 'viewbrokerdetail' ? (
                                            <UploadedImages>
                                                <Typography component='h6'>Upload Images*</Typography>
                                                <div className='images'>
                                                    <img src={detailImg} alt="upload-img" />
                                                    <img src={detailImg} alt="upload-img" />
                                                </div>
                                            </UploadedImages>
                                        ) : <CustomuploadFile setbrowsedImages={setbrowsedImages} />
                                        }

                                        <div>
                                            <FormControl
                                                control='textarea'
                                                type='text'
                                                name='departureInstructions'
                                                disabled={viewbrokerdetail === "viewbrokerdetail"}
                                                placeholder='Enter Departure Instructions'
                                                label='Departure Instructions'
                                                className={
                                                    formik.errors.departureInstructions &&
                                                        formik.touched.departureInstructions
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />
                                            <FormControl
                                                control='textarea'
                                                type='text'
                                                name='cancelationPolicy'
                                                disabled={viewbrokerdetail === "viewbrokerdetail"}
                                                placeholder='Enter Cancelation Policy'
                                                label='Cancelation Policy'
                                                className={
                                                    formik.errors.cancelationPolicy && formik.touched.cancelationPolicy
                                                        ? "is-invalid"
                                                        : "customInput"
                                                }
                                            />


                                        </div>

                                        {
                                            viewbrokerdetail === "viewbrokerdetail" ? null : (
                                                <ButtonBox>
                                                    <CustomButton type='button' color='#121212' bgColor='#F5F5F5' width='136px' border='none' click={changePath} text='Cancel' />
                                                    <CustomButton type='submit' disabled={submitFromLoading} text={viewbrokerdetail === "editbroker" ? "Update Broker" : "Create Broker"}
                                                    />
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
        </BrokerCreateContainer>
    );
};

export default CreateBroker;
const phoneRegExp = /^[0-9]+$/;
const validationSchema = Yup.object({
    brokerFirstName: Yup.string().required("First name is required!"),
    brokerLastName: Yup.string().required("Last name is required!"),

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
    address: Yup.string().required("Address is required!").nullable(),
    departureInstructions: Yup.string().required("Departure instructions is required!").nullable(),
    cancelationPolicy: Yup.string().required("Cancelation policy is required!").nullable(),
    zipCode: Yup.string().required("Zipcode is required!").nullable()
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
