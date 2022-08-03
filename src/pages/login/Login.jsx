import "./login.scss";
import { useState, useContext } from "react";
import { handleFirebaseLogin } from "../../firebase/firebase";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { dispatch } = useContext(UserContext);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await handleFirebaseLogin({
        userPassword: password,
        userEmail: email,
      });

      if (user) {
        toast.success("Logged in, transfering in 3 seconds...", {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch({ type: "LOGIN", payload: { user } });
        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
    } catch (error) {
      toast.error("Wrong email or password", {
        position: "bottom-right",
      });
      const errorMessage = error.code + error.message;
      setError(errorMessage);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
};

export default Login;
