import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";

import { createOwner, updateOwner, deleteOwner } from "./../apiCalls/ownerCrud";
import { uploadFile } from "./../../../../api/uploadFile";

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
  TransactionStatusID,
  rowData,
  type,
  // options in select fields
  Countries,
  States,

  handleSubmitModal,
  handleCloseModal,
}) => {
  const classes = useStyles();

  const [OwnerID, setOwnerID] = useState(null);

  const [FirstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);
  const [AllowsMultipleBrokers, setAllowsMultipleBrokers] = useState("false");
  const [Email, setEmail] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [Address, setAddress] = useState(null); // note: it has no UI
  const [ZipCode, setZipCode] = useState("");
  const [ImageFileName, setImageFileName] = useState("");
  const [StateID, setStateID] = useState(null);
  const [CountryID, setCountryID] = useState(null);
  const [StateOrProvince, setStateOrProvince] = useState(null);

  const [DOB, setDOB] = useState(null); // note: it isn't in the signature
  const [City, setCity] = useState(null); // note: it isn't in the signature

  const [Errors, setErrors] = useState([]);

  const [phoneNoMaskStat, setPhoneNoMaskStat] = useState(true);
  const [phoneType, setPhoneType] = useState('usa');

  const getFieldValue = (field) => {
    return rowData?.[field];
  };
  const phoneNoValidation=(phoneNo)=>{
    if(phoneNo===null || phoneNo===""){
      return false;
    }
    phoneNo = phoneNo.replace(/ /gm, '');
    let numbAr = phoneNo.match(/\d/g);
    if(numbAr===null){
      return false;
    }
    phoneNo=numbAr.join("");
    if(phoneType==="usa"){
      if(phoneNo.length!==10){
        return false;
      }
    }else{
      if(phoneNo.length>15){
        return false;
      }
    }
    return true;
  };

  const maskPhoneNo=(phoneNo)=>{
    phoneNo = phoneNo.replace(/ /gm, '');
    let numbAr = phoneNo.match(/\d/g);
    if(numbAr===null){
      return "";
    }
    phoneNo=numbAr.join("");
    phoneNo=phoneNo.substring(0, 10);
    let newNo="";
    if(phoneNo.length>3){
      newNo+=`(${phoneNo.substring(0, 3)})`;
    }else{
      newNo+=`(${phoneNo.substring(0, 3)}`;
    }

    if(phoneNo.length>=4){
      newNo+=` ${phoneNo.substring(3, 6)}`;
    }else{
      newNo+=`${phoneNo.substring(3, 6)}`;
    }

    if(phoneNo.length>=7){
      newNo+=`-${phoneNo.substring(6, phoneNo.length)}`;
    }else{
      newNo+=`${phoneNo.substring(6, phoneNo.length)}`;
    }
    return newNo;
  };

  const internationalPhoneNo=(phoneNo)=>{
    phoneNo = phoneNo.replace(/ /gm, '');
    let numbAr = phoneNo.match(/\d/g);
    if(numbAr===null){
      return "";
    }
    phoneNo=numbAr.join("");
    phoneNo=phoneNo.substring(0, 15);
    return phoneNo;
  };

  useEffect(() => {
    if (!OwnerID && rowData) {
      setOwnerID(getFieldValue("ownerID"));

      setFirstName(getFieldValue("firstName"));
      setLastName(getFieldValue("lastName"));
      setAllowsMultipleBrokers(getFieldValue("allowsMultipleBrokers"));
      setEmail(getFieldValue("email"));
      setPhone(getFieldValue("phone"));
      setAddress(getFieldValue("address"));
      setZipCode(getFieldValue("zipCode"));
      setImageFileName(getFieldValue("imageFileName"));
      setStateID(getFieldValue("stateID"));
      setCountryID(getFieldValue("countryID"));
      setStateOrProvince(getFieldValue("stateOrProvince"));

      setDOB(
        getFieldValue("dob")
      ); /* note:  not found in postman or in php, but it exists in the UI in php code*/
      setCity(
        getFieldValue("city")
      ); /* note:  not found in postman or in php, but it exists in the UI in php code*/

      if(getFieldValue("phone").indexOf('(')>-1){
        setPhoneNoMaskStat(true);
        setPhoneType('usa')
      }else{
        setPhoneNoMaskStat(true);
        setPhoneType('international')
      }
    }
  }, [rowData]);

  //console.log("errors:", Errors);
  const ZipcodeNotValid = () => {
    if (isNaN(ZipCode) || ZipCode < 1 || ZipCode > 100000) {
      return true;
    }
  };

  const handleSubmit = () => {
    if (
      !FirstName ||
      !LastName ||
      !AllowsMultipleBrokers ||
      !Email ||
      !Phone ||
      /*!Address ||  note: will be added to error check when added to the UI */
      ZipcodeNotValid() ||
      !StateID ||
      !CountryID ||
      !StateOrProvince ||
      !DOB ||
      !City || 
      !phoneNoValidation(Phone)
    ) {
      //console.log(
      //  FirstName,
      //  LastName,
      //  AllowsMultipleBrokers,
      //  Email,
      //  Phone,
      //  ZipCode,
      //  StateID,
      //  CountryID,
      //  StateOrProvince,
      //  DOB,
      //  City
      //);
      let errors = [];
      !FirstName && errors.push("FirstName");
      !LastName && errors.push("LastName");
      !AllowsMultipleBrokers && errors.push("AllowsMultipleBrokers");
      !Email && errors.push("Email");
      /*!Address && errors.push("Address"); note: */
      ZipcodeNotValid() && errors.push("ZipCode");
      !StateID && errors.push("StateID");
      !CountryID && errors.push("CountryID");
      !StateOrProvince && errors.push("StateOrProvince");
      !DOB && errors.push("DOB");
      !City && errors.push("City");
      if(phoneNoValidation(Phone)===false){
        errors.push("Phone");
      }
      setErrors([...errors]);
    } else {
      let formData = {
        //ownerID: OwnerID,
        brokerID: BrokerID,
        transactionStatusID: TransactionStatusID,

        firstName: FirstName,
        lastName: LastName,
        allowsMultipleBrokers: AllowsMultipleBrokers,
        email: Email,
        phone: Phone,
        address: Address, // note:  I don't find any value for it in PHP updates
        zipCode: ZipCode,
        imageFileName: ImageFileName,
        //stateID: StateID,
        countryID: CountryID,
        //stateOrProvince: StateOrProvince,

        dob: DOB /* note:  not found in postman or in php, but it exists in the UI in php code*/,
        city: City /* note:  not found in postman or in php, but it exists in the UI in php code*/,
      };
      if (CountryID === "1") {
        formData.stateID = StateID;
      } else {
        formData.stateOrProvince = StateOrProvince;
      }
      if (type === "Create") {
        createOwner(EmployeeID, formData).then(() => {
          handleSubmitModal();
        });
      } else {
        formData.ownerID = OwnerID;
        updateOwner(EmployeeID, BrokerID, formData).then(() => {
          handleSubmitModal();
        });
      }
    }
  };

  let CountriesList = (
    <>
      <option aria-label="None" value="" />
      {Countries.map((Country) => {
        return <option value={Country.countryID}>{Country.country}</option>;
      })}
    </>
  );

  let StatesList = (
    <>
      <option aria-label="None" value="" />
      {States.map((States) => {
        return <option value={States.stateID}>{States.state}</option>;
      })}
    </>
  );

  let phoneNoType=null;
  if(phoneNoMaskStat){
    phoneNoType=(
      <FormControl 
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Phone Type
          </InputLabel>
          <Select
            native
            label="Phone Type?"
            value={phoneType}
            onChange={(e) => {
              setPhoneType(e.target.value);
              if(e.target.value==="usa"){
                setPhone(maskPhoneNo(Phone));
              }else{
                setPhone(internationalPhoneNo(Phone));
              }
            }}
          >
            <option value="usa">USA</option>
            <option value="international">International</option>
          </Select>
        </FormControl>
    )
  }

  let form = [
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.fields}>
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "FirstName")}
          required
          id="outlined-required"
          label="First Name"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={FirstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "LastName")}
          required
          id="outlined-required"
          label="Last Name"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={LastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <FormControl
          error={Errors.find(
            (fieldHasError) => fieldHasError === "AllowsMultipleBrokers"
          )}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Allow Multiple Brokers
          </InputLabel>
          <Select
            native
            label="Allow Multiple Brokers"
            inputProps={{
              name: "Allow Multiple Brokers",
              id: "outlined-age-native-simple",
            }}
            value={AllowsMultipleBrokers}
            onChange={(e) => {
              setAllowsMultipleBrokers(e.target.value);
            }}
          >
            {/*<option aria-label="None" value="" />*/}
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </FormControl>
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "Email")}
          required
          id="outlined-required"
          label="Email"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {phoneNoType}
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "Phone")}
          required
          id="outlined-required"
          label="Phone"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={Phone}
          onChange={(e) => {
            if(phoneNoMaskStat){
              if(phoneType==="usa"){
                setPhone(maskPhoneNo(e.target.value));
              }else{
                setPhone(internationalPhoneNo(e.target.value));
              }
            }else{
              setPhone(e.target.value);
            }
          }}
        />
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "CountryID")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Country</InputLabel>
          <Select
            native
            label="Country"
            inputProps={{
              name: "Country",
              id: "outlined-age-native-simple",
            }}
            value={CountryID}
            onChange={(e) => {
              setCountryID(e.target.value);
            }}
          >
            {CountriesList}
          </Select>
        </FormControl>
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "City")}
          required
          id="outlined-required"
          label="City"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={City}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        {CountryID == 1 ? (
          <FormControl
            error={Errors.find((fieldHasError) => fieldHasError === "StateID")}
            required
            variant="outlined"
            color="secondary"
            className={classes.TextField}
          >
            <InputLabel htmlFor="outlined-age-native-simple">State</InputLabel>
            <Select
              native
              label="State"
              inputProps={{
                name: "State",
                id: "outlined-age-native-simple",
              }}
              value={StateID}
              onChange={(e) => {
                setStateID(e.target.value);
                setStateOrProvince(e.target.value);
              }}
            >
              {StatesList}
            </Select>
          </FormControl>
        ) : (
          <TextField
            error={Errors.find(
              (fieldHasError) => fieldHasError === "StateOrProvince"
            )}
            required
            id="outlined-required"
            label="State or Province"
            variant="outlined"
            color="secondary"
            className={classes.TextField}
            value={StateOrProvince}
            onChange={(e) => {
              setStateOrProvince(e.target.value);
              setStateID(e.target.value);
            }}
          />
        )}
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "ZipCode")}
          required
          id="outlined-required"
          label="Zipcode - 5 digits"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={ZipCode}
          onChange={(e) => {
            setZipCode(e.target.value);
          }}
          type="number"
        />
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "DOB")}
          required
          id="outlined-required"
          //  label="DOB"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={DOB}
          onChange={(e) => {
            setDOB(e.target.value);
          }}
          type="date"
          helperText="DOB *"
        />
        <TextField
          //  required
          id="outlined-required"
          //  label="Owner Headshot Image Upload"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={ImageFileName}
          type="file"
          helperText="Owner Headshot Image Upload"
          onChange={(e) => {
            uploadFile(e.target).then((data) => {
              if (data.secure_url) {
                setImageFileName(data.secure_url);
              } else {
                alert("Please choose a valid image file");
              }
            });
          }}
        />
        {ImageFileName && (
          <img
            style={{ width: "100px", height: "51px", margin: "0 auto" }}
            src={ImageFileName}
            alt="Uploaded Imag"
          ></img>
        )}
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
            {error=='Phone' ? 'Phone is not valid' : error+' is missing'}
          </p>
        ))}
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
          {`${type} Owner`}
        </Button>
      </div>
    </form>,
  ];

  let deleteItem = [
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.buttons}>
        <Button
          className={`${classes.Button} ${classes.delete}`}
          variant="contained"
          color="secondary"
          onClick={() => {
            deleteOwner("xyz" /*employeeID*/, OwnerID);
          }}
        >
          {`${type} Owner`}
        </Button>
        <Button
          className={classes.Button}
          variant="contained"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
      </div>
    </form>,
  ];

  return type === "Delete" ? (
    deleteItem
  ) : rowData || type === "Create" ? (
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
