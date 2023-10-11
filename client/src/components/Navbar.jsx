import React from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../Redux/UserRedux";
import axios from "axios";

const Navbar = () => {
  // Getting User from redux

  const user = useSelector((state) => state?.user?.currentUser);

  // Changing the redux user state to null and deleting the user fromn localStorage and hitting the api to delete the jwt cookie

  const signOut = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true
      const res = await axios.post("http://localhost:5000/auth/logout");

      if (res.status === 200) {
        logout();
        localStorage.removeItem("user");
        window.location.reload();
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <h2>NOTES</h2>
      </div>
      <div className="right">
        {user?._id ? (
          <div>
            <h3>{user?.name}</h3>
            <button onClick={signOut}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to={"/register"}>
              <button>Sign Up</button>
            </Link>
            <Link to={"/login"}>
              <button>Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
