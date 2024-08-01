import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import CustomDropDown from "../../../../components/customDropDown";

import { nopicture } from "../../../../img";

import CustomPagination from "../../../../components/pagination/Pagination";

const PropertyTable = ({ deleteReviewHandler, data }) => {
  const classes = useStyles();
  const history = useHistory()

  const tableMunuHandler = (option, value) => {
    if (option === "DELETE") {
      deleteReviewHandler(value)
    }
    else if (option === 'VIEW DETAILS') {
      history.push(`/reviews/viewreviewsdetail/${value.propertyId}`)
    }
    else if (option === 'EDIT') {
      history.push(`/reviews/editreviews/${value.propertyId}`);
    }
    return;
  };

  const tableColumn = [
    {
      title: "Image",
      field: "image",
      headerStyle: {
        backgroundColor: "red",
      },
    },

    {
      title: "Name",
      field: "name",
    },
    {
      title: "Rating",
      field: "rating",
    },
    {
      title: "",
      field: "action",
      render: (item) => (
        <CustomDropDown
          tableOptions={tableOptions}
          tableMunuHandler={tableMunuHandler}
          data={item}
        />
      ),
    },
  ];

  const tableData = data?.map((item) => {
    return {
      propertyId: item.reviewID,
      image: item.thumbnailImage ? (
        <img
          className={classes.bodyCellImage}
          src={item.thumbnailImage}
          alt='tableListProduct'
        />
      ) : (
        <img
          className={classes.bodyCellImage}
          src={nopicture}
          alt='nopicture'
        />
      ),
      rating: item.numberOfStars,
      name: item.authorFirstName + item.authorLastName,
    };
  });

  return (
    <div className='propertiProductListing'>
      <MaterialTable
        columns={tableColumn}
        data={tableData}
        isLoading={!data}
        //   actions={actions}
        options={{
          search: false,
          showTitle: false,
          toolbar: false,
          // paging: false,
          actionsCellStyle: {
            backgroundColor: "#ffccdd",
            color: "#FF00dd",
          },
        }}
        components={{
          // Pagination: (props) => {
          //   return <CustomPagination {...props} />;
          // },
        }}
      //   onSelectionChange={onSelectionChange}
      //   detailPanel={props.nestedFields ? detailPanel : null}
      //   onRowClick={handleRowClick}
      />
    </div>
  );
};

export default PropertyTable;

const tableOptions = ["VIEW DETAILS", "EDIT", "DELETE"];

const useStyles = makeStyles(() => ({
  bodyCellImage: {
    width: "119px",
    height: "88px",
    objectFit: "cover",
  },
  rootTable: {
    "& .MuiTableHead-root": {
      backgroundColor: "transparent",
    },
  },
}));
