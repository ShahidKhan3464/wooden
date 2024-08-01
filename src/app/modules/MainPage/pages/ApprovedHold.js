import React from 'react';
import { Table, TableCell, TableBody, TableRow, TextField } from '@material-ui/core';
import CustomDropDown from '../../../../components/customDropDown'
import { tableContent } from '../../../baseStyle'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    tableRowStyle: {
        '&:last-child td, &:last-child th': { borderBottom: 0 }
    },
}))

const DashbaordTable = ({ NotApprovedHolds, handlePriceOverride, handleApproveButton }) => {
    const classes = useStyles()
    const tableOptions = ['Book', 'Approve', 'Reject']

    const getFormattedDateFromServer = (date) => {
        date = date.split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2].split("T")[0];
        return month + "/" + day + "/" + year;
    };

    const tableMunuHandler = (option, data) => {
        if (option === 'Approve') {
            let propertyHoldID = data.propertyHoldID;
            let totalHoldPrice = data.totalHoldPrice;
            let note = data.note;
            handleApproveButton(propertyHoldID, totalHoldPrice, note)
        }
        else if (option === 'Reject') {
            let propertyHoldID = data.propertyHoldID;
            let totalHoldPrice = data.totalHoldPrice;
            let note = data.note;
            handleApproveButton(propertyHoldID, totalHoldPrice, note)
        }
        else if (option === 'Book') {
            let propertyHoldID = data.propertyHoldID;
            let totalHoldPrice = data.totalHoldPrice;
            let note = data.note;
            handleApproveButton(propertyHoldID, totalHoldPrice, note)
        }
    }

    return (
        <Table aria-label="simple table">
            <TableCell style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Manrope', color: '#121212' }} >Price Override</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Manrope', color: '#121212' }} >Date Range</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Manrope', color: '#121212' }}>Property Name</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Manrope', color: '#121212' }}>Lead Name - Description</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Manrope', color: '#121212' }}>Agent Name</TableCell>
            <TableCell style={{ fontSize: '16px', fontWeight: '700', fontFamily: 'Manrope', color: '#121212' }}>Held Date</TableCell>
            <TableCell></TableCell>
            <TableCell align='right'></TableCell>
            <TableBody>
                {NotApprovedHolds?.map((Hold, index) => (
                    <TableRow
                        key={Hold.name}
                        className={classes.tableRowStyle}
                    >
                        <TableCell style={{ tableContent }}>
                            <TextField
                                label="Price"
                                type="number"
                                color="secondary"
                                variant="standard"
                                className="TextField"
                                id="outlined-required"
                                value={Hold.totalHoldPrice}
                                onChange={(e) => {
                                    handlePriceOverride(e.target.value, index);
                                }}
                            />
                        </TableCell>
                        <TableCell style={tableContent}>{`${getFormattedDateFromServer(Hold.checkInDate)} - ${getFormattedDateFromServer(Hold.checkOutDate)}`}</TableCell>
                        <TableCell style={tableContent}>{Hold.propertyFriendlyName}</TableCell>
                        <TableCell style={tableContent}>{`${Hold.leadFirstName} ${Hold.leadLastName} - ${Hold.description}`}</TableCell>
                        <TableCell style={tableContent}>{`${Hold.employeeFirstName} ${Hold.employeeLastName}`}</TableCell>
                        <TableCell style={tableContent}>{getFormattedDateFromServer(Hold.dateHeld)}</TableCell>
                        <TableCell style={tableContent}>
                            <Link style={{ color: '#555BB3', fontWeight: 700 }} to="#home">View Notes</Link>
                        </TableCell>
                        <TableCell align='right'>
                            <CustomDropDown tableOptions={tableOptions} tableMunuHandler={tableMunuHandler} data={Hold} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DashbaordTable