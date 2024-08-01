import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";

import { createLead, updateLead, deleteLead } from "./../apiCalls/leadCrud";
import {getBrokersByEmployee} from '../../Broker/apiCalls/brokerCrud';
import getUserRoles from "./../../../../api/getUserRoles";
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
  LeadVerificationStatuses,
  AssignedEmployees,
  LeadSources,
  LeadProfessions,
  Countries,
  States,
  ContactPreferences,

  handleSubmitModal,
  handleCloseModal,
}) => {
  const classes = useStyles();

  const [LeadID, setLeadID] = useState(null);

  const [FirstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);
  const [LeadVerificationStatus, setLeadVerificationStatus] = useState(1);
  const [AssignedEmployee, setAssignedEmployee] = useState(null);
  const [LeadSource, setLeadSource] = useState(null);
  const [LeadProfession, setLeadProfession] = useState(1);
  const [Email, setEmail] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [Country, setCountry] = useState(null);
  const [City, setCity] = useState(null);
  const [State, setState] = useState(null);
  const [StateOrProvince, setStateOrProvince] = useState(null);
  const [ZipCode, setZipCode] = useState("");
  const [ImageFileName, setImageFileName] = useState("");
  const [Errors, setErrors] = useState([]);
  const [phoneNoMaskStat, setPhoneNoMaskStat] = useState(true);
  const [phoneType, setPhoneType] = useState('usa');
  const [brokerName, setBrokerName] = useState(null);
  const [brokerId, setBrokerId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [brokerList, setBrokerList] = useState([]);
  const [contactPreferenceTypeID, setContactPreferenceTypeID] = useState('');

  let role = getUserRoles();
  if (role.includes("regularAgent") && !AssignedEmployee) {
    setAssignedEmployee(EmployeeID);
  }
  useEffect(()=>{
    if(brokerList.length==0){
      getBrokersByEmployee(EmployeeID).then((data) => {
        setBrokerList(data.Data);
      });
    }
    

  })

    //contactPreferenceTypeID=3

    //  include default dropdown to set preferences


  const phoneNoValidation=(phoneNo)=>{
    if(phoneNo===null || phoneNo===""){
      return true;
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

  const getFieldValue = (field) => {
    return rowData?.[field];
  };
  //console.log("rowData", rowData);
  useEffect(() => {
    if (!LeadID && rowData) {
      setLeadID(getFieldValue("leadID"));

      setFirstName(getFieldValue("firstName"));
      setLastName(getFieldValue("lastName"));
      setLeadVerificationStatus(getFieldValue("leadVerificationStatusID"));
      setAssignedEmployee(getFieldValue("assignedEmployeeID"));
      setLeadSource(getFieldValue("leadSourceID"));
      setLeadProfession(getFieldValue("leadProfessionID"));
      setEmail(getFieldValue("email"));
      setPhone(getFieldValue("phone"));
      setCountry(getFieldValue("countryID"));
      setCity(getFieldValue("city"));
      setState(getFieldValue("stateID"));
      setStateOrProvince(getFieldValue("stateOrProvince")); //not found till now
      setZipCode(getFieldValue("zipCode"));
      setImageFileName(getFieldValue("imageFileName"));
      if(getFieldValue("phone").indexOf('(')>-1){
        setPhoneNoMaskStat(true);
        setPhoneType('usa')
      }else{
        setPhoneNoMaskStat(true);
        setPhoneType('international')
      }

      setBrokerId(getFieldValue("brokerID"))
      setContactPreferenceTypeID(getFieldValue("contactPreferenceTypeID"))
    }
  }, [rowData]);

  const ZipcodeNotValid = () => {
    if (isNaN(ZipCode) || ZipCode < 1 || ZipCode > 100000) {
      return true;
    }
  };

  const checkBrokerName=()=>{
    if(LeadSource===4){
      if(brokerName==="" || brokerName===null){
        return false;
      }
    }
    return true
  }
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  const validationOnContactPreferenceType=()=>{
    let status=false;
    if(contactPreferenceTypeID==1){
      if(Email=="" || Email==null){
        status= true;
      }else{
        if(validateEmail(Email)==false){
          status= true;
        }
      }
    }else if(contactPreferenceTypeID==2 || contactPreferenceTypeID==3){
      status=phoneNoValidation(Phone);
    }
    return status;
  }

  //console.log(Errors);
  /* 
  24) Create Lead: Profession, email, phone, city, state, and zipcode NOT REQUIRED. Lead Source
REQUIRED . Lead Verification status REQUIRED.
  */
  const handleSubmit = () => {
    let errors = [];
    !FirstName && errors.push("FirstName is required");
    !LeadVerificationStatus && errors.push("LeadVerificationStatus is required");
    !AssignedEmployee && errors.push("AssignedEmployee is required");
    !LeadSource && errors.push("LeadSource is required");
    !contactPreferenceTypeID && errors.push('contactPreferenceTypeID is required');
    if(phoneNoValidation(Phone)===false){
      errors.push("Phone is not valid");
    }
    if(checkBrokerName()===false){
      errors.push("brokerName is required");
    }
    if(contactPreferenceTypeID==1){
      if(Email==null || Email==""){
        errors.push("Email is required")
      }else{
        if(validateEmail(Email)==false){
          errors.push("Email is not valid")
        }
      }
    }else if(contactPreferenceTypeID==2 || contactPreferenceTypeID==3){
      if(Phone==="" || Phone===null){
        errors.push("Phone Will not be blank");
      }
      if(phoneNoValidation(Phone)==false){
        errors.push("Phone is not valid");
      }
    }
    if (errors.length>0) {
      setErrors([...errors]);
    } else {
      let formData = {
        //leadID: LeadID,
        brokerID: BrokerID,
        transactionStatusID: TransactionStatusID,

        firstName: FirstName,
        lastName: (LastName=="" || LastName==null) ? 'ep_LastName' : LastName,
        leadVerificationStatusID: LeadVerificationStatus,
        assignedEmployeeID: AssignedEmployee,
        leadSourceID: LeadSource,
        leadProfessionID: LeadProfession,
        email: Email,
        phone: Phone,
        countryID: Country,
        city: City,
        //stateID: State,
        //stateOrProvince: StateOrProvince,
        zipCode: ZipCode,
        imageFileName: ImageFileName,

        dob: null, // static as PHP updates
        address: "", // I don't find any value for it in PHP updates
        contactPreferenceTypeID: contactPreferenceTypeID
      };

      if(LeadSource==4){
        formData.referringBrokerID=brokerId;
        //formData.brokerID=brokerId;
        formData.referringBrokerName=brokerName;
      }
      if (role.includes("regularAgent")) {
        formData.assignedEmployeeID = EmployeeID;
      }
      if (Country == "1") {
        formData.stateID = State;
      } else {
        formData.stateOrProvince = StateOrProvince;
      }
      setMessages([])
      if (type === "Create") {
        createLead(EmployeeID, formData).then(() => {
          handleSubmitModal();
        }).catch(response => {
          if(response.body){
            let responseBody = JSON.parse(response.body);
            if(responseBody?.Messages){
              setMessages(responseBody?.Messages)
            }
          }
          
        });
      } else {
        formData.leadID = LeadID;
        updateLead(EmployeeID, BrokerID, formData).then(() => {
          handleSubmitModal();
        }).catch(response => {
          if(response.body){
            let responseBody = JSON.parse(response.body);
            if(responseBody?.Messages){
              setMessages(responseBody?.Messages)
            }
            
          }
          
        });
      }
    }
  };

  let LeadVerificationStatusesList = (
    <>
      {/*<option aria-label="None" value="" />*/}
      {LeadVerificationStatuses.map((LeadVerificationStatus) => {
        return (
          <option value={LeadVerificationStatus.leadVerificationStatusID}>
            {LeadVerificationStatus.leadVerificationStatus}
          </option>
        );
      })}
    </>
  );

  let AssignedEmployeesList = (
    <>
      <option aria-label="None" value="" />
      {AssignedEmployees?.map((AssignedEmployee) => {
        return (
          <option key={AssignedEmployee.employeeID} value={AssignedEmployee.employeeID}>
            {AssignedEmployee.employeeFirstName +
              " " +
              AssignedEmployee.employeeLastName}
          </option>
        );
      })}
    </>
  );

  let LeadSourcesList = (
    <>
      <option aria-label="None" value="" />
      {LeadSources.map((LeadSource) => {
        return (
          <option key={LeadSource.leadSourceID} value={LeadSource.leadSourceID}>
            {LeadSource.leadSource}
          </option>
        );
      })}
    </>
  );

  let LeadProfessionsList = (
    <>
      {/*<option aria-label="None" value="" />*/}
      {LeadProfessions.map((LeadProfession) => {
        return (
          <option key={LeadProfession.leadProfessionID} value={LeadProfession.leadProfessionID}>
            {LeadProfession.leadProfession}
          </option>
        );
      })}
    </>
  );

  let CountriesList = (
    <>
      <option aria-label="None" value="" />
      {Countries.map((Country) => {
        return <option key={Country.countryID} value={Country.countryID}>{Country.country}</option>;
      })}
    </>
  );

  let StatesList = (
    <>
      <option aria-label="None" value="" />
      {States.map((States) => {
        return <option key={States.stateID} value={States.stateID}>{States.state}</option>;
      })}
    </>
  );

  let contactPreferenceTypeList = (
    <>
      <option aria-label="None" value="" />
      {ContactPreferences.map((con) => {
        return <option key={con.contactPreferenceTypeID} value={con.contactPreferenceTypeID}>{con.contactPreferenceType}</option>;
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
            <option key="usa" value="usa">USA</option>
            <option key="international" value="international">International</option>
          </Select>
        </FormControl>
    )
  }

  let leadSourceNameHtml=null;
  if(LeadSource==4){
    let brokerNameList = (
      <>
        {/*<option aria-label="None" value="" />*/}
        {brokerList.map((LeadProfession) => {
          return (
            <option key={LeadProfession.brokerID} value={LeadProfession.brokerID}>
              {LeadProfession.brokerFirstName+' '+LeadProfession.brokerLastName}
            </option>
          );
        })}
      </>
    );
    leadSourceNameHtml=(
      
          <FormControl
            error={Errors.find((fieldHasError) => fieldHasError === "brokerName")}
            required
            variant="outlined"
            color="secondary"
            className={classes.TextField}
            >
            <InputLabel htmlFor="outlined-age-native-simple">
            Broker
            </InputLabel>
            <Select
              native
              label="Broker"
              inputProps={{
                name: "Broker",
                id: "outlined-age-native-simple",
              }}
              value={brokerId}
              onChange={(e) => {
                let id=e.target.value;
                let nameOb=brokerList.find((b) => b.brokerID == id);
                setBrokerId(e.target.value);
                setBrokerName(nameOb.brokerFirstName+' '+nameOb.brokerLastName)
              }}
            >
              {brokerNameList}
            </Select>
        </FormControl>
         
       
    )
  }


  let form = [
    <form className={classes.root} noValidate autoComplete="off">
      
      <div
        style={{
          color: "#f018a6",
        }}
      >
        {messages.map((message) => (
          <p>{message}</p>
        ))}
               

      </div>
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
            (fieldHasError) => fieldHasError === "LeadVerificationStatus"
          )}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Lead Verification Status?
          </InputLabel>
          <Select
            native
            label="Lead Verification Status?"
            inputProps={{
              name: "Lead Verification Status?",
              id: "outlined-age-native-simple",
            }}
            value={LeadVerificationStatus}
            onChange={(e) => {
              setLeadVerificationStatus(e.target.value);
            }}
          >
            {LeadVerificationStatusesList}
          </Select>
        </FormControl>
        {!role.includes("regularAgent") && (
          <FormControl
            error={Errors.find(
              (fieldHasError) => fieldHasError === "AssignedEmployee"
            )}
            required
            variant="outlined"
            color="secondary"
            className={classes.TextField}
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              Assigned Employee
            </InputLabel>
            <Select
              native
              label="Assigned Employee"
              inputProps={{
                name: "Assigned Employee",
                id: "outlined-age-native-simple",
              }}
              value={AssignedEmployee}
              onChange={(e) => {
                setAssignedEmployee(e.target.value);
              }}
            >
              {AssignedEmployeesList}
            </Select>
          </FormControl>
        )}
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "LeadSource")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Lead Source
          </InputLabel>
          <Select
            native
            label="Lead Source"
            inputProps={{
              name: "Lead Source",
              id: "outlined-age-native-simple",
            }}
            value={LeadSource}
            onChange={(e) => {
              setLeadSource(e.target.value);
            }}
          >
            {LeadSourcesList}
          </Select>
        </FormControl>
        {leadSourceNameHtml}
        <FormControl
          error={Errors.find(
            (fieldHasError) => fieldHasError === "LeadProfession"
          )}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Profession
          </InputLabel>
          <Select
            native
            label="Profession"
            inputProps={{
              name: "Profession",
              id: "outlined-age-native-simple",
            }}
            value={LeadProfession}
            onChange={(e) => {
              setLeadProfession(e.target.value);
            }}
          >
            {LeadProfessionsList}
          </Select>
        </FormControl>
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "Email")}
          //required
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
          //required
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
          error={Errors.find((fieldHasError) => fieldHasError === "Country")}
          //required
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
            value={Country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            {CountriesList}
          </Select>
        </FormControl>
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "City")}
          //required
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
        {Country == 1 ? (
          <FormControl
            error={Errors.find((fieldHasError) => fieldHasError === "State")}
            //required
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
              value={State}
              onChange={(e) => {
                setState(e.target.value);
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
            //required
            id="outlined-required"
            label="State or Province"
            variant="outlined"
            color="secondary"
            className={classes.TextField}
            value={StateOrProvince}
            onChange={(e) => {
              setStateOrProvince(e.target.value);
              setState(e.target.value);
            }}
          />
        )}
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "ZipCode")}
          //required
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
        <FormControl
            error={Errors.find((fieldHasError) => fieldHasError === "contactPreferenceTypeID")}
            //required
            variant="outlined"
            color="secondary"
            className={classes.TextField}
          >
            <InputLabel htmlFor="outlined-age-native-simple">Contact Preference</InputLabel>
            <Select
              native
              label="Contact Preference"
              inputProps={{
                name: "Contact Preference",
                id: "outlined-age-native-simple",
              }}
              value={contactPreferenceTypeID}
              onChange={(e) => {
                setContactPreferenceTypeID(e.target.value);
              }}
            >
              {contactPreferenceTypeList}
            </Select>
          </FormControl>
        <TextField
          //  required
          id="outlined-required"
          //  label="Upload Lead Head shot"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="file"
          helperText="Upload Lead Head shot"
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
          {`${type} Lead`}
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
            deleteLead("xyz" /*employeeID*/, LeadID);
          }}
        >
          {`${type} Lead`}
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
