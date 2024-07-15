import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("no changes made");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(
        `http://localhost:4000/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("suuccess");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `http://localhost:4000/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/user/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        localStorage.removeItem("access_token");
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="dashprofile">
      <div className="dashsection">
        <h1 style={{ marginBottom: "20px" }}>Profile</h1>
        <form className="updateform" action="" onSubmit={handleSubmit}>
          <div className="image">
            <img className="profileimage" src={currentUser.profilePicture} />
          </div>
          <div>
            <input
              className="profileusername"
              placeholder={currentUser.username}
              id="username"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="profilemail"
              onChange={handleChange}
              id="email"
              placeholder={currentUser.email}
              type="email"
            />
          </div>
          <div>
            <input
              className="profilepassword"
              placeholder="*******"
              type="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="updatebutton">
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
            >
              Update
            </button>
          </div>
          {
            currentUser.isAdmin &&
              (
                <div className="updatebutton" style={{marginLeft:"10px",marginBottom:"10px"}}>
            <Link  to={"/create-post"}>

              <button
                style={{
                //   marginleft: "10px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  fontSize: "20px",
                  display:"inline-block",
                  color: "white",
                  border: "none",
                  
                }}
                className="signinbutton"
              >
                Create a Post
              </button>
            </Link>
            </div>

              )
          }
        </form>
        <div className="deletesection">
          <button
            onClick={openModal}
            id="openModalBtn"
            className="deleteaccount"
          >
            Delete Account
          </button>
          <button onClick={handleSignout} className="signoutaccount">
            Sign Out
          </button>
        </div>
        {updateUserSuccess && (
          <h5
            style={{
              backgroundColor: "lightgreen",
              width: "300px",

              borderRadius: "3px",
              padding: "10px",
              marginTop: "10px",
              color: "green",
            }}
          >
            {updateUserSuccess}
          </h5>
        )}
        {updateUserError && (
          <h5
            style={{
              backgroundColor: "#ebd1d6",
              width: "300px",
              borderRadius: "3px",
              padding: "10px",
              marginTop: "10px",
              color: "#e35471",
            }}
          >
            {updateUserError}
          </h5>
        )}
        {/* {error && (
            <h5
              style={{
                backgroundColor: "#ebd1d6",
                width: "300px",
                borderRadius: "3px",
                padding: "10px",
                marginTop: "10px",
                color: "#e35471",
              }}
            >
              {error}
            </h5> 
          )} */}

        <div
          className={`modal ${showModal ? "display-block" : "display-none"}`}
        >
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Are you sure you want o delete your Account</h2>
            <button onClick={handleDeleteUser}>Yes</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashProfile;
