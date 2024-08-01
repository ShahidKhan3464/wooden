import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core';

import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';

import {
    createBroker,
    updateBroker,
    deleteBroker
} from './../apiCalls/brokerCrud';

const useStyles = makeStyles((theme) => ({
    fields: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    TextField: {
        width: "45%",
        marginBottom: "20px",
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
    // console.log("first",props.employeeID)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [minBudget, setMinBudget] = useState(null);
    const [maxBudget, setMaxBudget] = useState(null);
    const [numberOfGuests, setNumberOfGuests] = useState(null);
    const [numberOfCars, setNumberOfCars] = useState(null);
    const [specialRequest, setSpecialRequest] = useState(null);
    const [description, setDescription] = useState(null);
    const [departureInstructions, setDepartureInstructions] = useState(null);
    const [cancelationPolicy, setCancelationPolicy] = useState(null);
    // const [FirstName, setFirstName] = useState(null);
    // const [LastName, setLastName] = useState(null);
    // const [Active, setActive] = useState(1);
    // const [AllowMultipleBroker, setAllowMultipleBroker] = useState(1);
    // const [Email, setEmail] = useState(null);
    // const [Phone, setPhone] = useState(null);
    // const [Address, setAddress] = useState(null);
    // const [ZipCode, setZipCode] = useState(null);

    // const [formData, setFormData] = useState({
    //     startDate: startDate,
    //     endDate: endDate,
    //     minBudget: minBudget,
    //     maxBudget: maxBudget,
    //     numberOfGuests: numberOfGuests,
    //     numberOfCars: numberOfCars,
    //     specialRequest: specialRequest,
    //     description: description,
    //     departureInstructions: departureInstructions,
    //     cancelationPolicy: cancelationPolicy
    // });

    const [/*ownerID*/, setOwnerID] = useState(null);
    const [brokerID, /*setBrokerID*/] = useState(null);

    const classes = useStyles();

    const getFieldValue = (field) => {
        return props.rowData?.[field]
    }

    useEffect(() => {
        setStartDate(getFieldValue("startDate"));
        setEndDate(getFieldValue("endDate"));
        setMinBudget(getFieldValue("minBudget"));
        setMaxBudget(getFieldValue("maxBudget"));
        setNumberOfGuests(getFieldValue("numberOfGuests"));
        setNumberOfCars(getFieldValue("numberOfCars"));
        setSpecialRequest(getFieldValue("specialRequest"));
        setDescription(getFieldValue("description"));
        setDepartureInstructions(getFieldValue("departureInstructions"));
        setCancelationPolicy(getFieldValue("cancelationPolicy"));

        setOwnerID(getFieldValue("ownerID"));
    }, [props.rowData])

    const handleSubmit = () => {

        // if (
        //     !brokerManaged ||
        //     !coManaged ||
        //     !brokerOwned ||
        //     !property ||
        //     !employeeID 
        // !validateRate(brokerManaged) ||
        // !validateRate(coManaged) ||
        // !validateRate(brokerOwned) ||
        // !validateRate(property)
        // ) {
        // console.log("3rd party agent 111");
        // let errors = [];
        // !brokerManaged && errors.push("brokerManaged");
        // !coManaged && errors.push("coManaged");
        // !brokerOwned && errors.push("brokerOwned");
        // !property && errors.push("property");
        // !employeeID && errors.push("employeeID");
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

        //     setErrors([...errors]);
        // } else {
        // console.log("3rd party agent 11");
        const formData = {
            startDate: startDate,
            endDate: endDate,
            minBudget: minBudget,
            maxBudget: maxBudget,
            numberOfGuests: numberOfGuests,
            numberOfCars: numberOfCars,
            specialRequest: specialRequest,
            description: description,
            departureInstructions: departureInstructions,
            cancelationPolicy: cancelationPolicy
        }

        if (props.type === "Create") {
            createBroker(props.employeeID, props.brokerID, formData).then(() => {
                props.handleSubmitModal()
            })
        } else {
            updateBroker(props.employeeID, props.brokerID, formData).then(() => {
                props.handleSubmitModal()
            })
        }
    }

let form = [
    <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.fields}>
            <TextField
                required
                id="outlined-required"
                label="First Name"
                variant="outlined"
                color="secondary"
                className={classes.TextField}
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value) }}
            />
            <TextField
                required
                id="outlined-required"
                label="Last Name"
                variant="outlined"
                color="secondary"
                className={classes.TextField}
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value) }}
            />
            <FormControl
                required
                variant="outlined"
                color="secondary"
                className={classes.TextField}
            >
                <InputLabel id="demo-simple-select-outlined-label">Active</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Active"
                    value={getFieldValue("leadID")}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={1}>Person1</MenuItem>
                    <MenuItem value={2}>Person2</MenuItem>
                    <MenuItem value={3}>Person3</MenuItem>
                </Select>
            </FormControl>
            <FormControl
                required
                variant="outlined"
                color="secondary"
                className={classes.TextField}
            >
                <InputLabel id="demo-simple-select-outlined-label">Allow Multiple Brokers</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Allow Multiple Brokers"
                    value={getFieldValue("cityID")}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={1}>Person1</MenuItem>
                    <MenuItem value={2}>Person2</MenuItem>
                    <MenuItem value={3}>Person3</MenuItem>
                </Select>
            </FormControl>
            <TextField
                required
                id="outlined-required"
                label="Email"
                variant="outlined"
                color="secondary"
                className={classes.TextField}
                value={minBudget}
                onChange={(e) => { setMinBudget(e.target.value) }}
            />
            <TextField
                required
                id="outlined-required"
                label="Phone"
                variant="outlined"
                color="secondary"
                className={classes.TextField}
                value={maxBudget}
                onChange={(e) => { setMaxBudget(e.target.value) }}
            />
            <TextField
                required
                id="outlined-required"
                label="Address"
                variant="outlined"
                color="secondary"
                className={classes.TextField}
                value={numberOfGuests}
                onChange={(e) => { setNumberOfGuests(e.target.value) }}
            />
            <FormControl
                required
                variant="outlined"
                color="secondary"
                className={classes.TextField}
            >
                <InputLabel id="demo-simple-select-outlined-label">Zipcode</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Zipcode"
                    value={getFieldValue("carRental")}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={1}>Person1</MenuItem>
                    <MenuItem value={2}>Person2</MenuItem>
                    <MenuItem value={3}>Person3</MenuItem>
                </Select>
            </FormControl>
            <TextField
                required
                id="outlined-required"
                helperText="Owner Headshot Image Current Image"
                variant="outlined"
                color="secondary"
                className={classes.TextField}
                value={specialRequest}
                onChange={(e) => { setSpecialRequest(e.target.value) }}
                type="file"
            />

            <TextField
                required
                id="outlined-required"
                label="Departure Instructions"
                variant="outlined"
                color="secondary"
                className={classes.TextField}
                value={departureInstructions}
                onChange={(e) => { setDepartureInstructions(e.target.value) }}
            />

            <TextField
                required
                id="outlined-required"
                label="Cancelation Policy"
                variant="outlined"
                color="secondary"
                className={classes.TextField}
                value={cancelationPolicy}
                onChange={(e) => { setCancelationPolicy(e.target.value) }}
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
                {`${props.type} Broker`}
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
                    deleteBroker('xyz'/*employeeID*/, brokerID)
                }}
            >
                {`${props.type} Broker`}
            </Button>
            <Button
                className={classes.Button}
                variant="contained"
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
