import React from "react";
import MaterialTable from "material-table";
import { DataGrid } from '@material-ui/data-grid';
function CellEditTable({ error, Columns, TableData, handleTableData }) {
  const Title = () => {
    return (
      <h2 style={{ color: error ? "rgb(240, 24, 166)" : null, marginTop: 20 }}>
        Pricing Grid
      </h2>
    );
  };

  return (
    <div style={{ marginBottom: 80, height: 250, width: '100%' }}>
      <Title />
      <DataGrid rows={TableData} columns={Columns} pageSize={5} disableColumnMenu />
    </div>
  );
}
export default CellEditTable;
