import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

import qs from "qs";

import {
  getInquiryShares,
  getInquiryShareViews,
  createHolds,
} from "./../apiCalls/InquiriesSharesCrud";
import dateFormat from "dateformat";
const useStyles = makeStyles((theme) => ({
  myTable: {
    backgroundColor: "white",
    padding: "20px 15px",
    boxShadow: `
    0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%),
    0px 1px 5px 0px rgb(0 0 0 / 12%)
    `,
    width: "100%",
    display: "table",
    borderSpacing: "0",
    borderCollapse: "collapse",

    "& .myTableHead": {
      display: "table-header-group",
    },

    "& .myTableBody": {
      display: "table-header-group",
    },
    "& .myTableRow": {
      color: "inherit",
      display: "table-row",
      outline: "0",
      verticalAlign: "middle",
      "& td, & th": {
        border: "1px solid #ddd",
        padding: "8px",
      },
      "& .actions": {
        display: "flex",
        flexWrap: "wrap",
        "& .TextField": {
          flexBasis: "80%",
          margin: "auto",
          marginBottom: "20px",
        },
        "& .Button": {
          margin: "auto",
          width: "150px",
          maxWidth: "70%",
        },
      },
    },
    "& .myTableRow:nth-child(even)": {
      backgroundColor: "#f2f2f2",
    },
  },
}));

const getFormattedDateFromServer = (date) => {
  date = date.split("-");
  let year = date[0];
  let month = date[1];
  let day = date[2].split("T")[0];
  return month + "/" + day + "/" + year;
};

