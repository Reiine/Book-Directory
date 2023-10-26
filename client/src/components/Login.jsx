import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ handleUser, handleAuthToken, handleIsLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleEmail = (e) => {
    setEmail(e);
  };
  const handlePass = (e) => {
    setPass(e);
  };

  async function submit() {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        pass,
      });
      const data = response.data;
      if (data.message === "error") {
        toast.error("Please check you login info and try again.");
        handleIsLogin(false);
      } else if (data.message === "logsuccess") {
        handleIsLogin(true);
        handleUser(data.user);
        handleAuthToken(data.token);
        navigate("/home");
      }
    } catch (error) {
      console.log("error sending data:", error);
    }
  }

  const handleRoute = () => {
    handleIsLogin(true);
    navigate("/login");
  };
  return (
    <>
      <div className="register-cover">
        <div className="form">
          <h1>Login</h1>
          <hr />
          <label htmlFor="email">Email: </label>
          <br />
          <input type="email" onChange={(e) => handleEmail(e.target.value)} />
          <br />
          <label htmlFor="password">Password: </label>
          <br />
          <input type="password" onChange={(e) => handlePass(e.target.value)} />
          <br />
          <button id="log-btn" onClick={submit}>
            Login
          </button>
          <br />
          <Link to="/">Don't have an account? Signup.</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
