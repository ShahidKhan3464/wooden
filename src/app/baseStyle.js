import styled from "styled-components";
import { makeStyles } from '@material-ui/core';

export const PrimaryHeading = styled.h1`
  color: #121212;
  font-size: 32px;
  font-weight: 700;
  line-height: 44px;
  font-style: normal;
  font-family: Manrope;
  letter-spacing: 0.02em;
  @media screen and (max-width: 520px) {
    font-size: 24px;
  } 
`;

export const CustomFormField = styled.div`
  gap: 56px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 520px) {
    gap: 0px;
    flex-direction: column;
  } 
`

export const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1280px) {
    gap: 20px;
  } 
  @media screen and (max-width: 520px) {
    gap: 10px;
    flex-direction: column;
  } 
`

export const ButtonBox = styled.div`
  gap: 40px;
  display: flex;
  margin-top: 30px;
  padding-top: 30px;
  align-items: center;
  border-top: 1px solid #DADADA;
`

export const UploadedImages = styled.div`
  margin: 16px 0px;

  h6 {
    color: #121212;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px; 
    font-style: normal;
    font-family: Manrope;      
  }

  .images {
    gap: 16px;
    display: flex;
    margin-top: 16px;
  }
`

export const tableContent = {
  fontWeight: 400,
  fontSize: '16px',
  color: '#121212',
  lineHeight: '24px',
  fontStyle: 'normal',
  fontFamily: 'Manrope',
}

export const lastColumnsContent = {
  fontWeight: 400,
  fontSize: '16px',
  color: '#737373',
  lineHeight: '24px',
  fontStyle: 'normal',
  fontFamily: 'Manrope',
}

export const useStyles = makeStyles(theme => ({
  tableRow: {
    "&:hover": { backgroundColor: "#E5E5E5", },
  },
}));