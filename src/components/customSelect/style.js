import styled from "styled-components";
import { selectIcon } from '../../img'


export const CustomSelectContainer = styled.div`
 width: 100%;
 height: 108px;
 margin-top: 15px;

  label {
    text-transform: capitalize;
    color: #121212;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    margin-bottom: 16px;
    font-family: Manrope;
  }
  
  .custom-select-inner{
    display: block;
    background: #F3F4F8;
    border-radius: 4px;
    padding: 0 16px;
  }
  
  select{
    font-family: Manrope;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #737373;
    background-color: transparent;
    background-image: url(${selectIcon});
    background-repeat: no-repeat;
    background-position: right;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    border-radius: 4px;
    width: 100%;
    min-height: 50px;
    outline: none;    
  }
`;
