import React, { useState } from 'react'
import { Formik } from "formik";
import CustomButton from '../../../../components/customButton/index';
import CustomFormControl from "../../../../components/formControl";
import TableSearchHandling from '../../../../components/tableSearchHandling';
import { CustomFormField, BoxContainer, PrimaryHeading } from '../../../baseStyle';
import { InquiryMatchedPropertyContainer, StyledTableContainer, Th, Td } from './style';
import { Typography, Table, TableBody, TableHead, TableRow, Paper } from '@material-ui/core';

const InquiryMatchingProperty = () => {
    const [ListData, setListData] = useState(null);
    const [searchInputValue, setsearchInputValue] = useState('')
    const [searchSelectedValue, setsearchSelectedValue] = useState('')

    const createData = (text, suggested, negotiated) => {
        return { text, suggested, negotiated };
    }

    const rows = [
        createData('Booking Amount', 7000, 7000),
        createData('Booking Amount', 7000, 7000),
        createData('Booking Amount', 7000, 7000),
        createData('Booking Amount', 7000, 7000),
        createData('Booking Amount', 7000, 7000),
    ];

    const initialValues = {
        firstName: '',
        adr: '',
        andyAgents: ''
    }

    const searchInputHandler = (value) => {
        setsearchInputValue(value.trim())
    }

    const searchSelctionHanlder = (value) => {
        if (value === 'name') {
            setsearchSelectedValue('propertyFriendlyName')
        }
        else if (value === 'city') {
            setsearchSelectedValue('city')
        }
        else if (value === 'location') {
            setsearchSelectedValue('location')
        }
    }

    const sortingHadler = (order) => {
        if (order === 'asc') {
            const sorted = ListData.sort((a, b) => a.friendlyName.toLowerCase() > b.friendlyName.toLowerCase() ? 1 : -1);
            setListData([...sorted])
        }
        else if (order === 'dsc') {
            const sorted = ListData.sort((a, b) => a.friendlyName.toLowerCase() < b.friendlyName.toLowerCase() ? 1 : -1);
            setListData([...sorted])
        }
    }

    return (
        <InquiryMatchedPropertyContainer>
            <BoxContainer>
                <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
            </BoxContainer>
            <div className='inquiryMatchedProperty_heading'>
                <PrimaryHeading>Details</PrimaryHeading>
            </div>
            <div className='inquiryMatchedProperty_content'>
                <Formik
                    initialValues={ListData ? ListData : initialValues}
                    // validationSchema={validationSchema}
                    enableReinitialize={true}
                // onSubmit={onSubmit}
                >
                    {(formik) => {
                        return (
                            <form
                                name="basic"
                                onSubmit={formik.handleSubmit}
                                autoComplete="off"
                            //   validateMessages={validationSchema}
                            >
                                <div className='inquiryMatchedProperty_content_form'>
                                    <div className='inquiryMatchedProperty_content_form_heading'>
                                        <Typography component='p'>Casa Nova</Typography>
                                        <Typography component='p'>09/12/2022 - 09/12/2022 </Typography>
                                    </div>
                                    <div className='inquiryMatchedProperty_content_form_textFields'>
                                        <CustomFormField>
                                            <CustomFormControl
                                                type="text"
                                                control="input"
                                                label='*Nights'
                                                name="firstName"
                                                placeholder="Enter First Name"
                                            />
                                            <CustomFormControl
                                                type="text"
                                                name="adr"
                                                label='ADR'
                                                control="input"
                                                placeholder="3500"
                                            />
                                        </CustomFormField>
                                    </div>

                                    <div className='inquiryMatchedProperty_content_form_tables'>
                                        <StyledTableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <Th></Th>
                                                        <Th>Suggested</Th>
                                                        <Th>Negotiated</Th>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((row, index) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <Td component="th" scope="row" style={{ color: '#121212 !important' }}>{row.text}</Td>
                                                            <Td>{row.suggested}</Td>
                                                            <Td>{row.negotiated}</Td>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </StyledTableContainer>

                                        <StyledTableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <Th>Andy Agent</Th>
                                                        <Th></Th>
                                                        <Th></Th>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((row, index) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <Td component="th" scope="row" style={{ color: '#121212 !important' }}>{row.text}</Td>
                                                            <Td>{row.suggested}</Td>
                                                            <Td>{row.negotiated}</Td>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </StyledTableContainer>

                                        <StyledTableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <Th>
                                                            <CustomFormControl
                                                                type="text"
                                                                control="input"
                                                                name="andyAgents"
                                                                label='3rd Party Agents*'
                                                                placeholder="Andy Agents"
                                                            />
                                                        </Th>
                                                        <Th></Th>
                                                        <Th></Th>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((row, index) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <Td component="th" scope="row" style={{ color: '#121212 !important' }}>{row.text}</Td>
                                                            <Td>{row.suggested}</Td>
                                                            <Td>{row.negotiated}</Td>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </StyledTableContainer>

                                        <div className='inquiryMatchedProperty_content_form_tables_buttons'>
                                            <CustomButton type='button' color='#121212' bgColor='#FAFAFA' width='124px' text='Reset' />
                                            <CustomButton type='submit' color='#FFFFFF' bgColor='#555BB3' width='133px' text='Submit' />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </InquiryMatchedPropertyContainer>
    )
}

export default InquiryMatchingProperty