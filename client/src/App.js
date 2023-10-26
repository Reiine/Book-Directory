import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Register from "./components/Register";
import Login from "./components/Login";
import Error from "./components/Error";

function App() {
  const userDataFromCookie = Cookies.get("user");
  const parsedUser = userDataFromCookie ? JSON.parse(userDataFromCookie) : {};
  const [user, setUser] = useState(parsedUser);

  const [authToken, setAuthToken] = useState(Cookies.get("authToken") || '');
  const [isLogin , setIsLogin] = useState("isLogin");
  const handleIsLogin= (e)=>{
    setIsLogin(e);
  }
  const handleAuthToken = (token) => {
    setAuthToken(token);
  };

  const handleUser = (userData) => {
    setUser(userData);
  };

  useEffect(() => {
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
    Cookies.set("authToken", authToken, { expires: 7 });
  }, [user, authToken,isLogin]);

  return (
    <Router>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/login" element={<Home user={user} authToken={authToken} handleIsLogin={handleIsLogin} />} />
            <Route path="/" element={<Home user={user} authToken={authToken} handleIsLogin={handleIsLogin} />} />
            <Route path="/home" element={<Home user={user} authToken={authToken} handleIsLogin={handleIsLogin}/>} />
          </>
        ) : (
          <>
            <Route path="/" element={<Register />} />
            <Route
              path="/login"
              element={<Login handleUser={handleUser} handleAuthToken={handleAuthToken} handleIsLogin={handleIsLogin} />}
            />
            <Route path="/home" element={<Home user={user} authToken={authToken} handleIsLogin={handleIsLogin}/>}  />
          </>
        )}
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer autoClose={1000} />
    </Router>
  );
}

export default App;
