import "./single.scss";
import { Navbar, Sidebar, NormalCharts, TableList } from "../../components";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <div className="title">Information</div>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="itemImage"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="itemDetails">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">:janeDoe@gmail.com</span>
                </div>
                <div className="itemDetails">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">:+038 731 231 23</span>
                </div>
                <div className="itemDetails">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    :Elton St. 2314 Garden Yd. NewYork
                  </span>
                </div>
                <div className="itemDetails">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Japan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <NormalCharts
              aspect={3 / 1}
              title={"User Spending last 6 months"}
            />
          </div>
        </div>
        
        <div className="bottom">
          <div className="title">Last transactions</div>

          <TableList />
        </div>
      </div>
    </div>
  );
};

export default Single;
