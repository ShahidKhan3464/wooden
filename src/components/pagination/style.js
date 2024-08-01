import styled from "styled-components";

export const PaginationContainer = styled.div`
    display: flex;
    padding: 40px 15px;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 520px) {
        gap: 15px;
        flex-wrap: wrap;
        padding: 20px 10px;
        justify-content: center;
    }
    
    p {
        color: #939393;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        font-style: normal;
        margin-bottom: 0px;
    }

    select {
        padding: 3px;
        margin: 0 6px;
        outline: none;
        border-radius: 5px;
        border: 1px solid #939393;
        color: rgba(0, 0, 0, 0.7);
    }
    
    .paginationRightContent {
        display: flex;
        align-items: center;
        @media screen and (max-width: 520px) {
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
        }
    }
`