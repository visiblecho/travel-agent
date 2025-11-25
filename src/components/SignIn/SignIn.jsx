import "./SignIn.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signInService } from "../../services/auth";
import { getUserFromToken, setToken } from "../../utils/token";
import { UserContext } from "../../contexts/UserContext";

const SignIn = () => {
  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorData, setErrorData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorData({ ...errorData, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInService(formData);
      const token = response.data.token
      if (token) setToken(token)
      setUser(getUserFromToken())
      navigate('/trips');
    } catch (error) {
      const res = error.response;
      if (!res) {
        return setErrorData({ message: "Network error. Try again" });
      }
      if (res.status === 500) {
        setErrorData({ message: "Something went wrong. Please try again." });
      } else {
        console.error(res.data.backend);
        setErrorData(res.data.frontend);
      }
    }
  };
  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          {errorData.username && (
            <p className="error-message">{errorData.username}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
          {errorData.password && (
            <p className="error-message">{errorData.password}</p>
          )}
        </div>
        <button type="submit">Sign In</button>
        {errorData.message && (
          <p className="error-message">{errorData.message}</p>
        )}
      </form>
    </>
  );
};

export default SignIn;
