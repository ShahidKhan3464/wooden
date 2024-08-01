import styled from "styled-components";

export const BrokerStyleContainer = styled.div`
padding: 24px;
  .ownerListing {
    &_content {
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
    }
  }


`

export const NewBrokerStyleContainer = styled.div`
background-color: #FFFFFF;
margin: 24px;
padding: 24px;
  .custom_form_fields {
    display: flex;
    justify-content: space-between;
    gap: 90px;
  }
`;