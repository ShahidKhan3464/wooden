import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import FormControl from "../../../../components/formControl";
import CustomAlert from "../../../../components/customAlert";
import CustomButton from "../../../../components/customButton/index";
import { ButtonBox, CustomFormField, PrimaryHeading } from "../../../baseStyle";
import getAuthToken from "./../../../../api/getAuthToken";
import {
  createCar,
  GetTransportationTypesData,
  getCars,
  updateCar,
  readAnCar,
} from "../apiCalls/carCrud";
import { CarCreateContainer } from "./style";
import { TextField, Typography, CircularProgress } from "@material-ui/core";
import { filledCrossIcon, uploadImg } from "../../../../img";
import { uploadFiles } from "../../../../api/uploadFiles";

const CreateCar = ({ EmployeeID, BrokerID, TransactionStatusID }) => {
  const history = useHistory();
  const routeParams = window.location.pathname.split("/");
  const selectedCarId = routeParams[3];
  const viewCarDetail = routeParams[2];

  const authToken = getAuthToken();
  const [ListData, setListData] = useState(null);
  const [carFromLoading, setcarFromLoading] = useState(true);
  const [submitFromLoading, setsubmitFromLoading] = useState(false);
  const [fetchedMakes, setfetchedMakes] = useState([]);
  const [fetchedcolors, setfetchedcolors] = useState([]);
  const [fetchedDoors, setfetchedDoors] = useState([]);
  const [fetchedDropOfLocation, setfetchedDropOfLocation] = useState([]);
  const [fetchedEngines, setfetchedEngines] = useState([]);
  const [fetchedFuels, setfetchedFuels] = useState([]);
  const [fetchedHoursePower, setfetchedHoursePower] = useState([]);
  const [fetchedLocations, setfetchedLocations] = useState([]);
  const [fetchedModels, setfetchedModels] = useState([]);
  const [fetchedMphs, setfetchedMphs] = useState([]);
  const [fetchedOwners, setfetchedOwners] = useState([]);
  const [fetchedPickUpLocation, setfetchedPickUpLocation] = useState([]);
  const [fetchedSearchTypes, setfetchedSearchTypes] = useState([]);
  const [fetchedSeats, setfetchedSeats] = useState([]);
  const [fetchedStatus, setfetchedStatus] = useState([]);
  const [fetchedStyles, setfetchedStyles] = useState([]);
  const [fetchedtransmissions, setfetchedtransmissions] = useState([]);
  const [fetchedYears, setfetchedYears] = useState([]);
  const [fetchedZeroTo60, setfetchedZeroTo60] = useState([]);
  const [Images, setImages] = useState([]);
  const [imageUploadLoading, setimageUploadLoading] = useState(false);

  useEffect(() => {
    GetTransportationTypesData(BrokerID, TransactionStatusID).then((data) => {
      setcarFromLoading(false);
      const makesData = data.Data.makes.map((item) => {
        return {
          itemId: item.makeID,
          itemName: item.make,
        };
      });
      setfetchedMakes(makesData);
      const colorData = data.Data.colors.map((item) => {
        return {
          itemId: item.colorTypeID,
          itemName: item.colorType,
        };
      });
      setfetchedcolors(colorData);
      const modelsData = data.Data.models.map((item) => {
        return {
          itemId: item.modelID,
          itemName: item.model,
        };
      });
      setfetchedModels(modelsData);
      const doorsData = data.Data.doors.map((item) => {
        return {
          itemId: item.doorTypeID,
          itemName: item.doorType,
        };
      });
      setfetchedDoors(doorsData);
      const dropOfLocation = data.Data.dropOffLocations.map((item) => {
        return {
          itemId: item.locationID,
          itemName: item.name,
        };
      });
      setfetchedDropOfLocation(dropOfLocation);
      const enginesData = data.Data.engines.map((item) => {
        return {
          itemId: item.engineTypeID,
          itemName: item.engineType,
        };
      });
      setfetchedEngines(enginesData);
      const fulesData = data.Data.fuels.map((item) => {
        return {
          itemId: item.fuelTypeID,
          itemName: item.fuelType,
        };
      });
      setfetchedFuels(fulesData);
      const horseData = data.Data.horsePowers.map((item) => {
        return {
          itemId: item.horsePowerTypeID,
          itemName: item.horsePowerType,
        };
      });
      setfetchedHoursePower(horseData);
      const locationsData = data.Data.locations.map((item) => {
        return {
          itemId: item.locationID,
          itemName: item.location,
        };
      });
      setfetchedLocations(locationsData);
      const mphsData = data.Data.mphs.map((item) => {
        return {
          itemId: item.topMPHTypeID,
          itemName: item.topMPHType,
        };
      });
      setfetchedMphs(mphsData);
      const ownerData = data.Data.owners.map((item) => {
        return {
          itemId: item.ownerID,
          itemName: `${item.firstName} ${item.lastName}`,
        };
      });
      setfetchedOwners(ownerData);
      const pickUpLocationsData = data.Data.pickUpLocations.map((item) => {
        return {
          itemId: item.transferTypeID,
          itemName: item.transportationObjectTypeID,
        };
      });
      setfetchedPickUpLocation(pickUpLocationsData);
      const searchTypesData = data.Data.searchTypes.map((item) => {
        return {
          itemId: item.propertySearchTypeID,
          itemName: item.propertySearchType,
        };
      });
      setfetchedSearchTypes(searchTypesData);
      const seatsData = data.Data.seats.map((item) => {
        return {
          itemId: item.numberOfSeatsTypeID,
          itemName: item.numberOfSeatsType,
        };
      });
      setfetchedSeats(seatsData);
      const statusesData = data.Data.statuses.map((item) => {
        return {
          itemId: item.transactionStatusID,
          itemName: item.transactionStatus,
        };
      });
      setfetchedStatus(statusesData);
      const stylesData = data.Data.styles.map((item) => {
        return {
          itemId: item.styleTypeID,
          itemName: item.styleType,
        };
      });
      setfetchedStyles(stylesData);
      const transmissionsData = data.Data.transmissions.map((item) => {
        return {
          itemId: item.transmissionTypeID,
          itemName: item.transmissionType,
        };
      });
      setfetchedtransmissions(transmissionsData);
      const yearsData = data.Data.years.map((item) => {
        return {
          itemId: item.yearTypeID,
          itemName: item.yearType,
        };
      });
      setfetchedYears(yearsData);
      const zeroTo60sData = data.Data.zeroTo60s.map((item) => {
        return {
          itemId: item.zeroTo60TypeID,
          itemName: item.zeroTo60Type,
        };
      });
      setfetchedZeroTo60(zeroTo60sData);
    });
  }, []);

  useEffect(() => {
    readAnCar(selectedCarId, EmployeeID, BrokerID)
      .then((res) => {
        setListData(res.Data)
        setImages(res.Data.secondaryImagesList)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCarId]);
  // console.log(ListData, "this is edit car response");


  const initialValues = {
    topMPH: "",
    makeID: "",
    transactionStatusID: TransactionStatusID,
    locationID: "",
    pickUpLocationID: 2,
    dropOffLocationID: 2,
    modelID: "",
    year: "",
    friendlyName: "",
    description: "",
    seoDescription: "",
    bitlyLink: "",
    numberOfSeats: "",
    zeroTo60: "",
    dailyRate: "",
    searchTypeID: "",
    doorTypeID: "",
    transmissionTypeID: "",
    fuelTypeID: "",
    exteriorColorID: "",
    interiorColorID: "",
    horsePower: "",
    styleTypeID: "",
    transportationObjectTypeID: 1,
    ownerID: 2,
    securityDeposit: "",
    milesPerDayIncluded: "",
    minimumNumberOfDays: "",
    engineTypeID: "",
    mpgCity: "",
    mpgHwy: "",
    // isConvertible: '1',
    totalFeet: 1,
    fourHourRate: '1',
    sixHourRate: '1',
    eightHourRate: '1',
  };



  const changePath = () => {
    history.push("/car/list");
  };

  const onSubmit = async (values, { resetForm }) => {
    setsubmitFromLoading(true);

    const carsData = {
      ...values,
      imageFileName: Images[0].imageFilePath,
      secondaryImagesList: Images,
    };

    const updatedPropertyData = {
      ...carsData,
      transportationObjectID: 325,
      areThereSecondaryImageUpdates: true
    }

    setsubmitFromLoading(true);
    if (viewCarDetail === "editCar") {
      console.log(updatedPropertyData, 'updatedPropertyData')
      // try {
      //   const checkapi = await fetch(`https://woodendoordev.com/api/transportation/UpdateTransportationObject?employeeID=${EmployeeID}&brokerID=${BrokerID}`, {
      //     method: 'PUT',
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //       Authorization: "Bearer " + authToken
      //     },
      //     body: JSON.stringify(updatedPropertyData)
      //   })
      //   if (checkapi.status === 200) {
      //     CustomAlert("Property update successfully.", "success", changePath);
      //     setsubmitFromLoading(false);
      //   }
      //   else {
      //     setsubmitFromLoading(false);
      //   }
      //   console.log('checkapi', checkapi)
      // }

      // catch (err) {
      //   console.log(err);
      //   setsubmitFromLoading(false);
      //   CustomAlert("Some thing went wrong", "error");
      // }

      updateCar(EmployeeID, BrokerID, updatedPropertyData)
        .then(() => {
          setsubmitFromLoading(false);
          CustomAlert("Car data has been updated", "success", changePath);
        })
        .catch((err) => {
          console.log(updatedPropertyData)
          setsubmitFromLoading(false);
          console.log(err);
          CustomAlert("Some thing went wrong", "error");
        });
    }

    else {
      createCar(EmployeeID, BrokerID, carsData)
        .then((res) => {
          setsubmitFromLoading(false);
          CustomAlert("Car data has been created", "success", changePath);
          resetForm();
        })
        .catch((err) => {
          setsubmitFromLoading(false);
          console.log(err, "here is error");
          CustomAlert("Some thing went wrong", "error");
        });
    }
  };

  const onSelectClient = (value) => {
    console.log(value);
  };

  const navigateHandler = () => {
    history.push(`/car/editCar/${selectedCarId}`);
  };
  const removeImagesList = (id) => {
    const removedImage = Images.filter((img) => img.imageOrder !== id);
    setImages(removedImage);
  };
  return (
    <CarCreateContainer>
      {carFromLoading ? (
        <div className={"container"}>
          <div className='container spinner-center spinner spinner-primary spinner-lg mr-15'></div>
        </div>
      ) : (
        <div className='createCarContent'>
          <div className='createCarContent_heading'>
            {viewCarDetail === "viewCarDetail" ? (
              <div className='createCarContent_heading_view'>
                <PrimaryHeading>Car Details</PrimaryHeading>
                <CustomButton
                  type='button'
                  width='95px'
                  click={navigateHandler}
                  text='Edit'
                />
              </div>
            ) : (
              <PrimaryHeading>
                {viewCarDetail === "editCar" ? "Edit Car" : "Add Car"}
              </PrimaryHeading>
            )}
          </div>
          <div className='createCarContent_form'>
            <Formik
              initialValues={ListData ? ListData : initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <form
                    name='basic'
                    onSubmit={formik.handleSubmit}
                    autoComplete='off'
                    validateMessages={validationSchema}
                  >
                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='text'
                        name='friendlyName'
                        placeholder='Enter Name'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Name*'
                        className={
                          formik.errors.friendlyName &&
                            formik.touched.friendlyName
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='text'
                        name='description'
                        placeholder='Enter Description'
                        label='Description*'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.description &&
                            formik.touched.description
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <div>
                      <FormControl
                        control='textarea'
                        type='text'
                        name='seoDescription'
                        placeholder='Enter SEO Description'
                        label='SEO Description*'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.seoDescription &&
                            formik.touched.seoDescription
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </div>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='topMPH'
                        placeholder='Enter MPH'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Top MPH*'
                        className={
                          formik.errors.topMPH && formik.touched.topMPH
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='makeID'
                        placeholder='Choose Company'
                        label='Makes'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.makeID && formik.touched.makeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedMakes}
                        onSelect={onSelectClient}
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='locationID'
                        placeholder='Choose Location'
                        label='Location'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.locationID && formik.touched.locationID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedLocations}
                        onSelect={onSelectClient}
                      />

                      <FormControl
                        control='select'
                        type='text'
                        name='modelID'
                        placeholder='Choose Model'
                        label='Model'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.modelID && formik.touched.modelID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedModels}
                        onSelect={onSelectClient}
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='year'
                        placeholder='Car Launch Year'
                        label='Year'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.year && formik.touched.year
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedYears}
                        onSelect={onSelectClient}
                      />
                      <FormControl
                        control='input'
                        type='text'
                        name='bitlyLink'
                        placeholder='Enter Bitly Link'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Bitly Link*'
                        className={
                          formik.errors.bitlyLink && formik.touched.bitlyLink
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='numberOfSeats'
                        placeholder='Select Number Of Seats'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Number Of Seats*'
                        className={
                          formik.errors.numberOfSeats &&
                            formik.touched.numberOfSeats
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='number'
                        name='zeroTo60'
                        placeholder='Enter 0 to 60'
                        label='0 to 60'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.zeroTo60 && formik.touched.zeroTo60
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='dailyRate'
                        placeholder='Enter Daily Rates'
                        label='Daily Rates'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.dailyRate && formik.touched.dailyRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='carModelId'
                        placeholder='Choose Car Model'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Choose Car Model'
                        //   className={
                        //       formik.errors.bitlyLink && formik.touched.bitlyLink
                        //           ? "is-invalid"
                        //           : "customInput"
                        //   }
                        options={fetchedModels}
                        onSelect={onSelectClient}
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='doorTypeID'
                        placeholder='Choose Door Type'
                        label='Door Type*'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.doorTypeID && formik.touched.doorTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedDoors}
                        onSelect={onSelectClient}
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='transmissionTypeID'
                        placeholder='Choose Transmission Type'
                        label='Transmission Type*'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.transmissionTypeID &&
                            formik.touched.transmissionTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedtransmissions}
                        onSelect={onSelectClient}
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='fuelTypeID'
                        placeholder='Choose Fuel Type'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Fuel Type*'
                        className={
                          formik.errors.fuelTypeID && formik.touched.fuelTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedFuels}
                        onSelect={onSelectClient}
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='exteriorColorID'
                        placeholder='Choose Color'
                        label='Exterior Color*'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.exteriorColorID &&
                            formik.touched.exteriorColorID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedcolors}
                        onSelect={onSelectClient}
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='interiorColorID'
                        placeholder='Choose Color'
                        label='Interior Color*'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.interiorColorID &&
                            formik.touched.interiorColorID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedcolors}
                        onSelect={onSelectClient}
                      />
                      <FormControl
                        control='input'
                        type='number'
                        name='horsePower'
                        placeholder='Enter Horse Power'
                        label='Horse Power*'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.horsePower && formik.touched.horsePower
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='styleTypeID'
                        placeholder='Choose Style Type'
                        label='Style type*'
                        disabled={viewCarDetail === "viewCarDetail"}
                        className={
                          formik.errors.styleTypeID &&
                            formik.touched.styleTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedStyles}
                        onSelect={onSelectClient}
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='ownerID'
                        placeholder='Choose Owner'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Owner'
                        className={
                          formik.errors.ownerID && formik.touched.ownerID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedOwners}
                        onSelect={onSelectClient}
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='securityDeposit'
                        placeholder='Enter Security Deposit'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Security Deposit*'
                        className={
                          formik.errors.securityDeposit &&
                            formik.touched.securityDeposit
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='number'
                        name='milesPerDayIncluded'
                        placeholder='Enter Miles Per Day Included'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Miles Per Day Included*'
                        className={
                          formik.errors.milesPerDayIncluded &&
                            formik.touched.milesPerDayIncluded
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='minimumNumberOfDays'
                        placeholder='Enter Minimum Numbers of Days'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Minimum Numbers of Days*'
                        className={
                          formik.errors.minimumNumberOfDays &&
                            formik.touched.minimumNumberOfDays
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='engineTypeID'
                        placeholder='Choose Engine Type'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Engine Type*'
                        className={
                          formik.errors.engineTypeID &&
                            formik.touched.engineTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedEngines}
                        onSelect={onSelectClient}
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='mpgCity'
                        placeholder='Enter MPG City'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='MPG City'
                        className={
                          formik.errors.mpgCity && formik.touched.mpgCity
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='number'
                        name='mpgHwy'
                        placeholder='Enter MPG Hwy'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='MPG Hwy'
                        className={
                          formik.errors.mpgHwy && formik.touched.mpgHwy
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>
                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='searchTypeID'
                        placeholder='Search Type ID'
                        disabled={viewCarDetail === "viewCarDetail"}
                        label='Search Type ID'
                        className={
                          formik.errors.searchTypeID &&
                            formik.touched.searchTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedSearchTypes}
                        onSelect={onSelectClient}
                      />
                    </CustomFormField>

                    <div className='createCarContent_form_uploadFile'>
                      <Typography component='h6'>
                        Upload Secondary Images*
                      </Typography>
                      <div className='createCarContent_form_uploadFile_browseImage_shown'>
                        {Images?.map(({ imageFilePath, imageOrder }) => (
                          <div
                            key={imageOrder}
                            className='createCarContent_form_uploadFile_browseImage_shown_imgBox'
                          >
                            <img
                              className='image'
                              alt='randomImage'
                              src={imageFilePath}
                            />
                            <img
                              src={filledCrossIcon}
                              alt='filledCrossIcon'
                              className='filledCrossIcon'
                              onClick={() => removeImagesList(imageOrder)}
                            />
                          </div>
                        ))}
                      </div>
                      <label htmlFor='file' className='upload-file'>
                        <TextField
                          id='file'
                          type='file'
                          style={{ display: "none" }}
                          inputProps={{ multiple: true }}
                          onChange={(e) => {
                            let checkType = e.target.files[0].type;
                            if (
                              checkType === "image/png" ||
                              checkType === "image/jpeg" ||
                              checkType === "image/jpg"
                            ) {
                              setimageUploadLoading(true);
                              uploadFiles(Images, e.target).then((data) => {
                                setimageUploadLoading(false);
                                setImages(data);
                              });
                            } else {
                              alert("please chose corecct file");
                            }
                          }}
                          disabled={imageUploadLoading}
                        />

                        {imageUploadLoading ? (
                          <CircularProgress size='2rem' />
                        ) : (
                          <img src={uploadImg} alt='upload-img' />
                        )}
                      </label>
                    </div>

                    {viewCarDetail === "viewCarDetail" ? null : (
                      <ButtonBox>
                        <CustomButton
                          type='button'
                          color='#121212'
                          bgColor='#F5F5F5'
                          width='136px'
                          border='none'
                          text='Cancel'
                        />
                        <CustomButton
                          type='submit'
                          disabled={submitFromLoading}
                          text={
                            viewCarDetail === "editCar"
                              ? "Update Car"
                              : "Create Car"
                          }
                        />
                      </ButtonBox>
                    )}
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </CarCreateContainer>
  );
};

export default CreateCar;
const validationSchema = Yup.object({



  friendlyName: Yup.string().required("Name is required!"),
  // description: Yup.string().required("Description is required!"),
  // seoDescription: Yup.string().required("SEO description is required!"),
  // topMPH: Yup.string().required("Top MPH is required!"),
  makeID: Yup.string().required("Select Make value"),
  locationID: Yup.string().required("Location is required!"),
  modelID: Yup.string().required("Modal is required!"),
  // year: Yup.string().required("Year is required!"),
  // bitlyLink: Yup.string().required("Bitly link is required!"),
  // numberOfSeats: Yup.string().required("Number of seats is required!"),
  // zeroTo60: Yup.string()
  //   .required("Zero to 60 is required!"),
  dailyRate: Yup.string()
    .required("Daily rate is required!"),


  // searchTypeID: Yup.string()
  //   .required("Search type is required!"),
  // doorTypeID: Yup.string().required("Door type is required!"),
  // transmissionTypeID: Yup.string().required("Transmission type is required!"),
  // fuelTypeID: Yup.string()
  //   .required("Fuel Type is required!"),
  exteriorColorID: Yup.string()
    .required("Exterior color is required!"),
  interiorColorID: Yup.string().required("Interior color is required!"),
  // horsePower: Yup.string().required("Horse power is required!"),
  // styleTypeID: Yup.string().required("Style type is required!"),
  // securityDeposit: Yup.string().required("Security deposit is required!"),
  // milesPerDayIncluded: Yup.string().required(
  //   "Miles per day included is required!"
  // ),
  // minimumNumberOfDays: Yup.string().required(
  //   "Minimum numbers of days is required!"
  // ),
  // engineTypeID: Yup.string().required("Engine type is required!"),
  // mpgCity: Yup.string()
  //   .required("MPG city is required!"),
  // mpgHwy: Yup.string()
  //   .required("MPG Hwy MPH is required!"),
});
