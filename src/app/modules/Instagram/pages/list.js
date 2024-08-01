import React, { useState, useEffect, useRef } from "react";
import PropertiesTable from "./InstagramTable";
import { updateInstagram, getAnInstagram, createInstagram } from "../apiCalls/intagramCrud";
import TableSearchHandling from "../../../../components/tableSearchHandling";
import CustomButton from "../../../../components/customButton/index";
import { uploadFiles } from "./../../../../api/uploadFiles";

import { filledCrossIcon } from "./../../../../img";
import { useHistory } from "react-router-dom";
import uploadImg from "../uploadImg.png";
import { PropertyAddContainer } from "./style";

import CustomAlert from "../../../../components/customAlert";

import {
  Box, makeStyles, ImageList, ImageListItem, CircularProgress, TextField
} from "@material-ui/core";
import { ButtonBox, PrimaryHeading } from "../../../baseStyle";

const List = ({ BrokerID, EmployeeID, TransactionStatusID }) => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [ListData, setListData] = useState(null);
  const [uploadedImage, setUploadedImage] = useState([]);

  const [searchInputValue, setsearchInputValue] = useState("");
  const [imageUploadLoading, setimageUploadLoading] = useState(false);

  const [searchSelectedValue, setsearchSelectedValue] = useState(
    "propertyFriendlyName"
  );

  const [
    PropertyTransactionStatusID,
  ] = useState(TransactionStatusID);

  // const searchInputHandler = (value) => {
  //   setsearchInputValue(value.trim());
  // };

  // const searchSelctionHanlder = (value) => {
  //   if (value === "name") {
  //     setsearchSelectedValue("propertyFriendlyName");
  //   } else if (value === "city") {
  //     setsearchSelectedValue("city");
  //   } else if (value === "location") {
  //     setsearchSelectedValue("location");
  //   }
  // };

  // const instaramDeleteHandler = (value) => {
  //   updateInstagram(EmployeeID, value)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const searchedTest =
  //   searchInputValue === ""
  //     ? ListData
  //     : ListData?.filter((c) =>
  //       c[searchSelectedValue]
  //         .toLowerCase()
  //         .includes(searchInputValue?.toLowerCase())
  //     );

  // const sortingHadler = (order) => {
  //   if (order === "asc") {
  //     const sorted = ListData.sort((a, b) =>
  //       a.propertyFriendlyName.toLowerCase() >
  //         b.propertyFriendlyName.toLowerCase()
  //         ? 1
  //         : -1
  //     );
  //     setListData([...sorted]);
  //   } else if (order === "dsc") {
  //     const sorted = ListData.sort((a, b) =>
  //       a.propertyFriendlyName.toLowerCase() <
  //         b.propertyFriendlyName.toLowerCase()
  //         ? 1
  //         : -1
  //     );
  //     setListData([...sorted]);
  //   }
  // };

  const navigateHandler = () => {
    history.push("/instagram/addnewinstagram");
  };

  useEffect(() => {
    getAnInstagram(EmployeeID, BrokerID)
      .then((data) => {
        // console.log(typeof data.Data);
        setListData(data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [BrokerID, EmployeeID]);

  useEffect(() => {
    console.log(typeof ListData, '->', ListData);
  }, [ListData]);

  const removeImage = (id) => {
    console.log(id);
    const newList = ListData?.filter(item => item.instagramID !== id)
    setListData(newList);
  }

  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML, position);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML, position);
  };

  const drop = (e) => {
    const copyListItems = [...ListData];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setListData(copyListItems);
  };
  const uploadImageHandler = (e) => {
    let checkType = e.target.files[0].type;
    if (
      checkType === "image/png" ||
      checkType === "image/jpeg" ||
      checkType === "image/jpg"
    ) {
      setimageUploadLoading(true);
      uploadFiles(ListData, e.target).then((data) => {
        let newUploadedImages = []
        console.log('=> data', data);
        const newData = data.map(item => {
          if (!item.Image) {
            newUploadedImages.push(item);
            return {
              Image: item.imageFilePath,
              displayOrder: item.imageOrder,
              instagramID: item.imageOrder,
            };
          }
          return item;
        });
        setUploadedImage(newUploadedImages)
        setimageUploadLoading(false);
        setListData(newData);
        console.warn(newData, 'data check');
      });
    } else {
      alert("please chose corecct file");
    }
  }
  const submitImagesHandler = () => {
    console.log('Submit Image:\n', uploadedImage);
    if (uploadedImage.length > 0) {
      uploadedImage.forEach((image, index) => {
        const data = {
          Image: image?.imageFilePath,
          brokerID: BrokerID,
          transactionStatusID: TransactionStatusID,
          transactionStatusEmployeeID: 1,
          displayOrder: (ListData.length - uploadedImage.length) + (index + 1),
          instagramTypeID: 1,
          entityID: 161,
        };
        createInstagram(EmployeeID, data)
          .then((res) => {
            CustomAlert("Instagram created successfully", "success");
          })
          .catch((err) => {
            CustomAlert("Some thing went wrong", "error");
          });
      });

    } else {
      CustomAlert("Instagram image are required", "warning");
    }
  }

  return (
    <>
      {/* <Box display='flex' justifyContent='space-between'>
        <TableSearchHandling
          searchInputHandler={searchInputHandler}
          searchSelctionHanlder={searchSelctionHanlder}
          sortingHadler={sortingHadler}
        />
        <CustomButton
          click={navigateHandler}
          type='button'
          text='Create Instagram'
          radius='4px'
          color='white'
          bgColor='#5C58A5'
          width='178px'
          height='44px'
          fontSize='14px'
        />
      </Box> */}

      {/* <PropertiesTable
          instaramDeleteHandler={instaramDeleteHandler}
          data={ListData}
        /> */}
      {/* {ListData && <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {Object.keys(ListData).map((key) => {
            const item = ListData[key];
            return (
              <ImageListItem key={item.Image}>
                <img
                  src={`${item.Image}?w=100&h=100&fit=crop&auto=format`}
                  srcSet={`${item.Image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.instagramType}
                  loading="lazy"
                />
              </ImageListItem>
            );
          })}
        </ImageList>} */}
      <PropertyAddContainer>
        <div className='addPropertyContent'>
          <div className='addPropertyContent_heading'>
            <PrimaryHeading>
              Upload Images
            </PrimaryHeading>
          </div>
          <div className='addPropertyContent_form'>
            <div className='addPropertyContent_form_container'>
              <div className="addPropertyContent_form_container_uploadFile">
                <div className='addPropertyContent_form_container_uploadFile_browseImage_shown'
                  style={{ display: 'flex flex-wrap' }}
                >
                  {/* {ListData && Object.keys(ListData).map((key) => { */}
                  {/* const item = ListData[key]; */}
                  {ListData && ListData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className='addPropertyContent_form_container_uploadFile_browseImage_shown_imgBox'
                        onDragStart={(e) => dragStart(e, index)}
                        onDragEnter={(e) => dragEnter(e, index)}
                        onDragEnd={drop}
                        draggable
                      >
                        <img
                          className='image'
                          alt='randomImage'
                          src={item.Image}
                          style={{ width: '100px', height: '100px' }}
                        />
                        <img
                          src={filledCrossIcon}
                          alt='filledCrossIcon'
                          className='filledCrossIcon'
                          onClick={() => removeImage(item.instagramID)}
                        />

                      </div>
                    );
                  })}

                </div>
                <label htmlFor='file' className='upload-file'>
                  <TextField
                    id='file'
                    type='file'
                    style={{ display: "none" }}
                    inputProps={{ multiple: true }}
                    onChange={uploadImageHandler}
                    disabled={imageUploadLoading}
                  />

                  {imageUploadLoading ? (
                    <CircularProgress size='2rem' />
                  ) : (
                    <img src={uploadImg} alt='upload-img' />
                  )}
                </label>
              </div>
              <div className="">
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
                    // disabled={submitPropertyLoading}
                    text='Proceed & Upload Images'
                    style={{ minWidth: 'fit-content' }}
                    click={submitImagesHandler}
                  />
                </ButtonBox>
              </div>
            </div>
          </div>
        </div>
      </PropertyAddContainer>
    </>

  );
};

export default List;

const useStyles = makeStyles(() => ({
  bodyCellImage: {
    width: "119px",
    height: "88px",
    objectFit: "cover",
  },
  indicator: {
    // backgroundColor: 'tranparent'
    color: "#5C58A5",
  },
  indicatorBorder: {
    background: "#5C58A5",
  },
  bgWhite: {
    background: 'white',
  }
}));
