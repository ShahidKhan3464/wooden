import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";

import { FormLabel } from "@material-ui/core";
import { FormGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import {
  createInquiry,
  updateInquiry,
  deleteInquiry,
} from "../apiCalls/inquiryCrud";
import {useHistory} from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from "moment";
import {getLeads} from '../../../../api/generalCrud';

const useStyles = makeStyles((theme) => ({
  fields: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  TextField: {
    width: "45%",
    marginBottom: "20px",
    "& .MuiFormHelperText-root": {
      width: "fit-content",
      padding: "0 5px",
      backgroundColor: "white",
      color: "#3783e7",
      position: "absolute",
      top: "-10px",
    },
    "@media (max-width: 767px)": {
      width: "100%",
    }
  },
  Amenities: {
    flexDirection: "row",
  },
  Amenity: {
    width: "33%",
    marginLeft: 0,
    marginRight: 0,
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
  rowData,
  type,
  // options in select fields
  Leads,
  Zipcodes,
  Amenities,

  handleSubmitModal,
  handleCloseModal,
}) => {
  const classes = useStyles();
  const [InquiryID, setInquiryID] = useState(null);

  const [StartDate, setStartDate] = useState(
    //getFormattedDateFromStandard(new Date())
    null
  );
  const [endDate, setEndDate] = useState(
    //getFormattedDateFromStandard(new Date())
    null
  );
  const [Lead, setLead] = useState(null);
  const [City, setCity] = useState(null);
  const [minBudget, setMinBudget] = useState(null);
  const [maxBudget, setMaxBudget] = useState(null);
  const [TransactionStatusID, setTransactionStatusID] = useState(1);
  const [numberOfGuests, setNumberOfGuests] = useState(null);
  const [numberOfCars, setNumberOfCars] = useState(null);
  const [CarRental, setCarRental] = useState(0);
  const [BoatRental, setBoatRental] = useState(0);
  const [CheckedAmenities, setCheckedAmenities] = useState([]);
  const [specialRequest, setSpecialRequest] = useState(null);
  const [description, setDescription] = useState(null);
  const [LeadName, setLeadName] = useState('');
  const [Errors, setErrors] = useState([]);
  const [EndDateError, setEndDateError] = useState(null);
  const [StartDateError, setStartDateError] = useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [PageLeads , setPageLeads] = useState([]);

  const getFieldValue = (field) => {
    return rowData?.[field];
  };
  let history = useHistory();
  useEffect(() => {
    if (getFieldValue("inquiryID")) {
      setInquiryID(getFieldValue("inquiryID"));
      setStartDate(getFormattedDateFromServer(getFieldValue("startDate")));
      setEndDate(getFormattedDateFromServer(getFieldValue("endDate")));
      setLead(getFieldValue("leadID"));
      setCity(getFieldValue("cityID"));
      setMinBudget(getFieldValue("minBudget"));
      setMaxBudget(getFieldValue("maxBudget"));
      setTransactionStatusID(getFieldValue("transactionStatusID"));
      setNumberOfGuests(getFieldValue("numberOfGuests"));
      setNumberOfCars(getFieldValue("numberOfCars"));
      setCarRental(getFieldValue("carRental"));
      setBoatRental(getFieldValue("boatRental"));
      if (getFieldValue("inquiryAmenities").length > 0) {
        let amenitiesVal = getFieldValue("inquiryAmenities").split(",");
        setCheckedAmenities(amenitiesVal);
      } else {
        setCheckedAmenities([]);
      }
      setSpecialRequest(getFieldValue("specialRequest"));
      setDescription(getFieldValue("description"));

    }
  }, [rowData]);

  useEffect(()=>{
    getLeads(EmployeeID,BrokerID,1).then((data)=>{
      setPageLeads(data?.Data);
    }).catch((err) => {
          console.error(err);
      });
  },[]);
  
 

  const handleSubmit = () => {
    let todayDate =  moment().format("Y-MM-DD");
    console.log(minBudget);
    let errors=[];
    if(StartDate==="" || StartDate===null){
      errors.push("StartDate")
    }
    if(endDate==="" || endDate===null){
      errors.push("endDate")
    }
    if(Lead==="" || Lead===null){
      errors.push("Lead")
    }
    if(City==="" || City===null){
      errors.push("City")
    }
    if(minBudget==="" || minBudget===null){
      errors.push("minBudget")
    }
    if(maxBudget==="" || maxBudget===null){
      errors.push("maxBudget")
    }
    if(numberOfGuests==="" || numberOfGuests===null){
      errors.push("numberOfGuests")
    }
    if(numberOfCars==="" || numberOfCars===null){
      errors.push("numberOfCars")
    }
    if(description==="" || description===null){
      errors.push("description")
    }
    

    if(StartDate>endDate){
      setEndDateError(true)
    }else{
      setEndDateError(null)
    }

    if(StartDate<todayDate) {
      setStartDateError(true);
    }else{
      setStartDateError(null)
    }
    setErrors([...errors]);

    if (errors.length===0){
      let inquiryAmenities = "";
      if(CheckedAmenities?.length > 0){
        for (let i = 0; i < CheckedAmenities.length; i++) {
          inquiryAmenities += `${CheckedAmenities[i]}${
              i < CheckedAmenities.length - 1 ? "," : ""
          }`;
        }
      }
      let formData = {
        inquiryID: InquiryID,
        transactionStatusID: TransactionStatusID,

        startDate: getFormattedDateToServer(StartDate),
        endDate: getFormattedDateToServer(endDate),
        leadID: Lead,
        cityID: City,
        minBudget: minBudget,
        maxBudget: maxBudget,
        numberOfGuests: numberOfGuests,
        numberOfCars: numberOfCars,
        carRental: CarRental,
        boatRental: BoatRental,
        inquiryAmenities: inquiryAmenities,
        specialRequest: specialRequest,
        description: description,
      };
      if (type === "Create") {
        createInquiry(EmployeeID, BrokerID, formData).then((data) => {
          history.push(
              `/MatchedProperties/list?id=${data.Data.inquiryID}&employeeID=${EmployeeID}&brokerID=${BrokerID}&startDate=${formData.startDate}&endDate=${formData.endDate}&leadFirstName=${LeadName}&leadLastName=&description=${formData?.description}`
          );
        });
      } else {
        updateInquiry(EmployeeID, BrokerID, formData).then((data) => {
          //handleSubmitModal();
          history.push(
            `/MatchedProperties/list?id=${InquiryID}&employeeID=${EmployeeID}&brokerID=${BrokerID}&startDate=${formData.startDate}&endDate=${formData.endDate}&leadFirstName=${LeadName}&leadLastName=&description=${formData?.description}`
          );
        });
      }
    }
  };

  const handleAmenitiesChange = (event, Amenity) => {
    let amentities = CheckedAmenities ? CheckedAmenities : [];
    let myCheckedAmenities = [...amentities];
    if (
      myCheckedAmenities.find(
        (CheckedAmenity) => CheckedAmenity == Amenity.amenityID
      )
    ) {
      const CheckedAmenityIndex = myCheckedAmenities.findIndex(
        (CheckedAmenity) => CheckedAmenity == Amenity.amenityID
      );
      myCheckedAmenities.splice(CheckedAmenityIndex, 1);
      setCheckedAmenities(myCheckedAmenities);
    } else {
      myCheckedAmenities = [
        ...myCheckedAmenities,
        Amenity.amenityID.toString(),
      ];
      setCheckedAmenities(myCheckedAmenities);
    }
    console.log("amenities", myCheckedAmenities);
  };

  function getFormattedDateFromStandard(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var year = date.getFullYear();
    return year + "-" + month + "-" + day;
  }

  const getFormattedDateFromServer = (date) => {
    date = date.split("/");
    let month = date[0];
    let day = date[1];
    let year = date[2];
    return year + "-" + month + "-" + day;
  };

  const getFormattedDateToServer = (date) => {
    date = date.split("-");
    let month = date[0];
    let day = date[1];
    let year = date[2];
    return month + "/" + day + "/" + year;
  };

  const addDaysToDate = function(sdate, days) {
    let finalEndDate =  moment(sdate).add(days,"d").format("Y-MM-DD");
    return finalEndDate;
  }
 
  let LeadsList = (
    <>
      <option aria-label="None" value="" />
      {PageLeads.map((Lead) => {
        return (
          <option value={Lead.leadID}>
            {Lead.firstName + " " + Lead.lastName}
          </option>
        );
      })}
    </>
  );
    
  const removeDuplicated = (Zipcodes) => {
    let myZipcodes = [...Zipcodes];
    let uniqueZipcodes = [];
    myZipcodes.forEach((myZipcode) => {
      let counter = 0;
      uniqueZipcodes.forEach((uniqueZipcode) => {
        if (myZipcode.cityID === uniqueZipcode.cityID) {
          counter++;
        }
      });
      if (counter === 0) {
        uniqueZipcodes.push(myZipcode);
      }
    });
    return uniqueZipcodes;
  };

  let uniqueZipcodes = removeDuplicated(Zipcodes);

  let CitiesList = (
    <>
      <option aria-label="None" value="" />
      {uniqueZipcodes.map((Zipcode) => {
        return (
          <option key={Zipcode.cityID} value={Zipcode.cityID}>
            {Zipcode.city + ", " + Zipcode.state}
          </option>
        );
      })}
    </>
  );
  let AmenitiesList = [];
  if (CheckedAmenities !== null || type !== "Update") {
    for (const Amenity of Amenities) {
      let checked = false;
      if (CheckedAmenities?.length > 0) {
        checked = CheckedAmenities.includes(Amenity.amenityID.toString());
      }
      AmenitiesList.push(
        <FormControlLabel
          key={Amenity.amenityID}
          className={classes.Amenity}
          control={
            <Checkbox
              defaultChecked={checked ? "true" : false}
              onChange={(event) => {
                handleAmenitiesChange(event, Amenity);
              }}
              name={Amenity.amenity}
            />
          }
          label={Amenity.amenity}
        />
      );
    }
  }
  let leadNameForm={firstName:'', lastName:'', leadID:null};
  if(Lead!=null){
    leadNameForm=PageLeads.find((Leaddata) =>Leaddata.leadID == Lead)
    //leadNameForm=leadNameForm.firstName+' '+leadNameForm.lastName
  }
  //console.log("StartDate: ", StartDate);
  //console.log("endDate: ", endDate);
  let form = [
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.fields}>
        <TextField
          error={(Errors.find((fieldHasError) => fieldHasError === "StartDate")  || StartDateError==true)}
          required
          id="outlined-required"
          defaultValue="Default Value"
          //  label="Start Date"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={StartDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            let enddateChanged=addDaysToDate(e.target.value, 1);
            setEndDate(enddateChanged);
          }}
          type="date"
          helperText="Start Date *"
        />
        <TextField
          error={(Errors.find((fieldHasError) => fieldHasError === "endDate") || EndDateError==true)}
          required
          id="outlined-required"
          //  label="End Date"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
          type="date"
          helperText="End Date *"
        />
          <Autocomplete
            className={classes.TextField}
            id="lead_box"
            options={PageLeads}
            getOptionLabel={(option) => option.firstName + ((option.lastName!="" && option.lastName!=null) ? " "+option.lastName : "")}
            value={leadNameForm}
            onChange={(event, newValue) => { 
              setLead(newValue?.leadID);
              setLeadName(newValue?.firstName + " " + newValue?.lastName);
            }}
            renderInput={(params) => <TextField {...params} label="Lead" name="Lead" variant="outlined"/>}
          />
        
        {/* <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "Lead")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Lead</InputLabel>
          <Select
            native
            label="Lead"
            inputProps={{
              name: "Lead",
              id: "outlined-age-native-simple",
            }}
            value={Lead}
            onChange={(e) => {
              let index = e.nativeEvent.target.selectedIndex;
              let text = e.nativeEvent.target[index].text;
              setLeadName(text)
              setLead(e.target.value);
            }}
          >
            {LeadsList}
          </Select>
        </FormControl> */}
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "City")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
          <Select
            native
            label="City"
            inputProps={{
              name: "City",
              id: "outlined-age-native-simple",
            }}
            value={City}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            {CitiesList}
          </Select>
        </FormControl>
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "minBudget")}
          required
          id="outlined-required"
          label="Minimum Budget"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={minBudget}
          onChange={(e) => {
            setMinBudget(e.target.value);
          }}
        />
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "maxBudget")}
          required
          id="outlined-required"
          label="Maximum Budget"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={maxBudget}
          onChange={(e) => {
            setMaxBudget(e.target.value);
          }}
        />
        <FormControl
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Active</InputLabel>
          <Select
            native
            label="Active"
            inputProps={{
              name: "transactionStatusID",
              id: "outlined-age-native-simple",
            }}
            onChange={(e) => {
              setTransactionStatusID(e.target.value);
            }}
          >
            {[
              { label: "Yes", value: 1 },
              { label: "No", value: 2 },
            ].map((key, index) => (
              <option
                selected={TransactionStatusID === key.value ? true : false}
                value={key.value}
              >
                {key.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "numberOfGuests"
          )}
          required
          id="outlined-required"
          label="Number of Guests"
          variant="outlined"
          InputProps={{ inputProps: { min: 0 } }}
          color="secondary"
          className={classes.TextField}
          value={numberOfGuests}
          onChange={(e) => {
            setNumberOfGuests(e.target.value);
          }}
          type="number"
        />
        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "numberOfCars"
          )}
          InputProps={{ inputProps: { min: 0 } }}
          required
          id="outlined-required"
          label="Number of Cars"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={numberOfCars}
          onChange={(e) => {
            setNumberOfCars(e.target.value);
          }}
          type="number"
        />
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "CarRental")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Car Rental
          </InputLabel>
          <Select
            native
            label="Car Rental?"
            inputProps={{
              name: "Car Rental",
              id: "outlined-age-native-simple",
            }}
            onChange={(e) => {
              setCarRental(e.target.value);
            }}
          >
            {[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
            ].map((key, index) => (
              <option
                selected={CarRental === key.value ? true : false}
                value={key.value}
              >
                {key.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "BoatRental")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Boat Rental?
          </InputLabel>
          <Select
            native
            label="Boat Rental?"
            inputProps={{
              name: "Boat Rental?",
              id: "outlined-age-native-simple",
            }}
            value={BoatRental}
            onChange={(e) => {
              setBoatRental(e.target.value);
            }}
          >
            {[
              { label: "Yes", value: 1 },
              { label: "No", value: 0 },
            ].map((key, index) => (
              <option
                selected={BoatRental === key.value ? true : false}
                value={key.value}
              >
                {key.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl
          component="fieldset"
          error={Errors.find(
            (fieldHasError) => fieldHasError === "CheckedAmenities"
          )}
        >
          <FormLabel component="legend">Amenities</FormLabel>
          <FormGroup className={classes.Amenities}>{AmenitiesList}</FormGroup>
        </FormControl>
        <TextField
          id="outlined-required"
          label="Special Request"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={specialRequest}
          onChange={(e) => {
            setSpecialRequest(e.target.value);
          }}
        />
        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "description"
          )}
          required
          id="outlined-required"
          label="Description"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          color: "#f018a6",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          //width: "80%",
        }}
      >
        {Errors.map((error) => (
          <p
            style={{
              padding: "10px",
            }}
          >
            {error} Is Missing
          </p>
        ))}
        {(EndDateError) ? 'End Date must be greater than start date.' : null}
        {(StartDateError) ? 'Start Date can not be in the past.' : null}
        

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
          {`${type} Inquiry`}
        </Button>
      </div>
    </form>,
  ];

  let deleteItem = [
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.buttons}>
        <Button
          className={classes.Button}
          variant="contained"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          className={`${classes.Button} ${classes.delete}`}
          variant="contained"
          color="secondary"
          onClick={() => {
            deleteInquiry("xyz" /*employeeID*/, InquiryID);
          }}
        >
          {`${type} Inquiry`}
        </Button>
      </div>
    </form>,
  ];

  return type === "Delete" ? (
    deleteItem
  ) : type === "Create" ? (
    form
  ) : type === "Update" && rowData ? (
    form
  ) : (
    <>
      <div className={"container"}>
        <div className="container spinner-center spinner spinner-primary spinner-lg mr-15"></div>
      </div>
    </>
  );
};

export default Form;