const List = ({ location }) => {
  const classes = useStyles();

  const history = useHistory();

  const inquiryID = qs.parse(location.search, { ignoreQueryPrefix: true }).id;
  const inquiryCity = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }).city;
  const leadFirstName = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }).leadFirstName;
  const leadLastName = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }).leadLastName;
  const description = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }).description;
  const startDate = qs.parse(location.search, { ignoreQueryPrefix: true })
    .startDate;
  const endDate = qs.parse(location.search, { ignoreQueryPrefix: true })
    .endDate;
  const employeeID = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }).employeeID;
  const brokerID = qs.parse(location.search, { ignoreQueryPrefix: true })
    .brokerID;

  const [InquiryShares, setInquiryShares] = useState(null);
  const [UpdatedInquiryShares, setUpdatedInquiryShares] = useState(null);
  const [Note, setNote] = useState(null);
  const [NoDataMsg, setNoDataMsg] = useState(false);

  useEffect(() => {
    getInquiryShares(inquiryID, employeeID)
      .then((data) => {
        //setNoDataMsg(true)
        setInquiryShares(data.Data);
      })
      .catch((err) => {
        console.log(err);
        setNoDataMsg(true);
      });
  }, [employeeID, inquiryID]);

  useEffect(() => {
    if (InquiryShares) {
      let myUpdatedInquiryShares = [];
      InquiryShares.forEach((InquiryShare) => {
        let myTransactionStatusDate = getFormattedDateFromServer(
          InquiryShare.transactionStatusDate
        );
        InquiryShare.transactionStatusDate = myTransactionStatusDate;
        getInquiryShareViews(InquiryShare.shareID, employeeID).then((data) => {
          InquiryShare = { ...InquiryShare, inquiryShareViews: data.Data };
          myUpdatedInquiryShares.push(InquiryShare);
          setUpdatedInquiryShares([...myUpdatedInquiryShares]);
        });
      });
    }
  }, [InquiryShares, employeeID]);

  const handleHold = (InquiryShareView) => {
    let dateRange = InquiryShareView.dateRange.split(" - ");
    //console.log(dateRange);
    //propertyHoldID: 46, // static because i don't know from where
    //totalHoldPrice,
    //holdStatusID: 2, // static because i don't know from where
    //note: Note,
    let data = {
      startDate: dateRange[0],
      endDate: dateRange[1],
      propertyID: InquiryShareView.propertyID,
      employeeID: employeeID,
      dailyPrice: InquiryShareView.price,
      inquiryID: InquiryShareView.inquiryID,
      brokerID: brokerID,
      note: Note,
    };
    setNote(null);
    createHolds(data)
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch(() => { });
  };

  let UpdatedInquirySharesList = [];
  if (UpdatedInquiryShares) {
    let counter = 1;
    UpdatedInquirySharesList = (
      <table className={classes.myTable}>
        <thead className="myTableHead">
          <tr className="myTableRow">
            <th>Inquiry Share #</th>
            <th>Property Info</th>
          </tr>
        </thead>
        <tbody className="myTableBody">
          {UpdatedInquiryShares.map((UpdatedInquiryShare) => {
            return (
              <>
                <tr key={UpdatedInquiryShare.shareID} className="myTableRow">
                  <td>
                    <p>Search Result #{UpdatedInquiryShare.shareID}</p>
                    <p>{UpdatedInquiryShare.transactionStatusDate}</p>
                  </td>
                  <td></td>
                </tr>
                {UpdatedInquiryShare.inquiryShareViews.map(
                  (InquiryShareView, index) => {
                    counter += 1;
                    return (
                      <tr key={index} className="myTableRow">
                        <td
                          onMouseLeave={(e) => {
                            setNote(null);
                          }}
                        >
                          <div className="actions">
                            <TextField
                              id="outlined-required"
                              label="Note"
                              variant="outlined"
                              color="secondary"
                              className="TextField"
                              onChange={(e) => {
                                setNote(e.target.value);
                              }}
                              onFocus={(e) => {
                                e.target.value = Note;
                              }}
                              onBlur={(e) => {
                                e.target.value = null;
                              }}
                            />
                            <Button
                              className="Button"
                              variant="contained"
                              onClick={() => {
                                handleHold(InquiryShareView);
                              }}
                            >
                              Request Hold
                            </Button>
                            <Button
                              className="Button"
                              variant="contained"
                              onClick={() => {
                                history.push(
                                  `/NegotiatedAgentView/list?propertyID=${InquiryShareView.propertyID}&shareViewID=${InquiryShareView.inquiryShareViewID}&propertyFriendlyName=${InquiryShareView.propertyFriendlyName}&city=${inquiryCity}&startDate=${startDate}&endDate=${endDate}`
                                );
                              }}
                            >
                              Details
                            </Button>
                          </div>
                        </td>
                        <td>
                          <p>{`Reference # ${InquiryShareView.inquiryShareViewID}`}</p>
                          <p>{`${InquiryShareView.propertyFriendlyName} - ${InquiryShareView.dateRange}`}</p>
                          <p>{inquiryCity}</p>
                          <p>{`Total Price: $${InquiryShareView.price}`}</p>
                          <p>{`${InquiryShareView.numberOfBedrooms} Bedrooms | ${InquiryShareView.numberOfBathrooms}`} Bathrooms </p>
                          <p>{`Sleeps: ${InquiryShareView.maxAllowedGuests}`}</p>
                          <p>
                            Bitly:
                            <a
                              href={InquiryShareView.bitlyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {` ${InquiryShareView.bitlyLink}`}
                            </a>
                          </p>
                        </td>
                      </tr>
                    );
                  }
                )}
              </>
            );
          })}
        </tbody>
      </table>
    );
  }

  return UpdatedInquiryShares ? (
    <>
      <h4>Inquiry Shares</h4>
      <br />
      <div>
        <h5
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ marginRight: "40px" }}>
            <strong>Lead Name: </strong>
            {`${leadFirstName} ${leadLastName} - ${description} (${dateFormat(startDate, "mm/dd/yyyy")} - ${dateFormat(endDate, "mm/dd/yyyy")})`}
          </p>
          <p>
            <a
              href="#void"
              onClick={(event) => {
                event.preventDefault();
                history.push(
                  `/MatchedProperties/list?id=${inquiryID}&city=${inquiryCity}&leadFirstName=${leadFirstName}&leadLastName=${leadLastName}&description=${description}&startDate=${startDate}&endDate=${endDate}&employeeID=${employeeID}&brokerID=${brokerID}`
                );
              }}
            >
              Inquiry Matching Properties
            </a>
          </p>
        </h5>
      </div>
      <br />
      {UpdatedInquirySharesList}
    </>
  ) : (
    <div className={"container"}>
      {NoDataMsg ? (
        <h2
          style={{ textAlign: "center", fontSize: "30px", marginTop: "50px" }}
        >
          There Is No Data
        </h2>
      ) : (
        <div className="container spinner-center spinner spinner-primary spinner-lg mr-15"></div>
      )}
    </div>
  );
};

export default List;
