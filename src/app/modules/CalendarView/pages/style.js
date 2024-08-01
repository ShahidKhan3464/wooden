import styled from "styled-components";

export const CalendarListContainer = styled.div`
    padding: 32px;
    background: #F3F4F8;
    @media screen and (max-width: 520px) {
        padding: 16px;
    }

    .calendarList {
        &_content {
            &_buttons {
                gap: 16px;
                display: flex;
                place-content: end;
                @media screen and (max-width: 520px) {
                    justify-content: space-between;
                }
            }
    
            &_fullCalendar {
                padding: 24px;
                margin-top: 40px;
                background: white;
                border-radius: 5px;
                boxShadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),0px 2px 2px 0px rgb(0 0 0 / 14%),0px 1px 5px 0px rgb(0 0 0 / 12%); 
                @media screen and (max-width: 520px) {
                    margin-top: 80px;
                }

                .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr {
                    position: relative;
                    .fc-toolbar-title {
                        top: -105px;
                        left: -26px;
                        color: #121212;
                        font-weight: 700;
                        line-height: 40px;
                        font-style: normal;
                        position: absolute;
                        font-family: Manrope;
                        letter-spacing: 0.02em;
                        font-size: 29px !important;
                        @media screen and (max-width: 520px) {
                            top: -85px;
                            left: -22px;
                            font-size: 22px !important;
                        }
                    }
                }

                .fc-button-group {
                    gap: 8px;
                    display: flex;

                    .fc-prev-button.fc-button.fc-button-primary,
                    .fc-next-button.fc-button.fc-button-primary {
                        width: 40px;
                        height: 40px;
                        border: none;
                        color: #555BB3;
                        border-radius: 4px;
                        background: #F7F7F7;
                        @media screen and (max-width: 520px) {
                            width: 30px;
                            height: 30px;
                        }
                    }
                }

                .fc-button-active {
                    color: #FFFFFF !important;
                    background: #555BB3 !important;
                }

                .fc-resourceTimelineDay-button.fc-button.fc-button-primary,
                .fc-resourceTimelineWeek-button.fc-button.fc-button-primary,
                .fc-resourceTimelineMonth-button.fc-button.fc-button-primary {
                    width: 85px;
                    height: 40px;
                    border: none;
                    color: #555BB3;
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 130%;
                    font-style: normal;
                    border-radius: 4px;
                    font-family: Manrope;
                    background: transparent;
                    text-transform: capitalize; 
                    box-shadow: 0 0 transparent !important;
                    @media screen and (max-width: 520px) {
                        width: 50px;
                        height: 30px;
                        font-size: 10px;
                    }
                }

                .fc-button.fc-button-primary:hover {
                    color: white;
                    border-radius: 4px;
                    background: #555BB3;
                }

                .fc-scrollgrid-section.fc-scrollgrid-section-header th {
                    background: #555BB3 !important;
                }
                  
                .fc-datagrid-cell {
                    background: #F3F4F8 !important;
                }

                .fc-datagrid-header.fc-scrollgrid-sync-table .fc-datagrid-cell-main {
                    color: white;
                }
                  
                .fc-datagrid-cell-cushion.fc-scrollgrid-sync-inner,
                .fc-timeline-slot-cushion.fc-scrollgrid-sync-inner {
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 130%;
                    font-style: normal;
                    font-family: Manrope;
                }
                  
                .fc-datagrid-cell-cushion.fc-scrollgrid-sync-inner {
                    color: #4A4A4A;
                    overflow: visible !important;
                }
                  
                .fc-timeline-slot-cushion.fc-scrollgrid-sync-inner {
                    color: #FFFFFF;
                }
                  
                .fc-icon.fc-icon-plus-square {
                    width: 20px !important;
                    height: 20px !important;
                }

                .fc-timeline-slot.fc-timeline-slot-lane {
                    border: 1px solid #CDCDCD !important;
                }


                .fc-timeline-lane.fc-resource-group.fc-cell-shaded {
                    border-bottom: 1px solid #CDCDCD !important;
                }

                .fc-theme-standard th {
                    border: none !important;
                    border-top: 1px solid #CDCDCD !important;
                    border-right: 1px solid #CDCDCD !important;
                }

                .fc-scrollgrid.fc-scrollgrid-liquid {
                    .fc-resource-timeline-divider.fc-cell-shaded {
                        width: 8px !important;
                        background: transparent !important;
                    }

                    thead {
                        tr {
                            > th {
                                border: none !important;
                                outline: 1px solid #CDCDCD !important;
                            }

                            th:last-child {
                                .fc-scrollgrid-sync-table {
                                    colgroup {
                                        col {
                                            min-width: 56px !important;
                                        }
                                    }

                                    tbody {
                                        tr {
                                            th {
                                                // border-right: 1px solid white !important;
                                                border-right: 1px solid #CDCDCD !important;

                                                .fc-timeline-slot-frame {
                                                    height: 25px !important;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    tbody {

                        tr:first-child {
                            .fc-timeline-slot-frame {
                                display: none;
                            }
                        }

                        tr {
                            th {
                                outline: none !important;
                            }

                            td:last-child {
                                colgroup {
                                    col {
                                        min-width: 56px !important;
                                    }
                                }

                                border-top: 1px solid #CDCDCD !important;
                                border-left: 1px solid #CDCDCD !important;
                                border-right: 1px solid #CDCDCD !important;
                            }
                        }
                    }

                    tfoot {
                        tr {
                            th {
                                background: transparent !important;
                            }

                            // th:first-child {
                            //     background: transparent !important;
                            //     // border-bottom: 1px solid #CDCDCD !important;
                            // }
                            
                            // th:last-child {
                            //     background: transparent !important;
                            //     // border-bottom: 1px solid #CDCDCD !important;
                            // }
                        }
                    }
                }    
                .fc-license-message {
                    display: none;
                }            
            }
        }
    }
`

