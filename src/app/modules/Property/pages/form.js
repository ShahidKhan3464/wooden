import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { updatePropertySecondaryImages } from "./../apiCalls/propertyCrud";
import { FormLabel } from "@material-ui/core";
import { FormGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import AdvancedGridList from "../../../../components/imageGridList";
import CellEditTable from "./../../../../components/CellEditTable";
import FullScreenDialog from "../../../../components/fullScreenDialog";
import {
  getAllSecondaryImages,
  createProperty,
  updateProperty,
  deleteProperty,
  GetAvailableBuyerAgents,
  GetBuyersAgentsForThisProperty,
} from "./../apiCalls/propertyCrud";
import FormModal from "../../../../components/Modal/index";

import {
  getCitiesByLocation,
  getZipCodesByCity,
} from "./../../../../api/generalCrud";
import { uploadFile } from "./../../../../api/uploadFile";
import { uploadFiles } from "./../../../../api/uploadFiles";
import dateFormat from "dateformat";

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
  Locations,
  Owners,
  handleShowSecondaryImages,
  AssignedEmployees,
  PropertySearchTypes,
  Amenities,
  PropertyCategoryTypes,
  handleSubmitModal,
  handleCloseModal,
}) => {
  const classes = useStyles();

  const [PropertyID, setPropertyID] = useState(null);

  const [Location, setLocation] = useState(null);
  const [CityID, setCityID] = useState(null);
  const [BuyerAgentID, setBuyerAgentID] = useState(null);
  const [Zipcode, setZipcode] = useState(null);
  const [propertyFriendlyName, setPropertyFriendlyName] = useState(null);
  const [description, setDescription] = useState(null);
  const [SEODescription, setSEODescription] = useState(null);
  const [Owner, setOwner] = useState(null);
  const [maxAllowedGuests, setMaxAllowedGuests] = useState(null);
  const [minimumNightStay, setMinimumNightStay] = useState(null);
  const [AssignedEmployee, setAssignedEmployee] = useState(null);
  const [PropertySearchType, setPropertySearchType] = useState(2);
  const [AllowsPets, setAllowsPets] = useState(2);
  const [Bedrooms, setBedrooms] = useState(null);
  const [Images, setImages] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Bathrooms, setBathrooms] = useState(null);
  const [CommissionRate, setCommissionRate] = useState(null);
  const [CommissionRateTypeID, setCommissionRateTypeID] = useState(null);
  const [BuyerAgentPropertyID, setBuyerAgentPropertyID] = useState(null);
  // const [CommissionRateType, setCommissionRateType] = useState(null);
  const [CheckedAmenities, setCheckedAmenities] = useState([]);
  const [SuggestedPrices, setSuggestedPrices] = useState({});
  const [MinimumPrices, setMinimumPrices] = useState({});
  const [propertyCategoryTypeID, setPropertyCategoryTypeID] = useState(1);
  const [LicenceNumber, setLicenceNumber] = useState(null);
  const [LicenceExpirationDate, setLicenceExpirationDate] = useState(null);
  const [DamageDeposit, setDamageDeposit] = useState(null);
  const [CleaningFee, setCleaningFee] = useState(null);
  const [AdminFee, setAdminFee] = useState(null);
  const [SalesAndUseTaxRate, setSalesAndUseTaxRate] = useState(null);
  const [ConventionAndTourismTaxRate, setConventionAndTourismTaxRate] = useState(null);
  const [BrokerSplitFromOwnerRate, setBrokerSplitFromOwnerRate] = useState(null);
  const [ArrivalInstructions, setArrivalInstructions] = useState(null);
  const [TableData, setTableData] = useState([
    //MINIMUM PRICE:
    {
      id: 1,
      Monday: "0",
      Tuesday: "0",
      Wednesday: "0",
      Thursday: "0",
      Friday: "0",
      Saturday: "0",
      Sunday: "0",
    },
    //SUGGESTED PRICE:
    {
      id: 2,
      Monday: "0",
      Tuesday: "0",
      Wednesday: "0",
      Thursday: "0",
      Friday: "0",
      Saturday: "0",
      Sunday: "0",
    },
  ]);
  const [MonthlyMinimumPrice, setMonthlyMinimumPrice] = useState(null);
  const [MonthlySuggestedPrice, setMonthlySuggestedPrice] = useState(null);
  const [BitlyLink, setBitlyLink] = useState(' ');
  const [address, setAddress] = useState(null);
  const [Active, setActive] = useState(1);
  const [TransactionStatusID, setTransactionStatusID] = useState(1);
  const [isWebEnabled, setIsWebEnabled] = useState(false);
  const [ImageFileName, setImageFileName] = useState("");
  const [Errors, setErrors] = useState([]);
  const [ShowPricing, setShowPricing] = useState(true);

  const getFieldValue = (field) => {
    return rowData?.[field];
  };

  useEffect(() => {
    if (!PropertyID && rowData) {
      getAllSecondaryImages(getFieldValue("propertyID")).then((data) => {
        let images = [];

        if (data.Data !== null) {
          images = data.Data.map(elem => {
            return { imageFilePath: elem.imageFilePath, imageOrder: elem.imageOrder };
          })
        }
        setImages(images);
      }).catch(() => {
        console.log("cant get secondary images")
      });
      setPropertyID(getFieldValue("propertyID"));
      setLocation(getFieldValue("locationID"));
      setCityID(getFieldValue("cityID"));
      setZipcode(getFieldValue("zipCodeID"));
      setPropertyFriendlyName(getFieldValue("propertyFriendlyName"));
      setDescription(getFieldValue("description"));
      setSEODescription(getFieldValue("seoDescription"));
      setBitlyLink(getFieldValue("bitlyLink"));
      // setCommissionRate(getFieldValue("commissionRate"));
      setOwner(getFieldValue("ownerID"));
      setAddress(getFieldValue("address"));
      setMaxAllowedGuests(getFieldValue("maxAllowedGuests"));
      setMinimumNightStay(getFieldValue("minimumNightStay"));
      setAssignedEmployee(getFieldValue("assignedEmployeeID"));
      setPropertySearchType(getFieldValue("propertySearchTypeID"));
      setActive(getFieldValue("active"));
      setTransactionStatusID(getFieldValue("transactionStatusID"));
      setAllowsPets(getFieldValue("allowPets"));
      setBedrooms(getFieldValue("numberOfBedrooms"));
      setBathrooms(getFieldValue("numberOfBathrooms"));
      setImageFileName(getFieldValue("imageFileName"));
      setPropertyCategoryTypeID(getFieldValue("propertyCategoryTypeID"));
      setIsWebEnabled(getFieldValue("isWebEnabled"));
      setLicenceNumber(getFieldValue("licenseNumber"));
      setLicenceExpirationDate(getFieldValue("licenseExpirationDate"));
      setDamageDeposit(getFieldValue("damageDeposit"));
      setCleaningFee(getFieldValue("cleaningFee"));
      setAdminFee(getFieldValue("adminFee"));
      setSalesAndUseTaxRate(getFieldValue("salesAndUseTaxRate"));
      setConventionAndTourismTaxRate(getFieldValue("conventionAndTourismTaxRate"));
      setBrokerSplitFromOwnerRate(getFieldValue("brokerSplitFromOwnerRate"));
      setArrivalInstructions(getFieldValue("arrivalInstructions"));
      if (rowData) {
        setCheckedAmenities(getFieldValue("propertyAmenitiesList"));
        setMinimumPrices({
          mondayMinimumPrice: getFieldValue("mondayMinimumPrice"),
          tuesdayMinimumPrice: getFieldValue("tuesdayMinimumPrice"),
          wednesdayMinimumPrice: getFieldValue("wednesdayMinimumPrice"),
          thursdayMinimumPrice: getFieldValue("thursdayMinimumPrice"),
          fridayMinimumPrice: getFieldValue("fridayMinimumPrice"),
          saturdayMinimumPrice: getFieldValue("saturdayMinimumPrice"),
          sundayMinimumPrice: getFieldValue("sundayMinimumPrice"),
        });
        setSuggestedPrices({
          mondaySuggestedPrice: getFieldValue("mondaySuggestedPrice"),
          tuesdaySuggestedPrice: getFieldValue("tuesdaySuggestedPrice"),
          wednesdaySuggestedPrice: getFieldValue("wednesdaySuggestedPrice"),
          thursdaySuggestedPrice: getFieldValue("thursdaySuggestedPrice"),
          fridaySuggestedPrice: getFieldValue("fridaySuggestedPrice"),
          saturdaySuggestedPrice: getFieldValue("saturdaySuggestedPrice"),
          sundaySuggestedPrice: getFieldValue("sundaySuggestedPrice"),
        });
        setTableData([
          //MINIMUM PRICE:
          {
            id: 1,
            Monday: getFieldValue("mondayMinimumPrice"),
            Tuesday: getFieldValue("tuesdayMinimumPrice"),
            Wednesday: getFieldValue("wednesdayMinimumPrice"),
            Thursday: getFieldValue("thursdayMinimumPrice"),
            Friday: getFieldValue("fridayMinimumPrice"),
            Saturday: getFieldValue("saturdayMinimumPrice"),
            Sunday: getFieldValue("sundayMinimumPrice"),
          },
          //SUGGESTED PRICE:
          {
            id: 2,
            Monday: getFieldValue("mondaySuggestedPrice"),
            Tuesday: getFieldValue("tuesdaySuggestedPrice"),
            Wednesday: getFieldValue("wednesdaySuggestedPrice"),
            Thursday: getFieldValue("thursdaySuggestedPrice"),
            Friday: getFieldValue("fridaySuggestedPrice"),
            Saturday: getFieldValue("saturdaySuggestedPrice"),
            Sunday: getFieldValue("sundaySuggestedPrice"),
          },
        ]);
      }
      setMonthlyMinimumPrice(getFieldValue("monthlyMinimumPrice"));
      setMonthlySuggestedPrice(getFieldValue("monthlySuggestedPrice"));
      setShowPricing(false);
    }
  }, [rowData, Images]);

  const validateSuggestedPrices = () => {
    return Object.keys(SuggestedPrices).length >= 7;
  }

  const validateMinimumPrices = () => {
    return Object.keys(MinimumPrices).length >= 7;
  }


  const handleSubmit = () => {
    if (
      !validateMinimumPrices() ||
      !validateSuggestedPrices() ||
      !Location ||
      !CityID ||
      !Zipcode ||
      !propertyFriendlyName ||
      !description ||
      !SEODescription ||
      !Owner ||
      !maxAllowedGuests ||
      !minimumNightStay ||
      !AssignedEmployee ||
      !PropertySearchType ||
      !AllowsPets ||
      !TransactionStatusID ||
      !Bedrooms ||
      !Bathrooms ||
      CheckedAmenities.length === 0 ||
      !MonthlyMinimumPrice ||
      !propertyCategoryTypeID ||
      !MonthlySuggestedPrice ||
      !BuyerAgentID ||
      !LicenceNumber ||
      !LicenceExpirationDate ||
      !DamageDeposit ||
      !CleaningFee ||
      !AdminFee ||
      !SalesAndUseTaxRate ||
      !ConventionAndTourismTaxRate ||
      !BrokerSplitFromOwnerRate ||
      !ArrivalInstructions ||
      Images.length === 0
    ) {
      let errors = [];
      !validateSuggestedPrices() && errors.push('Suggested Prices')
      !validateMinimumPrices() && errors.push('Minimum Prices')
      !Location && errors.push("Location");
      !CityID && errors.push("CityID");
      !Zipcode && errors.push("Zipcode");
      !propertyFriendlyName && errors.push("propertyFriendlyName");
      !description && errors.push("description");
      !SEODescription && errors.push("SEODescription");
      !Owner && errors.push("Owner");
      !maxAllowedGuests && errors.push("maxAllowedGuests");
      !minimumNightStay && errors.push("minimumNightStay");
      !AssignedEmployee && errors.push("AssignedEmployee");
      !PropertySearchType && errors.push("PropertySearchType");
      !AllowsPets && errors.push("AllowsPets");
      !Bedrooms && errors.push("Bedrooms");
      !Bathrooms && errors.push("Bathrooms");
      !TransactionStatusID && errors.push('TransactionStatusID');
      !propertyCategoryTypeID && errors.push('propertyCategoryTypeID');
      CheckedAmenities.length === 0 && errors.push("CheckedAmenities");
      !MonthlyMinimumPrice && errors.push("MonthlyMinimumPrice");
      !MonthlySuggestedPrice && errors.push("MonthlySuggestedPrice");
      !BuyerAgentID && errors.push("BuyerAgentID");
      !LicenceNumber && errors.push("LicenceNumber");
      !LicenceExpirationDate && errors.push("LicenceExpirationDate");
      !DamageDeposit && errors.push("DamageDeposit");
      !CleaningFee && errors.push("CleaningFee");
      !AdminFee && errors.push("AdminFee");
      !SalesAndUseTaxRate && errors.push("SalesAndUseTaxRate");
      !ConventionAndTourismTaxRate && errors.push("ConventionAndTourismTaxRate");
      !BrokerSplitFromOwnerRate && errors.push("BrokerSplitFromOwnerRate");
      !ArrivalInstructions && errors.push("ArrivalInstructions");
      if (Images.length === 0) {
        errors.push("SecondaryImages")
      }
      setErrors([...errors]);
    } else {
      let propertyAmenities = "";
      for (let i = 0; i < CheckedAmenities.length; i++) {
        propertyAmenities += `${CheckedAmenities[i].amenityID}${i < CheckedAmenities.length - 1 ? "," : ""
          }`;
      }
      let formData = {
        brokerID: BrokerID,
        phone: null,
        districtID: null,
        transactionStatusID: TransactionStatusID,
        locationID: Location,
        cityID: CityID,
        zipCodeID: Zipcode,
        propertyFriendlyName: propertyFriendlyName,
        description: description,
        seoDescription: SEODescription,
        bitlyLink: BitlyLink.trim() == "" ? '' : BitlyLink,
        ownerID: Owner,
        address: address,
        maxAllowedGuests: maxAllowedGuests,
        minimumNightStay: minimumNightStay,
        assignedEmployeeID: AssignedEmployee,
        propertySearchTypeID: PropertySearchType,
        allowPets: AllowsPets,
        numberOfBedrooms: Bedrooms,
        numberOfBathrooms: Bathrooms,
        imageFileName: ImageFileName,
        secondaryImagesList: Images,
        propertyAmenities: propertyAmenities,
        monthlyMinimumPrice: MonthlyMinimumPrice,
        monthlySuggestedPrice: MonthlySuggestedPrice,
        propertyCategoryTypeID: propertyCategoryTypeID,
        isWebEnabled: (isWebEnabled != undefined) ? isWebEnabled : false,
        employeeID: BuyerAgentID,
        commissionRate: CommissionRate,
        commissionRateTypeID: CommissionRateTypeID,
        propertyID: BuyerAgentPropertyID,
        licenseNumber: LicenceNumber,
        licenesExpirationDate: LicenceExpirationDate,
        damageDeposit: DamageDeposit,
        cleaningFee: CleaningFee,
        adminFee: AdminFee,
        salesAndUseTaxRate: SalesAndUseTaxRate,
        conventionAndTourismTaxRate: ConventionAndTourismTaxRate,
        brokerSplitFromOwnerRate: BrokerSplitFromOwnerRate,
        arrivalInstructions: ArrivalInstructions,

      };
      console.log("formData", formData)
      if (ShowPricing) {
        formData = { ...formData, ...MinimumPrices, ...SuggestedPrices };
      }


      if (type === "Create") {
        createProperty(EmployeeID, formData).then(() => {
          handleSubmitModal();
        });
      } else {
        formData.propertyID = PropertyID;
        updateProperty(EmployeeID, BrokerID, formData).then(() => {
          handleSubmitModal();
          if (formData.secondaryImagesList.length > 0) {
            updatePropertySecondaryImages(EmployeeID, {
              "propertyID": PropertyID,
              "secondaryImagesList": formData.secondaryImagesList
            }).catch(() => {
              console.error("When Updating secondary images");
            })
          }
        });
      }
    }
  };

  const [Cities, setCities] = useState([]);
  useEffect(() => {
    Location &&
      getCitiesByLocation(Location).then((data) => {
        setCities(data.Data);
      });
  }, [Location]);

  const [BuyerAgent, setBuyerAgent] = useState([]);
  useEffect(() => {
    GetAvailableBuyerAgents().then((data) => {
      // console.log("buyer agent list", data.Data)
      setBuyerAgent(data.Data);
    });
  }, []);

  const [BuyerAgentCommissionRate, setBuyerAgentCommissionRate] = useState([]);
  useEffect(() => {
    BuyerAgentID &&
      GetBuyersAgentsForThisProperty().then((data) => {
        // console.log("buyer agent list", data.Data[0].commissionRatesList)
        setBuyerAgentCommissionRate(data.Data[0].commissionRatesList);
      });
  }, [BuyerAgentID]);

  const [Zipcodes, setZipcodes] = useState([]);
  useEffect(() => {
    CityID &&
      getZipCodesByCity(CityID).then((data) => {
        setZipcodes(data.Data);
      });
  }, [CityID]);

  const handleAmenitiesChange = (event, Amenity) => {
    let myCheckedAmenities = [...CheckedAmenities];
    if (
      myCheckedAmenities.find(
        (CheckedAmenity) => CheckedAmenity.amenityID === Amenity.amenityID
      )
    ) {
      const CheckedAmenityIndex = myCheckedAmenities.findIndex(
        (CheckedAmenity) => CheckedAmenity.amenityID === Amenity.amenityID
      );
      myCheckedAmenities.splice(CheckedAmenityIndex, 1);
      setCheckedAmenities(myCheckedAmenities);
    } else {
      myCheckedAmenities = [...myCheckedAmenities, Amenity];
      setCheckedAmenities(myCheckedAmenities);
    }
  };



  let LocationsList = [];
  for (const Location of Locations) {
    LocationsList.push(
      <option value={Location.locationID}>{Location.location}</option>
    );
  }

  let OwnersList = [];
  if (Owners) {
    for (const owner of Owners) {
      OwnersList.push(
        <option value={owner.ownerID}>
          {owner.firstName + " " + owner.lastName}
        </option>
      );
    }
  }

  let AssignedEmployeesList = [];
  for (const AssignedEmployee of AssignedEmployees) {
    AssignedEmployeesList.push(
      <option value={AssignedEmployee.employeeID}>
        {AssignedEmployee.employeeFirstName +
          " " +
          AssignedEmployee.employeeLastName}
      </option>
    );
  }

  let PropertySearchTypesList = (
    <>
      {PropertySearchTypes.map((PropertySearchType, index) => {
        return (
          <option value={PropertySearchType.propertySearchTypeID}>
            {PropertySearchType.propertySearchType}
          </option>
        );
      })}
    </>
  );

  let BedroomsList = [];
  for (let i = 1; i < 20; i++) {
    BedroomsList.push(<option value={i}>{i}</option>);
  }
  BedroomsList.push(<option value={"20+"}>20+</option>);

  let BathroomsList = [];
  for (let i = 1; i <= 14; i = i + 0.5) {
    BathroomsList.push(<option value={i}>{i}</option>);
  }

  let CitiesList = (
    <>
      <option aria-label="None" value="" />
      {Cities.map((City) => {
        return (
          <option key={City.cityID} value={City.cityID}>
            {City.city}
          </option>
        );
      })}
    </>
  );

  let BuyerAgentList = (
    <>
      <option aria-label="None" value="" />
      {BuyerAgent.map((agent) => {
        return (
          <option key={agent.employeeID} value={agent.employeeID}>
            {agent.employeeFirstName + " " + agent.employeeLastName}
          </option>
        );
      })}
    </>
  );

  let commissionRateList = (
    <>
      <option aria-label="None" value="" />
      {BuyerAgentCommissionRate.map((rate) => {
        return (
          <option key={rate.commissionRateTypeID} value={rate.commissionRateTypeID}>
            {rate.commissionRate}
          </option>
        );
      })}
    </>
  );

  let PropertyCategoryTypesOptions = (
    <>
      <option aria-label="None" value="" />
      {PropertyCategoryTypes.map((con) => {
        return <option key={con.propertyCategoryTypeID} value={con.propertyCategoryTypeID}>{con.propertyCategoryType}</option>;
      })}
    </>
  );

  let ZipcodesList = (
    <>
      <option aria-label="None" value="" />
      {Zipcodes.map((Zipcode) => {
        return (
          <option key={Zipcode.zipCodeID} value={Zipcode.zipCodeID}>
            {Zipcode.zipCode}
          </option>
        );
      })}
    </>
  );
  let AmenitiesList = [];
  for (const Amenity of Amenities) {
    let checked = false;
    if (CheckedAmenities) {
      if (
        CheckedAmenities.find(
          (CheckedAmenity) => CheckedAmenity.amenityID === Amenity.amenityID
        )
      ) {
        checked = true;
      }
    }
    AmenitiesList.push(
      <FormControlLabel
        key={Amenity.amenityID}
        className={classes.Amenity}
        control={
          <Checkbox
            checked={checked}
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

  const changeSuggestedAndMinimumPrice = (value, params) => {
    const field = params.field.toLowerCase();
    const id = params?.id;
    if (id === 1) {
      MinimumPrices[`${field}MinimumPrice`] = value;
      setMinimumPrices(MinimumPrices);
    } else {
      SuggestedPrices[`${field}SuggestedPrice`] = value;
      setSuggestedPrices(SuggestedPrices);
    }
  }

  const Columns = [
    { title: "Type", field: "Type", sortable: false, width: 100 },
    { title: "Monday", field: "Monday", sortable: false, renderCell: (params) => (<TextField defaultValue={params.value} onChange={(e) => changeSuggestedAndMinimumPrice(e.target.value, params)} />), width: 90 },
    { title: "Tuesday", field: "Tuesday", sortable: false, renderCell: (params) => (<TextField defaultValue={params.value} onChange={(e) => changeSuggestedAndMinimumPrice(e.target.value, params)} />), width: 90 },
    { title: "Wednesday", field: "Wednesday", sortable: false, renderCell: (params) => (<TextField defaultValue={params.value} onChange={(e) => changeSuggestedAndMinimumPrice(e.target.value, params)} />), width: 90 },
    { title: "Thursday", field: "Thursday", sortable: false, renderCell: (params) => (<TextField defaultValue={params.value} onChange={(e) => changeSuggestedAndMinimumPrice(e.target.value, params)} />), width: 90 },
    { title: "Friday", field: "Friday", sortable: false, renderCell: (params) => (<TextField defaultValue={params.value} onChange={(e) => changeSuggestedAndMinimumPrice(e.target.value, params)} />), width: 90 },
    { title: "Saturday", field: "Saturday", sortable: false, renderCell: (params) => (<TextField defaultValue={params.value} onChange={(e) => changeSuggestedAndMinimumPrice(e.target.value, params)} />), width: 90 },
    { title: "Sunday", field: "Sunday", sortable: false, renderCell: (params) => (<TextField defaultValue={params.value} onChange={(e) => changeSuggestedAndMinimumPrice(e.target.value, params)} />), width: 90 },
  ];
  const customTableData = [...TableData];
  customTableData[0].Type = "Minimum Price";
  customTableData[1].Type = "Suggested Price";

  let form = [
    <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.fields}>
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "Location")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Location</InputLabel>
          <Select
            native
            label="Location"
            inputProps={{
              name: "Location",
              id: "standard-adornment-amount",
            }}
            value={Location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          >
            <option aria-label="None" value="" />
            {LocationsList}
          </Select>
        </FormControl>
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "CityID")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel shrink htmlFor="outlined-age-native-simple">City</InputLabel>
          <Select
            native
            inputProps={{
              name: "City",
              id: "outlined-age-native-simple",
            }}
            displayEmpty
            value={CityID}
            onChange={(e) => {
              setCityID(e.target.value);
            }}
          >
            {CitiesList}
          </Select>
        </FormControl>
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "Zipcode")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel shrink htmlFor="outlined-age-native-simple">Zipcode</InputLabel>
          <Select
            native
            label="Zipcode"
            inputProps={{
              name: "Zipcode",
              id: "outlined-age-native-simple",
            }}
            value={Zipcode}
            onChange={(e) => {
              setZipcode(e.target.value);
            }}
          >
            {ZipcodesList}
          </Select>
        </FormControl>
        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "propertyFriendlyName"
          )}
          required
          id="outlined-required"
          label="Property Friendly Name"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={propertyFriendlyName}
          onChange={(e) => {
            setPropertyFriendlyName(e.target.value);
          }}
        />
        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "description"
          )}
          required
          id="outlined-required"
          label="Property Description"
          multiline
          rowsMax={4}
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "SEODescription"
          )}
          required
          id="outlined-required"
          label="SEO Description"
          multiline
          rowsMax={4}
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={SEODescription}
          onChange={(e) => {
            setSEODescription(e.target.value);
          }}
        />
        <TextField
          //  error={Errors.find((fieldHasError) => fieldHasError === "BitlyLink")}
          //  required
          id="outlined-required"
          label="Bitly Link"
          multiline
          rowsMax={4}
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={BitlyLink}
          onChange={(e) => {
            setBitlyLink(e.target.value);
          }}
        />
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "Owner")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Owner</InputLabel>
          <Select
            native
            label="Owner"
            inputProps={{
              name: "Owner",
              id: "outlined-age-native-simple",
            }}
            value={Owner}
            onChange={(e) => {
              setOwner(e.target.value);
            }}
          >
            <option aria-label="None" value="" />
            {OwnersList}
          </Select>
        </FormControl>
        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "address")}
          required
          id="outlined-required"
          label="Address"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "maxAllowedGuests"
          )}
          required
          id="outlined-required"
          label="Maximum Allowed Guests"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={maxAllowedGuests}
          onChange={(e) => {
            setMaxAllowedGuests(e.target.value <= 0 ? 0 : e.target.value);
          }}
          InputProps={{ inputProps: { min: 0 } }}
          type="number"
        />
        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "minimumNightStay"
          )}
          required
          id="outlined-required"
          label="Minimum Night Stay"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={minimumNightStay}
          onChange={(e) => {
            setMinimumNightStay(e.target.value <= 0 ? 0 : e.target.value);
          }}
          InputProps={{ inputProps: { min: 1 } }}
          type="number"
        />

        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "propertyCategoryTypeID")}
          //required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Property category type</InputLabel>
          <Select
            native
            label="Property category type"
            inputProps={{
              name: "Property category type",
              id: "outlined-age-native-simple",
            }}
            value={propertyCategoryTypeID}
            onChange={(e) => {
              setPropertyCategoryTypeID(e.target.value);
            }}
          >
            {PropertyCategoryTypesOptions}
          </Select>
        </FormControl>
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
            <option aria-label="None" value="" />
            {AssignedEmployeesList}
          </Select>
        </FormControl>
        <FormControl
          error={Errors.find(
            (fieldHasError) => fieldHasError === "PropertySearchType"
          )}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Property Search Types
          </InputLabel>
          <Select
            native
            label="Property Search Types"
            inputProps={{
              name: "Property Search Types",
              id: "outlined-age-native-simple",
            }}
            value={PropertySearchType}
            onChange={(e) => {
              setPropertySearchType(e.target.value);
            }}
          >
            {/*<option aria-label="None" value="" />*/}
            {PropertySearchTypesList}
          </Select>
        </FormControl>
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "Active")}
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
              name: "Active",
              id: "outlined-age-native-simple",
            }}
            value={TransactionStatusID}
            onChange={(e) => {
              setTransactionStatusID(e.target.value);
            }}
          >
            {/*<option aria-label="None" value="" />*/}
            <option value={1}>Yes</option>
            <option value={2}>No</option>
          </Select>
        </FormControl>
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "AllowsPets")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Allows Pets
          </InputLabel>
          <Select
            native
            label="Allows Pets"
            inputProps={{
              name: "Allows Pets",
              id: "outlined-age-native-simple",
            }}
            value={AllowsPets}
            onChange={(e) => {
              setAllowsPets(e.target.value);
            }}
          >
            {/*<option aria-label="None" value="" />*/}
            <option value={1}>Yes</option>
            <option value={2}>No</option>
          </Select>
        </FormControl>
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "Bedrooms")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Bedrooms</InputLabel>
          <Select
            native
            label="Bedrooms"
            inputProps={{
              name: "Bedrooms",
              id: "outlined-age-native-simple",
            }}
            value={Bedrooms}
            onChange={(e) => {
              setBedrooms(e.target.value);
            }}
          >
            <option aria-label="None" value="" />
            {BedroomsList}
          </Select>
        </FormControl>
        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "Bathrooms")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Bathrooms
          </InputLabel>
          <Select
            native
            label="Bathrooms"
            inputProps={{
              name: "Bathrooms",
              id: "outlined-age-native-simple",
            }}
            value={Bathrooms}
            onChange={(e) => {
              setBathrooms(e.target.value);
            }}
          >
            <option aria-label="None" value="" />
            {BathroomsList}
          </Select>
        </FormControl>




        <FormControlLabel
          className={classes.Amenity}
          control={
            <Checkbox
              checked={isWebEnabled === true ? true : false}
              onChange={(event) => {
                if (isWebEnabled === true) {
                  setIsWebEnabled(false)
                } else {
                  setIsWebEnabled(true)
                }
              }}
              value="true"
              name="isWebEnabled"
            />
          }
          label="Web Enabled"
        />
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
                uploadFiles(Images, e.target).then((data) => {
                  setLoading(false);
                  setImages(data);
                });
              }}
            />
          }

        />


        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "BuyerAgentID")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Buyer's Agent</InputLabel>
          <Select
            native
            label="Buyer's Agent"
            value={BuyerAgentID}
            onChange={(e) => {
              setBuyerAgentID(e.target.value)
            }}

          >
            {BuyerAgentList}
          </Select>
        </FormControl>

        <FormControl
          error={Errors.find((fieldHasError) => fieldHasError === "CommissionRateTypeID")}
          required
          variant="outlined"
          color="secondary"
          className={classes.TextField}
        >
          <InputLabel htmlFor="outlined-age-native-simple">"Rate %"</InputLabel>
          <Select
            native
            label="Rate %"
            value={CommissionRateTypeID}
            onChange={(e) => {
              let list = BuyerAgentCommissionRate.filter((element) => element.commissionRateTypeID == e.target.value)
              setCommissionRate(list[0].commissionRate)
              setCommissionRateTypeID(list[0].commissionRateTypeID)
              setBuyerAgentPropertyID(list[0].propertyID)
              // setCommissionRate(list[0].commissionRate)
            }}

          >
            {commissionRateList}
          </Select>
        </FormControl>
        {type !== "Create" && <TextField
          //  error={Errors.find((fieldHasError) => fieldHasError === "BitlyLink")}
          //  required
          id="outlined-required"
          label="Property ID"
          multiline
          rowsMax={4}
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={PropertyID}
        />}

        <TextField
          //  error={Errors.find((fieldHasError) => fieldHasError === "BitlyLink")}
          //  required
          id="outlined-required"
          label="Broker ID"
          multiline
          rowsMax={4}
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={BrokerID}

        />

        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "LicenceNumber")}
          required
          id="outlined-required"
          label="License Number"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="text"
          value={LicenceNumber}
          onChange={(e) => {
            setLicenceNumber(e.target.value)
          }}

        />

        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "LicenceExpirationDate")}
          required
          id="outlined-required"
          // label="License Expiration Date"
          helperText="License Expiration Date"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="dateTime"
          value={LicenceExpirationDate}
          onChange={(e) => {
            setLicenceExpirationDate(e.target.value)
          }}

        />

        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "DamageDeposit")}
          required
          id="outlined-required"
          label="Damage Deposit"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="number"
          value={DamageDeposit}
          onChange={(e) => {
            setDamageDeposit(e.target.value)
          }}

        />

        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "CleaningFee")}
          required
          id="outlined-required"
          label="Cleaning Fee"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="number"
          value={CleaningFee}
          onChange={(e) => {
            setCleaningFee(e.target.value)
          }}

        />

        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "AdminFee")}
          required
          id="outlined-required"
          label="Admin Fee"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="number"
          value={AdminFee}
          onChange={(e) => {
            setAdminFee(e.target.value)
          }}

        />

        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "SalesAndUseTaxRate")}
          required
          id="outlined-required"
          label="Sales And Use Tax Rate"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="number"
          value={SalesAndUseTaxRate}
          onChange={(e) => {
            setSalesAndUseTaxRate(e.target.value)
          }}

        />

        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "ConventionAndTourismTaxRate")}
          required
          id="outlined-required"
          label="Convention And Tourism Tax Rate"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="number"
          value={ConventionAndTourismTaxRate}
          onChange={(e) => {
            setConventionAndTourismTaxRate(e.target.value)
          }}

        />

        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "BrokerSplitFromOwnerRate")}
          required
          id="outlined-required"
          label="Broker Split From Owner Rate"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="number"
          value={BrokerSplitFromOwnerRate}
          onChange={(e) => {
            setBrokerSplitFromOwnerRate(e.target.value)
          }}

        />

        <TextField
          error={Errors.find((fieldHasError) => fieldHasError === "ArrivalInstructions")}
          required
          id="outlined-required"
          label="Arrival Instructions"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          type="text"
          value={ArrivalInstructions}
          onChange={(e) => {
            setArrivalInstructions(e.target.value)
          }}

        />

        <FormControl
          component="fieldset"
          error={Errors.find(
            (fieldHasError) => fieldHasError === "CheckedAmenities"
          )}
        >
          <FormLabel component="legend">Amenities</FormLabel>
          <FormGroup className={classes.Amenities}>{AmenitiesList}</FormGroup>
        </FormControl>
        {ShowPricing ? (
          <CellEditTable
            error={Errors.find((fieldHasError) => fieldHasError === "TableData")}
            Columns={Columns}
            TableData={customTableData}
          />
        ) : null}

        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "MonthlyMinimumPrice"
          )}
          required
          id="outlined-required"
          label="MONTHLY MINIMUM PRICE ($)"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={MonthlyMinimumPrice}
          onChange={(e) => {
            setMonthlyMinimumPrice(e.target.value <= 0 ? 0 : e.target.value);
          }}
          InputProps={{ inputProps: { min: 0 } }}
          type="number"
          InputLabelProps={{ shrink: MonthlyMinimumPrice != null ? true : false }}
        />
        <TextField
          error={Errors.find(
            (fieldHasError) => fieldHasError === "MonthlySuggestedPrice"
          )}
          required
          id="outlined-required"
          label="MONTHLY SUGGESTED PRICE ($)"
          variant="outlined"
          color="secondary"
          className={classes.TextField}
          value={MonthlySuggestedPrice}
          onChange={(e) => {
            setMonthlySuggestedPrice(e.target.value <= 0 ? 0 : e.target.value);
          }}
          InputProps={{ inputProps: { min: 0 } }}
          type="number"
          InputLabelProps={{ shrink: MonthlySuggestedPrice != null ? true : false }}
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
          {`${type} Property`}
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
            deleteProperty("xyz" /*employeeID*/, PropertyID);
          }}
        >
          {`${type} Property`}
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
