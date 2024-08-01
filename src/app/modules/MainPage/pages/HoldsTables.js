import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  Table: {
    backgroundColor: "white",
    marginTop: "20px",
    // padding: "20px 0px",
    // boxShadow: `
    // 0px 3px 1px -2px rgb(0 0 0 / 20%),
    // 0px 2px 2px 0px rgb(0 0 0 / 14%),
    // 0px 1px 5px 0px rgb(0 0 0 / 12%)
    // `,
    boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
    width: "100%",
    borderRadius: "10px",
    display: "block",
    // borderSpacing: "0",
    // borderCollapse: "collapse",
    overflowX: "scroll",

    "& thead": {
      display: "table-header-group",
    },

    "& tbody": {
      display: "table-header-group",
    },
    "& tr": {
      color: "inherit",
      display: "table-row",
      outline: "0",
      verticalAlign: "middle",
      "& td, & th": {
        // border: "1px solid #ddd",
        borderBottom: "0.0625rem solid rgb(233, 236, 239)",
        padding: "8px",
      },
    },
    // "& tr:nth-child(even)": {
    //   backgroundColor: "#f2f2f2",
    // },
  },
  TableTitle: {
    color: "#3699FF",
    // textAlign: "center",
    marginTop: "20px",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  tableHead: {
    backgroundColor: "rgb(233, 236, 239)"
  },
  approveBtn: {
    backgroundColor: "transparent",
    color: "rgb(103, 177, 8)",
    boxShadow: "none",
    padding: "3px !important",
    border: "1px solid rgb(205, 245, 155)",
    "&:hover": {
      backgroundColor: "rgb(205, 245, 155)",
      boxShadow: "none",
    }
  },
  bookBtn: {
    backgroundColor: "transparent",
    border: "1px solid rgba(54, 153, 255,0.3)",
    color: "rgba(29, 135, 245,1)",
    boxShadow: "none",
    padding: "3px !important",
    "&:hover": {
      backgroundColor: "rgba(29, 135, 245,0.4)",
      boxShadow: "none",
    }
  },
  rejectBtn: {
    backgroundColor: "transparent",
    border: "1px solid rgb(252, 151, 151)",
    color: "rgb(189, 0, 0)",
    boxShadow: "none",
    padding: "3px !important",
    "&:hover": {
      backgroundColor: "rgb(252, 151, 151)",
      boxShadow: "none",
    }
  }
}));

const getFormattedDateFromServer = (date) => {
  date = date.split("-");
  let year = date[0];
  let month = date[1];
  let day = date[2].split("T")[0];
  return month + "/" + day + "/" + year;
};


const getButtonName = (role) => {
  if (role.includes("propertiesAdmin")) {
    return 'Reject Hold';
  } else {
    return 'Deny Hold';
  }
};





