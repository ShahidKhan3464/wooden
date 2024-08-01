import LeadForm from "./leadForm";
import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Select } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core';
import { getLeads } from '../../../../api/generalCrud';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createQuickBook } from '../apiCalls/CalendarViewCrud';
import { getBrokersByEmployee } from '../../Broker/apiCalls/brokerCrud';
import { getLeadSources } from "../../../../api/generalCrud";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    fields: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    TextField: {
        width: "45%",
        marginBottom: "20px",
        "@media (max-width: 767px)": {
            width: "100%",
        }
    },
    buttons: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-around",
    },
    Button: {
        width: "200px",
        maxWidth: "45%",
        height: "52px",
    },
}));

const Form = ({
    EmployeeID,
    BrokerID,
    Properties,
    type,
    handleSubmitModal,
    handleCloseModal,
}) => {
    const classes = useStyles();
    const [Values, setValues] = useState({});
    const [ShowCreateLeadForm, SetShowCreateLeadForm] = useState(false);
    const [Leads, setLeads] = useState([]);
    const [LeadText, setLeadText] = useState("Create a new lead");
    const [errors, setErrors] = useState({});
    const [PhoneType, setPhoneType] = useState("usa");
    const [brokerList, setBrokerList] = useState([]);
    const [LeadSources, setLeadSources] = useState(null);



    useEffect(() => {
        getLeads(EmployeeID, BrokerID, 1).then((data) => {
            setLeads(data?.Data);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        if (brokerList.length == 0) {
            getBrokersByEmployee(EmployeeID).then((data) => {
                setBrokerList(data.Data);
            });
        }


    })

    useEffect(() => {
        if (LeadSources === null) {
            getLeadSources()
                .then((data) => {
                    setLeadSources(data.Data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }


    })

    const ToggleCreateLead = () => {
        if (!ShowCreateLeadForm === true) {
            Values.leadID = 0;
            HandleOnChange(Values)
            setLeadText("Use Existed lead");
        } else {
            delete Values.email;
            delete Values.leadFirstName;
            delete Values.leadLastName;
            delete Values.phone;
            setLeadText("Create a new lead");
        };
        SetShowCreateLeadForm(!ShowCreateLeadForm);
    }

    const handleSubmit = () => {
        let todayDate = moment().format("Y-MM-DD");
        let errorOb = {};
        if (!Values.hasOwnProperty('numberOfGuests')) {
            errorOb.numberOfGuests = 'Please add number of guest.';
        } else {
            if (Values.numberOfGuests < 0) {
                errorOb.numberOfGuests = 'Number of guest must be grater than 0.';
            }
        }

        if (!Values.hasOwnProperty('numberOfCars')) {
            errorOb.numberOfCars = 'Please add number of cars.';
        } else {
            if (Values.numberOfCars < 0) {
                errorOb.numberOfCars = 'Number of cars must be grater than 0.';
            }
        }

        if (!Values.hasOwnProperty('startDate')) {
            errorOb.startDate = 'Please add start date.';
        } else {
            if (Values.startDate == "" || Values.startDate == null) {
                errorOb.startDate = 'Please add start date.';
            } else if (Values.startDate < todayDate) {
                errorOb.startDate = "Start Date can not be in the past.";
            }
        }

        if (!Values.hasOwnProperty('endDate')) {
            errorOb.endDate = 'Please add end date.';
        } else {
            if (Values.endDate == "" || Values.endDate == null) {
                errorOb.endDate = 'Please add end date.';
            } else if (Values.startDate >= Values.endDate) {
                errorOb.endDate = "End date must be grater than start date.";
            } else if (Values.endDate < todayDate) {
                errorOb.endDate = "End Date can not be in the past.";
            }
        }

        if (!Values.hasOwnProperty('description')) {
            errorOb.description = 'Please add description.';
        } else {
            if (Values.description == "" || Values.description == null) {
                errorOb.description = 'Please add description';
            }
        }



        // if(!Values.hasOwnProperty('specialRequest')){
        //     errorOb.specialRequest='Please add special request.';
        // }else{
        //     if(Values.specialRequest=="" || Values.specialRequest==null){
        //         errorOb.specialRequest='Please add special request';
        //     }
        // }

        if (ShowCreateLeadForm) {
            if (!Values.hasOwnProperty('leadFirstName')) {
                errorOb.leadFirstName = 'Please add First Name.';
            } else {
                if (Values.leadFirstName == "" || Values.leadFirstName == null) {
                    errorOb.leadFirstName = 'Please add First Name';
                }
            }

            if (!Values.hasOwnProperty('leadLastName')) {
                errorOb.leadLastName = 'Please add Last Name.';
            } else {
                if (Values.leadLastName == "" || Values.leadLastName == null) {
                    errorOb.leadLastName = 'Please add Last Name.';
                }
            }

            if (!Values.hasOwnProperty('leadSourceID')) {
                errorOb.LeadSource = 'Please add Lead Source.';
            } else {
                if (Values.leadSourceID == "" || Values.leadSourceID == null) {
                    errorOb.LeadSource = 'Please add Lead Source';
                }
            }
            if (Values.leadSourceID == 4) {
                if (!Values.hasOwnProperty('referringBrokerID')) {
                    errorOb.brokerId = 'Please add broker.';
                } else {
                    if (Values.referringBrokerID == "" || Values.referringBrokerID == null) {
                        errorOb.brokerId = 'Please add broker';
                    }
                }
            }
        } else {
            if (!Values.hasOwnProperty('leadID')) {
                errorOb.leadID = 'Please add lead.';
            } else {
                if (Values.leadID == "" || Values.leadID == null) {
                    errorOb.leadID = 'Please add lead.';
                }
            }
        }



        if (Values.hasOwnProperty('phone')) {
            if (phoneNoValidation(Values.phone) == false) {
                errorOb.phone = 'Phone No is not valid.';
            }
        }
        if (ShowCreateLeadForm) {
            if ((Values.hasOwnProperty('phone') == false && Values.hasOwnProperty('email') == false) || (Values.phone == "" && Values.email == "")) {
                errorOb.phone = 'Please provide phone no or email address..';
            }
        }
        setErrors(errorOb);

        if (Object.keys(errorOb).length == 0) {
            if (!ShowCreateLeadForm) {
                delete Values.referringBrokerID;
                delete Values.referringBrokerName;
            }
            createQuickBook(Values, BrokerID, EmployeeID).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.error(err);
            }).then(() => {
                handleSubmitModal();
            });
        }

    }
    const phoneNoValidation = (phoneNo) => {
        if (phoneNo == null) {
            return false;
        }
        phoneNo = phoneNo.replace(/ /gm, '');
        let numbAr = phoneNo.match(/\d/g);
        if (numbAr == null) {
            return false;
        }
        phoneNo = numbAr.join("");
        if (PhoneType == "usa") {
            if (phoneNo.length != 10) {
                return false;
            }
        } else {
            if (phoneNo.length > 15) {
                return false;
            }
        }
        return true;
    };

    const HandleOnChange = (value) => {
        setValues({ ...Values, ...value });
    }

    const SetPhoneType = (value) => {
        setPhoneType(value)
    }
    const addDaysToDate = function (sdate, days) {
        let finalEndDate = moment(sdate).add(days, "d").format("Y-MM-DD");
        return finalEndDate;
    }


    let form = [
        <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.fields}>
                <Autocomplete
                    className={classes.TextField}
                    id="property_box"
                    options={Properties}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue) => {
                        HandleOnChange({ propertyID: newValue?.id });
                    }}
                    renderInput={(params) => <TextField {...params} label="Property" name="Property" variant="outlined" />}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Price"
                    variant="outlined"
                    color="secondary"
                    className={classes.TextField}
                    onChange={(e) => { HandleOnChange({ price: e.target.value }) }}
                    type="number"
                />
                <FormControl
                    variant="outlined"
                    color="secondary"
                    className={classes.TextField}
                >
                    <TextField
                        id="BlockStartDateField"
                        variant="outlined"
                        color="secondary"
                        className={`${errors.hasOwnProperty('startDate') ? "is-invalid" : ""}`}
                        onChange={(e) => {
                            //HandleOnChange({startDate : e.target.value});
                            let enddateChanged = addDaysToDate(e.target.value, 1);
                            HandleOnChange({ endDate: enddateChanged, startDate: e.target.value });
                        }}
                        type="date"
                        value={Values.startDate}
                        helperText="Book Start Date"
                    />
                    {errors.hasOwnProperty('startDate') ? (
                        <div className="invalid-feedback">{errors.startDate}</div>
                    ) : null}
                </FormControl>
                <FormControl
                    variant="outlined"
                    color="secondary"
                    className={classes.TextField}
                >
                    <TextField
                        id="BlockEndDateField"
                        variant="outlined"
                        color="secondary"
                        className={`${errors.hasOwnProperty('endDate') ? "is-invalid" : ""}`}
                        onChange={(e) => {
                            HandleOnChange({ endDate: e.target.value });
                        }}
                        type="date"
                        value={Values.endDate}
                        helperText="Book End Date"
                    />
                    {errors.hasOwnProperty('endDate') ? (
                        <div className="invalid-feedback">{errors.endDate}</div>
                    ) : null}
                </FormControl>

                <FormControl
                    variant="outlined"
                    color="secondary"
                    className={classes.TextField}
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Number of Guests"
                        variant="outlined"
                        color="secondary"
                        className={`${errors.hasOwnProperty('numberOfGuests') ? "is-invalid" : ""}`}
                        onChange={(e) => { HandleOnChange({ numberOfGuests: e.target.value }) }}
                        type="number"
                        min="0"
                    />

                    {errors.hasOwnProperty('numberOfGuests') ? (
                        <div className="invalid-feedback">{errors.numberOfGuests}</div>
                    ) : null}

                </FormControl>

                <FormControl
                    variant="outlined"
                    color="secondary"
                    className={classes.TextField}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Number Of Cars"
                        variant="outlined"
                        color="secondary"
                        className={`${errors.hasOwnProperty('numberOfCars') ? "is-invalid" : ""}`}
                        onChange={(e) => { HandleOnChange({ numberOfCars: e.target.value }) }}
                        type="number"
                        min="0"
                    />
                    {errors.hasOwnProperty('numberOfCars') ? (
                        <div className="invalid-feedback">{errors.numberOfCars}</div>
                    ) : null}

                </FormControl>
                <FormControl
                    variant="outlined"
                    color="secondary"
                    className={classes.TextField}
                >
                    <TextField
                        required
                        id="BlockEndDateField"
                        label="Description"
                        variant="outlined"
                        color="secondary"
                        className={`${errors.hasOwnProperty('description') ? "is-invalid" : ""}`}
                        onChange={(e) => {
                            HandleOnChange({ description: e.target.value });
                        }}
                    />
                    {errors.hasOwnProperty('description') ? (
                        <div className="invalid-feedback">{errors.description}</div>
                    ) : null}
                </FormControl>
                <FormControl
                    variant="outlined"
                    color="secondary"
                    className={classes.TextField}
                >
                    <TextField
                        id="BlockEndDateField"
                        label="Special Request"
                        variant="outlined"
                        color="secondary"
                        className={`${errors.hasOwnProperty('specialRequest') ? "is-invalid" : ""}`}
                        onChange={(e) => {
                            HandleOnChange({ specialRequest: e.target.value });
                        }}
                    />
                    {errors.hasOwnProperty('specialRequest') ? (
                        <div className="invalid-feedback">{errors.specialRequest}</div>
                    ) : null}
                </FormControl>
                <hr style={{ "width": "100%" }} />
                <Button
                    className={classes.Button}
                    variant="contained"
                    onClick={ToggleCreateLead}
                >
                    {LeadText}
                </Button>
                {ShowCreateLeadForm ?
                    <LeadForm HandleOnChange={HandleOnChange} HandleSetPhoneType={SetPhoneType} errors={errors} brokerList={brokerList} LeadSources={LeadSources} />
                    :
                    <>
                        <FormControl
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                        >
                            <Autocomplete
                                className={`${errors.hasOwnProperty('leadID') ? "is-invalid" : ""}`}
                                id="property_box"
                                options={Leads}
                                getOptionLabel={(option) => option.firstName + " " + option.lastName}
                                onChange={(event, newValue) => {
                                    HandleOnChange({ leadID: newValue?.leadID });
                                }}
                                renderInput={(params) => <TextField {...params} label="Lead" name="Lead" variant="outlined" />
                                }
                            />
                            {errors.hasOwnProperty('leadID') ? (
                                <div className="invalid-feedback">{errors.leadID}</div>
                            ) : null}
                        </FormControl>
                    </>}

            </div>
            <div className={classes.buttons}>
                <Button
                    className={classes.Button}
                    variant="contained"
                    onClick={handleCloseModal}
                >
                    Cancel
                </Button>
                <Button
                    className={classes.Button}
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                >
                    {`${type} Quick Book`}
                </Button>
            </div>
        </form>
    ];
    return (form);
}

export default Form;