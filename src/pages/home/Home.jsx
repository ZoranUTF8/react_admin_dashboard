import "./home.scss";
import {
  Sidebar,
  Navbar,
  Widget,
  FeaturedCharts,
  NormalCharts,
  TableList,
} from "../../components";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
          <Widget type="products" />
        </div>
        <div className="charts">
          <FeaturedCharts />
          <NormalCharts title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest transactions</div>
          <TableList />
        </div>
      </div>
    </div>
  );
};

export default Home;
