import styled from "styled-components";

export const CustomInputContaienr = styled.div`
  width: 100%;
  height: 108px;
  margin-top: 15px;
  position: relative;

  label {
    color: #121212;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    margin-bottom: 16px;
    font-family: Manrope;
  }

  input{
    font-family: Manrope;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #737373;
    background: #F3F4F8;
    border-radius: 4px;
    width: 100%;
    border: none;
    padding: 16px;
    outline: none;
    width: 100%;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
  }

`;


export const NumberIcon = styled.div`
  top: 45px;
  right: 21px;
  display: flex;
  position: absolute;
  flex-direction: column;

  button {
    width: 14px;
    height: 14px;
    border: none;
    outline: none;
    background: transparent;
    @media screen and (max-width: 520px) {
      width: 12px;
      height: 12px;
    } 

    svg {
      width: 14px;
      height: 14px;
      
      @media screen and (max-width: 520px) {
        width: 12px;
        height: 12px;
      } 
    }
  }
`