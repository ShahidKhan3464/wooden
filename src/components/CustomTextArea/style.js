import styled from "styled-components";

export const CustomTextAreaContainer = styled.div`
    // height: 108px;
    margin-bottom: 15px;
    width: 100%;

    label{
        text-transform: capitalize;
        color: #121212;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 130%;
        margin-bottom: 16px;
        font-family: Manrope;
    }
    .is-invalid{
        background: #F3F4F8;
        border-radius: 4px;
        width: 100%;
        border: none;
        padding: 15px;
        outline: none;
        font-size: 14px;
        width: 100%;
        min-height: 200px;
    }
    .customInput{
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
        padding: 15px;
        outline: none;
        width: 100%;
        /* min-height: 200px; */
        @media screen and (max-width: 520px) {
            min-height: 100px;
        } 
    }
`