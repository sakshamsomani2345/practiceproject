import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    signInStart,
    signInSuccess,
    signInFailure,
  } from '../redux/user/userSlice';
import OAuth from "../components/OAuth";
function SignIn() {
    const {loading,error:errormessage}=useSelector(state=>state.user)

    const dispatch=useDispatch();
  const [formdata, setformdata] = useState({});
//   const [errormessage, setErrorMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };
//   console.log(formdata);
  const handelsubmit = async (e) => {
    e.preventDefault();
    // console.log("e");
    if ( !formdata.email || !formdata.password) {
    //   return setErrorMessage("Please fill out all fields.");
    return dispatch(signInFailure("Please fill out all fields "))
    }
    try {
        dispatch(signInStart());
     //   setLoading(true);
    //   setErrorMessage(null);
      const res = await fetch("http://localhost:4000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        // setLoading(false);
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
      }else {
        // Store the JWT token in local storage
        localStorage.setItem('access_token', data.token);
        // Store user data if needed
        // localStorage.setItem('user', JSON.stringify(data));
        console.log(data);
  
        dispatch(signInSuccess(data.user));
        navigate('/home');
      }
    //   setLoading(false);
    //   if (res.ok) {
    //     dispatch(signInSuccess(data))
    //       navigate('/home');
    //   }
    } catch (error) {
        dispatch(signInFailure(error.message));

    //   setErrorMessage(error.message);
    //   setLoading(false);
    }
  };
  return (
    <div className="signup">
      <div className="left">
        <div className="leftlogo">
          <span className="leftsidelogo">Saksham's</span>
          <span style={{ fontSize: "40px", fontWeight: "bold" }}>Blog</span>
        </div>
        <div className="leftcontent">
          This is a demo project. You can sign up with your email and password
          or with Google.
        </div>
      </div>
      <div className="right">
        <form action="" onSubmit={handelsubmit}>
         
          <div style={{ margin: "10px" }} className="email">
            <div>
              <label
                htmlFor="email"
                style={{ margin: "10px", fontWeight: "400" }}
              >
                Your Email
              </label>
            </div>
            <input
              onChange={handlechange}
              id="email"
              className="emailbox"
              placeholder="name@company.com"
              type="email"
            />
          </div>
          <div style={{ margin: "10px" }} className="password">
            <div>
              <label
                htmlFor="password"
                style={{ margin: "10px", fontWeight: "400" }}
              >
                Your Password
              </label>
            </div>
            <input
              onChange={handlechange}
              placeholder="Password"
              id="password"
              className="passwordbox"
              type="password"
            />
          </div>
          <div style={{ margin: "10px" }}>
            <button
              style={{
                margin: "10px",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "20px",
                color: "white",
                border: "none",
              }}
              className="signinbutton"
              type="submit"
            //   disabled={loading}
            >
              {loading ? <span className="loader"></span> : "Sign In"}
            </button>
          </div>
          {/* <OAuth/> */}
          <div style={{ marginLeft: "22px" }}>
            Don't Have an Account?{" "}
            <Link to="/sign-up" style={{ color: "blue" }}>
              Sign Up
            </Link>
          </div>
          {errormessage && (
            <h5
              style={{
                backgroundColor: "#ebd1d6",
                width: "300px",
                marginLeft: "20px",
                borderRadius: "3px",
                padding: "10px",
                marginTop: "10px",
                color: "#e35471",
              }}
            >
              {errormessage}
            </h5>
          )}
        </form>
        
      </div>
    </div>
  );
}

export default SignIn;