export const QuickBookAddContainer = styled.div`
    padding: 32px;
    background-color: #F3F4F8;
    @media screen and (max-width: 520px) {
        padding: 16px;
    }
     @media screen and (max-width: 520px) {
        padding: 16px;
    }
    
    .addQuickBookContent {
        &_heading {
            margin-bottom: 40px;
            @media screen and (max-width: 520px) {
                margin-bottom: 20px;
            }
        }

        &_form {
            &_container {
                padding: 24px;
                background-color: #FFFFFF;
                @media screen and (max-width: 520px) {
                    padding: 12px;
                }

                &_lead {
                    width: 100%;
                    max-width: 760px;
                    margin: 40px 0px;
                    padding-top: 20px;
                    padding-bottom: 40px;
                    border-top: 1px solid #DADADA;
                    border-bottom: 1px solid #DADADA;

                    &_formField {
                        width: 50%;
                        margin-bottom: 24px;
                    }
                }
            }
            
            &_addQuickBookButtons {
                gap: 40px;
                display: flex;
            }
        } 
    }
`
export const QuickHoldAddContainer = styled.div`
    padding: 32px;
    background-color: #F3F4F8;
    @media screen and (max-width: 520px) {
        padding: 16px;
    }
    
    .addQuickHoldContent {
        &_heading {
            margin-bottom: 40px;
            @media screen and (max-width: 520px) {
                margin-bottom: 20px;
            }
        }

        &_form {
            &_container {
                padding: 24px;
                background-color: #FFFFFF;
                @media screen and (max-width: 520px) {
                    padding: 12px;
                }

                &_lead {
                    width: 100%;
                    max-width: 760px;
                    margin: 40px 0px;
                    padding-top: 20px;
                    padding-bottom: 40px;
                    border-top: 1px solid #DADADA;
                    border-bottom: 1px solid #DADADA;

                    &_formField {
                        width: 50%;
                        margin-bottom: 24px;
                    }
                }
            }
            
            // &_addQuickHoldButtons {
            //     gap: 40px;
            //     display: flex;
            // }
        } 
    }
`