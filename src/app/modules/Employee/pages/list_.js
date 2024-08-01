import React, { useState, useEffect, useCallback } from "react";
import MaterialTable, { MTableBodyRow } from "material-table";
import { useHistory } from "react-router-dom";
import { getEmployees, updateEmployee, readAnEmployee } from "../apiCalls/EmployeeCrud";
import { BoxContainer, PrimaryHeading, tableContent, lastColumnsContent, useStyles } from "../../../baseStyle";

import CustomButton from "../../../../components/customButton/index";
import CustomDropDown from "../../../../components/customDropDown";
import CustomPagination from "../../../../components/pagination/Pagination";
import TableSearchHandling from "../../../../components/tableSearchHandling";
import CustomAlert from "../../../../components/customAlert";

import { EmployeeListContainer } from "./style";

const List = ({ EmployeeID, BrokerID, TransactionStatusID }) => {
  const classes = useStyles()
  const history = useHistory();
  const [ListData, setListData] = useState(null);
  const [loadingCarsData, setloadingCarsData] = useState(true);
  const [searchInputValue, setsearchInputValue] = useState("");
  const [searchSelectedValue, setsearchSelectedValue] = useState("employeeFirstName");
  const tableOptions = ["View Details", "Edit", "Delete"];

  const tableColumn = [
    {
      title: "Name", field: "name",
      cellStyle: tableContent,
      headerStyle: { fontFamily: 'Manrope' }
    },
    {
      title: "Email", field: "email",
      cellStyle: lastColumnsContent,
      headerStyle: { fontFamily: 'Manrope' }
    },
    {
      title: "",
      field: "action",
      cellStyle: { textAlign: 'right' },
      headerStyle: { textAlign: 'right' },
      render: (item) => (
        <CustomDropDown tableOptions={tableOptions} tableMunuHandler={tableMunuHandler} data={item} />
      ),
    },
  ];

  useEffect(() => {
    if (ListData?.length === 0 || !ListData) {
      getEmployees(EmployeeID, BrokerID, TransactionStatusID)
        .then((data) => {
          if (data.Data != null) {
            setListData(data.Data);
          } else {
            setListData([]);
          }
          setloadingCarsData(false);
        })
        .catch((err) => {
          setloadingCarsData(false);
          console.log(err);
        });
    }
  }, [ListData, BrokerID, EmployeeID]);


  const searchedValue = ListData?.filter((item) =>
    searchInputValue === ""
      ? item
      : item[searchSelectedValue]
        .toLowerCase()
        .includes(searchInputValue?.toLowerCase())
  );
  const tableData = searchedValue?.map((item) => {
    return {
      id: item.employeeID,
      name: item.employeeFirstName + item.employeeLastName,
      email: item.email,
    };
  });

  const tableMunuHandler = async (option, value) => {

    const { Data } = await readAnEmployee(EmployeeID, value.id)

    if (option === "View Details") {
      history.push(`/Employee/viewemployeedetail/${value.id}`);
    } else if (option === "Edit") {
      history.push(`/Employee/editemployee/${value.id}`);
    } else if (option === "Delete") {
      const formData = { ...Data[0], transactionStatusID: 0 };
      deleteEmployeeHandler(formData)
    }
  };

  const deleteEmployeeHandler = useCallback((formData) => {
    setListData([])
    setloadingCarsData(true)
    updateEmployee(EmployeeID, BrokerID, formData)
      .then((res) => {
        getEmployees(EmployeeID, BrokerID, TransactionStatusID)
          .then((data) => {
            if (data.Data != null) {
              setListData(data.Data);
            } else {
              setListData([]);
            }
            setloadingCarsData(false);
          })
          .catch((err) => {
            setloadingCarsData(false);
            console.log(err);
          });
      })
      .catch((error) => {
        console.log("error");
        CustomAlert("Some thing went wrong", "error");
      });
  }, [])


  const searchInputHandler = (value) => {
    setsearchInputValue(value.trim());
  };

  const searchSelctionHanlder = (value) => {
    if (value === "name") {
      setsearchSelectedValue("propertyFriendlyName");
    } else if (value === "city") {
      setsearchSelectedValue("city");
    } else if (value === "location") {
      setsearchSelectedValue("location");
    }
  };

  const sortingHadler = (order) => {
    if (order === "asc") {
      const sorted = ListData.sort((a, b) =>
        a.employeeFirstName.toLowerCase() > b.employeeFirstName.toLowerCase()
          ? 1
          : -1
      );
      setListData([...sorted]);
    } else if (order === "dsc") {
      const sorted = ListData.sort((a, b) =>
        a.employeeFirstName.toLowerCase() < b.employeeFirstName.toLowerCase()
          ? 1
          : -1
      );
      setListData([...sorted]);
    }
  };

  const navigateHandler = () => {
    history.push("/Employee/addnewemployee");
  };

  return (
    <EmployeeListContainer>
      <BoxContainer>
        <TableSearchHandling
          searchInputHandler={searchInputHandler}
          searchSelctionHanlder={searchSelctionHanlder}
          sortingHadler={sortingHadler}
        />
        <CustomButton type='button' click={navigateHandler} text='Create Employee' />
      </BoxContainer>
      <div className='employeeListing_content'>
        <div className='employeeListing_heading'>
          <PrimaryHeading>Employees</PrimaryHeading>
        </div>
        <MaterialTable
          data={tableData}
          columns={tableColumn}
          isLoading={loadingCarsData}
          //   actions={actions}
          options={{ search: false, toolbar: false, showTitle: false }}
          components={{
            // Pagination: (props) => {
            //   // return <CustomPagination {...props} />;
            // },
            Row: (props) => {
              return <MTableBodyRow className={classes.tableRow} {...props} />
            }
          }}
        //   onSelectionChange={onSelectionChange}
        //   detailPanel={props.nestedFields ? detailPanel : null}
        //   onRowClick={handleRowClick}
        />
      </div>
    </EmployeeListContainer>
  );
};

export default List;
