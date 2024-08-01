import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { getAnInstagram, updateInstagram } from "../apiCalls/intagramCrud";

import CustomuploadFile from "../../../../components/CustomuploadFile";
import CustomButton from "../../../../components/customButton/index";
import { createInstagram } from "../apiCalls/intagramCrud";
import CustomAlert from "../../../../components/customAlert";

import { InstagramCreateContainer } from "./style";

const CreateInstagram = ({ EmployeeID, BrokerID, TransactionStatusID }) => {
  const history = useHistory();
  const routeParams = window.location.pathname.split("/");
  const selectedinstagramId = routeParams[3];
  const instagramState = routeParams[2];

  const [browsedImages, setbrowsedImages] = useState([]);

  useEffect(() => {
    getAnInstagram(EmployeeID, BrokerID)
      .then((res) => {
        const filterData = res.Data.find(
          (ele) => ele.instagramID == selectedinstagramId
        );
        setbrowsedImages([
          ...browsedImages,
          { imageFilePath: filterData.Image, imageOrder: Math.random(9) },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changePath = () => {
    history.push("/instagram/list");
  };
  const navigateHandler = () => {
    history.push(`/instagram/editinstagram/${selectedinstagramId}`);
  };
  const submitInstagramHandler = () => {
    const data = {
      Image: browsedImages[0]?.imageFilePath,
      brokerID: BrokerID,
      transactionStatusID: TransactionStatusID,
      transactionStatusEmployeeID: 1,
      displayOrder: 1,
      instagramTypeID: 1,
      entityID: 161,
    };
    const updateData = {
      instagramID: selectedinstagramId,
      Image: browsedImages[0]?.imageFilePath,
      brokerID: BrokerID,
      transactionStatusID: TransactionStatusID,
      transactionStatusEmployeeID: 1,
      displayOrder: 1,
      instagramTypeID: 1,
      entityID: 161,
    };
    if (!data.Image) {
      CustomAlert("Instagram image are required", "warning");
    } else {
      if (instagramState === "editinstagram") {
        updateInstagram(EmployeeID, updateData)
          .then((res) => {
            CustomAlert(
              "Instagram update Successfully successfully",
              "success",
              changePath
            );
          })
          .catch((err) => {
            CustomAlert("Some thing went wrong", "error");
          });
      } else {
        createInstagram(EmployeeID, data)
          .then((res) => {
            CustomAlert(
              "Instagram created successfully",
              "success",
              changePath
            );
          })
          .catch((err) => {
            CustomAlert("Some thing went wrong", "error");
          });
      }
    }
  };

  return (
    <InstagramCreateContainer>
      <div className='createYacthContent_heading'>
        {instagramState === "viewinstagramdetail" ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Instaram Details</h1>
            <CustomButton
              click={navigateHandler}
              type='button'
              text='Edit'
              radius='10px'
              color='white'
              bgColor='#5C58A5'
              width='95px'
              height='51px'
              fontSize='14px'
            />
          </Box>
        ) : (
          <h1>
            {" "}
            {instagramState === "editinstagram"
              ? "Edit Instagram"
              : "Create Instaram"}{" "}
          </h1>
        )}
      </div>

      <Box my={3}>
        <CustomuploadFile
          browsedImages={browsedImages}
          setbrowsedImages={setbrowsedImages}
        />
      </Box>
      {instagramState === "viewinstagramdetail" ? null : (
        <CustomButton
          click={submitInstagramHandler}
          type='button'
          text='Submit'
          radius='10px'
          color='white'
          bgColor='#5C58A5'
          width='130px'
          height='51px'
          fontSize='16px'
        />
      )}
    </InstagramCreateContainer>
  );
};

export default CreateInstagram;
