import styled from "styled-components";

export const DiscountSettingRangeContainer = styled.div`
  background-color: #ffffff;
  height: 100vh;
  padding: 40px;
  .discount_range_heading{
    display: flex;
    justify-content: space-between;
  }
  .discount_range_editbtn{
font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;
      text-transform: none;
      width: 95px;
      color: rgb(255, 255, 255);
      font-family: Manrope;
      background: rgb(85, 91, 179);
      border: 2px solid rgb(85, 91, 179);
      cursor: pointer;
  }
`;

export const DiscountListContainer = styled.div`
  padding: 32px;
  background: #f3f4f8;
  @media screen and (max-width: 520px) {
    padding: 16px;
  }

  .leadListing {
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
`;
