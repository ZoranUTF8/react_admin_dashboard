import "./widget.scss";
import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(0);
  const [diff, setDiff] = useState(0);
  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        query: "users",
        link: "See all users",
        icon: (
          <PersonIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba:(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "products":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        query: "products",
        link: "See all products",
        icon: (
          <PersonIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba:(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba:(255,0,0,0.2)",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba:(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba:(255,0,0,0.2)" }}
          />
        ),
      };
      break;

    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      const lastMonthQuery = query(
        collection(db, data.query),
        where("createdAt", "<=", today),
        where("createdAt", ">", lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, data.query),
        where("createdAt", "<=", lastMonth),
        where("createdAt", ">", prevMonth)
      );

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery);

      setAmount(lastMonthData.docs.length);
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) /
          prevMonthData.docs.length) *
          100
      );
    };

    fetchData();
  }, []);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"}
          {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>

      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