const HoldsTables = ({
  role,
  NotApprovedHolds,
  ApprovedHolds,
  UnConfirmedHolds,
  handlePriceOverride,
  handleUnConfirmedPriceOverride,
  handleApproveNoteOverride,
  handleApproveButton,
  handleBook,
  handleUnconfirmedFunding,
  handleConfirmFunding,
  handleDeletePropertyHold
}) => {
  const classes = useStyles();

  let NotApprovedHoldsList = null;
  let ApprovedHoldsList = null;
  let UnConfirmedHoldsList = null;

  if (NotApprovedHolds) {

    NotApprovedHoldsList = NotApprovedHolds?.map((Hold, index) => (
      <tr key={Hold.propertyID + Hold.propertyHoldID}>
        <td>
          <TextField
            id="outlined-required"
            label="Price"
            variant="standard"
            color="secondary"
            className="TextField"
            value={Hold.totalHoldPrice}
            onChange={(e) => {
              handlePriceOverride(e.target.value, index);
            }}
            type="number"
          />
        </td>
        <td>{Hold.note}</td>
        <td>
          <Button
            // className="Button"
            className={classes.approveBtn}
            variant="contained"
            onClick={() =>
              handleApproveButton(
                Hold.propertyHoldID,
                Hold.totalHoldPrice,
                Hold.note
              )
            }
          >
            Approve
          </Button>
        </td>
        <td>
          {`${getFormattedDateFromServer(
            Hold.checkInDate
          )} - ${getFormattedDateFromServer(Hold.checkOutDate)}`}
        </td>
        <td>{Hold.propertyFriendlyName}</td>
        <td>{`${Hold.leadFirstName} ${Hold.leadLastName} - ${Hold.description}`}</td>
        <td>{`${Hold.employeeFirstName} ${Hold.employeeLastName}`}</td>
        <td>{getFormattedDateFromServer(Hold.dateHeld)}</td>
        <td>
          <Button
            // className="Button"
            className={classes.bookBtn}
            variant="contained"
            onClick={() =>
              handleBook(
                getFormattedDateFromServer(Hold.checkInDate),
                getFormattedDateFromServer(Hold.checkOutDate),
                Hold.propertyID,
                Hold.totalHoldPrice,
                Hold.inquiryID
              )
            }
          >
            Book
          </Button>
        </td>
        <td>
          <Button
            // className="Button"
            className={classes.rejectBtn}
            variant="contained"
            onClick={() => {
              handleDeletePropertyHold(
                Hold.propertyHoldID
              );
            }}
          >
            {getButtonName(role)}
          </Button>
        </td>
      </tr>
    ));
  }

  if (ApprovedHolds) {
    ApprovedHoldsList = ApprovedHolds?.map((Hold, index) => (
      <tr key={Hold.propertyID + Hold.propertyHoldID}>
        <td>
          <Button
            className="Button"
            variant="contained"
            onClick={() =>
              handleUnconfirmedFunding(
                Hold.propertyHoldID,
                Hold.totalHoldPrice,
                Hold.note
              )
            }
          >
            Request Validation
          </Button>
        </td>
        <td>
          <TextField
            id="outlined-required"
            label="Note"
            variant="standard"
            color="secondary"
            className="TextField"
            value={Hold.note}
            onChange={(e) => {
              handleApproveNoteOverride(e.target.value, index);
            }}
            type="text"
          />
        </td>
        <td>{Hold.totalHoldPrice}</td>
        <td>
          {`${getFormattedDateFromServer(
            Hold.checkInDate
          )} - ${getFormattedDateFromServer(Hold.checkOutDate)}`}
        </td>
        <td>{Hold.propertyFriendlyName}</td>
        <td>{`${Hold.leadFirstName} ${Hold.leadLastName} - ${Hold.description}`}</td>
        <td>{`${Hold.employeeFirstName} ${Hold.employeeLastName}`}</td>
        <td>
          <Button
            className="Button"
            variant="contained"
            onClick={() => {
              handleDeletePropertyHold(
                Hold.propertyHoldID
              );
            }}
          >
            Cancel Hold
          </Button>
        </td>
      </tr>
    ));
  }

  if (UnConfirmedHolds) {
    UnConfirmedHoldsList = UnConfirmedHolds?.map((Hold, index) => (
      <tr key={Hold.propertyID + Hold.propertyHoldID}>
        <td>
          <Button
            // className="Button"
            variant="contained"
            className={classes.bookBtn}
            onClick={() =>
              handleConfirmFunding(
                Hold.propertyHoldID,
                Hold.totalHoldPrice,
                Hold.note,

                getFormattedDateFromServer(Hold.checkInDate),
                getFormattedDateFromServer(Hold.checkOutDate),
                Hold.propertyID,
                Hold.totalHoldPrice,
                Hold.inquiryID
              )
            }
          >
            Book
          </Button>
        </td>
        <td>{Hold.note}</td>
        <td>
          <TextField
            id="outlined-required"
            label="Price"
            variant="standard"
            color="secondary"
            className="TextField"
            value={Hold.totalHoldPrice}
            onChange={(e) => {
              handleUnConfirmedPriceOverride(e.target.value, index);
            }}
            type="number"
          />
        </td>
        <td>
          {`${getFormattedDateFromServer(
            Hold.checkInDate
          )} - ${getFormattedDateFromServer(Hold.checkOutDate)}`}
        </td>
        <td>{Hold.propertyFriendlyName}</td>
        <td>{`${Hold.leadFirstName} ${Hold.leadLastName} - ${Hold.description}`}</td>
        <td>{`${Hold.employeeFirstName} ${Hold.employeeLastName}`}</td>
        <td>{getFormattedDateFromServer(Hold.dateHeld)}</td>
        <td>
          <Button
            // className="Button"
            className={classes.rejectBtn}
            variant="contained"
            onClick={() => {
              handleDeletePropertyHold(
                Hold.propertyHoldID
              );
            }}
          >
            {getButtonName(role)}
          </Button>
        </td>
      </tr>
    ));
  }

  let NotApprovedHoldsListHead = (
    <>
      <thead>
        {/* <tr>
          <th colspan="10" className={classes.TableTitle}>
            Approve Holds
          </th>
        </tr> */}
        <tr className={classes.tableHead}>
          <th>Price Override</th>
          <th>Notes</th>
          <th>Hold Price</th>
          <th>Date Range</th>
          <th>Property Name</th>
          <th>Lead Name - Description</th>
          <th>Agent Name</th>
          <th>Held Date</th>
          <th>Quick Book</th>
          <th>Cancel Hold</th>
        </tr>
      </thead>
    </>
  );

  let ApprovedHoldsListHead = (
    <>
      <thead>
        {/* <tr>
          <th colspan="10" className={classes.TableTitle}>
            Approved Holds
          </th>
        </tr> */}
        <tr className={classes.tableHead}>
          <th>Hold Status</th>
          <th>Notes</th>
          <th>Hold Price</th>
          <th>Date Range</th>
          <th>Property Name</th>
          <th>Lead Name - Description</th>
          <th>Agent Name</th>
          <th>Cancel Hold</th>
          {/*<th>Notes (Read Only)</th>*/}
        </tr>
      </thead>
    </>
  );

  let UnConfirmedHoldsListHead = (
    <>
      <thead>
        {/* <tr>
          <th colspan="10" className={classes.TableTitle}>
            Validate Wire
          </th>
        </tr> */}
        <tr></tr>
        <tr className={classes.tableHead}>
          <th>Funded</th>
          <th>Notes</th>
          <th>Hold Price</th>
          <th>Date Range</th>
          <th>Property Name</th>
          <th>Lead Name - Description</th>
          <th>Agent Name</th>
          <th>Held Date</th>
          <th>Cancel Hold</th>
        </tr>
      </thead>
    </>
  );

  return (
    <>
      {NotApprovedHolds && (

        <Fragment>
          <Typography className={classes.TableTitle}>Approve Holds</Typography>
          <table className={classes.Table}>
            {NotApprovedHoldsListHead}
            <tbody>{NotApprovedHoldsList}</tbody>
          </table>
        </Fragment>
      )}
      {ApprovedHolds && (
        <Fragment>
          <Typography className={classes.TableTitle}>Approve Holds</Typography>
          <table className={classes.Table}>
            {ApprovedHoldsListHead}
            <tbody>{ApprovedHoldsList}</tbody>
          </table>
        </Fragment>
      )}
      {UnConfirmedHolds && (
        <Fragment>
          <Typography className={classes.TableTitle}>Validate Wire</Typography>
          <table className={classes.Table}>
            {UnConfirmedHoldsListHead}
            <tbody>{UnConfirmedHoldsList}</tbody>
          </table>
        </Fragment>
      )}
    </>
  );
};
export default HoldsTables;
