import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userVM } from "../pages/Login";

const Navbar = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<userVM | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Queue Management System</h1>
        </Link>
        <nav>
          {currentUser && (
            <div>
              <span>{currentUser.userName}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!currentUser && (
            <div>
              <Link to="/login">Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
