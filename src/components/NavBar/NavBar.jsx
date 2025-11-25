import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const NavBar = () => {
    const { user } = useContext(UserContext)
    console.log('User', user)
  return (
    <header>
      <div id="brand-logo">
        <Link to="/">🏝️ Travel Agent 🏝️</Link>
      </div>

      <nav className="navbar">
        <Link to="/auth/sign-in">Sign In</Link>
        <Link to="/auth/sign-up">Create an account</Link>
      </nav>
    </header>
  );
};

export default NavBar;
