import "./datatable.scss";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

//* example data
import { userColumns } from "../../data/datatablesource";
// import { userRows } from "../../data/datatablesource";
import { Link } from "react-router-dom";

import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Datatable = () => {
  const [userData, setUserData] = useState([]);

  //? fetch data on mount
  useEffect(() => {
    //? We can fetch data or we can use the realtime database listener
    // const fetchTableData = async () => {
    //   let dataList = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       dataList.push({ id: doc.id, ...doc.data() });
    //     });
    //     setUserData(dataList);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchTableData();

    //? Realtime db view ( no need to refresh the page)

    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list = [];

        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUserData(list);
      },
      (error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    );

    return () => {
      unsub();
    };
  }, []);

  //* Delete function
  async function deleteUser(userId) {
    try {
      await deleteDoc(doc(db, "users", userId));
      console.log("deleted");
      setUserData(userData.filter((user) => user.id !== userId));
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }
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
              <div className="viewButton"> View </div>{" "}
            </Link>
            <div
              className="deleteButton"
              onClick={() => deleteUser(params.row.id)}
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
