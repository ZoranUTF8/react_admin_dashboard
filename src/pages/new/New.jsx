import "./new.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Navbar } from "../../components";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { userInputs } from "../../data/formSource";
import { toast } from "react-toastify";
// ? firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db, auth, storage } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function New({ title }) {
  const [file, setFile] = useState("");
  const [user, setUser] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState(null);
  const navigate = useNavigate();

  //? When user changes image upload to storage
  useEffect(() => {
    const uploadFile = () => {
      const uniqueName = new Date().getTime() + file.name;
      const storageRef = ref(storage, uniqueName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + progress + "% done");
          setUploadPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },

        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUser((prev) => ({ ...prev, imgUrl: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleFormChange = (e) => {
    const inputName = e.target.id;
    const inputValue = e.target.value;
    setUser({
      ...user,
      createdAt: serverTimestamp(),
      [inputName]: inputValue,
    });
  };

  //* on submit create user and add to users firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //? Create new user with the email and password
      const res = await createUserWithEmailAndPassword(
        auth,
        user.Email,
        user.Password
      );

      //? Add user to firestore with the users id
      await setDoc(doc(db, "users", res.user.uid), {
        ...user,
        createdAt: serverTimestamp(),
      }).then(
        toast.success("User saved.", {
          position: "bottom-right",
          autoClose: 3000,
        })
      );
    } catch (error) {
      toast.error(error.code, {
        position: "bottom-right",
      });
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1> {title} </h1>
        </div>
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
          </div>
          <div className="right">
            <form onSubmit={(e) => handleSubmit(e)}>
              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label> {input.label} </label>
                  <input
                    name={input.label}
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={(e) => handleFormChange(e)}
                  />
                </div>
              ))}
              <div className="formInput">
                <label htmlFor="fileUpload">
                  Image: <UploadFileIcon className="fileUploadIcon" />
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  style={{
                    display: "none",
                  }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button
                disabled={uploadPercentage !== null && uploadPercentage < 100}
              >
                {" "}
                Add{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
