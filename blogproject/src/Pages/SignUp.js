import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import OAuth from "../components/OAuth";

function SignUp() {
  const [formdata, setformdata] = useState({});
  const [errormessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };
  console.log(formdata);
  const handelsubmit = async (e) => {
    e.preventDefault();
    console.log("e");
    if (!formdata.username || !formdata.email || !formdata.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
          navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
          <div style={{ margin: "10px" }} className="username">
            <div>
              <label
                htmlFor="user"
                style={{ margin: "10px", fontWeight: "400" }}
              >
                {" "}
                Your Username
              </label>
            </div>
            <input
              onChange={handlechange}
              placeholder="Username"
              id="username"
              className="userbox"
              type="text"
            />
          </div>
          <div style={{ margin: "10px" }} className="email">
            <div>
              {" "}
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
              {loading ? <span class="loader"></span> : "Sign Up"}
            </button>
          </div>
          {/* <OAuth/> */}
          <div style={{ marginLeft: "22px" }}>
            Have an Account?{" "}
            <Link to='/sign-in' style={{ color: "blue" }}>
              Sign In
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

export default SignUp;
