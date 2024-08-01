import styled from "styled-components";

export const EmployeeListContainer = styled.div`
    padding: 32px;
    background: #F3F4F8;
    @media screen and (max-width: 520px) {
        padding: 16px;
    } 
    
    .employeeListing {
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

export const EmployeeCreateContainer = styled.div`
    padding: 32px;
    background: #F3F4F8;
    @media screen and (max-width: 520px) {
        padding: 16px;
    }

    .createEmployeeContent {
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

        &_form {
            padding: 24px;
            background: #FFFFFF;
            @media screen and (max-width: 520px) {
                padding: 12px;
            }
            &_roles {
                h1 {
                    margin: 25px 0;
                    color: #121212;
                    font-size: 16px;
                    font-weight: 600;
                    margin-top: 24px;
                    line-height: 30px;
                    font-style: normal;
                    @media screen and (max-width: 520px) {
                        margin: 12px 0;
                    } 
                }
            }

            &_propertyType_heading {
                margin: 25px 0;
                color: #121212;
                font-size: 24px;
                font-weight: 600;
                line-height: 30px;
                font-style: normal;
                @media screen and (max-width: 520px) {
                    margin: 12px 0;
                } 
            }

            &_amentities_form {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));

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
                      text-transform: capitalize;
                }
            }
        }
    }
`