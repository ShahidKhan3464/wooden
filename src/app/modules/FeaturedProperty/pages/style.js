import styled from "styled-components";

export const FeaturedPropertyListContainer = styled.div`
    padding: 32px;
    background: #F3F4F8;
    @media screen and (max-width: 520px) {
        padding: 16px;
    }
    
    .featuredPropertyList_table {
        margin-top: 32px;
        margin-bottom: 24px;

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
`

export const PropertiesSelect = styled.div`
    select {
        padding: 14px;
        color: #282828;
        border: none;
        outline: none;
        box-shadow: none;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        background: #FFFFFF;
        border: 1px solid #5C58A5;
        border-radius: 8px;
        margin-right: 20px;        
    }
`