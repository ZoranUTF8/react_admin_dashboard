import "./new.scss";
import { useState } from "react";
import { Sidebar, Navbar } from "../../components";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { userInputs } from "../../data/formSource";
import {
  createUserAndSaveToFB,
  uploadFileToFBStorage,
} from "../../firebase/firebase";
import { useEffect } from "react";

function New({ title }) {
  const [file, setFile] = useState("");
  const [user, setUser] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    if (file) {
      uploadFileToFBStorage(file).then((res) =>
        setUser((prev) => ({
          ...prev,
          img: res.imgUrl,
        }))
      );
    }
  }, [file]);

  const handleFormChange = (e) => {
    const inputId = e.target.id;
    const inputValue = e.target.value;

    setUser({
      ...user,
      [inputId]: inputValue,
    });
  };

  const handleSubmit = async (e) => {
    setDisabledButton(true);
    e.preventDefault();
    createUserAndSaveToFB(user);
    setDisabledButton(false);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1> {title} </h1>{" "}
        </div>{" "}
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.allianceplast.com%2Fwp-content%2Fuploads%2Fno-image-1024x1024.png&f=1&nofb=1"
              }
              alt="user image"
            />
          </div>{" "}
          <div className="right">
            <form onSubmit={(e) => handleSubmit(e)}>
              {" "}
              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label> {input.label} </label>{" "}
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={(e) => handleFormChange(e)}
                  />{" "}
                </div>
              ))}
              <div className="formInput">
                <label htmlFor="fileUpload">
                  Image: <UploadFileIcon className="fileUploadIcon" />
                </label>{" "}
                <input
                  type="file"
                  id="fileUpload"
                  style={{
                    display: "none",
                  }}
                  onChange={(e) => setFile(e.target.files[0])}
                />{" "}
              </div>{" "}
              <button disabled={disabledButton}> Add </button>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default New;
