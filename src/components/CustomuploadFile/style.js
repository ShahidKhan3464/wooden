import { makeStyles } from "@material-ui/core";
import styled from "styled-components";

export const CustomImageUploadContaienr = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;

  .customImageUpload {
    &_img {
      position: relative;
      &_filledCrossIcon {
        position: absolute;
        width: 27px !important;
        height: 27px !important;
        top: -10px;
        cursor: pointer;
        right: -10px;
      }
      img {
        width: 89px;
        height: 80px;
        border-radius: 7px;
      }
    }
  }
`;

export const useStyles = makeStyles({
  parentBox: {
    padding: "0 32px",
  },
  childBox: {
    gap: "24px",
    display: "flex",
    marginTop: "40px",
  },
  rightBox: {
    width: "100%",
    height: "650px",
    maxWidth: "280px",
    background: "#EEF0F8",
  },
  title: {
    fontFamily: "Manrope",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "32px",
    lineHeight: "44px",
    color: "#121212",
    letterSpacing: "0.02em",
    "@media (max-width: 520px)": {
      fontSize: "16px",
    },
  },
  fileBox: {
    gap: "16px",
    height: "311px",
    display: "flex",
    borderRadius: "4px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    border: "2px dashed #121212",
  },
  imgBox: {
    width: "75px",
    height: "60px",
  },
  text: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "15px",
    lineHeight: "25px",
    color: "#000000",
  },
  fileUploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "150px",
    height: "50px",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#FFFFFF",
    borderRadius: "10px",
    background: "#5C58A5",
    border: "2px solid #5C58A5",
    "&:hover": {
      background: "#706bbf",
    },
  },
  form: {
    width: "100%",
    maxWidth: "650px",
    background: "#EEF0F8",
  },
  innerBox: {
    gap: "56px",
    display: "flex",
    marginBottom: "24px",
  },
  label: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#121212",
    marginBottom: "16px",
  },
  formControl: {
    minWidth: 250,
    borderRadius: "5px",
    background: "#F3F4F8",
  },
  textArea: {
    width: "100%",
    paddingTop: "15px",
    borderRadius: "5px",
    paddingLeft: "15px",
    background: "#F3F4F8",
  },
  placeholder: {
    fontFamily: "Manrope",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "16px",
    color: "#4A4A4A",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    padding: "15px",
    color: "#5C58A5",
  },
  controlLabel: {
    width: "25%",
    marginLeft: "0px",
    marginRight: "0px",
  },
  checkboxLabel: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#000000",
  },
  bottomBtns: {
    gap: "40px",
    display: "flex",
    padding: "32px 24px",
    borderTop: "1px solid #DADADA",
  },
  createBtn: {
    width: "200px",
    height: "50px",
    borderRadius: "10px",
    background: "#5C58A5",
    fontFamily: "Manrope",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "19px",
    letterSpacing: "0.02em",
    color: "#FFFFFF",
    "&:hover": {
      background: "#706bbf",
    },
  },
  cancelBtn: {
    width: "130px",
    height: "50px",
    borderRadius: "10px",
    background: "#F5F5F5",
    fontFamily: "Manrope",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "19px",
    letterSpacing: "0.02em",
    color: "#000000",
    // '&:hover': {
    //     background: '#706bbf',
    // },
  },
});
