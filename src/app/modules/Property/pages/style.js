import styled from "styled-components";
import { withStyles } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import selectIcon from '../selectIcon.svg'

export const PropertyListContainer = styled.div`
  padding: 32px;
  @media screen and (max-width: 520px) {
    padding: 16px;
  }
  
  .propertyListing {
    &_tabs {
      margin-top: 40px;
      margin-bottom: 24px;

      // &_indicator {
      //   color: #555BB3;
      // }

      &_indicatorBorder {
        background: #555BB3;
        @media screen and (max-width: 520px) {
          bottom: 6px;
        }
      }

      &_tab {
        padding: 0px;
        color: #737373;
        margin-right: 64px;
        font-family: Manrope;
        font-size: 22px !important;
        font-weight: 600 !important;
        text-transform: capitalize !important;
        @media screen and (max-width: 520px) {
          font-size: 13px !important;
          margin-right: 15px;
        }
      }
    }

    .calendarBox {
      gap: 12px;
      display: flex;
      align-items: center;

      a {
        font-family: Manrope;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #555BB3;
      }
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
/* 
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
                } */
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

export const ParticularProductDetailContent = styled.div`
  padding: 32px;
  background-color: #F3F4F8;
  @media screen and (max-width: 520px) {
    padding: 16px;
  } 

  .particularProductDetailContent {
    &_heading {
      margin: 40px 0;
    }
    &_tables {
        display: grid;
        margin-top: 40px;
        background: #FFFFFF;
        grid-template-columns: 1fr 1fr;
        @media screen and (max-width: 1024px) {
          grid-template-columns: 1fr;
        } 
        
        &_left {
          @media screen and (max-width: 520px) {
            overflow: auto;
          } 

          &_form {
            width: 100%;
            max-width: 440px;
            padding: 40px 24px;
            button {
              margin-top: 32px;
            }
          }
        }

        &_right {
          border-left: 1px solid #E0E0E0;
          @media screen and (max-width: 520px) {
            overflow: auto;
          } 

          &_title {
            padding: 34px 23px 19px 23px;
            border-bottom: 1px solid #ECECEC;

            h1 {
              color: #121212;
              font-style: normal;
              font-weight: 700;
              font-size: 24px;
              line-height: 40px;
              font-family: Manrope;
              margin: 0;
            }
          }

          form {
            padding: 19px 23px 44px 23px;
            border-bottom: 1px solid #E0E0E0;
            @media screen and (max-width: 520px) {
              padding: 10px 12px 22px 12px;
            } 
            .control-buttons {
              gap: 12px;
              display: flex;
              margin: 32px 0;
              justify-content: flex-end;
            }
          }

          &_data {
            p {
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: #121212;
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              line-height: 24px;
              font-family: Manrope;
              border-bottom: 1px solid #E0E0E0;
              padding: 16px 24px;
              @media screen and (max-width: 520px) {
                padding: 8px 12px;
              } 
            }

            span {
              color: #939296;
              font-size: 14px;
              font-weight: 600;
              line-height: 20%;
              font-style: normal;
              font-family: Manrope;
            }
          } 
        }

        .custom_form_fields {
          gap: 96px;
          display: flex;
          align-items: center;
          @media screen and (max-width: 520px) {
            gap: 30px;
          } 
        }
      }
    }

    //Calendar Styling
    .fc .fc-toolbar.fc-header-toolbar {
      margin-bottom: 0em;
      padding: 32px 24px 19px 24px !important;
      @media screen and (max-width: 520px) {
        padding: 16px 12px 10px 12px !important;
      } 
    }

    .fc-toolbar-title {
      font-family: Manrope;
      font-style: normal;
      font-weight: 700;
      line-height: 130%;
      color: #5C58A5;
      font-size: 32px !important;
      @media screen and (max-width: 520px) {
        font-size: 16px !important;
      } 
    }

    .fc-today-button.fc-button.fc-button-primary {
      width: 94px;
      height: 32px;
      border-radius: 4px;
      background: #F3F4F8;
      font-family: Manrope;
      font-weight: 700;
      font-size: 12px;
      color: #4A4A4A;
      border: none;
      opacity: 0.9;
      text-transform: capitalize;
      @media screen and (max-width: 520px) {
        width: 60px;
      } 
    }

    .fc-button-group {
      gap: 5px;
    }

    .fc-prev-button.fc-button.fc-button-primary,
    .fc-next-button.fc-button.fc-button-primary {
      width: 32px;
      height: 32px;
      border: none;
      display: flex;
      border-radius: 4px;
      background: #F3F4F8;
      align-items: center;
      justify-content: center;
      @media screen and (max-width: 520px) {
        width: 26px;
      } 
    }

    .fc .fc-view-harness {
      height: 610px !important;
    }

    .fc-icon.fc-icon-chevron-left,
    .fc-icon.fc-icon-chevron-right {
      color: #555BB3;
    }

    .fc-scrollgrid.fc-scrollgrid-liquid {
      border-left-width: 0;
      border-bottom-width: 1px;
      padding: 19px 24px 40px 24px;
      border-top: 1px solid #E0E0E0 !important;
      border-bottom: 1px solid #E0E0E0 !important;
      @media screen and (max-width: 520px) {
        padding: 10px 12px 20px 12px;
      } 
    }

    .fc-scroller-harness {
      padding-bottom: 20px;
      background: #FFFFFF;
    }

    .fc-scrollgrid-sync-inner {
      font-size: 16px;
      font-weight: 700;
      font-style: normal;
      background: #FFFFFF;
      font-family: Manrope;
    }
    
    .fc-col-header-cell-cushion {
      color: #B8B8B8;
      @media screen and (max-width: 520px) {
        padding: 0px !important;
      } 
    }

    .fc-theme-standard td, 
    .fc-theme-standard th {
      border: none;
    }

    .fc-daygrid-day-frame.fc-scrollgrid-sync-inner {
      margin: 10px 5px;
      border-radius: 6px;
      background: #F3F4F8;
      font-family: Manrope;
      @media screen and (max-width: 520px) {
        margin: 12px 1px;
      } 
    }

    .fc-daygrid-day-top {
      justify-content: center;
    }

    .fc-daygrid-day-events {
      min-height: 2em !important;
    }

    .fc-daygrid-day.fc-day-today {
      border-radius: 4px;
      color: #FFFFFF !important;
      background: transparent !important;
      
      .fc-daygrid-day-frame.fc-scrollgrid-sync-inner {
        background: #5C58A5;
        color: #FFFFFF !important;
      }
      
      .fc-scrollgrid-sync-inner {
        background: transparent;
        color: #FFFFFF !important;
      }

      .fc-daygrid-day-top a, .fc-event-title.fc-sticky {
        color: #FFFFFF;
      }
    } 

    .fc-event-title-container {
      background: none !important;
      color: #5C58A5 !important;
      padding: 0 !important;
      border: none !important;
      text-align: center !important;
      font-weight: 500 !important;
      font-size: 11.88px !important;
      line-height: 130% !important;
    }

    .fc-h-event {
      background-color: transparent !important;
    }
`

export const Panel = styled.div`
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
`

export const LabelTab = withStyles((theme) => ({
  root: {
    '&$selected': {
      color: '#555BB3',
    }
  },
  selected: {}
}))(Tab)

// export const StyleCheckbox = withStyles({
//   root: {
//     color: 'red',
//     // '&$checked': {
//     //   color: green[600],
//     // },
//   },
//   checked: {},
// })(Checkbox);