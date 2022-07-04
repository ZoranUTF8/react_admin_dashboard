import "./home.scss";
import { Sidebar, Navbar, Widget } from "../../components";

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

        <div className="charts"></div>
      </div>
    </div>
  );
};

export default Home;
