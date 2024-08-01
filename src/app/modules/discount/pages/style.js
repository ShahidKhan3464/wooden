import styled from "styled-components";

export const DiscountListContainer = styled.div`
    padding: 32px;
    @media screen and (max-width: 520px) {
        padding: 16px;
    }

    .discountListing {
        &_content {
            &_top {
                gap: 42px;
                display: flex;
                margin-bottom: 70px;
                flex-direction: column;

                &_durationPeriod {
                    gap: 60px;
                    display: flex;
                    align-items: center;
                    @media screen and (max-width: 520px) {
                        flex-wrap: wrap;
                    }

                    &_textField {
                        label {
                            color: #000000;
                            font-size: 16px;
                            font-weight: 500;
                            line-height: 20px;
                            margin-right: 16px;
                            font-style: normal;
                            font-family: Manrope;
                            letter-spacing: 0.02em;
                        }
                        input {
                            height: 40px;
                            text-align: center;
                            border-radius: 4px;
                            background: #FFFFFF;
                            color: #000000;
                            font-style: normal;
                            font-weight: 400;
                            font-size: 16px;
                            line-height: 20px;
                            font-family: Manrope;
                            border: 1px solid #5C58A5;
                        }
                    }
                }

                &_searchHandling {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 40px;
                    &_daterangeSelector{
                        width: 100%;
                        select{
                            width: 100%;
                             border-radius: 8px;
                        background: #FFFFFF;
                        border: 1px solid #5C58A5;
                        height: 100%;
                         padding: 15px;
                        }
                    }

                    .groupTextField {
                        display: grid;
                        border-radius: 8px;
                        background: #FFFFFF;
                        border: 1px solid #5C58A5;
                        grid-template-columns: 1fr 150px;
                        width: 100%;
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
                                width: 100%;
                                border: none;
                                outline: none;
                                box-shadow: none;
                                margin-left: 10px;
                                height: 100%;
                                border-right: 1px solid #5C58A5;
                                font-style: normal;
                                font-weight: 400;
                                font-size: 16px;
                                line-height: 20px;
                                color: #939393;
                                font-family: Avenir LT Std;            
                                // ::placeholder {
                                //     font-style: normal;
                                //     font-weight: 400;
                                //     font-size: 16px;
                                //     line-height: 20px;
                                //     color: #939393;
                                // }
                            }
                        }
                
                        &_select {
                            select {
                                padding: 15px;
                                color: #282828;
                                border: none;
                                outline: none;
                                box-shadow: none;
                                background-color: white;
                                width: 95%;
                                font-size: 16px;
                                line-height: 20px;
                                font-family: Avenir LT Std;
                                @media screen and (max-width: 520px) {
                                    padding: 15px 0px;
                                } 
                            }
                        }
                    }
                }
            }

            table {
                thead {
                    tr {
                        th {
                            font-size: 16px;
                            font-weight: 700;
                            line-height: 20px;
                            font-style: normal;
                            font-family: Manrope;
                            letter-spacing: 0.02em;
                            color: #121212 !important;
                            background: transparent !important;
                        }
                    }
                }
            }
        }
        &_table{
            background-color: white;
            padding-bottom: 50px;

            &_btn{
                margin-top: 20px;
                text-align: center;
            }
        }
    }
`
export const StyledInput = styled.input`
    width: 58px;
    height: 40px;
    color: #1D1D1D;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    border-radius: 4px;
    font-style: normal;
    text-align: center;
    background: #FFFFFF;
    font-family: Manrope;
    border: 1px solid #5C58A5;
`