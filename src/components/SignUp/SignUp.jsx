import "./SignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { signUpService } from "../../services/auth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      await signUpService(formData);
      navigate("/auth/sign-in");
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
      <h1>Create an account</h1>
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
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          {errorData.email && (
            <p className="error-message">{errorData.email}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          {errorData.password && (
            <p className="error-message">{errorData.password}</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Your Password"
            onChange={handleChange}
            required
          />
          {errorData.confirmPassword && (
            <p className="error-message">{errorData.confirmPassword}</p>
          )}
        </div>

        <button type="submit">Create account</button>
        {errorData.message && (
          <p className="error-message">{errorData.message}</p>
        )}
      </form>
    </>
  );
};

export default SignUp;
