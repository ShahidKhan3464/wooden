import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
//import LinkIcon from "@material-ui/icons/Link";
//import EventIcon from "@material-ui/icons/Event";
//import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
const useStyles = makeStyles((theme) => ({
  nestedData: {
    padding: "20px",
  },
  row: {
    padding: "15px 0",
    display: "flex",
    "&:not(:last-of-type)": {
      borderBottom: "1px solid #d5d5d5",
    },
    "& h3": {
      marginRight: "20px",
    },
  },
  Image: {
    flexBases: "80%",
    aspectRatio: "2/1",

    transition: ["transform"],
    transitionDuration: 300,
    transitionTimingFunction: "cubic-bezier(0.35, -0.59, 0.47, 0.97)",
    //transition: "transform 3s ease-in-out",

    //transitionProperty: "transform",
    //transitionDuration: "2s",
    //transition-timing-function: linear;
    //transition-delay: 1s;

    "& img": {
      width: "100%",
      height: "100%",
    },
    "& :hover": {
      transform: "scale(1.1)",
    },
  }

}));

const DataTable = (props) => {
  //console.log("this is props" ,props);
  const classes = useStyles();

  const history = useHistory();

  let actions = [];
  if (props.Update) {
    actions.push({
      icon: () => <i className="fas fa-edit"></i>,
      //icon: "update",
      tooltip: "Update",
      onClick: (event, rowData) => {
        if (rowData?.held === 1 || rowData?.booked === 1) {
          alert("This inquiry is being booked or held !")
          // Todo : some sort of alert
        } else {
          props.getRowData(rowData[props.rowID]);
          props.handleOpenModal();
          props.setUpdateModal(true);
        }

        //console.log("rowData: ", rowData)
      },
    });
  }

  if (props.Delete) {
    actions.push({
      icon: () => props.Delete,
      tooltip: "Delete",
      onClick: (event, rowData) => {
        props.getRowData(rowData[props.rowID]);
      },
    });
  }

  if (props.Link) {
    actions.push({
      icon: () => <i className="fas fa-home"></i>,
      tooltip: "Go to Matched Properties",
      onClick: (event, rowData) => {
        //Note :: removed from url because of hash "description=${rowData.description}&"
        history.push(
          `/MatchedProperties/list?id=${rowData.inquiryID}&employeeID=${props.EmployeeID}&brokerID=${props.BrokerID}&city=${rowData.city}&leadFirstName=${rowData.leadFirstName}&leadLastName=${rowData.leadLastName}&startDate=${rowData.startDate}&endDate=${rowData.endDate}&description=${rowData.description}`
        );
      },
    });
  }

  if (props.InquiriesShare) {
    actions.push({
      icon: () => <i className="fas fa-share"></i>,
      tooltip: "Go to Inquiries Share",
      onClick: (event, rowData) => {
        history.push(
          `/InquiriesShares/list?id=${rowData.inquiryID}&city=${rowData.city}&leadFirstName=${rowData.leadFirstName}&leadLastName=${rowData.leadLastName}&description=${rowData.description}&startDate=${rowData.startDate}&endDate=${rowData.endDate}&employeeID=${props.EmployeeID}&brokerID=${props.BrokerID}`
        );
      },
    });
  }

  if (props.calendar) {
    actions.push({
      icon: () => <i className="fas fa-calendar"></i>,
      tooltip: "View Property Calendar",
      onClick: (event, rowData) => {
        props.handlePropertyCalendarButton(
          rowData.propertyID,
          rowData.propertyFriendlyName
        );
      },
    });
  }

  if (props.SelectedDataResetter) {
    console.log("good");
  }

  let options = {
    pageSize: 10,
    pageSizeOptions: [10, 20, 30],
    filtering: true,
  };

  let onSelectionChange = undefined;

  if (props.CheckBox) {
    options.selection = true;
    onSelectionChange = (rows) => {
      console.log(rows);
      props.handleSelectedRows(rows);
    };
  }

  let detailPanel = (rowData) => {
    let rows = [];
    for (const field of props.nestedFields) {
      if (field.field === "imageFilePath") {
        let imgSrc = "default_property_image"; // where is this default in PHP
        if (rowData.imageFilePath.search("https") !== -1) {
          imgSrc = rowData.imageFilePath;
        }
        rows.push(
          <div key={Math.random()} className={classes.row}>
            <h3>{field.title}</h3>
            <div className={classes.Image}>
              <img src={imgSrc} style={{ objectFit: "contain" }} alt="VillaImage" />
            </div>
          </div>
        );
      } else {
        rows.push(
          <div key={Math.random()} className={classes.row}>
            <h3>{field.title}</h3>
            <p>{rowData[field.field]}</p>
          </div>
        );
      }
    }
    return <div className={classes.nestedData}>{rows}</div>;
  };

  const handleRowClick = (event, rowData, togglePanel) => {
    if (props.openPropertyDetails) {
      props.handlePropertyCalendarButton(
        rowData.propertyID,
        rowData.propertyFriendlyName
      );
    }
    if (props.nestedFields) {
      togglePanel();
    }

  }

  return (
    <div className={props.className} style={{ maxWidth: "100%" }}>
      <MaterialTable
        style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", borderRadius: "10px" }}
        columns={props.columns}
        data={props?.data}
        title={props.title}
        actions={actions}
        options={options}
        onSelectionChange={onSelectionChange}
        detailPanel={props.nestedFields ? detailPanel : null}
        onRowClick={handleRowClick}
      // onRowClick={
      //   props.nestedFields
      //     ? (event, rowData, togglePanel) => togglePanel()
      //     : null
      // }
      />
    </div>
  );
};

export default DataTable;
