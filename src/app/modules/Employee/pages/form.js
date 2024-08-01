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
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./../apiCalls/EmployeeCrud";
import { uploadFile } from "./../../../../api/uploadFile";
import moment from "moment";
import getUserRoles from "./../../../../api/getUserRoles";

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
  Roles: {
    flexDirection: "row",
  },
  Role: {
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

const getFormattedDateFromServer = (date) => {
  date = date.split("T");
  return date[0];
};

const Form = ({
  EmployeeID,
  BrokerID,
  TransactionStatusID,
  rowData,
  type,
  // options in select fields
  EmployeeTitles,
  CommissionRateTypes,
  Countries,
  States,
  Roles,

  handleSubmitModal,
  handleCloseModal,
}) => {
  const classes = useStyles();

  let role = getUserRoles();

  const [WantedEmployeeID, setWantedEmployeeID] = useState("");

  const [EmployeeFirstName, setEmployeeFirstName] = useState("");
  const [EmployeeLastName, setEmployeeLastName] = useState("");
  const [EmployeeTitleID, setEmployeeTitleID] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState(""); // note: it has no UI
  const [CityID, setCityID] = useState("");
  const [CountryID, setCountryID] = useState(null);
  const [StateID, setStateID] = useState("");
  const [ZipCode, setZipCode] = useState(""); 
  const [Email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");
  const [ImageFileName, setImageFileName] = useState("");
  const [CheckedRoles, setCheckedRoles] = useState([]);
  const [StateOrProvince, setStateOrProvince] = useState("");
  const [commissionRatesList, setCommissionRatesList] = useState([]);

  let CommissionRateTypesData={};
  for (let propertyCategoryType of CommissionRateTypes){
    let name=propertyCategoryType.commissionRateType.replace(' ','');
    CommissionRateTypesData[name]={
      "commissionRateTypeName": name,
      "propertyCategoryTypeID": propertyCategoryType.commissionRateTypeID,
      "propertyCategoryType": propertyCategoryType.commissionRateType,
      "value":0
    }
  }
  const [PropertyCategoryTypesState, setPropertyCategoryTypesState] = useState(CommissionRateTypesData);
  const [phoneNoMaskStat, setPhoneNoMaskStat] = useState(true);
  const [phoneType, setPhoneType] = useState('usa');

  const [Errors, setErrors] = useState([]);

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
    if (!WantedEmployeeID && rowData) {
      setWantedEmployeeID(getFieldValue("employeeID"));

      setEmployeeFirstName(getFieldValue("employeeFirstName"));
      setEmployeeLastName(getFieldValue("employeeLastName"));
      setEmployeeTitleID(getFieldValue("employeeTitleID"));
      setPhone(getFieldValue("phone"));
      setAddress(getFieldValue("address"));
      setCityID(getFieldValue("city"));
      setCountryID(getFieldValue("countryID"));
      setStateID(getFieldValue("stateID"));
      
      setZipCode(getFieldValue("zipCode"));
      setEmail(getFieldValue("email"));
      setDOB(getFormattedDateFromServer(getFieldValue("dob")));
      setImageFileName(getFieldValue("imageFileName"));
      
      if (rowData) {
        let rolesArray = getFieldValue("roles")
          .split(",")
          .map((role) => Number(role));
        setCheckedRoles(rolesArray);
      }
      setStateOrProvince(getFieldValue("stateOrProvince"));

      if(getFieldValue("phone").indexOf('(')>-1){
        setPhoneNoMaskStat(true);
        setPhoneType('usa')
      }else{
        setPhoneNoMaskStat(true);
        setPhoneType('international')
      }
      setCommissionRatesList(getFieldValue("commissionRatesList"));

      let comissionRates=[...getFieldValue("commissionRatesList")];
      let PropertyCategoryTypesStateNew={...PropertyCategoryTypesState};
      for(let comissionRate of comissionRates){
        let name=comissionRate.commissionRateType.replace(' ','');
        if(PropertyCategoryTypesStateNew.hasOwnProperty(name)){
          PropertyCategoryTypesStateNew[name].value=comissionRate.commissionRate
        }
      }
      setPropertyCategoryTypesState(PropertyCategoryTypesStateNew);
    }
  }, [rowData]);

  const ZipcodeNotValid = () => {
    if (isNaN(ZipCode) || ZipCode < 1 || ZipCode > 999999) {
      return true;
    }
    return false
  };

  //console.log(StateID, StateOrProvince);
  const handleSubmit = () => {
    if (
      !EmployeeFirstName ||
      !EmployeeLastName ||
      !EmployeeTitleID ||
      !Phone ||
      /*!Address ||  note: will be added to error check when added to the UI */
      !CityID ||
      !CountryID ||
      ZipcodeNotValid() ||
      !Email ||
      !DOB ||
      CheckedRoles.length === 0 ||
      (!StateID && !StateOrProvince) || 
      !phoneNoValidation(Phone)
    ) {
      //console.log(
      //  EmployeeFirstName,
      //  EmployeeLastName,
      //  EmployeeTitleID,
      //  Phone,
      //  CityID,
      //  CountryID,
      //  StateID,
      //  ZipCode,
      //  Email,
      //  DOB,
      //  CheckedRoles,
      //  StateOrProvince
      //);
      let errors = [];
      !EmployeeFirstName && errors.push("EmployeeFirstName");
      !EmployeeLastName && errors.push("EmployeeLastName");
      !EmployeeTitleID && errors.push("EmployeeTitleID");
      /*!Address && errors.push("Address"); note: */
      !CityID && errors.push("CityID");
      !CountryID && errors.push("CountryID");
      !StateID && errors.push("StateID");
      ZipcodeNotValid() && errors.push("ZipCode");
      !Email && errors.push("Email");
      !DOB && errors.push("DOB");
      CheckedRoles.length === 0 && errors.push("CheckedRoles");
      !StateOrProvince && errors.push("StateOrProvince");
      if(phoneNoValidation(Phone)===false){
        errors.push("Phone");
      }
      setErrors([...errors]);
    } else {
      let rolesToBeSent = "";
      for (let i = 0; i < CheckedRoles.length; i++) {
        rolesToBeSent += `${CheckedRoles[i]}${
          i < CheckedRoles.length - 1 ? "," : ""
        }`;
      }
      let PropertyCategoryTypesStateValue= Object.values(PropertyCategoryTypesState);

      PropertyCategoryTypesStateValue= PropertyCategoryTypesStateValue.map(el=>{
        return {
          "commissionRateTypeID": el.propertyCategoryTypeID,
          "commissionRate": parseFloat(el.value)
        }
      })
     
      const newDOB=moment(DOB).format("MM/DD/Y");
      let formData = {
        //employeeID: WantedEmployeeID,
        brokerID: BrokerID,
        transactionStatusID: TransactionStatusID,

        employeeFirstName: EmployeeFirstName,
        employeeLastName: EmployeeLastName,
        employeeTitleID: EmployeeTitleID,
        phone: Phone,
        address: Address, // it is not in the UI in PHP
        city: CityID,
        countryID: CountryID,
        //stateID: StateID,
        zipCode: ZipCode,
        email: Email,
        dob: newDOB,
        imageFileName: ImageFileName,
        roles: rolesToBeSent,
        commissionRatesList:PropertyCategoryTypesStateValue
        //stateOrProvince: StateOrProvince,
      };
     
      
      if (CountryID === "1") {
        formData.stateID = StateID;
      } else {
        formData.stateOrProvince = StateOrProvince;
      }
      if (type === "Create") {
        createEmployee(EmployeeID, formData).then(() => {
          handleSubmitModal();
        });
      } else {
        formData.employeeID = WantedEmployeeID;
        updateEmployee(EmployeeID, BrokerID, formData).then(() => {
          handleSubmitModal();
        });
      }
    }
  };

  const handleRolesChange = (event, Role) => {
    let myCheckedRoles = [...CheckedRoles];
    if (myCheckedRoles.find((CheckedRole) => CheckedRole === Role.roleID)) {
      const CheckedRoleIndex = myCheckedRoles.findIndex(
        (CheckedRole) => CheckedRole === Role.roleID
      );
      myCheckedRoles.splice(CheckedRoleIndex, 1);
      setCheckedRoles(myCheckedRoles);
    } else {
      myCheckedRoles = [...myCheckedRoles, Role.roleID];
      setCheckedRoles(myCheckedRoles);
    }
  };
  
  let EmployeeTitlesMap=[];
  if(EmployeeTitles!=null){
    EmployeeTitlesMap=[...EmployeeTitles];
    if(!role.includes("superAdmin")){
      EmployeeTitlesMap=EmployeeTitlesMap.filter(el=>{
        if(el.employeeTitleID==1){
          return false
        }
        return true
      })
    }
  }
  
  let EmployeeTitlesList = (
    <>
      <option aria-label="None" value="" />
      {EmployeeTitlesMap.map((EmployeeTitle) => {
        return (
          <option
            key={EmployeeTitle.employeeTitleID + EmployeeTitle.employeeTitle}
            value={EmployeeTitle.employeeTitleID}
          >
            {EmployeeTitle.employeeTitle}
          </option>
        );
      })}
    </>
  );

  



  let CountriesList = (
    <>
      <option aria-label="None" value="" />
      {Countries.map((Country) => {
        return (
          <option
            key={Country.countryID + Country.country}
            value={Country.countryID}
          >
            {Country.country}
          </option>
        );
      })}
    </>
  );

  let StatesList = (
    <>
      <option aria-label="None" value="" />
      {States.map((States) => {
        return (
          <option key={States.stateID + States.state} value={States.stateID}>
            {States.state}
          </option>
        );
      })}
    </>
  );

  //{/*if(CheckedRoles){*/}
  //{/*}*/}
  // to be tested after fixing employee update
  let RolesList = (
    <>
      {Roles.map((Role) => {
        if (Role.roleName !== "superAdmin") {
          let checked = false;

          if (CheckedRoles.find((CheckedRole) => CheckedRole === Role.roleID)) {
            checked = true;
          }

          return (
            <FormControlLabel
              key={Role.roleID}
              className={classes.Role}
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => {
                    handleRolesChange(event, Role);
                  }}
                  name={Role.roleName}
                />
              }
              label={Role.roleName}
            />
          );
        }
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

  let commissionRatesListHtml=null;
  if(PropertyCategoryTypesState!==null && Object.keys(PropertyCategoryTypesState).length>0){
    let newPropertyCategoryTypesState= Object.values(PropertyCategoryTypesState);
    commissionRatesListHtml=newPropertyCategoryTypesState.map((propertyCategoryType)=>{
      return <TextField
        key={propertyCategoryType.propertyCategoryTypeID}
        id="outlined-required"
        label={propertyCategoryType.propertyCategoryType}
        variant="outlined"
        color="secondary"
        className={classes.TextField}
        value={propertyCategoryType.value}
        onChange={(e) => {
          let PropertyCategoryTypesStateNew={...PropertyCategoryTypesState};
          PropertyCategoryTypesStateNew[propertyCategoryType.commissionRateTypeName].value=e.target.value
          setPropertyCategoryTypesState(PropertyCategoryTypesStateNew);
        }}
        type="number"
      />
    })
  }


  let form = [
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.fields}>
        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "EmployeeFirstName"
          )}
          required
          // id="outlined-required"
          label="First Name"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={EmployeeFirstName}
          onChange={(e) => {
            setEmployeeFirstName(e.target.value);
          }}
        />
        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "EmployeeLastName"
          )}
          required
          // id="outlined-required"
          label="Last Name"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={EmployeeLastName}
          onChange={(e) => {
            setEmployeeLastName(e.target.value);
          }}
        />
        <FormControl
          error={Errors.find(
            (fieldHasError) => fieldHasError === "EmployeeTitleID"
          )}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Title</InputLabel>
          <Select
            native
            label="Title"
            inputProps={{
              name: "Title",
              //id: 'outlined-age-native-simple',
            }}
            value={EmployeeTitleID}
            onChange={(e) => {
              setEmployeeTitleID(e.target.value);
            }}
          >
            {EmployeeTitlesList}
          </Select>
        </FormControl>
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "Email")}
          required
          // id="outlined-required"
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
          // id="outlined-required"
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
              //id: 'outlined-age-native-simple',
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
          error={Errors.find((fieldHasError) => fieldHasError === "CityID")}
          required
          // id="outlined-required"
          label="City"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={CityID}
          onChange={(e) => {
            setCityID(e.target.value);
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
          // id="outlined-required"
          label="Zipcode"
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
          // id="outlined-required"
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
          // id="outlined-required"
          //  label="Image Upload"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="file"
          helperText="Image Upload"
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
        

        
        <div style={{ display:'block',width:'100%',marginBottom:'15px' }}>Commission Rate by Property Type</div>

         {commissionRatesListHtml}
        

        <FormControl
          component="fieldset"
          error={Errors.find(
            (fieldHasError) => fieldHasError === "CheckedRoles"
          )}
        >



          <FormLabel component="legend">Roles</FormLabel>
          <FormGroup className={classes.Roles}>{RolesList}</FormGroup>
        </FormControl>




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
          {`${type} Employee`}
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
            deleteEmployee("xyz" /*employeeID*/, WantedEmployeeID);
          }}
        >
          {`${type} Employee`}
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
        <div className="container  spinner-center spinner spinner-primary spinner-lg mr-15"></div>
      </div>
    </>
  );
};

export default Form;
