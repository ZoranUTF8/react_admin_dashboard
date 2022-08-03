import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { UserContext } from "./context/userContext";
import { Home, Login, List, Single, New, ProtectedPage } from "./pages";
//? Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//?dark style
import "./pages/darkStyle/dark.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(UserContext);

  const ProtectedPage = ({ children }) => {
    return currentUser ? children : <Navigate to={"/login"} />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedPage>
                  <Home />
                </ProtectedPage>
              }
            />
            <Route path="login" element={<Login />} />

            <Route path="users">
              <Route
                index
                element={
                  <ProtectedPage>
                    <List />
                  </ProtectedPage>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedPage>
                    <Single />
                  </ProtectedPage>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedPage>
                    <New title={"Add new user"} />
                  </ProtectedPage>
                }
              />
            </Route>

            <Route path="products">
              <Route
                index
                element={
                  <ProtectedPage>
                    <List />
                  </ProtectedPage>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedPage>
                    <Single />
                  </ProtectedPage>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedPage>
                    <New title={"Add new user"} />
                  </ProtectedPage>
                }
              />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
