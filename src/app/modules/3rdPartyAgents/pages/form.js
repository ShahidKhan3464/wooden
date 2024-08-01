import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core';

import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';

import {
    get3rdPartyAgents,
    create3rdPartyAgent,
    GetAvailable3rdPartyCommissionAgents,
    GetPropertyCategoryTypes,
    updateMy3rdPartyAgent
} from './../apiCalls/3rdpartyagentsCrud';

const useStyles = makeStyles((theme) => ({
    fields: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    TextField: {
        width: "45%",
        marginBottom: "20px",
    },
    selectedFieldCreate: {
        width: "45%",
        marginBottom: "20px",
        border: "1px solid #b7b0b0",
        borderRadius: '5px'

    },
    selectedFieldUpdateMain: {
        width: "100%",
        marginBottom: "20px",
        // border: "1px solid #b7b0b0",
        // borderRadius: '5px'
        justifyContent: "center"
    },
    selectedFieldUpdate: {
        width: "45%",
        margin: "auto",
        marginBottom: "20px",
        border: "1px solid #b7b0b0",
        borderRadius: '5px'
    },
    p: {
        margin: ' 2px 0px 0px 13px'
    },
    buttons: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-around",
    },
    Button: {
        width: "200px",
        height: "52px",
    }
}));

const Form = (props) => {

    const [/*ownerID*/, setOwnerID] = useState(null);
    const [brokerID, /*setBrokerID*/] = useState(null);

    const [availableAgent, setAvailableAgent] = useState([])

    const [employeeID, setEmployeeID] = useState(null)

    const [selectedEmployeeFirstName, setselectedEmployeeFirstName] = useState(null)
    const [selectedEmployeeLastName, setselectedEmployeeLastName] = useState(null)
    const [selectedEmployeeEmail, setselectedEmployeeEmail] = useState(null)
    const [selectedEmployeeBroker, setselectedEmployeeBroker] = useState(null)
    const [selectedEmployeeLocation, setselectedEmployeeLocation] = useState(null)
    const [selectedEmployeePhone, setselectedEmployeePhone] = useState(null)

    const [brokerManaged, setBrokerManaged] = useState(null)
    const [coManaged, setCoManaged] = useState(null)
    const [brokerOwned, setBrokerOwned] = useState(null)
    const [property, setProperty] = useState(null)

    const [Errors, setErrors] = useState([]);

    const classes = useStyles();

    const getFieldValue = (field) => {
        return props.rowData?.[field]
    }

    useEffect(() => {
        setOwnerID(getFieldValue("ownerID"));

        // setCommissionRateTypeID(getFieldValue("commissionRateTypeID"));
        // setCommissionRate(getFieldValue("commissionRateType"));

        setEmployeeID(getFieldValue("employeeID"));

        if (props.rowData !== null) {
            setselectedEmployeeFirstName(getFieldValue("employeeFirstName"))
            setselectedEmployeeLastName(getFieldValue("employeeLastName"))
            setselectedEmployeeEmail(getFieldValue("email"))
            setselectedEmployeePhone(getFieldValue("phone"))
            setselectedEmployeeBroker(getFieldValue("brokerage"))
            setselectedEmployeeLocation(getFieldValue("state"))


            const commissionRateList = props.rowData?.commissionRatesList;
            commissionRateList.map((ele) => {
                if (ele.commissionRateTypeID === 1) {
                    // console.log("aaaaa",ele.commissionRate);
                    setBrokerManaged(ele.commissionRate)
                }
                if (ele.commissionRateTypeID === 2) {
                    setCoManaged(ele.commissionRate)
                }
                if (ele.commissionRateTypeID === 3) {
                    setProperty(ele.commissionRate)
                }
                if (ele.commissionRateTypeID === 4) {
                    setBrokerOwned(ele.commissionRate)
                }
            })
        }

        GetAvailable3rdPartyCommissionAgents().then((data) => {
            // console.log("data", data.Data);
            setAvailableAgent(data.Data);
        }).catch((err) => {
            console.log(err)
        })

        // GetPropertyCategoryTypes().then((data) => {
        //     // console.log("data", data.Data);
        //     setPropertyCategory(data.Data);
        // }).catch((err) => {
        //     console.log(err)
        // })

        // get3rdPartyAgents().then((data) => {
        //     // console.log("data", data.Data);
        //     setExistingAgent(data.Data);
        // }).catch((err) => {
        //     console.log(err)
        // })

    }, [props.rowData])

    const handleSubmit = () => {

        if (
            !brokerManaged ||
            !coManaged ||
            !brokerOwned ||
            !property ||
            !employeeID
            // !validateRate(brokerManaged) ||
            // !validateRate(coManaged) ||
            // !validateRate(brokerOwned) ||
            // !validateRate(property)
        ) {
            // console.log("3rd party agent 111");
            let errors = [];
            !brokerManaged && errors.push("brokerManaged");
            !coManaged && errors.push("coManaged");
            !brokerOwned && errors.push("brokerOwned");
            !property && errors.push("property");
            !employeeID && errors.push("employeeID");
            // if(validateRate(brokerManaged)===false){
            //     errors.push("brokerManaged");
            //   }
            // if(validateRate(coManaged)===false){
            //     errors.push("coManaged");
            //   }
            // if(validateRate(brokerOwned)===false){
            //     errors.push("brokerOwned");
            //   }
            // if(validateRate(property)===false){
            //     errors.push("property");
            //   }

            setErrors([...errors]);
        } else {
            // console.log("3rd party agent 11");
            const formData = {
                employeeID: employeeID,
                brokerID: props.brokerID,
                commissionRatesList: [
                    {
                        commissionRateTypeID: 1,
                        commissionRate: brokerManaged,
                        propertyID: 34
                    },
                    {
                        commissionRateTypeID: 2,
                        commissionRate: coManaged,
                        propertyID: 34
                    },
                    {
                        commissionRateTypeID: 4,
                        commissionRate: brokerOwned,
                        propertyID: 34
                    },
                    {
                        commissionRateTypeID: 3,
                        commissionRate: property,
                        propertyID: 34
                    }
                ]
            }

            if (props.type === "Create") {
                create3rdPartyAgent(props.brokerID, formData).then(() => {
                    props.handleSubmitModal()
                })
            } else {
                // console.log("3rd party agent");
                updateMy3rdPartyAgent(props.brokerID, formData).then(() => {
                    props.handleSubmitModal()
                })
            }
        }
    };

    let availableAgentList = (
        <>
            <option aria-label="None" value="" />
            {availableAgent.map((agent) => {
                // console.log("aailable agent", agent);
                return <option value={agent.employeeID}>{agent.employeeFirstName}  {agent.employeeLastName}</option>;
            })}
        </>
    );


    let form = [
        <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.fields}>
                {props.type === "Create" &&
                    <FormControl
                        error={Errors.find((fieldHasError) => fieldHasError === "employeeID")}
                        required
                        variant="outlined"
                        color="secondary"
                        className={classes.TextField}
                    >
                        <InputLabel htmlFor="outlined-age-native-simple">Available 3rd Party Agents</InputLabel>
                        <Select
                            native
                            label="available 3rd party agents"
                            value={employeeID}
                            onChange={(e) => {
                                setEmployeeID(e.target.value)

                                let employee = availableAgent.filter((element) => element.employeeID == e.target.value)

                                setselectedEmployeeFirstName(employee[0].employeeFirstName)
                                setselectedEmployeeLastName(employee[0].employeeLastName)
                                setselectedEmployeeBroker(employee[0].brokerage)
                                setselectedEmployeeEmail(employee[0].email)
                                setselectedEmployeePhone(employee[0].phone)
                                setselectedEmployeeLocation(employee[0].state)
                            }}
                        >
                            {availableAgentList}
                        </Select>
                    </FormControl>
                }

                {props.type === "Create" ?
                    <>
                        {selectedEmployeeEmail && <div
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.selectedFieldCreate}
                        >
                            <p className={classes.p}>Broker : {selectedEmployeeBroker}</p>
                            <p className={classes.p}>Name : {selectedEmployeeFirstName && selectedEmployeeFirstName + " " + selectedEmployeeLastName}</p>
                            <p className={classes.p}>Phone : {selectedEmployeePhone}</p>
                            <p className={classes.p}>Email : {selectedEmployeeEmail}</p>
                            <p className={classes.p}>Location : {selectedEmployeeLocation}</p>
                        </div>}
                    </>
                    :
                    <div className={classes.selectedFieldUpdateMain}>
                        <div
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.selectedFieldUpdate}
                        >
                            <p className={classes.p}>Broker : {selectedEmployeeBroker}</p>
                            <p className={classes.p}>Name : {selectedEmployeeFirstName && selectedEmployeeFirstName + " " + selectedEmployeeLastName}</p>
                            <p className={classes.p}>Phone : {selectedEmployeePhone}</p>
                            <p className={classes.p}>Email : {selectedEmployeeEmail}</p>
                            <p className={classes.p}>Location : {selectedEmployeeLocation}</p>
                        </div>
                    </div>
                }

                <TextField
                    error={Errors.find((fieldHasError) => fieldHasError === "brokerManaged")}
                    required
                    id="outlined-required"
                    label="Commission Rate For: Broker Managed"
                    variant="outlined"
                    color="secondary"
                    className={classes.TextField}
                    value={brokerManaged}
                    onChange={(e) => { setBrokerManaged(e.target.value) }}
                />
                <TextField
                    error={Errors.find((fieldHasError) => fieldHasError === "coManaged")}
                    required
                    id="outlined-required"
                    label="Commission Rate For: Co Managed"
                    variant="outlined"
                    color="secondary"
                    className={classes.TextField}
                    value={coManaged}
                    onChange={(e) => { setCoManaged(e.target.value) }}
                />
                <TextField
                    error={Errors.find((fieldHasError) => fieldHasError === "brokerOwned")}
                    required
                    id="outlined-required"
                    label="Broker Owned"
                    variant="outlined"
                    color="secondary"
                    className={classes.TextField}
                    value={brokerOwned}
                    onChange={(e) => { setBrokerOwned(e.target.value) }}
                />

                <TextField
                    error={Errors.find((fieldHasError) => fieldHasError === "property")}
                    required
                    id="outlined-required"
                    label="3rd Party Property"
                    variant="outlined"
                    color="secondary"
                    className={classes.TextField}
                    value={property}
                    onChange={(e) => { setProperty(e.target.value) }}
                />
            </div>

            <div className={classes.buttons}>
                <Button
                    className={classes.Button}
                    variant="contained"
                    onClick={props.handleCloseModal}
                >
                    Cancel
                </Button>
                <Button
                    className={classes.Button}
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                >
                    {`${props.type} 3rd Party Agent`}
                </Button>
            </div>
        </form>
    ];

    let deleteItem = [
        <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.buttons}>
                <Button
                    className={`${classes.Button} ${classes.delete}`}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        get3rdPartyAgents('xyz'/*employeeID*/, brokerID)
                    }}
                >
                    {`${props.type} 3rd Party Agent`}
                </Button>
                <Button
                    className={classes.Button}
                    variant="contained"
                    onClick={props.handleCloseModal}
                >
                    Cancel
                </Button>
            </div>
        </form>
    ];

    return (
        props.type === 'Delete' ?
            deleteItem
            :
            props.rowData || props.type === 'Create' ?
                form
                :
                <>
                    <div className={'container'}>
                        <div className="container  spinner-center spinner spinner-primary spinner-lg mr-15"></div>
                    </div>
                </>
    )
}

export default Form;