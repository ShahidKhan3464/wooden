import styled from "styled-components";

export const BrokerListContainer = styled.div`
    padding: 32px;
    background: #F3F4F8;
    @media screen and (max-width: 520px) {
        padding: 16px;
    } 
    
    .brokerListing {
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

export const BrokerCreateContainer = styled.div`
    padding: 32px;
    background: #F3F4F8;
    @media screen and (max-width: 520px) {
        padding: 16px;
    }
    
    .createBrokerContent {
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
                margin-bottom: 12px;
            } 
        }
    }
`