import React, { useState, useEffect, useCallback, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleComponent } from "react-google-location";

import {
  getAllBedTypes,
  getPropertyCategoryTypes,
  GetBuyersAgentsForThisProperty,
  getAllImageCategoryByProperty,
  getPropertySearchTypes,
  GetAvailableBuyerAgents,
  readAProperty,
} from "../apiCalls/propertyCrud";
import {
  bathRoomsData,
  bedroomsData,
  allowPetsData,
  activeStateData,
} from "./data";
import {
  getCitiesByLocation,
  getZipCodesByCity,
  getAmenities,
} from "../../../../api/generalCrud";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  CircularProgress,
  Select,
  MenuItem,
} from "@material-ui/core";
import getAuthToken from "./../../../../api/getAuthToken";

import { CustomFormField, PrimaryHeading, ButtonBox } from "../../../baseStyle";
import CustomButton from "../../../../components/customButton/index";
import CustomFormControl from "../../../../components/formControl";
import CustomAlert from "../../../../components/customAlert";
import { uploadFiles } from "../../../../api/uploadFiles";
import { filledCrossIcon } from "./../../../../img";
import { PropertyAddContainer } from "./style";
import uploadImg from "../uploadImg.png";
import crossIcon from "../crossIcon.svg";
import SimpleDialog from "./dialog";
import addIcon from "../add.svg";

