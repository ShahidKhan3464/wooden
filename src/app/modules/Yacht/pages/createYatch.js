import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomAlert from "../../../../components/customAlert";
import CustomButton from "../../../../components/customButton/index";
import FormControl from "../../../../components/formControl";
import { ButtonBox, CustomFormField, PrimaryHeading } from "../../../baseStyle";
import { createYacht, GetTransportationTypesData, readAnYacht , updateYacht } from "./../apiCalls/yachtCrud";
import { TextField, Typography, CircularProgress } from "@material-ui/core";
import { YachtCreateContainer } from "./style";
import { filledCrossIcon, uploadImg } from "../../../../img";
import { uploadFiles } from "../../../../api/uploadFiles";

const CreateYacht = ({ EmployeeID, BrokerID, TransactionStatusID }) => {
  const history = useHistory();
  const routeParams = window.location.pathname.split("/");
  const selectedYachtId = routeParams[3];
  const viewYachtDetail = routeParams[2];

  const { locationSlice } = useSelector((state) => state);
  const [ListData, setListData] = useState(null);
  const [getDataLoading, setgetDataLoading] = useState(false);
  const [submitFromLoading, setsubmitFromLoading] = useState(false);
  const [Images, setImages] = useState([]);
  const [imageUploadLoading, setimageUploadLoading] = useState(false);
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

  useEffect(() => {
    const locationData = locationSlice.locations?.map((item) => {
      return {
        itemId: item.locationID,
        itemName: item.location,
      };
    });
    setfetchedLocations(locationData);
  }, [locationSlice]);

  useEffect(() => {
    if (selectedYachtId) {
      setgetDataLoading(true);
      readAnYacht(selectedYachtId, EmployeeID, BrokerID)
        .then((res) => {
          setgetDataLoading(false);
          setListData(res.Data);
          setImages(res.Data.secondaryImagesList)
        })
        .catch((err) => {
          setgetDataLoading(false);
          console.log(err);
        });
    }
  }, [selectedYachtId, EmployeeID, BrokerID]);

  useEffect(() => {
    GetTransportationTypesData(BrokerID, TransactionStatusID).then((data) => {
      // setcarFromLoading(false);
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

  const navigateHandler = () => {
    history.push(`/yacht/editYacht/${selectedYachtId}`);
  };
  const changePath = () => {
    history.push("/yacht/list");
  };
  const onSubmit = (values, { resetForm }) => {
    setsubmitFromLoading(true);
    
    const yacthData = {
      ...values,
      imageFileName: Images[0].imageFilePath,
      secondaryImagesList: Images,
    };


    const updatedYatchdata = {
      ...yacthData,
      transportationObjectID: selectedYachtId,
      areThereSecondaryImageUpdates : true
      
    }

    
    
    


    if (viewYachtDetail === "editYacht") {
      updateYacht(EmployeeID, BrokerID, updatedYatchdata)
        .then((res) => {
          setsubmitFromLoading(false);
          resetForm();
          CustomAlert("Yacth update successfully", "success", changePath);
        })
        .catch((error) => {
          console.log("error");
          setsubmitFromLoading(false);
          CustomAlert("Some thing went wrong", "error");
        });
    } else {
      createYacht(EmployeeID, BrokerID, yacthData)
        .then((res) => {
          setsubmitFromLoading(false);
          resetForm();
          CustomAlert("Yacth created successfully", "success", changePath);
        })
        .catch((error) => {
          console.log("error");
          setsubmitFromLoading(false);
          CustomAlert("Some thing went wrong", "error");
        });
    }
  };

  const removeImagesList = (id) => {
    const removedImage = Images.filter((img) => img.imageOrder !== id);
    setImages(removedImage);
  };

  return (
    <YachtCreateContainer>
      {getDataLoading ? (
        <div className={"container"}>
          <div className='container spinner-center spinner spinner-primary spinner-lg mr-15'></div>
        </div>
      ) : (
        <div className='createYacthContent'>
          <div className='createYacthContent_heading'>
            {viewYachtDetail === "viewYachtDetail" ? (
              <div className='createYacthContent_heading_view'>
                <PrimaryHeading>Yacht Details</PrimaryHeading>
                <CustomButton
                  type='button'
                  width='95px'
                  click={navigateHandler}
                  text='Edit'
                />
              </div>
            ) : (
              <PrimaryHeading>
                {viewYachtDetail === "editYacht" ? "Edit Yacht" : "Add Yacht"}
              </PrimaryHeading>
            )}
          </div>
          <div className='createYacthContent_form'>
            <Formik
              initialValues={ListData ? ListData : initialValues}
              // validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <form
                    name='basic'
                    onSubmit={formik.handleSubmit}
                    autoComplete='off'
                    //   validateMessages={validationSchema}
                  >
                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='text'
                        name='friendlyName'
                        placeholder='Enter Name'
                        
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
                        
                        className={
                          formik.errors.seoDescription &&
                            formik.touched.seoDescription
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </div>
{/* 
                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='topMPH'
                        placeholder='Enter MPH'
                        
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
                        
                        className={
                          formik.errors.makeID && formik.touched.makeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedMakes}
                        
                      />
                    </CustomFormField> */}

                    <CustomFormField>
                      {/* <FormControl
                        control='select'
                        type='text'
                        name='locationID'
                        placeholder='Choose Location'
                        label='Location'
                        
                        className={
                          formik.errors.locationID && formik.touched.locationID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedLocations}
                        
                      /> */}

                      <FormControl
                        control='input'
                        type='text'
                        name='bitlyLink'
                        placeholder='Enter Bitly Link'

                        label='Bitly Link*'
                        className={
                          formik.errors.bitlyLink && formik.touched.bitlyLink
                            ? "is-invalid"
                            : "customInput"
                        }
                      />

                      <FormControl
                        control='input'
                        type='number'
                        name='numberOfSeats'
                        placeholder='Guests'

                        label='Number of Guests*'
                        className={
                          formik.errors.numberOfSeats &&
                            formik.touched.numberOfSeats
                            ? "is-invalid"
                            : "customInput"
                        }
                      />


                      {/* <FormControl
                        control='select'
                        type='text'
                        name='modelID'
                        placeholder='Choose Model'
                        label='Model'
                        
                        className={
                          formik.errors.modelID && formik.touched.modelID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedModels}
                        
                      /> */}
                    </CustomFormField>
{/* 
                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='year'
                        placeholder='Car Launch Year'
                        label='Year'
                        
                        className={
                          formik.errors.year && formik.touched.year
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedYears}
                        
                      />
                      <FormControl
                        control='input'
                        type='text'
                        name='bitlyLink'
                        placeholder='Enter Bitly Link'
                        
                        label='Bitly Link*'
                        className={
                          formik.errors.bitlyLink && formik.touched.bitlyLink
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField> */}

                 

                    

               

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='totalFeet'
                        disabled={viewYachtDetail === "viewYachtDetail"}
                        placeholder='Enter MPH'
                        label='Top Feet'
                        className={
                          formik.errors.totalFeet && formik.touched.totalFeet
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='locationID'
                        disabled={viewYachtDetail === "viewYachtDetail"}
                        placeholder='Choose Location'
                        label='Location'
                        className={
                          formik.errors.locationID && formik.touched.locationID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedLocations}
                      />
                    </CustomFormField>

                    {/* <CustomFormField>
                     

                      <FormControl
                        control='input'
                        type='number'
                        name='zeroTo60'
                        placeholder='Enter 0 to 60'
                        label='0 to 60'
                  
                        className={
                          formik.errors.zeroTo60 && formik.touched.zeroTo60
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField> */}
                    {/* <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='dailyRate'
                        placeholder='Enter Daily Rates'
                        label='Daily Rates'
              
                        className={
                          formik.errors.dailyRate && formik.touched.dailyRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='searchTypeID'
                        placeholder='Search Type ID'
                       
                        label='Search Type ID'
                        className={
                          formik.errors.searchTypeID &&
                            formik.touched.searchTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedSearchTypes}
                       
                      />
                    </CustomFormField> */}
                    {/* <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='mpgCity'
                        placeholder='Enter MPG City'
                        
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
                        
                        label='MPG Hwy'
                        className={
                          formik.errors.mpgHwy && formik.touched.mpgHwy
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField> */}
                    {/* <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='minimumNumberOfDays'
                        placeholder='Enter Minimum Numbers of Days'
                        
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
                        
                        label='Engine Type*'
                        className={
                          formik.errors.engineTypeID &&
                            formik.touched.engineTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedEngines}
                        
                      />
                    </CustomFormField> */}
                    {/* <CustomFormField>
                     
                      <FormControl
                        control='input'
                        type='number'
                        name='milesPerDayIncluded'
                        placeholder='Enter Miles Per Day Included'
                        
                        label='Miles Per Day Included*'
                        className={
                          formik.errors.milesPerDayIncluded &&
                            formik.touched.milesPerDayIncluded
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField> */}
                    {/* <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='styleTypeID'
                        placeholder='Choose Style Type'
                        label='Style type*'
                        
                        className={
                          formik.errors.styleTypeID &&
                            formik.touched.styleTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedStyles}
                        
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='exteriorColorID'
                        placeholder='Choose Owner'
                        
                        label='Owner'
                        //   className={
                        //       formik.errors.exteriorColorID && formik.touched.exteriorColorID
                        //           ? "is-invalid"
                        //           : "customInput"
                        //   }
                        options={fetchedOwners}
                        
                      />
                    </CustomFormField> */}
                    {/* <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='interiorColorID'
                        placeholder='Choose Color'
                        label='Interior Color*'
                        
                        className={
                          formik.errors.interiorColorID &&
                            formik.touched.interiorColorID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedcolors}
                      />
                      <FormControl
                        control='input'
                        type='number'
                        name='horsePower'
                        placeholder='Enter Horse Power'
                        label='Horse Power*'
                        
                        className={
                          formik.errors.horsePower && formik.touched.horsePower
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField> */}
                    {/* <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='fuelTypeID'
                        placeholder='Choose Fuel Type'
                        
                        label='Fuel Type*'
                        className={
                          formik.errors.fuelTypeID && formik.touched.fuelTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedFuels}
                       
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='exteriorColorID'
                        placeholder='Choose Color'
                        label='Exterior Color*'
                        
                        className={
                          formik.errors.exteriorColorID &&
                            formik.touched.exteriorColorID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedcolors}
                       
                      />
                    </CustomFormField> */}
                    {/* <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='doorTypeID'
                        placeholder='Choose Door Type'
                        label='Door Type*'
                        
                        className={
                          formik.errors.doorTypeID && formik.touched.doorTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedDoors}
                        
                      />
                      <FormControl
                        control='select'
                        type='text'
                        name='transmissionTypeID'
                        placeholder='Choose Transmission Type'
                        label='Transmission Type*'
                        
                        className={
                          formik.errors.transmissionTypeID &&
                            formik.touched.transmissionTypeID
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedtransmissions}
                        
                      />
                    </CustomFormField> */}


                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='fourHourRate'
                        disabled={viewYachtDetail === "viewYachtDetail"}
                        placeholder='Enter Four Hour Rate'
                        label='Four Hour Rate'
                        className={
                          formik.errors.fourHourRate &&
                          formik.touched.fourHourRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='number'
                        name='sixHourRate'
                        disabled={viewYachtDetail === "viewYachtDetail"}
                        placeholder='Enter Six Hour Rate'
                        label='Six Hour Rate*'
                        className={
                          formik.errors.sixHourRate &&
                          formik.touched.sixHourRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='eightHourRate'
                        disabled={viewYachtDetail === "viewYachtDetail"}
                        placeholder='Enter Eight Hour Rate'
                        label='Eight Hour Rate*'
                        className={
                          formik.errors.eightHourRate &&
                          formik.touched.eightHourRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                      <FormControl
                        control='input'
                        type='number'
                        name='pricePerHour'
                        disabled={viewYachtDetail === "viewYachtDetail"}
                        placeholder='Price Per Hour'
                        label='Price Per Hour*'
                        className={
                          formik.errors.pricePerHour &&
                            formik.touched.pricePerHour
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>


                    <div className='createYacthContent_form_uploadFile'>
                      <Typography component='h6'>
                        Upload Secondary Images*
                      </Typography>
                      <div className='createYacthContent_form_uploadFile_browseImage_shown'>
                        {Images?.map(({ imageFilePath, imageOrder }) => (
                          <div
                            key={imageOrder}
                            className='createYacthContent_form_uploadFile_browseImage_shown_imgBox'
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

                    {viewYachtDetail === "viewYachtDetail" ? null : (
                      <>
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
                            text={
                              viewYachtDetail === "editYacht"
                                ? "Update Yacht"
                                : "Create Yacht"
                            }
                          />
                        </ButtonBox>
                      </>
                    )}
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </YachtCreateContainer>
  );
};
// Uriel Mccormick
export default CreateYacht;
const initialValues = {
  topMPH: 30,
  makeID: 4,
  transactionStatusID: "1",
  locationID: "",
  modelID: 8,
  year: "1999",
  friendlyName: "",
  description: "",
  seoDescription: "",
  bitlyLink: "",
  numberOfSeats: '',
  zeroTo60: "",
  dailyRate: 200,
  totalFeet: '',
  fourHourRate: "",
  sixHourRate: "",
  eightHourRate: "",
  searchTypeID: 1,
  doorTypeID: "",
  transmissionTypeID: 2,
  fuelTypeID: 1,
  pickUpLocationID: 8,
  dropOffLocationID: 8,
  exteriorColorID: 2,
  interiorColorID: 1,
  horsePower: 90,
  styleTypeID: 6,
  transportationObjectTypeID: 2,
  ownerID: 2,
  pricePerHour: "",
  milesPerDayIncluded: 200,
  minimumNumberOfDays: 3,
  engineTypeID: 3,
  mpgCity: 12,
  mpgHwy: 15,
  securityDeposit : 2600
};
const validationSchema = Yup.object({
  friendlyName: Yup.string().required("Name is required!"),
  description: Yup.string().required("Description is required!"),
  seoDescription: Yup.string().required("SEO description is required!"),
  sixHourRate: Yup.string().required("Six hour rate is required!"),
  eightHourRate: Yup.string().required("Eight hour rate is required!"),
  pricePerHour: Yup.string().required("Price Per Hour is required!"),
  locationID: Yup.string().required("Location is required!"),
  totalFeet: Yup.string().required("Top feet is required!"),
  bitlyLink: Yup.string().required("Bitly link is required!"),
  fourHourRate: Yup.string().required("Four hour rate is required!"),
  numberOfSeats: Yup.string().required("Number of seat is required!"),

});
