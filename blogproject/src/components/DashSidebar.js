import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { PiSignOutThin } from "react-icons/pi";
import Home from "../Pages/Home";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
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
    <div className="sidebar">
      <Link to='/dashboard?tab=profile'> 
        <div className="profile">
          {tab == "profile" ? (
            <>
              <CgProfile
                className="active"
                style={{ padding: "2px", fontSize: "30px" }}
              />

              <p style={{fontWeight:"bold"}} className="active">Profile</p>
            </>
          ) : (
            <>
              <CgProfile
                className="active"
                style={{ padding: "2px", fontSize: "30px" }}
              />
            <p style={{fontWeight:"bold"}}>Profile</p>
            </>
          )}
        </div>
      </Link>
      {currentUser.isAdmin && (
         <Link to='/dashboard?tab=posts'>
         <div className="profile">
           {tab == "posts" ? (
             <>
               <BsFillFileEarmarkPostFill
                 className="active"
                 style={{ padding: "2px", fontSize: "30px" }}
               />
 
               <p style={{fontWeight:"bold"}} className="active">Posts</p>
             </>
           ) : (
            <>
               <BsFillFileEarmarkPostFill
                 className="active"
                 style={{ padding: "2px", fontSize: "30px" }}
               />
             <p style={{fontWeight:"bold"}}>Posts</p>
             </>
           )}
         </div>
       </Link>
       
      )}
       {currentUser.isAdmin && (
         <Link to='/dashboard?tab=dash'>
         <div className="profile">
           {tab ==="dash" ? (
             <>
               <MdDashboard
                 className="active"
                 style={{ padding: "2px", fontSize: "30px" }}
               />
 
               <p style={{fontWeight:"bold"}} className="active">dashboard</p>
             </>
           ) : (
            <>
            <MdDashboard
              className="active"
              style={{ padding: "2px", fontSize: "30px" }}
            />
             <p style={{fontWeight:"bold"}}>Dashboard</p>
             </>
           )}
         </div>
       </Link>
       
      )}
       {currentUser.isAdmin && (
         <Link to='/dashboard?tab=users'>
         <div className="profile"  >
           {tab == "users" ? (
             <>
               <FaUsers
                 className="active"
                 style={{ padding: "2px", fontSize: "30px" }}
               />
 
               <p style={{fontWeight:"bold"}} className="active">Users</p>
             </>
           ) : (
            <>
            <FaUsers
            className="active"
            style={{ padding: "2px", fontSize: "30px" }}
          />
             <p style={{fontWeight:"bold"}}>Users</p>
             </>
           )}
         </div>
       </Link>
       
      )}
      <Link onClick={handleSignout}>
        <div className="signout" style={{fontWeight:"bold"}}>
          <PiSignOutThin style={{ padding: "2px", fontSize: "30px" ,color:"lightblue"}} />
          Sign Out
        </div>
      </Link>
    </div>
  );
}

export default DashSidebar;
