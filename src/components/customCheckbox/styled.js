import styled from "styled-components";

export const CustomCheckboxStyle = styled.div`
  width: 100%;
  height: 108px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  label {
    color: #121212;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    margin-bottom: 16px;
    font-family: Manrope;
  }

  input {
    width: 20px;
    height: 20px;
    padding: 15px;

    :checked{
    color: blue;
background-color: blue;
    }

    > span {
      border: none;
      background: none !important;
    }
  }
`;
