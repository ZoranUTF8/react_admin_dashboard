import "./home.scss";
import {
  Sidebar,
  Navbar,
  Widget,
  FeaturedCharts,
  NormalCharts,
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
        </div>

        <div className="charts">
          <FeaturedCharts />
          <NormalCharts />
        </div>
      </div>
    </div>
  );
};

export default Home;