const AddProperty = ({ BrokerID, TransactionStatusID, EmployeeID }) => {
  const history = useHistory();
  const routeParams = window.location.pathname.split("/");
  const selectedItemId = routeParams[3];
  const viewIteamStatus = routeParams[2];
  console.log(selectedItemId, 'selectedItemId')

  const initialValues = {
    locationID: "",
    cityID: "",
    zipCodeID: "",
    propertyFriendlyName: "",
    description: "",
    seoDescription: "",
    bitlyLink: "",
    ownerID: "",
    address: "",
    maxAllowedGuests: "",
    minimumNightStay: "",
    propertyCategoryTypeID: "",
    assignedEmployeeID: "",
    propertySearchTypeID: "",
    allowPets: "",
    numberOfBathrooms: "",
    // buyersAgent: 1,
    // commissionRate: 1,
    licenseNumber: 1,
    licenseExpirationDate: "01/26/2023",
    damageDeposit: 1,
    cleaningFee: 1,
    adminFee: 1,
    salesAndUseTaxRate: 1,
    conventionAndTourismTaxRate: 1,
    brokerSplitFromOwnerRate: 1,
    arrivalInstructions: "Arrival Insstruction Defalut",
    dailyMinimumPrice: "",
    monthlySuggestedPrice: 1,
    monthlyMinimumPrice: 1,
    mondayMinimumPrice: 1,
    tuesdayMinimumPrice: 1,
    wednesdayMinimumPrice: 1,
    thursdayMinimumPrice: 1,
    fridayMinimumPrice: 1,
    saturdayMinimumPrice: 1,
    sundayMinimumPrice: 1,
    mondaySuggestedPrice: 1,
    tuesdaySuggestedPrice: 1,
    wednesdaySuggestedPrice: 1,
    thursdaySuggestedPrice: 1,
    fridaySuggestedPrice: 1,
    saturdaySuggestedPrice: 1,
    sundaySuggestedPrice: 1,
    phone: "",
    // employeeID: EmployeeID,
    transactionStatusID: 1,
    districtID: "",
    numberOfBedrooms: "5",
    imageCategoryTypeId: "",
    brokerID: BrokerID,
    customRoom: "",
    bedroomsLayout: "",
    minimumNightlyPrice: 3200,
    maximumNightlyPrice: 5200,
    displayWebMinimumNights: false,
    isWebEnabled: false
  };
  const authToken = getAuthToken();
  const [ListData, setListData] = useState(null);
  const [fetchedCities, setfetchedCities] = useState([]);
  const [fetchedOwnder, setfetchedOwnder] = useState([]);
  const { locationSlice } = useSelector((state) => state);
  const [fetchedZipCode, setfetchedZipCode] = useState([]);
  const [propertiesTypes, setpropertiesTypes] = useState([]);
  const [propertySearchTypes, setpropertySearchTypes] = useState([]);
  const [fetchedLocations, setfetchedLocations] = useState([]);
  const [fetchedbuyerRoles, setfetchedbuyerRoles] = useState([]);
  const [fetchedAvalaibleBuyerAgent, setfetchedAvalaibleBuyerAgent] = useState([]);
  const [fetchedAmentities, setfetchedAmentities] = useState([]);
  const [imageUploadLoading, setimageUploadLoading] = useState(false);
  const [propertyDataLoading, setpropertyDataLoading] = useState(true);
  const [submitPropertyLoading, setsubmitPropertyLoading] = useState(false);
  const [fetchedAssignedEmployee, setfetchedAssignedEmployee] = useState([]);
  const [fetchedImagesTypeCategory, setfetchedImagesTypeCategory] = useState(
    []
  );
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);
  const [Images, setImages] = useState([]);
  // const [primaryImage, setprimaryImage] = useState([]);
  // const [primaryImageLoading, setprimaryImageLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [bedRooms, setBedRooms] = useState([]);
  const [villaRooms, setVillaRooms] = useState([]);
  const [bedRoomsName, setBedRoomsName] = useState([]);
  const [selectedAmentities, setselectedAmentities] = useState([]);
  const [addressCoordinates, setaddressCoordinates] = useState({});
  const [villasRoomCopy, setvillasRoomCopy] = useState([])
  const imageConfigurateData = [...bedRooms, ...villaRooms, ...fetchedImagesTypeCategory]



  useEffect(() => {
    if (locationSlice) {
      const locationData = locationSlice.locations?.map((item) => {
        return {
          itemId: item.locationID,
          itemName: item.location,
        };
      });
      setfetchedLocations(locationData);

      const assignedEmployeeData = locationSlice.assignedEmployees?.map(
        (item) => {
          return {
            itemId: item.employeeID,
            itemName: `${item.employeeFirstName} ${item.employeeLastName}`,
          };
        }
      );
      setfetchedAssignedEmployee(assignedEmployeeData);

      const ownersData = locationSlice.owners?.map((item) => {
        return {
          itemId: item.ownerID,
          itemName: `${item.firstName} ${item.lastName}`,
        };
      });
      setfetchedOwnder(ownersData);
    }

    getPropertyCategoryTypes()
      .then((res) => {
        const propertyTypes = res.Data?.map((item) => {
          setpropertyDataLoading(false);
          return {
            itemId: item.propertyCategoryTypeID,
            itemName: item.propertyCategoryType,
          };
        });
        setpropertiesTypes(propertyTypes);
      })
      .catch((err) => {
        console.log(err);
      });

    getPropertySearchTypes()
      .then((res) => {
        const propertySearchTypes = res.Data?.map((item) => {
          return {
            itemId: item.propertySearchTypeID,
            itemName: item.propertySearchType,
          };
        });
        setpropertySearchTypes(propertySearchTypes);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllImageCategoryByProperty(selectedItemId ? selectedItemId : 0, BrokerID)
      .then((res) => {
        const getImagesCategoryTypes = res.Data?.map((item) => {
          return {
            itemId: item.imageTypeID,
            itemName: item.title,
            imageCategoriesByPropertyID: item.imageCategoriesByPropertyID
          };
        });
        setfetchedImagesTypeCategory(getImagesCategoryTypes);
      })
      .catch((err) => {
        console.log(err);
      });

    GetBuyersAgentsForThisProperty()
      .then((res) => {
        const propertyTypes = res.Data?.map((item) => {
          return {
            itemId: item.commissionRatesList[0].commissionRate,
            itemName: item.commissionRatesList[0].commissionRate,
          };
        });
        setfetchedbuyerRoles(propertyTypes);
      })
      .catch((err) => {
        console.log(err);
      });

    GetAvailableBuyerAgents()
      .then((res) => {
        const availableBuyerAgent = res.Data?.map((item) => {
          return {
            itemId: item.employeeID,
            itemName: item.employeeFirstName,
          };
        });
        setfetchedAvalaibleBuyerAgent(availableBuyerAgent);
      })
      .catch((err) => {
        console.log(err);
      });

    getAmenities()
      .then((res) => {
        setfetchedAmentities(res.Data);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllBedTypes()
      .then((res) => {
        const bedTypes = res.Data.map((res) => {
          return {
            title: res.bedType,
            bedTypeID: res.bedTypeID,
            checked: false,
            bedTypeQuantity: 1,
          };
        });
        setBedRoomsName(bedTypes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [locationSlice]);



  useEffect(() => {
    if (location) {
      getCitiesByLocation(location)
        .then((res) => {
          const cetiesData = res.Data?.map((item) => {
            return {
              itemId: item.cityID,
              itemName: item.city,
            };
          });
          setfetchedCities(cetiesData);
        })
        .then((err) => {
          console.log(err);
        });
    }
  }, [location, selectedItemId]);

  useEffect(() => {
    if (city) {
      getZipCodesByCity(city)
        .then((res) => {
          const zipCodes = res.Data?.map((item) => {
            return {
              itemId: item.zipCodeID,
              itemName: item.zipCode,
            };
          });
          setfetchedZipCode(zipCodes);
        })
        .then((err) => {
          console.log(err);
        });
    }
  }, [city]);

  const getAPropertyDetail = useCallback(
    async (selectedItemId) => {
      const propertyDetail = await readAProperty(selectedItemId);
      setListData(propertyDetail.Data);
      setLocation(propertyDetail.Data.locationID);
      setCity(propertyDetail.Data.cityID);

      const myAmentites = propertyDetail.Data.propertyAmenitiesList.map((amenti) => amenti.amenityID)

      setselectedAmentities(myAmentites)


      const bedroomConfig = propertyDetail.Data.bedroomConfigurations.map((room) => {
        return {
          ...room,
          itemName: room.title
        }
      })
      setBedRooms(bedroomConfig);
      // setprimaryImage([
      //   ...primaryImage,
      //   { imageFilePath: propertyDetail.Data.imageFileName },
      // ]);

      const customRoomConfig = propertyDetail.Data.imageCategoriesByPropertyList?.map(
        (room) => {
          return {
            ...room,
            itemName: room.title,
            itemId: room.imageTypeID,
          };
        }
      );
      setVillaRooms(customRoomConfig);
      setImages(propertyDetail.Data.secondaryImagesList)

    },
    []
  );

  useEffect(() => {
    if (selectedItemId) {
      getAPropertyDetail(selectedItemId);
    }
  }, [getAPropertyDetail, selectedItemId]);

  const changeRoute = () => {
    history.push('/property/list')
  }



  const onSubmit = async (values, { resetForm }) => {
    const selectedAmenities = selectedAmentities.toString();



    if (!addressCoordinates || addressCoordinates?.coordinates === '') {
      CustomAlert("Please Enter Address", "warning");

    }
    else if (selectedAmenities === "") {
      CustomAlert("Amenities is required", "warning");
    }
    else if (!Images?.length) {
      CustomAlert("Images are required", "warning");
    }
    else {
      const customRoomData = villaRooms.length ? villaRooms.map((room) => {
        return {
          imageTypeID: room.itemId,
          title: room.itemName,
          description: room.itemName,
        };
      }) : []

      const customBedroomData = bedRooms.length ? bedRooms.map((room) => {
        return {
          title: room.itemName,
          imageTypeID: room.itemId,
          bedTypes: room.bedTypes,
          bedroomConfigurationTypeID: room.bedroomConfigurationTypeID,
          description: room.description,


        }
      }) : []

      const secondaryImagesUpdate = Images.length ? Images.map((img) => {
        return {
          imageCategoriesByPropertyID: img.imageCategoriesByPropertyID,
          imageFilePath: img.imageFilePath,
          imageOrder: img.imageOrder,
          imageTypeID: img.itemId,
          title: img.itemName
        }
      }) : []

      const configurationRoom = [...customBedroomData, ...customRoomData];


      const propertyData = {
        ...values,
        latitude: addressCoordinates.coordinates.lat,
        longitude: addressCoordinates.coordinates.lng,
        address: addressCoordinates.place,
        secondaryImagesList: secondaryImagesUpdate,
        propertyAmenities: selectedAmenities,
        imageCategoriesByPropertyList: configurationRoom,
        imageFileName: Images[0].imageFilePath,
      };


      const updatedPropertyData = {
        ...propertyData,
        propertyID: selectedItemId,
        areThereSecondaryImageUpdates: true
      }


      setsubmitPropertyLoading(true);

      if (viewIteamStatus === "editProperty") {

        try {
          const checkapi = await fetch(`https://woodendoordev.com/api/properties/UpdatePropertyInfo?brokerID=${BrokerID}&employeeID=${EmployeeID}`, {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + authToken
            },
            body: JSON.stringify(updatedPropertyData)
          })
          if (checkapi.status === 200) {
            CustomAlert("Property update successfully.", "success", changeRoute);
            setsubmitPropertyLoading(false);
          }
          else {
            setsubmitPropertyLoading(false);
          }
          console.log('checkapi', checkapi)
        } catch (err) {
          console.log(err);
          setsubmitPropertyLoading(false);
          CustomAlert("Some thing went wrong", "error");
        }








        // updateProperty(EmployeeID, BrokerID, updatedPropertyData)
        //   .then((res) => {
        //     setsubmitPropertyLoading(false);
        //     if (res.Messages[0] === "Property already exists for this Broker.")
        //       return CustomAlert("Property already exists", "warning");
        //     else {
        //       resetForm();
        //       setVillaRooms([]);
        //       setBedRooms([]);
        //       setselectedAmentities([]);
        //       setprimaryImage([]);
        //       setImages([]);
        //       CustomAlert("Property has been updated successfully.", "success");
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     setsubmitPropertyLoading(false);
        //     CustomAlert("Some thing went wrong", "error");
        //   });
      }
      else {


        try {
          const checkapi = await fetch('https://woodendoordev.com/api/properties/CreateProperties?employeeID=1', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + authToken
            },
            body: JSON.stringify(propertyData)
          })
          if (checkapi.status === 200) {
            CustomAlert("New Property was created.", "success", changeRoute);
            setsubmitPropertyLoading(false);
          }
          else {
            setsubmitPropertyLoading(false);
          }
          console.log('checkapi', checkapi)
        } catch (err) {
          console.log(err);
          setsubmitPropertyLoading(false);
          CustomAlert("Some thing went wrong", "error");
        }


        // createProperty(EmployeeID, propertyData )
        //   .then((res) => {
        //     setsubmitPropertyLoading(false);
        //     if (res.Messages[0] === "Property already exists for this Broker.")
        //       return CustomAlert("Property already exists", "warning");
        //     else {
        //       resetForm();
        //       setVillaRooms([]);
        //       setBedRooms([]);
        //       setselectedAmentities([]);
        //       setprimaryImage([]);
        //       setImages([]);
        //       CustomAlert("New Property was created.", "success");
        //     }
        //   })
        //   .catch((err) => {
        // console.log(err);
        // setsubmitPropertyLoading(false);
        // CustomAlert("Some thing went wrong", "error");
        //   });
      }

      
    }
  };




  const locationSelectHandler = (value) => {
    setLocation(value);
  };


  const citySelectHandler = (value) => {
    setCity(value);
  };


  const handleCheckBox = (selectedAmeniti) => {
    const checkAmenti = selectedAmentities.find((amenti) => amenti === selectedAmeniti)
    
    if (checkAmenti === selectedAmeniti ) {
      const filetered = selectedAmentities.filter((sel) => sel !== selectedAmeniti)
      setselectedAmentities(filetered)
    }
    else {

      setselectedAmentities([...selectedAmentities, selectedAmeniti]);
    }
  };


  const removeImagesList = (id) => {
    const removedImage = Images.filter((img) => img.imageOrder !== id);
    setImages(removedImage);
  };


  const navigateHandler = () => {
    history.push(`/property/editProperty/${selectedItemId}`);
  };

  const incrementFieldValue = (name, formik) => {
    formik.setFieldValue(`${name}`, Number(formik.values[name]) + 1);
  };

  const decrementFieldValue = (name, formik) => {
    formik.setFieldValue(`${name}`, Number(formik.values[name]) - 1);
  };

  const handleVillaRooms = (formik) => {
    if (!formik.values.customRoom || !formik.values.imageCategoryTypeId)
      return {};
    setVillaRooms([
      ...villaRooms,
      {
        itemId: formik.values.imageCategoryTypeId,
        itemName: formik.values.customRoom,
      },
    ]);
    formik.setFieldValue('customRoom', '')
    formik.setFieldValue('imageCategoryTypeId', '')
  };

  const removeVillaRooms = (itemName) => {
    if (viewIteamStatus === 'editProperty') {
      setVillaRooms((prevListData) => {
        let updateListData = prevListData.map((item) => {
          if (item.itemName === itemName) {
            return { ...item, transactionStatusID: 2 };
          }
          return item;
        });
        return updateListData
      });


    }
    else {
      const removedRoom = villaRooms.filter((room) => room.itemName !== itemName);
      setVillaRooms(removedRoom);
    }

  };


  const incrBedTypeQuantity = (bedTypeID) => {
    let incrBedTypeQuantity = bedRoomsName.map((item) => {
      if (item.bedTypeID === bedTypeID)
        return { ...item, bedTypeQuantity: item.bedTypeQuantity + 1 };
      return item;
    });
    setBedRoomsName(incrBedTypeQuantity);
  };

  const decrBedTypeQuantity = (bedTypeID) => {
    let decrBedTypeQuantity = bedRoomsName.map((item) => {
      if (item.bedTypeID === bedTypeID) {
        if (item.bedTypeQuantity < 2)
          return { ...item, bedTypeQuantity: item.bedTypeQuantity };
        else return { ...item, bedTypeQuantity: item.bedTypeQuantity - 1 };
      }
      return item;
    });
    setBedRoomsName(decrBedTypeQuantity);
  };

  const selectBedType = (e, bedTypeID) => {
    let checked = bedRoomsName.map((item) => {
      if (item.bedTypeID === bedTypeID)
        return { ...item, checked: e.target.checked };
      return item;
    });
    setBedRoomsName(checked);
  };

  const handleSaveBedType = (formik) => {
    const title = formik.values.bedroomsLayout;

    const bedTypes = bedRoomsName
      .filter((item) => item.checked)
      .map((item) => {
        return {
          bedTypeID: item.bedTypeID,
          bedTypeQuantity: item.bedTypeQuantity,
          title: item.title,
        };
      });

    setBedRooms([
      ...bedRooms,
      {
        itemName: title,
        bedTypes,
        description: title,
        bedroomConfigurationTypeID: 1,
        itemId: 10

      },
    ]);
    formik.setFieldValue('bedroomsLayout', '')
  };

  const removeBedrooms = (title) => {

    const removedRoom = bedRooms.filter((room) => room.itemName !== title);
    setBedRooms(removedRoom);
  };



  const selectBedroomType = (e, imageOrder) => {
    const findObj = imageConfigurateData.find((config) => config.itemId === e.target.value);
    const newUpdation = Images.map((item) => {
      if (imageOrder === item.imageOrder)
        return {
          ...item,
          itemId: findObj.itemId,
          itemName: findObj.itemName,
          imageCategoriesByPropertyID: findObj.imageCategoriesByPropertyID ? findObj.imageCategoriesByPropertyID : null,
        };
      return item;
    });
    setImages(newUpdation);
  };

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const changeDisplayOrder = (ImageList) => {
    return ImageList.map((image, index) => {
      return {
        ...image,
        imageOrder: index + 1,
      }
    });
  }
  const drop = (e) => {
    const copyImageList = [...Images];
    const dragItemContent = copyImageList[dragItem.current];
    copyImageList.splice(dragItem.current, 1);
    copyImageList.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setImages(changeDisplayOrder(copyImageList));
  };

  const styles = {
    width: '100%',
    border: 'none',
    borderBottom: 'none',
    backgroundColor: '#F3F4F8',
    marginTop: '5px'
  }


  return (
    <PropertyAddContainer>
      {propertyDataLoading && !ListData ? (
        <div className={"container"}>
          <div className='container spinner-center spinner spinner-primary spinner-lg mr-15'></div>
        </div>
      ) : (
        <div className='addPropertyContent'>
          <div className='addPropertyContent_heading'>
            {viewIteamStatus === "propertyDetail" ? (
              <div className='addPropertyContent_heading_view'>
                <PrimaryHeading>Property Details</PrimaryHeading>
                <CustomButton
                  text='Edit'
                  width='95px'
                  type='button'
                  click={navigateHandler}
                />
              </div>
            ) : (
              <PrimaryHeading>
                {viewIteamStatus === "editProperty"
                  ? "Edit Property"
                  : "Add Property"}
              </PrimaryHeading>
            )}
          </div>

          <div className='addPropertyContent_form'>
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
                    autoComplete='off'
                    onSubmit={formik.handleSubmit}
                  >
                    <div className='addPropertyContent_form'>
                      <div className='addPropertyContent_form_container'>
                        <CustomFormField>
                          <CustomFormControl
                            type='text'
                            control='select'
                            label='Location*'
                            name='locationID'
                            options={fetchedLocations}
                            placeholder='Choose Location'
                            defaultValue={ListData?.location}
                            onSelect={locationSelectHandler}
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                          <CustomFormControl
                            type='text'
                            name='cityID'
                            label='City*'
                            control='select'
                            placeholder='Choose City'
                            defaultValue={ListData?.city}
                            onSelect={citySelectHandler}
                            options={fetchedCities || []}
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField>

                        <CustomFormField>
                          <CustomFormControl
                            type='text'
                            name='zipCodeID'
                            control='select'
                            label='Zip Code*'
                            placeholder='Enter Zip Code'
                            options={fetchedZipCode || []}
                            defaultValue={ListData?.zipCode}
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                          <CustomFormControl
                            type='text'
                            control='input'
                            name='propertyFriendlyName'
                            label='Property Friendly Name*'
                            placeholder='Enter Property Friendly Name'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField>

                        <div>
                          <CustomFormControl
                            type='text'
                            control='textarea'
                            name='description'
                            label='Property Description*'
                            placeholder='Enter Property Description'
                            disabled={viewIteamStatus === "propertyDetail"}
                            className={
                              formik.errors.propertyDesc &&
                                formik.touched.propertyDesc
                                ? "is-invalid"
                                : "customInput"
                            }
                          />
                        </div>

                        <div>
                          <CustomFormControl
                            type='text'
                            control='textarea'
                            name='seoDescription'
                            label='SEO Description*'
                            placeholder='Enter SEO Description'
                            disabled={viewIteamStatus === "propertyDetail"}
                            className={
                              formik.errors.seoDesc && formik.touched.seoDesc
                                ? "is-invalid"
                                : "customInput"
                            }
                          />
                        </div>

                        <CustomFormField>
                          <CustomFormControl
                            type='text'
                            control='input'
                            name='bitlyLink'
                            label='Bitly Link'
                            placeholder='Enter Link'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                          <CustomFormControl
                            type='text'
                            name='ownerID'
                            label='Owner*'
                            control='select'
                            placeholder='Select Owner'
                            options={fetchedOwnder || []}
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField>

                        <CustomFormField>
                          <div className='addPropertyContent_form_container_googleAddress'>
                            <label>Address</label>
                            <GoogleComponent
                              apiKey={"AIzaSyDDCuH-bD1fKC44XaDmAxi0yUzH_-1Gzb4"}
                              language={"en"}
                              // country={"country:pk"}
                              coordinates={true}
                              locationBoxStyle={"custom-style"}
                              locationListStyle={"custom-style"}
                              onChange={(e) => setaddressCoordinates(e)}

                            />
                          </div>

                          <CustomFormControl
                            type='number'
                            control='input'
                            formik={formik}
                            name='maxAllowedGuests'
                            label='Maximum Allowed Guests*'
                            increment={incrementFieldValue}
                            decrement={decrementFieldValue}
                            placeholder='Select Maximum Allowed Guests'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField>

                        <CustomFormField>
                          <CustomFormControl
                            type='number'
                            control='input'
                            formik={formik}
                            name='minimumNightStay'
                            label='Minimum Night Stay*'
                            increment={incrementFieldValue}
                            decrement={decrementFieldValue}
                            placeholder='Enter Minimum Night Stay'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                          <CustomFormControl
                            type='text'
                            control='select'
                            name='propertyCategoryTypeID'
                            label='Property Category Type*'
                            options={propertiesTypes || []}
                            placeholder='Broker Property Category Type'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField>

                        <CustomFormField>
                          <CustomFormControl
                            type='text'
                            control='select'
                            name='assignedEmployeeID'
                            label='Assigned Employee*'
                            placeholder='Select Assigned Employee'
                            options={fetchedAssignedEmployee || []}
                            disabled={viewIteamStatus === "propertyDetail"}
                          />

                          <CustomFormControl
                            type='number'
                            control='select'
                            name='propertySearchTypeID'
                            label='Property Search Type*'
                            placeholder='Enter Search Type Id'
                            options={propertySearchTypes || []}
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField>

                        <CustomFormField>
                          <CustomFormControl
                            type='text'
                            name='transactionStatusID'
                            label='Active*'
                            control='select'
                            placeholder='Choose Option'
                            defaultValue='1'
                            options={activeStateData || []}
                            disabled={viewIteamStatus === "propertyDetail"}
                          />

                          <CustomFormControl
                            type='text'
                            name='allowPets'
                            control='select'
                            label='Allows Pets*'
                            placeholder='Choose Option'
                            options={allowPetsData || []}
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField>

                        <CustomFormField>
                          <CustomFormControl
                            type='text'
                            control='select'
                            label='Bath Rooms*'
                            name='numberOfBathrooms'
                            options={bathRoomsData || []}
                            placeholder='Select Bath Rooms'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                          <CustomFormControl
                            control='checkbox'
                            formik={formik}
                            name='isWebEnabled'
                            defaultValue={viewIteamStatus === "editProperty" && ListData?.isWebEnabled}
                            label='Web Enabled'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />

                        </CustomFormField>

                        <CustomFormField>
                          <CustomFormControl
                            type='text'
                            control='input'
                            name='customRoom'
                            label='Custom Rooms*'
                            placeholder=''
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                          <div className='addPropertyContent_form_container_roomLayout'>
                            <div className='addPropertyContent_form_container_roomLayout_formControl'>
                              <CustomFormControl
                                type='text'
                                control='select'
                                name='imageCategoryTypeId'
                                label='Custom Room Type'
                                options={fetchedImagesTypeCategory || []}
                                placeholder='Select Image Category Type'
                                disabled={viewIteamStatus === "propertyDetail"}
                              />

                              <div
                                onClick={() => handleVillaRooms(formik)}
                                className='addPropertyContent_form_container_roomLayout_formControl_addBtn'
                              >
                                <img src={addIcon} alt='add-icon' />
                              </div>
                            </div>
                          </div>
                        </CustomFormField>

                        {villaRooms.length !== 0 && (
                          <div className='addPropertyContent_form_container_roomLayout_rooms'>
                            {
                              viewIteamStatus === 'editProperty' ? (
                                <>
                                  {villaRooms?.map((room, index) => {
                                    if (room.transactionStatusID === 0 || !room.hasOwnProperty('transactionStatusID')) {
                                      return (
                                        <div
                                          key={index}
                                          className='addPropertyContent_form_container_roomLayout_rooms_room'
                                        >
                                          <p style={{ margin: "0px" }}>{room.itemName}</p>
                                          <img
                                            onClick={viewIteamStatus === "propertyDetail" ? null : () => removeVillaRooms(room.itemId)}
                                            src={crossIcon}
                                            alt='cross-icon'
                                          />
                                        </div>
                                      )
                                    }
                                  })}
                                </>
                              ) : (
                                <>
                                  {villaRooms?.map((room, index) => (
                                    <div
                                      key={index}
                                      className='addPropertyContent_form_container_roomLayout_rooms_room'
                                    >
                                      <p style={{ margin: "0px" }}>{room.itemName}</p>
                                      <img
                                        onClick={viewIteamStatus === "propertyDetail" ? null : () => removeVillaRooms(room.itemName)}
                                        src={crossIcon}
                                        alt='cross-icon'
                                      />
                                    </div>
                                  ))}
                                </>
                              )
                            }

                          </div>
                        )}

                        <CustomFormField>
                          <div className='addPropertyContent_form_container_roomLayout'>
                            <div className='addPropertyContent_form_container_roomLayout_formControl'>
                              <CustomFormControl
                                type='text'
                                control='input'
                                name='bedroomsLayout'
                                label='Bedrooms Layout*'
                                options={bedroomsData || []}
                                placeholder=''
                                disabled={viewIteamStatus === "propertyDetail"}
                              />

                              <div
                                onClick={viewIteamStatus === "propertyDetail" ? null : () => setOpen(!open)}
                                className='addPropertyContent_form_container_roomLayout_formControl_addBtn'
                              >
                                <img src={addIcon} alt='add-icon' />
                              </div>

                              <SimpleDialog
                                open={open}
                                bedRoomsName={bedRoomsName}
                                selectBedType={selectBedType}
                                onClose={() => setOpen(!open)}
                                setBedRoomsName={setBedRoomsName}
                                incrBedTypeQuantity={incrBedTypeQuantity}
                                decrBedTypeQuantity={decrBedTypeQuantity}
                                handleSaveBedType={() =>
                                  handleSaveBedType(formik)
                                }
                              />
                            </div>
                            {bedRooms.length !== 0 && (
                              <div className='addPropertyContent_form_container_roomLayout_rooms'>
                                {bedRooms?.map(({ itemName, bedTypes }, index) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{ width: "100%" }}
                                      className='addPropertyContent_form_container_roomLayout_rooms_room'
                                    >
                                      <div className='addPropertyContent_form_container_roomLayout_rooms_room_data'>
                                        <p style={{ margin: "0px" }}>{itemName}</p>
                                        <div className='addPropertyContent_form_container_roomLayout_rooms_room_data_selection'>
                                          (
                                          {bedTypes.map(
                                            ({
                                              bedTypeID,
                                              title,
                                              bedTypeQuantity
                                            }) => (
                                              <p
                                                key={bedTypeID}
                                                style={{ margin: "0px" }}
                                              >
                                                {bedTypeQuantity} {title} Bed,
                                              </p>
                                            )
                                          )}
                                          )
                                        </div>
                                      </div>
                                      <img
                                        onClick={viewIteamStatus === "propertyDetail" ? null : () => removeBedrooms(itemName)}
                                        src={crossIcon}
                                        alt='cross-icon'
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                          <div style={{ width: '100%' }}></div>
                        </CustomFormField>

                        {/* <CustomFormField>
                          <CustomFormControl
                            type='text'
                            control='select'
                            name='buyersAgent'
                            label='Buyer’s Agent*'
                            options={fetchedAvalaibleBuyerAgent || []}
                            placeholder='Select Buyer’s Agent*'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />

                          <CustomFormControl
                            type='text'
                            label='Rate %*'
                            control='select'
                            placeholder='Select'
                            name='commissionRate'
                            options={fetchedbuyerRoles || []}
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField> */}

                        {/* <CustomFormField>
                          <CustomFormControl
                            type='text'
                            control='input'
                            name='brokerID'
                            label='Broker ID*'
                            placeholder='Enter Broker ID'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />

                          <CustomFormControl
                            type='text'
                            control='input'
                            name='licenseNumber'
                            label='License Number*'
                            placeholder='Enter License Number'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField> */}

                        {/* <CustomFormField>
                          <CustomFormControl
                            type='text'
                            control='date'
                            placeholder='select Date'
                            name='licenseExpirationDate'
                            label='License Expiration Date'
                            className={
                              formik.errors.startDate &&
                              formik.touched.startDate
                                ? "is-invalid"
                                : "customInput"
                            }
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                          <CustomFormControl
                            type='number'
                            control='input'
                            formik={formik}
                            name='damageDeposit'
                            label='Damage Deposit*'
                            increment={incrementFieldValue}
                            decrement={decrementFieldValue}
                            placeholder='Enter Damage Deposit'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField> */}

                        {/* <CustomFormField>
                          <CustomFormControl
                            type='number'
                            control='input'
                            formik={formik}
                            name='cleaningFee'
                            label='Cleaning Fee*'
                            increment={incrementFieldValue}
                            decrement={decrementFieldValue}
                            placeholder='Enter Cleaning Fee'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                          <CustomFormControl
                            type='number'
                            control='input'
                            name='adminFee'
                            formik={formik}
                            label='Admin Fee*'
                            placeholder='Enter Admin Fee'
                            increment={incrementFieldValue}
                            decrement={decrementFieldValue}
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField> */}

                        <CustomFormField>
                          {/* <CustomFormControl
                            type='number'
                            control='input'
                            formik={formik}
                            name='salesAndUseTaxRate'
                            label='Sales And Use Tax *'
                            placeholder='Enter Sales And Use Tax'
                            increment={incrementFieldValue}
                            decrement={decrementFieldValue}
                            disabled={viewIteamStatus === "propertyDetail"}
                          /> */}
                          <CustomFormControl
                            type='number'
                            control='input'
                            formik={formik}
                            name='dailyMinimumPrice'
                            label='Starting At Price'
                            increment={incrementFieldValue}
                            decrement={decrementFieldValue}
                            placeholder='Enter daily minimum price'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />

                          <CustomFormControl
                            control='checkbox'
                            formik={formik}
                            defaultValue={viewIteamStatus === "editProperty" ? ListData?.minimumNightsBanner : false}
                            name='displayWebMinimumNights'
                            label='Minimum Nights Banner'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />


                          {/* <CustomFormControl
                            type='number'
                            control='input'
                            formik={formik}
                            increment={incrementFieldValue}
                            decrement={decrementFieldValue}
                            name='conventionAndTourismTaxRate'
                            label='Convention Ad Tourism Tax Rate*'
                            disabled={viewIteamStatus === "propertyDetail"}
                            placeholder='Enter Convention Ad Tourism Tax Rate'
                          /> */}
                        </CustomFormField>

                        {/* <CustomFormField>
                          <CustomFormControl
                            type='number'
                            control='input'
                            formik={formik}
                            name='brokerSplitFromOwnerRate'
                            increment={incrementFieldValue}
                            decrement={decrementFieldValue}
                            label='Broker Split From Owner Rate*'
                            disabled={viewIteamStatus === "propertyDetail"}
                            placeholder='Enter Broker Split From Owner Rate'
                          />
                          <CustomFormControl
                            type='text'
                            control='textarea'
                            name='arrivalInstructions'
                            label='Arrival Instructions*'
                            placeholder='Enter Arrival Instructions'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                        </CustomFormField> */}

                        <div className='addPropertyContent_form_container_amenities'>
                          <h1>Amenities</h1>
                          <div className='addPropertyContent_form_container_amenities_form'>
                            {fetchedAmentities?.map((checkBox, index) => {

                              if (viewIteamStatus === 'editProperty' && ListData?.propertyAmenitiesList) {
                                const checkedAmentities = ListData?.propertyAmenitiesList?.some(
                                  (amenti) => amenti.amenity === checkBox.amenity
                                );

                                return (
                                  <FormControlLabel
                                    key={index}
                                    className='controlLabel'
                                    control={
                                      <Checkbox
                                        size='large'
                                        color='secondary'
                                        className='checkbox'
                                        name={checkBox.amenity}
                                        disabled={
                                          viewIteamStatus === "propertyDetail"
                                        }
                                        onChange={(e) =>
                                          handleCheckBox(checkBox.amenityID)
                                        }
                                        defaultChecked={checkedAmentities}
                                      />
                                    }
                                    label={
                                      <span className='checkboxLabel'>
                                        {checkBox.amenity}
                                      </span>
                                    }
                                  />
                                );
                              }
                              else if (viewIteamStatus !== 'editProperty') {
                                return (
                                  <FormControlLabel
                                    key={index}
                                    className='controlLabel'
                                    control={
                                      <Checkbox
                                        size='large'
                                        color='secondary'
                                        className='checkbox'
                                        name={checkBox.amenity}
                                        disabled={
                                          viewIteamStatus === "propertyDetail"
                                        }
                                        onChange={(e) =>
                                          handleCheckBox(checkBox.amenityID)
                                        }
                                      />
                                    }
                                    label={
                                      <span className='checkboxLabel'>
                                        {checkBox.amenity}
                                      </span>
                                    }
                                  />
                                );
                              }

                            })}
                          </div>
                        </div>

                        {/* <div className='addPropertyContent_form_container_uploadFile'>
                          <Typography component='h6'>
                            Upload Primary Image
                          </Typography>
                          <div className='addPropertyContent_form_container_uploadFile_browseImage_shown'>
                            {primaryImage[0]?.imageFilePath ? (
                              <div className='addPropertyContent_form_container_uploadFile_browseImage_shown_imgBox'>
                                <img
                                  className='image'
                                  alt='randomImage'
                                  src={primaryImage[0]?.imageFilePath}
                                />
                                <img
                                  src={filledCrossIcon}
                                  alt='filledCrossIcon'
                                  className='filledCrossIcon'
                                  onClick={viewIteamStatus === "propertyDetail" ? null : () => setprimaryImage([])}
                                />
                              </div>
                            ) : null}
                          </div>
                          {primaryImage[0]?.imageFilePath ? null : (
                            <label
                              htmlFor='primaryfile'
                              className='upload-file'
                            >
                              <TextField
                                id='primaryfile'
                                type='file'
                                style={{ display: "none" }}
                                onChange={(e) => {
                                  let checkType = e.target.files[0].type;
                                  if (
                                    checkType === "image/png" ||
                                    checkType === "image/jpeg" ||
                                    checkType === "image/jpg"
                                  ) {
                                    setprimaryImageLoading(true);
                                    uploadFiles(primaryImage, e.target).then(
                                      (data) => {
                                        setprimaryImageLoading(false);
                                        setprimaryImage(data);
                                      }
                                    );
                                  } else {
                                    alert("please choose corecct file");
                                  }
                                }}
                                disabled={primaryImageLoading}
                              />

                              {primaryImageLoading ? (
                                <CircularProgress size='2rem' />
                              ) : (
                                <img src={uploadImg} alt='upload-img' />
                              )}
                            </label>
                          )}
                        </div> */}

                        <div className='addPropertyContent_form_container_uploadFile'>
                          <Typography component='h6'>
                            Upload Secondary Images*
                          </Typography>
                          <div className='addPropertyContent_form_container_uploadFile_browseImage_shown'>
                            {Images?.map((item, index) => {
                              return (
                                <div
                                  key={item.imageOrder}
                                  className='addPropertyContent_form_container_uploadFile_browseImage_shown_imgBox'
                                  onDragStart={(e) => dragStart(e, index)}
                                  onDragEnter={(e) => dragEnter(e, index)}
                                  onDragEnd={drop}
                                  draggable
                                >
                                  <img
                                    className='image'
                                    alt='randomImage'
                                    src={item.imageFilePath}
                                  />
                                  <img
                                    src={filledCrossIcon}
                                    alt='filledCrossIcon'
                                    className='filledCrossIcon'
                                    onClick={viewIteamStatus === "propertyDetail" ? null : () => removeImagesList(item.imageOrder)}
                                  />
                                  {/* <select
                                  onChange={(e) =>
                                    selectBedroomType(e, imageOrder)
                                  }
                                  value={title}
                                >
                                  <option value=''>
                                    Select Type
                                  </option>
                                  {[
                                    ...bedRooms,
                                    ...villaRooms,
                                    ...fetchedImagesTypeCategory,
                                  ]?.map((itemObj) => {
                                    return (
                                      <option
                                        key={itemObj.itemId}
                                        id={itemObj.itemId}
                                        value={JSON.stringify(itemObj)}
                                      >
                                        {itemObj.itemName}
                                      </option>
                                    );
                                  })}
                                </select> */}
                                  <Select
                                    onChange={(e) =>
                                      selectBedroomType(e, item.imageOrder)
                                    }
                                    style={styles}
                                    // defaultValue={item.imageTypeID}
                                    disabled={viewIteamStatus === "propertyDetail"}
                                  >
                                    {imageConfigurateData?.map((itemObj) => {
                                      return (

                                        <MenuItem key={itemObj.itemId} value={itemObj.itemId}>   {itemObj.itemName}</MenuItem>

                                      );
                                    })}

                                  </Select>
                                </div>
                              )
                            })}
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

                        {viewIteamStatus === "propertyDetail" ? null : (
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
                              disabled={submitPropertyLoading}
                              text={
                                viewIteamStatus === "editProperty"
                                  ? "Update Property"
                                  : "Create Property"
                              }
                            />
                          </ButtonBox>
                        )}
                      </div>

                      {/* <div className='addPropertyContent_form_detail'>
                        <h1>Pricing Grid </h1>
                        <div className='addPropertyContent_form_detail_table'>
                          <div className='addPropertyContent_form_detail_table_column'>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <p>Type</p>
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <p>Mon</p>
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <p>Tue</p>
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <p>Wed</p>
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <p>Thu</p>
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <p>Fri</p>
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <p>Sat</p>
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <p>Sun</p>
                            </div>
                          </div>

                          <div className='addPropertyContent_form_detail_table_column'>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <p>Min Price</p>
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                minLength='0'
                                placeholder='0'
                                name='mondayMinimumPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "mondayMinimumPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='tuesdayMinimumPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "tuesdayMinimumPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='wednesdayMinimumPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "wednesdayMinimumPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='thursdayMinimumPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "thursdayMinimumPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='fridayMinimumPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "fridayMinimumPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='saturdayMinimumPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "saturdayMinimumPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='sundayMinimumPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "sundayMinimumPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>

                          <div className='addPropertyContent_form_detail_table_column'>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <p>Max Price</p>
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='mondaySuggestedPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "mondaySuggestedPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='tuesdaySuggestedPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "tuesdaySuggestedPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='wednesdaySuggestedPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "wednesdaySuggestedPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='thursdaySuggestedPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "thursdaySuggestedPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='fridaySuggestedPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "fridaySuggestedPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='saturdaySuggestedPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "saturdaySuggestedPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className='addPropertyContent_form_detail_table_column_row'>
                              <input
                                required
                                placeholder='0'
                                name='sundaySuggestedPrice'
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "sundaySuggestedPrice",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className='addPropertyContent_form_detail_pricing'>
                          <CustomFormControl
                            type='number'
                            control='input'
                            formik={formik}
                            name='monthlyMinimumPrice'
                            label='Monthly Minimum Price*'
                            increment={incrementFieldValue}
                            decrement={decrementFieldValue}
                            placeholder='Enter monthly minimum price'
                            disabled={viewIteamStimageCategoriesByPropertyIDatus === "propertyDetail"}
                          />
                          <CustomFormControl
                            type='number'
                            control='input'
                            formik={formik}
                            name='monthlySuggestedPrice'
                            label='Monthly Suggested Price*'
                            increment={incrementFieldValue}
                            decrement={decrementFieldValue}
                            placeholder='Enter monthly suggested price'
                            disabled={viewIteamStatus === "propertyDetail"}
                          />
                     
                        </div>
                      </div> */}
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </PropertyAddContainer>
  );
};

export default AddProperty;

const validationSchema = Yup.object({
  locationID: Yup.string().required("Location is required!"),
  cityID: Yup.string().required("City is required!"),
  zipCodeID: Yup.string().required("Zip Code is required!"),
  propertyFriendlyName: Yup.string().required("Property name is required!"),
  description: Yup.string().required("Description is required!"),
  seoDescription: Yup.string().required("SEO description is required!"),
  bitlyLink: Yup.string().required("Bitly link is required!"),
  ownerID: Yup.string().required("Owner is required!"),

  maxAllowedGuests: Yup.string().required("Max allowed guest is required!"),
  minimumNightStay: Yup.string().required("Minimum night stay is required!"),
  propertyCategoryTypeID: Yup.string().required(
    "Property category type is required!"
  ),
  assignedEmployeeID: Yup.string().required("Assigned employee is required!"),
  propertySearchTypeID: Yup.string().required(
    "Property search type is required!"
  ),
  allowPets: Yup.string().required("Allow pets is required!"),
  numberOfBathrooms: Yup.string().required("No of bathroom is required!"),
  // buyersAgent: Yup.string().required("Buyer’s agent rate is required!"),
  // commissionRate: Yup.string().required("Comission rate is required!"),
  licenseNumber: Yup.string().required("License number is required!"),
  licenseExpirationDate: Yup.string().required(
    "License expiration date is required!"
  ),
  damageDeposit: Yup.string().required("Damage deposite is required!"),
  cleaningFee: Yup.string().required("Cleaning fee is required!"),
  adminFee: Yup.string().required("Admin fee is required!"),
  // salesAndUseTaxRate: Yup.string().required(
  //   "Sales and user tax rate is required!"
  // ),
  conventionAndTourismTaxRate: Yup.string().required(
    "Convertion and tourism tax rate is required!"
  ),
  // brokerSplitFromOwnerRate: Yup.string().required(
  //   "Broker split from owner rate is required!"
  // ),
  arrivalInstructions: Yup.string().required(
    "Arrival instruction is required!"
  ),
  monthlyMinimumPrice: Yup.string().required(
    "Monthly minimum price is required!"
  ),
  monthlySuggestedPrice: Yup.string().required(
    "Monthly suggested price is required!"
  )});
