import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";

import { createCar, updateCar, deleteCar, UpdateTransportationSecondaryImages } from "./../apiCalls/carCrud";
import { uploadFile } from "./../../../../api/uploadFile";
import { uploadFiles } from "./../../../../api/uploadFiles";
import FullScreenDialog from "../../../../components/fullScreenDialog";

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
  transportTypes,
  handleSubmitModal,
  handleCloseModal
}) => {
  const classes = useStyles();

  const [TransportationObjectID, setTransportationObjectID] = useState('');

  const [topMPH, settopMPH] = useState('');
  const [makeID, setmakeID] = useState('');
  const [locationID, setlocationID] = useState('');
  const [modelID, setmodelID] = useState('');
  const [year, setyear] = useState('');
  const [friendlyName, setfriendlyName] = useState('');
  const [description, setdescription] = useState('');
  const [seoDescription, setseoDescription] = useState('');
  const [bitlyLink, setbitlyLink] = useState('');
  const [numberOfSeats, setnumberOfSeats] = useState('');
  const [zeroTo60, setzeroTo60] = useState('');
  const [dailyRate, setdailyRate] = useState('');
  const [searchTypeID, setsearchTypeID] = useState('');
  const [doorTypeID, setdoorTypeID] = useState('');
  const [transmissionTypeID, settransmissionTypeID] = useState('');
  const [fuelTypeID, setfuelTypeID] = useState('');
  const [exteriorColorID, setexteriorColorID] = useState('');
  const [interiorColorID, setinteriorColorID] = useState('');
  const [horsePower, sethorsePower] = useState('');
  const [styleTypeID, setstyleTypeID] = useState('');
  const [transportationObjectTypeID, settransportationObjectTypeID] = useState('');
  const [ownerID, setownerID] = useState('');
  const [securityDeposit, setsecurityDeposit] = useState('');
  const [milesPerDayIncluded, setmilesPerDayIncluded] = useState('');
  const [minimumNumberOfDays, setminimumNumberOfDays] = useState('');
  const [engineTypeID, setengineTypeID] = useState('');
  const [mpgCity, setmpgCity] = useState('');
  const [mpgHwy, setmpgHwy] = useState('');
  const [imageFileName, setimageFileName] = useState('');
  const [Images, setImages] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const getFieldValue = (field) => {
    return rowData?.[field];
  };

  useEffect(() => {
    if (!TransportationObjectID && rowData) {
      setTransportationObjectID(getFieldValue("transportationObjectID"));
      settopMPH(getFieldValue("topMPH"))
      setlocationID(getFieldValue("locationID"))
      setmakeID(getFieldValue("makeID"))
      setmodelID(getFieldValue("modelID"))
      setyear(getFieldValue("year"))
      setfriendlyName(getFieldValue("friendlyName"))
      setdescription(getFieldValue("description"))
      setseoDescription(getFieldValue("seoDescription"))
      setbitlyLink(getFieldValue("bitlyLink"))
      setnumberOfSeats(getFieldValue("numberOfSeats"))
      setzeroTo60(getFieldValue("zeroTo60"))
      setdailyRate(getFieldValue("dailyRate"))
      setsearchTypeID(getFieldValue("searchTypeID"))
      setdoorTypeID(getFieldValue("doorTypeID"))
      settransmissionTypeID(getFieldValue("transmissionTypeID"))
      setfuelTypeID(getFieldValue("fuelTypeID"))
      setexteriorColorID(getFieldValue("exteriorColorID"))
      setinteriorColorID(getFieldValue("interiorColorID"))
      sethorsePower(getFieldValue("horsePower"))
      setstyleTypeID(getFieldValue("styleTypeID"))
      setownerID(getFieldValue("ownerID"))
      setsecurityDeposit(getFieldValue("securityDeposit"))
      setmilesPerDayIncluded(getFieldValue("milesPerDayIncluded"))
      setminimumNumberOfDays(getFieldValue("minimumNumberOfDays"))
      setengineTypeID(getFieldValue("engineTypeID"))
      setmpgCity(getFieldValue("mpgCity"))
      setmpgHwy(getFieldValue("mpgHwy"))
      setimageFileName(getFieldValue("imageFileName"))

      let images=getFieldValue("secondaryImagesList")
      images= images.map((elem, index)=>{
        return {imageFilePath: elem.imageFilePath, imageOrder:elem.imageOrder, imageID: elem.imageID};
      })
      setImages(images)
      
    }
  }, [rowData]);

  const isEmpty=(str)=> {
    return (!str || str.length === 0 );
  }

  const handleSubmit = () => {
    let errorsOb={};
    if(isEmpty(topMPH)){
      errorsOb.topMPH="Top MPH can not be blank";
    }
    if(isEmpty(makeID)){
      errorsOb.makeID="make can not be blank";
    }
    if(isEmpty(locationID)){
      errorsOb.locationID="location can not be blank";
    }
    if(isEmpty(modelID)){
      errorsOb.modelID="model can not be blank";
    }
    if(isEmpty(year)){
      errorsOb.year="year can not be blank";
    }
    if(isEmpty(friendlyName)){
      errorsOb.friendlyName="Name can not be blank";
    }
    if(isEmpty(description)){
      errorsOb.description="description can not be blank";
    }
    if(isEmpty(seoDescription)){
      errorsOb.seoDescription="Seo Description can not be blank";
    }
    if(isEmpty(numberOfSeats)){
      errorsOb.numberOfSeats="number OfS eats can not be blank";
    }
    if(isEmpty(zeroTo60)){
      errorsOb.zeroTo60="zero To 60 can not be blank";
    }
    if(isEmpty(dailyRate)){
      errorsOb.dailyRate="Daily Rate can not be blank";
    }
    if(isEmpty(searchTypeID)){
      errorsOb.searchTypeID="Search Type can not be blank";
    }
    if(isEmpty(doorTypeID)){
      errorsOb.doorTypeID="Door Type can not be blank";
    }
    if(isEmpty(transmissionTypeID)){
      errorsOb.transmissionTypeID="Transmission Type can not be blank";
    }
    if(isEmpty(fuelTypeID)){
      errorsOb.fuelTypeID="Fuel Type can not be blank";
    }
  
    if(isEmpty(bitlyLink)){
      errorsOb.bitlyLink="Bitly Link can not be blank";
    }

    if(isEmpty(exteriorColorID)){
      errorsOb.exteriorColorID="Exterior Color can not be blank";
    }
    if(isEmpty(interiorColorID)){
      errorsOb.interiorColorID="Interior Color can not be blank";
    }
    if(isEmpty(horsePower)){
      errorsOb.horsePower="Horse Power can not be blank";
    }
    if(isEmpty(styleTypeID)){
      errorsOb.styleTypeID="Style Type can not be blank";
    }
    if(isEmpty(ownerID)){
      errorsOb.ownerID="owner can not be blank";
    }
    if(isEmpty(securityDeposit)){
      errorsOb.securityDeposit="Security Deposit can not be blank";
    }
    if(isEmpty(milesPerDayIncluded)){
      errorsOb.milesPerDayIncluded="Miles PerDay Included can not be blank";
    }
    if(isEmpty(minimumNumberOfDays)){
      errorsOb.minimumNumberOfDays="Minimum Number Of Days can not be blank";
    }
    if(isEmpty(engineTypeID)){
      errorsOb.engineTypeID="Engine Type can not be blank";
    }
    if(isEmpty(mpgCity)){
      errorsOb.mpgCity="MPG City can not be blank";
    }
    if(isEmpty(mpgHwy)){
      errorsOb.mpgHwy="MPG Hwy can not be blank";
    }

    if(Object.keys(errorsOb).length===0){
      let images= Images.map((elem, index)=>{
        return {imageFilePath: elem.imageFilePath, imageOrder: elem.imageOrder};
      })
      let formdata={
        "topMPH": topMPH,
        "makeID": makeID,
        "transactionStatusID":TransactionStatusID,
        "locationID":locationID,
        "modelID": modelID,
        "year":year,
        "friendlyName":friendlyName,
        "description":description,
        "seoDescription":seoDescription,
        "bitlyLink": bitlyLink,
        "numberOfSeats": numberOfSeats,
        "zeroTo60":zeroTo60,
        "dailyRate":dailyRate,
        "searchTypeID":searchTypeID,
        "doorTypeID":doorTypeID,
        "transmissionTypeID":transmissionTypeID,
        "fuelTypeID":fuelTypeID,
        "pickUpLocationID":2,
        "dropOffLocationID":2,
        "exteriorColorID": exteriorColorID,
        "interiorColorID": interiorColorID,
        "horsePower": horsePower,
        "styleTypeID": styleTypeID,
        "transportationObjectTypeID": 1,
        "ownerID": ownerID,
        "securityDeposit": securityDeposit,
        "milesPerDayIncluded": milesPerDayIncluded,
        "minimumNumberOfDays": minimumNumberOfDays,
        "engineTypeID": engineTypeID,
        "mpgCity": mpgCity,
        "mpgHwy": mpgHwy,
        "totalFeet": 1,
        "fourHourRate":1,
        "sixHourRate":1,
        "eightHourRate":1,
        "imageFileName":imageFileName,
        "secondaryImagesList":images
        };
        if(TransportationObjectID!==""){
          formdata.transportationObjectID=TransportationObjectID;

          const secondaryImageUpdate={
            "transportationObjectID": TransportationObjectID,
            "secondaryImagesList": images
          };
          updateCar(EmployeeID, BrokerID,formdata).then(() => {
            UpdateTransportationSecondaryImages(EmployeeID, secondaryImageUpdate).then(()=>{
              handleSubmitModal();
            })
            
          });
        }else{
          createCar(EmployeeID, BrokerID,formdata).then(() => {
            handleSubmitModal();
          });
        }

    }else{
      setErrors(errorsOb)
    }


  };

  let modelOptionHtml=[];
  if(transportTypes.models!=null){
    for (const make of transportTypes.models) {
      if(make.makeID==makeID){
        modelOptionHtml.push(<option value={make.modelID}>{make.model}</option>);
      }
    }
  }
    

  

  let form = [
    <form key={1} className={classes.root} noValidate autoComplete="off">
      <div className={classes.fields}>
        <FormControl key='friendlyName' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('friendlyName') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setfriendlyName(e.target.value);
            }}
            type="text"
            value={friendlyName}
            helperText="Name"
          />
          {errors.hasOwnProperty('friendlyName') ?  (<div className="invalid-feedback">{errors.friendlyName}</div>) : null}
        </FormControl>
        <FormControl key='description' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('description') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            type="text"
            value={description}
            helperText="description"
          />
          {errors.hasOwnProperty('description') ?  (<div className="invalid-feedback">{errors.description}</div>) : null}
        </FormControl>
        <FormControl key='seoDescription' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('seoDescription') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setseoDescription(e.target.value);
            }}
            type="text"
            value={seoDescription}
            helperText="Seo Description"
          />
          {errors.hasOwnProperty('seoDescription') ?  (<div className="invalid-feedback">{errors.seoDescription}</div>) : null}
        </FormControl>
        <FormControl key='topMPH' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('topMPH') ? "is-invalid" : ""}`}
            onChange={(e) => {
              settopMPH(e.target.value);
            }}
            type="number"
            value={topMPH}
            helperText="Top MPH"
          />
          {errors.hasOwnProperty('topMPH') ?  (<div className="invalid-feedback">{errors.topMPH}</div>) : null}
        </FormControl>
        <FormControl key='makeID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Makes</InputLabel>
          <Select native label="Makes"
            className={`${errors.hasOwnProperty('makeID') ? "is-invalid" : ""}`}
            value={makeID}
            onChange={(e) => {
              setmakeID(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
            {transportTypes.makes!=null ? (transportTypes.makes.map((make) => {
              return <option key={make.makeID} value={make.makeID}>{make.make}</option>;
            })) : null}
          </Select>
          {errors.hasOwnProperty('makeID') ?  (<div className="invalid-feedback">{errors.makeID}</div>) : null}
        </FormControl>

        <FormControl key='locationID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Location</InputLabel>
          <Select native label="location"
            className={`${errors.hasOwnProperty('locationID') ? "is-invalid" : ""}`}
            value={locationID}
            onChange={(e) => {
              setlocationID(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
            {transportTypes.locations!=null ? (transportTypes.locations.map((make) => {
              return <option key={make.locationID} value={make.locationID}>{make.location}</option>;
            })) : null}
          </Select>
          {errors.hasOwnProperty('locationID') ?  (<div className="invalid-feedback">{errors.locationID}</div>) : null}
        </FormControl>
        <FormControl key='modelID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Model</InputLabel>
          <Select native label="Model"
            className={`${errors.hasOwnProperty('modelID') ? "is-invalid" : ""}`}
            value={modelID}
            onChange={(e) => {
              setmodelID(e.target.value);
            }}
            >
            <option aria-label="None" value="" />
            {modelOptionHtml}
          </Select>
          {errors.hasOwnProperty('modelID') ?  (<div className="invalid-feedback">{errors.modelID}</div>) : null}
        </FormControl>
        <FormControl key='year' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Year</InputLabel>
          <Select native label="Year"
            className={`${errors.hasOwnProperty('year') ? "is-invalid" : ""}`}
            value={year}
            onChange={(e) => {
              setyear(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
            {transportTypes.years!=null ? (transportTypes.years.map((make) => {
              return <option key={make.yearTypeID} value={make.yearTypeID}>{make.yearType}</option>;
            })) : null}
          </Select>
          {errors.hasOwnProperty('year') ?  (<div className="invalid-feedback">{errors.year}</div>) : null}
        </FormControl>
        <FormControl key='bitlyLink' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('bitlyLink') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setbitlyLink(e.target.value);
            }}
            type="text"
            value={bitlyLink}
            helperText="Bitly Link"
          />
          {errors.hasOwnProperty('bitlyLink') ?  (<div className="invalid-feedback">{errors.bitlyLink}</div>) : null}
        </FormControl>

        <FormControl key='numberOfSeats' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('numberOfSeats') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setnumberOfSeats(e.target.value);
            }}
            type="number"
            value={numberOfSeats}
            helperText="Number Of Seats"
          />
          {errors.hasOwnProperty('numberOfSeats') ?  (<div className="invalid-feedback">{errors.numberOfSeats}</div>) : null}
        </FormControl>
        <FormControl key='zeroTo60' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('zeroTo60') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setzeroTo60(e.target.value);
            }}
            type="number"
            value={zeroTo60}
            helperText="0 to 60"
          />
          {errors.hasOwnProperty('zeroTo60') ?  (<div className="invalid-feedback">{errors.zeroTo60}</div>) : null}
        </FormControl>
        <FormControl key='dailyRate' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('dailyRate') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setdailyRate(e.target.value);
            }}
            type="number"
            value={dailyRate}
            helperText="Daily Rate"
          />
          {errors.hasOwnProperty('dailyRate') ?  (<div className="invalid-feedback">{errors.dailyRate}</div>) : null}
        </FormControl>
        <FormControl key='searchTypeID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Search Type</InputLabel>
          <Select native label="Search Type"
            className={`${errors.hasOwnProperty('searchTypeID') ? "is-invalid" : ""}`}
            value={searchTypeID}
            onChange={(e) => {
              setsearchTypeID(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
            {transportTypes.searchTypes!=null ? (transportTypes.searchTypes.map((make) => {
              return <option key={make.propertySearchTypeID} value={make.propertySearchTypeID}>{make.propertySearchType}</option>;
            })) : null}
          </Select>
          {errors.hasOwnProperty('searchTypeID') ?  (<div className="invalid-feedback">{errors.searchTypeID}</div>) : null}
        </FormControl>
        <FormControl key='doorTypeID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Door Type</InputLabel>
          <Select native label="Search Type"
            className={`${errors.hasOwnProperty('doorTypeID') ? "is-invalid" : ""}`}
            value={doorTypeID}
            onChange={(e) => {
              setdoorTypeID(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
            {transportTypes.doors!=null ? (transportTypes.doors.map((make) => {
              return <option key={make.doorTypeID} value={make.doorTypeID}>{make.doorType}</option>;
            })) : null}
          </Select>
          {errors.hasOwnProperty('doorTypeID') ?  (<div className="invalid-feedback">{errors.doorTypeID}</div>) : null}
        </FormControl>
        <FormControl key='transmissionTypeID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Transmission Type</InputLabel>
          <Select native label="Search Type"
            className={`${errors.hasOwnProperty('transmissionTypeID') ? "is-invalid" : ""}`}
            value={transmissionTypeID}
            onChange={(e) => {
              settransmissionTypeID(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
            {transportTypes.transmissions!=null ? (transportTypes.transmissions.map((make) => {
              return <option key={make.transmissionTypeID} value={make.transmissionTypeID}>{make.transmissionType}</option>;
            })) : null}
          </Select>
          {errors.hasOwnProperty('transmissionTypeID') ?  (<div className="invalid-feedback">{errors.transmissionTypeID}</div>) : null}
        </FormControl>
        <FormControl key='fuelTypeID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Fuel Type</InputLabel>
          <Select native label="Search Type"
            className={`${errors.hasOwnProperty('fuelTypeID') ? "is-invalid" : ""}`}
            value={fuelTypeID}
            onChange={(e) => {
              setfuelTypeID(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
            {transportTypes.fuels!=null ? (transportTypes.fuels.map((make) => {
              return <option key={make.fuelTypeID} value={make.fuelTypeID}>{make.fuelType}</option>;
            })) : null}
          </Select>
          {errors.hasOwnProperty('fuelTypeID') ?  (<div className="invalid-feedback">{errors.fuelTypeID}</div>) : null}
        </FormControl>

        <FormControl key='exteriorColorID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Exterior Color</InputLabel>
          <Select native label="Search Type"
            className={`${errors.hasOwnProperty('exteriorColorID') ? "is-invalid" : ""}`}
            value={exteriorColorID}
            onChange={(e) => {
              setexteriorColorID(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
            {transportTypes.colors!=null ? (transportTypes.colors.map((make) => {
              return <option key={make.colorTypeID} value={make.colorTypeID}>{make.colorType}</option>;
            })) : null}
          </Select>
          {errors.hasOwnProperty('exteriorColorID') ?  (<div className="invalid-feedback">{errors.exteriorColorID}</div>) : null}
        </FormControl>
        <FormControl key='interiorColorID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Interior Color</InputLabel>
          <Select native label="Search Type"
            className={`${errors.hasOwnProperty('interiorColorID') ? "is-invalid" : ""}`}
            value={interiorColorID}
            onChange={(e) => {
              setinteriorColorID(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
            {transportTypes.colors!=null ? (transportTypes.colors.map((make) => {
              return <option key={make.colorTypeID} value={make.colorTypeID}>{make.colorType}</option>;
            })) : null}
          </Select>
          {errors.hasOwnProperty('interiorColorID') ?  (<div className="invalid-feedback">{errors.interiorColorID}</div>) : null}
        </FormControl>
        <FormControl key='horsePower' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('horsePower') ? "is-invalid" : ""}`}
            onChange={(e) => {
              sethorsePower(e.target.value);
            }}
            type="number"
            value={horsePower}
            helperText="Horse Power"
          />
          {errors.hasOwnProperty('horsePower') ?  (<div className="invalid-feedback">{errors.horsePower}</div>) : null}
        </FormControl>
        <FormControl key='styleTypeID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Style type</InputLabel>
          <Select native label="Search Type"
            className={`${errors.hasOwnProperty('styleTypeID') ? "is-invalid" : ""}`}
            value={styleTypeID}
            onChange={(e) => {
              setstyleTypeID(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
            {transportTypes.styles!=null ? (transportTypes.styles.map((make) => {
              return <option key={make.styleTypeID} value={make.styleTypeID}>{make.styleType}</option>;
            })) : null}
          </Select>
          {errors.hasOwnProperty('styleTypeID') ?  (<div className="invalid-feedback">{errors.styleTypeID}</div>) : null}
        </FormControl>
        <FormControl key='ownerID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Owner</InputLabel>
          <Select native label="Search Type"
            className={`${errors.hasOwnProperty('ownerID') ? "is-invalid" : ""}`}
            value={ownerID}
            onChange={(e) => {
              setownerID(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
            {transportTypes.owners!=null ? (transportTypes.owners.map((make) => {
              return <option key={make.ownerID} value={make.ownerID}>{make.firstName} {make.lastName}</option>;
            })) : null}
          </Select>
          {errors.hasOwnProperty('ownerID') ?  (<div className="invalid-feedback">{errors.ownerID}</div>) : null}
        </FormControl>

        <FormControl key='securityDeposit' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('securityDeposit') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setsecurityDeposit(e.target.value);
            }}
            type="number"
            value={securityDeposit}
            helperText="security Deposit"
          />
          {errors.hasOwnProperty('securityDeposit') ?  (<div className="invalid-feedback">{errors.securityDeposit}</div>) : null}
        </FormControl>

        <FormControl key='milesPerDayIncluded' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('milesPerDayIncluded') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setmilesPerDayIncluded(e.target.value);
            }}
            type="number"
            value={milesPerDayIncluded}
            helperText="Miles Per Day Included "
          />
          {errors.hasOwnProperty('milesPerDayIncluded') ?  (<div className="invalid-feedback">{errors.milesPerDayIncluded}</div>) : null}
        </FormControl>
        <FormControl key='minimumNumberOfDays' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('minimumNumberOfDays') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setminimumNumberOfDays(e.target.value);
            }}
            type="number"
            value={minimumNumberOfDays}
            helperText="Minimum Number Of Days"
          />
          {errors.hasOwnProperty('minimumNumberOfDays') ?  (<div className="invalid-feedback">{errors.minimumNumberOfDays}</div>) : null}
        </FormControl>

        <FormControl key='engineTypeID' variant="outlined" color="secondary" className={classes.TextField}>
          <InputLabel htmlFor="outlined-age-native-simple">Engine Type</InputLabel>
          <Select native label="Search Type"
            className={`${errors.hasOwnProperty('engineTypeID') ? "is-invalid" : ""}`}
            value={engineTypeID}
            onChange={(e) => {
              setengineTypeID(e.target.value);
            }}
            >
              <option aria-label="None" value="" />
              {transportTypes.engines!=null ? (transportTypes.engines.map((make) => {
                return <option key={make.engineTypeID} value={make.engineTypeID}>{make.engineType}</option>;
              })) : null}
          </Select>
          {errors.hasOwnProperty('engineTypeID') ?  (<div className="invalid-feedback">{errors.engineTypeID}</div>) : null}
        </FormControl>

        <FormControl key='mpgCity' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('mpgCity') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setmpgCity(e.target.value);
            }}
            type="number"
            value={mpgCity}
            helperText="MPG City"
          />
          {errors.hasOwnProperty('mpgCity') ?  (<div className="invalid-feedback">{errors.mpgCity}</div>) : null}
        </FormControl>

        <FormControl key='mpgHwy' variant="outlined" color="secondary" className={classes.TextField}>
          <TextField variant="outlined" color="secondary"
            className={`${errors.hasOwnProperty('mpgHwy') ? "is-invalid" : ""}`}
            onChange={(e) => {
              setmpgHwy(e.target.value);
            }}
            type="number"
            value={mpgHwy}
            helperText="MPG Hwy"
          />
          {errors.hasOwnProperty('mpgHwy') ?  (<div className="invalid-feedback">{errors.mpgHwy}</div>) : null}
        </FormControl>

        <TextField
          //  required
          id="outlined-required"
          //  label="Image Upload"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="file"
          helperText="Image Upload"
          onChange={(e) => {
            uploadFile(e.target).then((data) => {
              if (data.secure_url) {
                setimageFileName(data.secure_url);
              } else {
                alert("Please choose a valid image file");
              }
            });
          }}
        />
        {imageFileName && (
          <img
            style={{ width: "100px", height: "51px", margin: "0 auto" }}
            src={imageFileName}
            alt="Uploaded Image"
          ></img>
        )}
        <FullScreenDialog
          buttonName={"Manage secondary images"}
          title={"Secondary Images"}
          loading={Loading} 
          images={Images} 
          updateImage={setImages}
          form={
            <TextField
              inputProps={{ multiple: true }}
              id="outlined-required"
              variant="outlined"
              color="secondary"
              className={classes.TextField}
              type="file"
              helperText="Upload Secondary Images"
              onChange={(e) => {
                setLoading(true);
                uploadFiles(Images,e.target).then((data) => {
                  setLoading(false);
                  setImages(data);
                });
              }}
            />
          }
          
        />

        
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
          {`${type} Car`}
        </Button>
      </div>
    </form>,
  ];

  let deleteItem = [
    <form key={2} className={classes.root} noValidate autoComplete="off">
      <div className={classes.buttons}>
        <Button
          className={`${classes.Button} ${classes.delete}`}
          variant="contained"
          color="secondary"
          onClick={() => {
            deleteCar(EmployeeID, TransportationObjectID);
          }}
        >
          {`${type} Car`}
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
