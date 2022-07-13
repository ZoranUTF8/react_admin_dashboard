import "./datatable.scss";

import { DataGrid } from "@mui/x-data-grid";

import { userColumns } from "../../data/datatablesource";
import { userRows } from "../../data/datatablesource";
import { Link } from "react-router-dom";
const Datatable = () => {
  //* Action buttons in the table
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <div className="cellAction">
            <Link to="/users/test" className="linkComponent">
              <div className="viewButton"> View </div>{" "}
            </Link>
            <Link to="/users/test" className="linkComponent">
              <div className="deleteButton"> Delete </div>{" "}
            </Link>{" "}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link to="/users/new" className="linkComponent">
          Add New User{" "}
        </Link>{" "}
      </div>{" "}
      <DataGrid
        className="dataGrid"
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
