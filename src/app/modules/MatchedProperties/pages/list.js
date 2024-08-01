import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import DataTable from "../../../../components/dataTable";

import qs from "qs";

import {
  getMatchedProperties,
  createInquiriesShare,
} from "./../apiCalls/MatchedPropertiesCrud";
import dateFormat from "dateformat";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& h5": {
      height: "100%",
      marginBottom: "0",
    },
  },
}));

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
  let selectedData = [];
  const [ListData, setListData] = useState([]);
  const [MessageState, setMessageState] = useState("");
  const [MessageSuccess, setMessageSuccess] = useState("");
  const [DisableBTN, setDisableBTN] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (ListData?.length === 0 || !ListData) {
      getMatchedProperties(employeeID, brokerID, inquiryID)
          .then((data) => {
            setListData(data.Data);
          })
          .catch((err) => {
            console.log(err);
          }).then(() => {
            setLoading(false);
      });
    }
  }, [employeeID, brokerID, inquiryID]);

  const handleSelectedRows = (rows) => {
    selectedData = [...rows];
  };

  const handleCreateInquiriesShare = () => {
    setDisableBTN(true);
    let inquiriesShare = selectedData.map((row) => {
      return {
        inquiryID: row.inquiryID,
        propertyID: row.propertyID,
        status: row.propertyAvailabilityStatus,
        dateRange: `${row.startDate} - ${row.endDate}`,
        price: row.dsp,
      };
    });

    createInquiriesShare(employeeID, inquiriesShare)
      .then((response) => {
        if (response?.status === 200) {
          setMessageState("show");
          setMessageSuccess("success");
          //DataTable.forceUpdate();
          //location.reload();
        } else {
          setMessageState("show");
          setMessageSuccess("failed");
        }
      })
      .catch((err) => {
        console.log(err);
        setMessageState("show");
        setMessageSuccess("failed");
      })
      .then(() => {
        setDisableBTN(false);
        history.push(
          `/InquiriesShares/list?id=${inquiryID}&city=${inquiryCity}&leadFirstName=${leadFirstName}&leadLastName=${leadLastName}&description=${description}&startDate=${startDate}&endDate=${endDate}&employeeID=${employeeID}&brokerID=${brokerID}`
        );
        //onClick={(event) => {
        //  event.preventDefault();
        //}}
      });
  };

  let message = null;
  if (MessageState === "show" && MessageSuccess === "success") {
    message = (
      <Alert style={{ marginBottom: "20px" }} severity="success">
        Shares created successfully
      </Alert>
    );
    setTimeout(() => {
      setMessageState("");
      setMessageSuccess("");
    }, 3000);
  }
  if (MessageState === "show" && MessageSuccess === "failed") {
    message = (
      <Alert style={{ marginBottom: "20px" }} severity="error">
        Some Thing Went Wrong
      </Alert>
    );
    setTimeout(() => {
      setMessageState("");
      setMessageSuccess("");
    }, 3000);
  }

  return !Loading ? (
    <>
      {message}
      <h5
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ marginRight: "40px" }}>
          <strong>Lead Name: </strong>
          {`${leadFirstName} ${leadLastName} - ${description} (${dateFormat(startDate ,"mm/dd/yyyy")} - ${dateFormat(endDate ,"mm/dd/yyyy")})`}
        </p>
      </h5>
      <div className={classes.buttons}>
        <Button
          onClick={handleCreateInquiriesShare}
          variant="contained"
          color="secondary"
          disabled={DisableBTN}
        >
          Create Inquiries Share
        </Button>
        <h5>
          <a
            href="#void"
            onClick={(event) => {
              event.preventDefault();
              history.push(
                `/InquiriesShares/list?id=${inquiryID}&city=${inquiryCity}&leadFirstName=${leadFirstName}&leadLastName=${leadLastName}&description=${description}&startDate=${startDate}&endDate=${endDate}&employeeID=${employeeID}&brokerID=${brokerID}`
              );
            }}
          >
            Inquiry Shares
          </a>
        </h5>
      </div>
      <DataTable
        handleSelectedRows={handleSelectedRows}
        CheckBox
        columns={[
          { title: "Property Name", field: "propertyFriendlyName" },
          { title: "City", field: "city" },
          { title: "Status", field: "propertyAvailabilityStatus" },
          { title: "From", field: "startDate" },
          { title: "To", field: "endDate" },
          {
            render: (row) => {
              let myObj = {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              };
              return row.dsp.toLocaleString("en-US", myObj);
            },
            title: "Price",
            field: "dsp",
          },
        ]}
        title={"Matched Properties"}
        data={ListData}
      />
    </>
  ) : (
    <div className={"container"}>
      <div className="container spinner-center spinner spinner-primary spinner-lg mr-15"></div>
    </div>
  );
};

export default List;
