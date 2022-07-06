import "./list.scss";
import { Sidebar, Navbar, Datatable } from "../../components";

const List = () => {
  return (
    <div className="list">
      <Sidebar />

      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
