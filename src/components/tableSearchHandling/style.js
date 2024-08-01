import styled from 'styled-components';
import downArrow from '../../img/downArrow.png'

export const TableSearchHandlingContainer = styled.div`
    gap: 24px;
    width: 100%;
    display: flex;
    max-width: 766px;
    align-items: center;
    @media screen and (max-width: 520px) {
        flex-direction: column;
    }    

    .groupTextField {
        width: 100%;
        display: grid;
        border-radius: 8px;
        background: #FFFFFF;
        border: 1px solid #5C58A5;
        grid-template-columns: ${props => props.featured ? '1fr' : '1fr 150px'} ;
        @media screen and (max-width: 520px) {
            grid-template-columns: 1fr 100px;
        } 

        &_input {
            display: flex;
            align-items: center;
            img {
                margin: 0 0 0 15px;
            }

            input {
                font-family: Manrope;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
                width: 100%;
                border: none;
                outline: none;
                box-shadow: none;
                margin-left: 10px;
                height: 100%;
                border-right: 1px solid #5C58A5;
                padding: ${props => props.featured ? '16px 0' : '0'} ;
                ::placeholder {
                    font-family: Manrope;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 24px;
                    color: #737373;
                }
            }
        }

        &_select {
            select {
                font-family: Manrope;
                padding: 15px;
                color: #121212;
                border: none;
                outline: none;
                box-shadow: none;
                width: 95%;
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
                appearance: none;
                background-color: transparent;
                background-image: url(${downArrow});
                background-repeat: no-repeat;
                background-position: 95% 50%;
            
                @media screen and (max-width: 520px) {
                    padding: 15px 0px;
                } 
            }
        }
    }

    .textFieldSortSelection {
        background: #FFFFFF;
        select {
            font-family: Manrope;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;      
            padding: 15px 30px 15px 15px;
            color: #121212;
            border: none;
            outline: none;
            box-shadow: none;
            border: 1px solid #5C58A5;
            border-radius: 8px;
            appearance: none;
            background-color: transparent;
            background-image: url(${downArrow});
            background-repeat: no-repeat;
            background-position: 95% 50%;
        }
    }
`