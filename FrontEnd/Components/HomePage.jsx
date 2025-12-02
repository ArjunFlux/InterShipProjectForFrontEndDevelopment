import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handlesuccess } from "../utli";
function HomePage() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const naviagte = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);
  const handleClick = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setTimeout(() => {
      handlesuccess("Logout Successfull...");
      naviagte("/login");
    }, 1000);
  };
  return (
    <div className="h-screen pt-50 w-full bg-blue-400">
      <div className=" text-center">
        <p className="text-4xl text-black">
          {loggedInUser ? (
            <div>
              <p className="text-4xl">
                Welcome <span className="text-black">{loggedInUser} ,</span>
                <p className="text-[16px] mt-5 mb-3">This is the authentication and authorization test for the Intership as a frontEnd Developer with <br/> with security features like protected routes and more . Thank you</p>
              </p>
            </div>
          ) : <div>
                <p>Please Login first to see the user details</p>
            </div>}
          {loggedInUser ? (
            <button
              className="border bg-red-500 text-[15px] cursor-pointer px-5 py-2"
              onClick={handleClick}
            >
              Logout
            </button>
          ) : (
            <NavLink to={"/login"}>
              <button className="border text-[15px] bg-yellow-400 text-black px-5 py-2 cursor-pointer">
                Login
              </button>
            </NavLink>
          )}
        </p>
      </div>
    </div>
  );
}
export default HomePage;
