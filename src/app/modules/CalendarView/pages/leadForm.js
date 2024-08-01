import React,{useState} from 'react';
import {makeStyles, TextField, FormControl,InputLabel, Select } from "@material-ui/core";
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
    
    
const LeadForm = ({HandleOnChange, HandleSetPhoneType, errors, brokerList, LeadSources}) => {
    const classes = useStyles();
    const [Phone, setPhone] = useState("");
    const [phoneNoMaskStat, setPhoneNoMaskStat] = useState(true);
    const [phoneType, setPhoneType] = useState('usa');

    const [LeadSource, setLeadSource] = useState(null);
    const [brokerName, setBrokerName] = useState(null);
    const [brokerId, setBrokerId] = useState(null);
    



    const maskPhoneNo=(phoneNo)=>{
        phoneNo = phoneNo.replace(/ /gm, '');
        let numbAr = phoneNo.match(/\d/g);
        if(numbAr==null){
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
        if(numbAr==null){
          return "";
        }
        phoneNo=numbAr.join("");
        phoneNo=phoneNo.substring(0, 15);
        return phoneNo;
      };

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
                HandleSetPhoneType(e.target.value)
                if(e.target.value==="usa"){
                  setPhone(maskPhoneNo(Phone));
                  HandleOnChange({phone : maskPhoneNo(Phone)});
                }else{
                  setPhone(internationalPhoneNo(Phone));
                  HandleOnChange({phone : internationalPhoneNo(Phone)});
                }
              }}
            >
              <option value="usa">USA</option>
              <option value="international">International</option>
            </Select>
          </FormControl>
      )
    }

    let LeadSourcesList=null;
    if(LeadSources!=null){
        LeadSourcesList = (
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
                className={`${errors.hasOwnProperty('brokerId') ? "is-invalid" : ""}`}
                inputProps={{
                    name: "Broker",
                    id: "outlined-age-native-simple",
                }}
                value={brokerId}
                onChange={(e) => {
                    let id=e.target.value;
                    let nameOb=brokerList.find((b) => b.brokerID == id);
                    setBrokerId(e.target.value);
                    let name="";
                    if(nameOb){
                      name=nameOb.brokerFirstName+' '+nameOb.brokerLastName;
                    }
                    setBrokerName(name)
                    HandleOnChange({referringBrokerID : e.target.value, referringBrokerName : name});
                }}
                >
                    <option key="broker" value="">Select Broker</option>
                {brokerNameList}
                </Select>
                {errors.hasOwnProperty('brokerId') ?  (
                            <div className="invalid-feedback">{errors.brokerId}</div>
                            ) : null}
            </FormControl>
            
        
        )
    }

    return(<>

        <TextField
            id="outlined-required"
            label="Email"
            variant="outlined"
            color="secondary"
            className={classes.TextField}
            onChange={(e) => {
                HandleOnChange({email : e.target.value});
            }}
        />
        

        <FormControl 
                variant="outlined"
                color="secondary"
                className={classes.TextField}>
            <TextField
            id="outlined-required"
            label="First Name"
            variant="outlined"
            color="secondary"
            className={`${errors.hasOwnProperty('leadFirstName') ? "is-invalid" : ""}`}
            onChange={(e) => {
              HandleOnChange({leadFirstName : e.target.value});
            }}
        />
        {errors.hasOwnProperty('leadFirstName') ?  (
                  <div className="invalid-feedback">{errors.leadFirstName}</div>
                ) : null}
            
        </FormControl>

        

        <FormControl 
                variant="outlined"
                color="secondary"
                className={classes.TextField}>
            <TextField
            id="outlined-required"
            label="Last Name"
            variant="outlined"
            color="secondary"
            className={`${errors.hasOwnProperty('leadLastName') ? "is-invalid" : ""}`}
            onChange={(e) => {
              HandleOnChange({leadLastName : e.target.value});
                  
            }}
        />
        {errors.hasOwnProperty('leadLastName') ?  (
                  <div className="invalid-feedback">{errors.leadLastName}</div>
                ) : null}
            
        </FormControl>
        <FormControl
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
                  className={`${errors.hasOwnProperty('LeadSource') ? "is-invalid" : ""}`}
                  inputProps={{
                      name: "Lead Source",
                      id: "outlined-age-native-simple",
                  }}
                  value={LeadSource}
                  onChange={(e) => {
                      setLeadSource(e.target.value);
                      HandleOnChange({leadSourceID:e.target.value})
                  }}
              >
                  {LeadSourcesList}
              </Select>
              {errors.hasOwnProperty('LeadSource') ?  (
                      <div className="invalid-feedback">{errors.LeadSource}</div>
                      ) : null}
          </FormControl>
        {leadSourceNameHtml}

        {phoneNoType}
        
        <FormControl 
                variant="outlined"
                color="secondary"
                className={classes.TextField}>
            <TextField
            id="outlined-required"
            label="Phone"
            variant="outlined"
            color="secondary"
            className={`${errors.hasOwnProperty('phone') ? "is-invalid" : ""}`}
            value={Phone}
            onChange={(e) => {
                
                if(phoneType==="usa"){
                    let p=maskPhoneNo(e.target.value);
                    setPhone(p)
                    HandleOnChange({phone : p});
                    
                }else{
                    let p=internationalPhoneNo(e.target.value);
                    setPhone(p)
                    HandleOnChange({phone : p});
                    
                }
                  
            }}
        />
        {errors.hasOwnProperty('phone') ?  (
                  <div className="invalid-feedback">{errors.phone}</div>
                ) : null}
            
        </FormControl>

    </>);
}

export default (LeadForm);