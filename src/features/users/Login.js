import React, { useState } from "react";
import "./Login.css";
import loginbanner from "./images/mike-petrucci-c9FQyqIECds-unsplash.jpg";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../auth/authSlice";
import { useMediaQuery } from "react-responsive";
import { Alert, CircularProgress } from "@mui/material";

const Login = () => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(login({ email, password }));
      setEmail("");
      setPassword("");
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (!error?.originalStatus) {
        console.log("Error another found", error.response?.data?.detail)
        setErrMsg(error.response?.data?.detail);
        navigate("/login");
      } else if (error.originalStatus === 400) {
        setErrMsg(error.response?.data?.detail);
        navigate("/login");
        console.log("Error ", error.originalStatus)
      } else if (error.originalStatus === 401) {
        setErrMsg(error.response?.data?.detail);
        navigate("/login");
      } else {
        setErrMsg("Login Failed");
      navigate("/login");
      }
      
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  const content = (
    <div>
      {isDesktopOrLaptop && (
        <div className="login-page">
          <div className="left-banner">
            <img src={loginbanner} alt="" />
          </div>
          <div className="right-input">
            <div className="user-nav">
              <NavLink
                end
                to="/login"
                className="login-link rounded-e-xl"
                
              >
                <button className=" ">Login</button>
              </NavLink>

              <NavLink
                end
                to="/signup"
                className="login-link"
                
              >
                <button>SIGN UP</button>
              </NavLink>
            </div>
            <div className="user-input">
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address / Phone Number</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailInput}
                  autoComplete="off"
                  required
                  className="email-input"
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={handlePwdInput}
                  value={password}
                  required
                  className="email-input"
                />

                
                {loading ? (
                  <div className="spinner"><CircularProgress /></div>
                ) : (
                  <button className=" !mb-0">LOG IN</button>
                )}
                <div className=" !mt-0 !pt-0 relative">
                  <p className=" mt-0  cursor-pointer text-blue-500 absolute right-5">Forgot password</p>
                </div>
               

                
                {errMsg && <div className="error"><Alert severity="warning">{errMsg}!</Alert></div>}
              </form>
            </div>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className="login-page-mobile">
          <div className="right-input-mobile">
            <div className="user-nav-nobile">
              
                <button><NavLink
                end
                to="/login"
                className="login-link-mobile"
                activeClassName="active"
              >Login</NavLink></button>
              

              
                <button><NavLink
                end
                to="/signup"
                className="login-link-mobile"
                activeClassName="active"
              >SIGN UP</NavLink></button>
              
            </div>
            <div className="user-input-mobile">
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailInput}
                  autoComplete="off"
                  required
                  className="email-input"
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={handlePwdInput}
                  value={password}
                  required
                  className="email-input"
                />
                <p>Fogot your password</p>
                {loading ? (
                  <div className="spinner-mobile">Loading....</div>
                ) : (
                  <button>LOG IN</button>
                )}

              {errMsg && <div className="error"><Alert severity="warning">{errMsg}!</Alert></div>}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return content;
};

export default Login;
