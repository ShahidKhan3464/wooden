import styled from "styled-components";
import { selectIcon } from '../../../../img'
export const YachtListContainer = styled.div`
  padding: 32px;
  background: #f3f4f8;
  @media screen and (max-width: 520px) {
    padding: 16px;
  }

  .yachtListing {
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

export const YachtCreateContainer = styled.div`
  padding: 32px;
  background: #f3f4f8;
  @media screen and (max-width: 520px) {
    padding: 16px;
  }
  .createYacthContent {
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
      background: #ffffff;
      @media screen and (max-width: 520px) {
        padding: 12px;
      }

      &_uploadFile {
            margin: 40px 0;

            > h6 {
              color: #121212;
              font-size: 16px;
              font-weight: 600;
              line-height: 130%;
              font-style: normal;
              font-family: Manrope;
            }

            &_browseImage_shown {
              gap: 12px;
              display: flex;
              flex-wrap: wrap;
              margin-top: 16px;
              margin-bottom: 21px;

              &_imgBox {
                position: relative;

                .image {
                  width: 112px;
                  height: 96px;
                }

                .filledCrossIcon {
                  top: -5px;
                  right: -5px;
                  width: 16px;
                  height: 16px;
                  cursor: pointer;
                  position: absolute;
                }

                select {
                  width: 100%;
                  border: none;
                  outline: none;
                  display: block;
                  color: #737373;
                  font-size: 12px;
                  margin-top: 8px;
                  font-weight: 400;
                  padding: 7px 12px;
                  line-height: 20px;
                  font-style: normal;
                  border-radius: 4px;
                  background: #F3F4F8;
                  font-family: Manrope;
                  -moz-appearance: none;
                  -webkit-appearance: none;
                  background-position: right;
                  background-position-x: 90%;
                  background-repeat: no-repeat;
                  background-image: url(${selectIcon});
                }
              }       
            }

            .upload-file {
              width: 112px;
              height: 96px;
              display: flex;
              cursor: pointer;
              // margin: 40px 0px;
              align-items: center;
              background: #5C58A5;
              justify-content: center;
              background: #F5F5F5 !important;       
            }  
          }
    }
  }
`;
