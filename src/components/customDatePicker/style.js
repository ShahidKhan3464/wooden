import styled from "styled-components";
import { customDatepickerIcon } from '../../img'
export const CustomDatePickerContainer = styled.div`
  width: 100%;
  height: 108px;
  margin-top: 15px;

  label {
    color: #121212;
    font-size: 16px;
    font-weight: 600;
    line-height: 130%;
    font-style: normal;
    margin-bottom: 16px;
    font-family: Manrope;
    text-transform: capitalize;
  }

  .customInputDatepicker {
    display: block;
    border-radius: 4px;
    background: #F3F4F8;
    .react-datepicker-wrapper{
      width: 100%;
    }

    .react-datepicker__input-container {
      padding: 0 16px;
      @media screen and (max-width: 520px) {
        padding: 0 8px;
      } 
    }

    input {
      font-family: Manrope;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #737373;
      background-color: transparent;
      background-image: url(${customDatepickerIcon});
      background-repeat: no-repeat;
      background-position: right;
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 100%;
      border: none;
      outline: none;
      min-height: 50px;
    }
  }
`;
