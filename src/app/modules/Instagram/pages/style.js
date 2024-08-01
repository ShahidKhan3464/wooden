import styled from "styled-components";

export const InquiriesContainer = styled.div`

    padding: 32px;

    .inquiriesListing{
        &_content{
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
        
        &_heading{
            margin: 40px 0;
        }
    }

`

export const InstagramCreateContainer = styled.div`

    padding: 24px;

`


export const NewInquiriContainer = styled.div`

.createYacthContent{
    padding: 24px;
    &_heading{

    }
    &_form{

    }

    .custom_form_fields{
        display: flex;
        gap: 90px;
    }
}
`


export const PropertyAddContainer = styled.div`
    padding: 32px;
    background-color: #F3F4F8;
    @media screen and (max-width: 520px) {
      padding: 16px;
    } 

    .addPropertyContent {
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
        /* display: flex; */
        // grid-template-columns: 3fr 1fr;
        /* gap: 24px; */
        @media screen and (max-width: 768px) {
          margin-bottom: 20px;
          flex-direction: column;
        } 

        &_container {
          padding: 24px;
          background-color: #FFFFFF;
          @media screen and (max-width: 520px) {
            padding: 12px;
          }

          &_roomLayout {
            width: 100%;
            display: flex;
            flex-direction: column;

            &_formControl {
              gap: 8px;
              display: flex;
              align-items: center;

              &_addBtn {
                transform: translateY(15px);
                width: 67px;
                height: 44px;
                cursor: pointer;
                background: #F7F7F7;
                border-radius: 5px;
                border: 1px dashed #5C58A5;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }

            &_rooms {
              gap: 8px;
              width: 100%;
              padding: 8px;
              display: flex;
              flex-wrap: wrap;
              /* max-width: 345px; */
              margin-top: 16px;
              border-radius: 5px;
              align-items: center;
              margin-bottom: 25px;
              border: 1px solid rgba(62, 66, 70, 0.2);

              &_room {
                gap: 8px;
                display: flex;
                color: #FFFFFF;
                font-size: 12px;
                cursor: pointer;
                padding: 6px 8px;
                font-weight: 400;
                line-height: 16px;
                border-radius: 4px;
                font-style: normal;
                background: #555BB3;
                font-family: Manrope;
                text-transform: capitalize;
                border: 1.4px solid #555BB3;
                justify-content: space-between;

                &_data {
                  gap: 12px;
                  display: flex;
                  align-items: center;
  
                  &_selection {
                    gap: 5px;
                    display: flex;
                    align-items: center;
                  }        
                }
              }
            }
          }

          &_amenities {
            margin: 24px 0;
            h1 {
              color: #121212;
              font-size: 16px;
              font-weight: 600;
              line-height: 24px;
              font-style: normal;
              font-family: Manrope;
            }
  
            &_form {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  
              .controlLabel {
                margin-left: 0px;
                margin-right: 0px;
  
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
              }
  
              .checkboxLabel {
                color: #000000;
                font-size: 14px;
                font-weight: 400;
                line-height: 16px;
                font-style: normal;
                font-family: Manrope;
                text-transform: capitalize;
              } 
            }
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
                display: flex;
                flex-direction: column;

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

          &_googleAddress{
            width: 100%;
            position: relative;

            label{
              color: #121212;
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              line-height: 130%;
              margin-bottom: 16px;
              font-family: Manrope;
            }

            input{
              font-family: Manrope;
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #737373;
            background: #F3F4F8;
            border-radius: 4px;
            width: 100%;
            border: none;
            padding: 16px;
            outline: none;
            width: 100%;
            }

            .google-covert{
              box-shadow: none;
              padding: 10px;
              left: 0;
top: 88px;
width: 100%;
position: absolute;
z-index: 2;
background-color: #FFFFFF;

              li{
                list-style-type: none;
                   font-family: Manrope;
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #737373;
            margin: 5px 0;



            :hover{
              background-color: #3F4254;
              cursor: pointer;
              color: #FFFFFF;
              border-radius: 4px;
              padding: 4px;
            }
                
              }
            }
          }
        }
         

        &_detail {
          height: 100%;
          padding: 24px;
          background: #FFFFFF;
          @media screen and (max-width: 520px) {
            padding: 12px;
          } 
    
          > h1 {
            color: #121212;
            letter-spacing: 0.02em;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 24px;
            font-family: Manrope;
          }
    
          &_table {
            display: flex;
            border-radius: 6px;
            border: 1px solid #DADADA;
            justify-content: space-between;
    
            &_column:not(:first-child) {
              border-left: 1px solid #DADADA
            }
    
            &_column {
              width: 100%;
              display: flex;
              text-align: center;
              flex-direction: column;
              justify-content: space-between;
    
              &_row:first-child {
                border-bottom: 1px solid #DADADA;
              }
    
              &_row:nth-child(2n + 3) {
                background: #EEEFF7;
              }
    
              &_row {
                height: 40px;
                min-width: 100px;
                padding-top: 10px;
                @media screen and (max-width: 520px) {
                  min-width: 50px;
                } 
                
                > p {
                  font-style: normal;
                  font-weight: 600;
                  font-size: 14px;
                  font-family: Manrope;
                  line-height: 19px;
                  letter-spacing: 0.02em;
                  color: #000000;
                  margin: 0;
                }
    
                > input {
                  border: none;
                  width: 100px;
                  outline: none;
                  text-align: center;
                  background: transparent;
                  @media screen and (max-width: 520px) {
                    width: 75px;
                  } 
                }
              }
            }
          }
        }
      }
    }
`