import "./datatable.scss";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

//* example data
import { userColumns } from "../../data/datatablesource";
// import { userRows } from "../../data/datatablesource";
import { Link } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { list } from "firebase/storage";

const Datatable = () => {
  const [userData, setUserData] = useState([]);

  //? fetch data on mount
  useEffect(() => {
    const fetchTableData = async () => {
      let dataList = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          dataList.push({ id: doc.id, ...doc.data() });
        });
        setUserData(dataList);
        console.log("====================================");
        console.log(userData);
        console.log("====================================");
      } catch (error) {
        console.log(error);
      }
    };
    fetchTableData();
  }, []);

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
              <div className="deleteButton"> Delete </div>
            </Link>
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
        rows={userData}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
