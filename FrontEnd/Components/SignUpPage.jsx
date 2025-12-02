import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handlesuccess, handleError } from "../utli";
import { ToastContainer } from "react-toastify";
export default function SignUpPage() {
  const [loginInfo, setloginInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setloginInfo(copyLoginInfo);
  };
  const handlelogin = async (e) => {
    e.preventDefault();
    const { name, email, password } = loginInfo;
    if (!name || !email || !password) {
      return handleError(
        "name email and password are required for the successful signin.."
      );
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtTok, name, error } = result;
      if (success) {
        handlesuccess(`Sign Up Sccussfully User : ${loginInfo.name}`);
        localStorage.setItem("token", jwtTok);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="bg-blue-400 h-screen">
      <div className="pt-40">
        <form onSubmit={handlelogin}>
          <p className="text-center text-3xl font-bold text-black">
            Sign In Your Account
          </p>
          <div className="text-center mt-5">
            <input
              onChange={handlechange}
              type="name"
              name="name"
              placeholder="Enter the Username here : "
              className="border border-gray-400 bg-white text-black w-[30%] px-3 h-[6vh]"
              value={loginInfo.name}
            />
            <br />
            <input
              onChange={handlechange}
              type="email"
              name="email"
              placeholder="Enter the EmailId here : "
              className="border border-gray-400 w-[30%] bg-white text-black px-3 h-[6vh] mt-5"
              value={loginInfo.email}
            />
            <br />
            <input
              onChange={handlechange}
              type="password"
              name="password"
              placeholder="Enter the password here : "
              className="border border-gray-400 w-[30%] bg-white text-black px-3 h-[6vh] mt-5"
              value={loginInfo.password}
            />
          </div>
          <div className="flex justify-end mr-[35%] gap-50 mt-3 text-[15px]">
            <Link to={"/login"}>
              <p className="cursor-pointer text-black">Login into account</p>
            </Link>
          </div>
          <div className="flex justify-center mt-5">
            <button
              className="border px-5 py-2 bg-yellow-500 font-bold text-white cursor-pointer"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
