import "./datatable.scss";

import { DataGrid } from "@mui/x-data-grid";

import { userColumns } from "../../data/datatablesource";
import { userRows } from "../../data/datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
const Datatable = () => {
  const [data, setData] = useState(userRows);

  //?Delete row

  const handleDelete = (id) => {
    console.log("hjere");
    setData(data.filter((item) => item.id !== id));
  };

  //* Action buttons in the table
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" className="linkComponent">
              <div className="viewButton"> View </div>
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <Link to="/users/new" className="linkComponent">
          Add New User
        </Link>
      </div>
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
