import "./login.scss";
import { useState, useContext } from "react";
import { handleFirebaseLogin } from "../../firebase/firebase";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

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
        dispatch({ type: "LOGIN", payload: { user } });
        navigate("/");
      }
    } catch (error) {
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
