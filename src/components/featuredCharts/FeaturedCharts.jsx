import "./featuredCharts.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import "react-circular-progressbar/dist/styles.css";

const FeaturedCharts = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title"> Total revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={2} />
        </div>
        <p className="title">Total sales today</p>
        <p className="amount">$428</p>
        <p className="desc">
          Previous transaction processing. Recent payments may not be included
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult">
              <KeyboardArrowUpIcon fontSize={"small"} />
              <div className="resultAmount">12k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult">
              <KeyboardArrowUpIcon fontSize={"small"} />
              <div className="resultAmount">12k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult">
              <KeyboardArrowUpIcon fontSize={"small"} />
              <div className="resultAmount">12k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCharts;
