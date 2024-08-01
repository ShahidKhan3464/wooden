import React, { useState, useEffect, useCallback } from "react";
import { Modal, Box, makeStyles } from "@material-ui/core";
import { getProperties, getFeaturedProperties } from "../apiCalls/propertyCrud";
import TableSearchHandling from "../../../../components/tableSearchHandling";
import CustomButton from "../../../../components/customButton";
import CustomAlert from "../../../../components/customAlert";
import MaterialTable from "material-table";
import CustomPagination from "../../../../components/pagination/Pagination";
import { nopicture } from "../../../../img";
import {
  createFeaturedProperty,
} from "../apiCalls/propertyCrud";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  p: 4,
  height: "90vh",
  overflow: "auto",
};

const Index = ({
  open,
  setOpen,
  BrokerID,
  EmployeeID,
  PropertyTransactionStatusID,
  TransactionStatusID,
  featuredPropertyState,
  propertySelectedId,
  Locations
}) => {
  const classes = useStyles();

  const [ListData, setListData] = useState([]);
  const [selectedProperty, setselectedProperty] = useState([]);
  const [searchSelectedValue, setsearchSelectedValue] = useState(
    "name"
  );
  const [searchInputValue, setsearchInputValue] = useState("");


  console.log(Locations, 'Locations');

  useEffect(() => {
    getProperties(BrokerID, PropertyTransactionStatusID)
      .then((data) => {
        return data.Data;
      })
      .then((data) => {
        const dynamicData = data.map((item) => {
          return {
            propertyId: item.propertyID,
            image: item.imageFilePath ? (
              <img
                className={classes.bodyCellImage}
                src={item.imageFilePath}
                alt='tableListProduct'
              />
            ) : (
              <img
                className={classes.bodyCellImage}
                src={nopicture}
                alt='nopicture'
              />
            ),
            name: item.propertyFriendlyName,
            city: item.city,
            location: item.location,
          };
        });
        setListData(dynamicData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [BrokerID, PropertyTransactionStatusID]);

  const searchInputHandler = (value) => {
    setsearchInputValue(value.trim());
  };


  const searchSelctionHanlder = (value) => {
    if (value === 'name') {
      setsearchSelectedValue('name')
    }
    else if (value === 'city') {
      setsearchSelectedValue('city')
    }
    else if (value === 'location') {
      setsearchSelectedValue('location')
    }
  }

  const searchedTest = searchInputValue === '' ? ListData : ListData?.filter((c) => (c[searchSelectedValue].toLowerCase().includes(searchInputValue?.toLowerCase())))


  const navigateHandler = useCallback(async () => {
    if (selectedProperty.length) {
      const newObj = selectedProperty[0]

      await createFeaturedProperty(EmployeeID, newObj)
        .then((res) => {
          CustomAlert(res.Messages[0], 'success')
          setOpen(false)
          setselectedProperty([])
        })
        .then(() => {
          getFeaturedProperties(BrokerID, propertySelectedId)
            .then((data) => {
              featuredPropertyState(data.Data);
            })
            .catch((err) => {
              featuredPropertyState([]);
            })
        })
        .catch((err) => {
          CustomAlert('Some thing went wrong', 'error')
        });
    }
    else {
      alert('Please select property', 'warning')

    }


  }, [EmployeeID, selectedProperty]);



  const sortingHadler = (order) => {
    if (order === "asc") {
      const sorted = ListData.sort((a, b) =>
        a.propertyFriendlyName.toLowerCase() >
          b.propertyFriendlyName.toLowerCase()
          ? 1
          : -1
      );
      setListData([...sorted]);
    } else if (order === "dsc") {
      const sorted = ListData.sort((a, b) =>
        a.propertyFriendlyName.toLowerCase() <
          b.propertyFriendlyName.toLowerCase()
          ? 1
          : -1
      );
      setListData([...sorted]);
    }
  };

  const tableColumn = [
    {
      title: "Image",
      field: "image",
    },
    { title: "Name", field: "name" },
    { title: "City", field: "city" },
    { title: "Location", field: "location" },
  ];

  const featuredPropertySelector = (data) => {
    const dynamicArray = data.map((item) => {
      return {
        propertyID: item.propertyId,
        locationID:
          item.location === "Aspen"
            ? 1
            : item.location === "Miami"
              ? 3
              : item.location === "Fort Lauderdale"
                ? 6
                : 1,
        brokerID: BrokerID,
        transactionStatusID: TransactionStatusID,
        displayOrder: 2,
      }
    })
    setselectedProperty(dynamicArray)
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Box display='flex' justifyContent='space-between'>
          <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} asc={true} />
          <CustomButton
            click={navigateHandler}
            type='button'
            text='ADD'
            radius='10px'
            color='white'
            bgColor='#5C58A5'
            width='50px'
            height='51px'
            fontSize='14px'
          />
        </Box>

        <Box mt={4} mb={2}>
          <div className='propertiProductListing'>
            <MaterialTable
              data={searchedTest}
              columns={tableColumn}
              isLoading={!ListData}
              options={{
                search: false,
                toolbar: false,
                selection: true,
                showTitle: false,
                actionsCellStyle: {
                  backgroundColor: "#ffccdd",
                  color: "#FF00dd",
                },
              }}
              components={{
                // Pagination: (props) => {
                //   // return <CustomPagination {...props} />;
                // },
              }}
              onSelectionChange={featuredPropertySelector}
            //   detailPanel={props.nestedFields ? detailPanel : null}
            //   onRowClick={handleRowClick}
            />
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default Index;

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
