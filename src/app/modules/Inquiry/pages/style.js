import styled from "styled-components";
import { TableCell, TableContainer } from '@material-ui/core';

export const InquiriesListContainer = styled.div`
    padding: 32px;
    background: #F3F4F8;
    @media screen and (max-width: 520px) {
        padding: 16px;
    } 
    
    .inquiriesListing {
        &_content {
            height: 100%;
            table {
                thead {
                    tr {
                        th {
                            font-size: 16px;
                            font-weight: 700;
                            line-height: 20px;
                            font-style: normal;
                            letter-spacing: 0.02em;
                            color: #121212 !important;
                            background: transparent !important;
                        }
                    }
                }
            }
        }
        
        &_heading {
            margin: 40px 0;
            @media screen and (max-width: 520px) {
                margin: 20px 0;
            } 
        }
    }
`
export const InquiriesCreateContainer = styled.div`
    .createInquiriesContent {
        padding: 32px;
        @media screen and (max-width: 520px) {
            padding: 16px;
        } 

        &_heading {
            margin-bottom: 40px;
            @media screen and (max-width: 520px) {
                margin-bottom: 20px;
            }
            
            &_view {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }

        &_form{
            padding: 24px;
            background: #FFFFFF;
            @media screen and (max-width: 520px) {
                padding: 12px;
            }

            &_amentities {
                margin: 24px 0;
                h1 {
                    color: #121212;
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 130%;
                    font-style: normal;
                }

                &_form {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));

                    .controlLabel {
                        margin-left: 0px;
                        margin-right: 0px;
                    }

                    .checkbox {
                        width: 20px;
                        height: 20px;
                        padding: 15px;
                        color: #5C58A5;
                    
                        > span {
                            border: none;
                            background: none !important;
                        }
                    }

                    .checkboxLabel {
                        color: #000000;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 16px;
                        font-style: normal;
                    } 
                }
            }
        }
    }
`
export const MatchedPropertyContainer = styled.div`
    padding: 32px;
    @media screen and (max-width: 520px) {
        padding: 16px;
    } 

    .matchedProperty {
        &_content {
            height: 100%;
            table {
                thead {
                    tr {
                        th {
                            font-size: 16px;
                            font-weight: 700;
                            line-height: 20px;
                            font-style: normal;
                            letter-spacing: 0.02em;
                            color: #121212 !important;
                            background: transparent !important;
                        }
                    }
                }
            }
        }
        
        &_heading {
            margin: 40px 0;
            @media screen and (max-width: 520px) {
                margin: 20px 0;
            } 
        }
    }
`
export const CreateInquiryShareContainer = styled.div`
    padding: 32px;
    background-color: #F3F4F8;
    @media screen and (max-width: 520px) {
        padding: 16px;
    }
    
    .createInquiryShare {
        &_content {
            height: 100%;
            margin-top: 40px;
            background: #FFFFFF;

            &_topHeading {
                gap: 270px;
                display: grid;
                padding: 40px 32px 24px 32px;
                grid-template-columns: 1fr 1fr;
                // justify-content: space-between;
                border-bottom: 1px solid rgba(62, 66, 70, 0.2);
                @media screen and (max-width: 1280px) {
                    gap: 120px;
                }
                @media screen and (max-width: 520px) {
                    grid-template-columns: 1fr;
                }

                > h6 {
                    color: #121212;
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 20px;
                    font-style: normal;
                    letter-spacing: 0.02em;
                }
            }

            &_data {
                gap: 270px;
                padding: 32px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                border-bottom: 1px solid rgba(62, 66, 70, 0.2);
                @media screen and (max-width: 1280px) {
                    gap: 40px;
                }
                
                @media screen and (max-width: 520px) {
                    flex-wrap: wrap;
                    grid-template-columns: 1fr;
                }

                &_left {
                    gap: 24px;
                    display: flex;
                    flex-direction: column;

                    > h6 {
                        color: #121212;
                        font-size: 20px;
                        font-weight: 600;
                        line-height: 120%;
                        font-style: normal;
                    }

                    &_textField {
                        gap: 16px;
                        display: flex;
                        flex-direction: column;

                        label {
                            color: #121212;
                            font-size: 16px;
                            font-weight: 600;
                            line-height: 24px;
                            font-style: normal;
                        }

                        input {
                            border: none;
                            height: 100px;
                            border-radius: 4px;
                            padding: 14px 16px;
                            background: #F5F5F5;
                        }
                    }

                    &_buttons {
                        gap: 16px;
                        display: flex;
                        align-items: center;
                        @media screen and (max-width: 520px) {
                            flex-wrap: wrap;
                            // grid-template-columns: 1fr;
                        }
                    }
                } 

                &_right {
                    gap: 20px;
                    display: flex;
                    flex-direction: column;

                    p, span {
                        font-size: 16px;
                        color: #1D1D1D;
                        font-weight: 400;
                        line-height: 24px;
                        font-style: normal;
                    }
                }
            }
        }
    }
`
export const InquiryMatchedPropertyContainer = styled.div`
    padding: 32px;
    background-color: #F3F4F8;
    @media screen and (max-width: 520px) {
        padding: 16px;
    }

    .inquiryMatchedProperty {
        &_heading {
            margin-top: 30px;
            margin-bottom: 48px;
        }

        &_content {
            background: #FFFFFF;
            &_form {
                &_heading {
                    gap: 16px;
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid rgba(62, 66, 70, 0.2);

                    > p {
                        color: #1D1D1D;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 24px;
                        font-style: normal;
                    }
                }

                &_textFields {
                    padding: 32px 48px 42px 32px;
                }

                &_tables {
                    gap: 40px;
                    display: flex;
                    padding-right: 48px;
                    padding-bottom: 50px;
                    flex-direction: column;

                    &_buttons {
                        gap: 16px;
                        display: flex;
                        padding: 0 32px;
                    }
                }
            }
        }
    }
`
export const StatusComponent = styled.div`
    display: flex;
    width: 64px;
    height: 24px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    font-style: normal;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    color: ${props => props.status === 'Active' ? '#4CCA5A' : '#FD0707'};
    background: ${props => props.status === 'Active' ? 'rgba(76, 202, 90, 0.1)' : 'rgba(253, 7, 7, 0.1)'};
`
export const StyledTableContainer = styled(TableContainer)`
    border-radius: 0px !important;
    box-shadow: 0 0 0 0 !important;
`
export const Th = styled(TableCell)`
    font-style: normal;
    letter-spacing: 0.02em;
    color: #121212 !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    line-height: 20px !important;
    padding: 16px 32px !important;
    background: #FFFFFF !important;
`
export const Td = styled(TableCell)`
    color: #737373 !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 24px !important;
    padding: 48px 32px !important;
    background: #FFFFFF !important;
`