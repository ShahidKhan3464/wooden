import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import { uploadFiles } from "./../../api/uploadFiles";
import { filledCrossIcon, uploadfileIcon } from "./../../img";
import { useStyles, CustomImageUploadContaienr } from "./style";

const Index = ({ setbrowsedImages, browsedImages, title }) => {
  const classes = useStyles();

  const [imageUploadLoading, setimageUploadLoading] = useState(false);
  const [Images, setImages] = useState([]);


  useEffect(() => {
    setbrowsedImages(Images)
  }, [Images, setbrowsedImages])


  useEffect(() => {
    if (browsedImages?.length) {
      setImages(browsedImages)
    }
  }, [browsedImages])


  const imageRemoveHandler = (imageOrder) => {
    const removedImage = Images.filter((img) => img.imageOrder !== imageOrder);
    setImages(removedImage);
  };

  return (
    <div>
      <Box py={2}>
        <Typography component='h6' className={classes.label}>
          {title ? title : 'Upload Images*'}
        </Typography>
        <Box className={classes.fileBox}>
          <Box className={classes.imgBox}>
            <Box
              component='img'
              src={uploadfileIcon}
              alt='file-icon'
              className={classes.img}
            />
          </Box>
          <Typography component='p' className={classes.text}>
            Drag and drop files to upload
          </Typography>
          <Typography component='p' className={classes.text}>
            OR
          </Typography>
          <label htmlFor='file' className={classes.fileUploadBtn}>
            <input
              disabled={imageUploadLoading}
              inputProps={{ multiple: true }}
              id='file'
              type='file'
              accept='image/*'
              style={{ display: "none" }}
              onChange={(e) => {
                let checkType = e.target.files[0].type
                if (checkType === 'image/png' || checkType === 'image/jpeg' || checkType === 'image/jpg') {
                  setimageUploadLoading(true);
                  uploadFiles(Images, e.target).then((data) => {
                    setimageUploadLoading(false);
                    setImages(data);
                    console.warn(data, 'data check');
                  });
                }
                else {
                  alert('please chose corecct file')
                }

              }}
            />
            {imageUploadLoading ? "Loading" : "Browse"}
          </label>
        </Box>
      </Box>

      <CustomImageUploadContaienr>
        {Images?.map((img, i) => (
          <div key={i} className='customImageUpload_img'>
            <img
              onClick={() => imageRemoveHandler(img.imageOrder)}
              className='customImageUpload_img_filledCrossIcon'
              src={filledCrossIcon}
              alt='filledCrossIcon'
            />
            <img src={img.imageFilePath} alt='randomImage' />
          </div>
        ))}
      </CustomImageUploadContaienr>
    </div>
  );
};

export default Index;
