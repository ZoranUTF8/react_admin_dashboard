import "./sidebar.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";

//? Material icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Sidebar() {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" className="linkComponent">
          <span className="logo"> YourDash </span>{" "}
        </Link>{" "}
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title"> MAIN </p>{" "}
          <li>
            <DashboardIcon className="icon" />
            <span> Dashboard </span>{" "}
          </li>{" "}
          <p className="title"> LISTS </p>{" "}
          <Link to="/users" className="linkComponent">
            <li>
              <GroupIcon className="icon" />
              <span> Users </span>{" "}
            </li>{" "}
          </Link>
          <Link to="/products" className="linkComponent">
            <li>
              <CategoryIcon className="icon" />
              <span> Products </span>{" "}
            </li>{" "}
          </Link>
          <li>
            <InventoryIcon className="icon" />
            <span> Orders </span>{" "}
          </li>{" "}
          <li>
            <LocalShippingIcon className="icon" />
            <span> Delivery </span>{" "}
          </li>
          <p className="title"> LINKS </p>{" "}
          <li>
            <QueryStatsIcon className="icon" />
            <span> Stats </span>{" "}
          </li>{" "}
          <li>
            <NotificationsActiveIcon className="icon" />
            <span> Notifications </span>{" "}
          </li>{" "}
          <p className="title"> SERVICE </p>{" "}
          <li>
            <LocalHospitalIcon className="icon" />
            <span> System health </span>{" "}
          </li>{" "}
          <li>
            <LibraryBooksIcon className="icon" />
            <span> Logs </span>{" "}
          </li>{" "}
          <li>
            <SettingsIcon className="icon" />
            <span> Settings </span>{" "}
          </li>
          <p className="title"> USER </p>{" "}
          <li>
            <PersonIcon className="icon" />
            <span> Profile </span>{" "}
          </li>{" "}
          <li>
            <ExitToAppIcon className="icon" />
            <span> Logout </span>{" "}
          </li>{" "}
        </ul>{" "}
      </div>{" "}
      {/* dark mode */}
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
}

export default Sidebar;
