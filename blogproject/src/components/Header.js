// import React from "react";
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// import { CiCloudSun } from "react-icons/ci";
// import { useDispatch, useSelector } from "react-redux";
// import { signoutSuccess } from "../redux/user/userSlice";
// function Header() {
//   const {currentUser}=useSelector(state=>state.user);
//   const dispatch=useDispatch();
//   const handleSignout = async () => {
//     try {
//       const res = await fetch('http://localhost:4000/api/user/signout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         localStorage.removeItem('access_token');
//         dispatch(signoutSuccess());
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   return (
//     <>
//     <div className="header">
//       <div className="logo">
//         <h2><span className="logo_heading">Saksham's </span>Blog</h2>
//       </div>
//       <div className="search">
//         <input style={{borderRadius:"7px",padding:"10px",paddingRight:"70px",paddingLeft:"5px",border:"none"}} type="search" placeholder="Search..." />
//         <img  className="searchicon"src="https://img.icons8.com/?size=100&id=132&format=png&color=000000" alt="" />

//       </div>
//       <div className="pages">
//         <Link to="/home">Home</Link>
//         <a href="/about">About</a>
//         <a href="/projects">Projects</a>
//       </div>
//       <div className="theme sign-in">
//         <div className="theme-button" style={{display:"flex",gap:"40px"}}>
//         <CiCloudSun style={{fontSize:"25px"}} />
//         {
//           currentUser ? (
//             <img className="profilepicture" src={ currentUser && currentUser.profilePicture} alt="" />

//           ):(
//             <Link to="/sign-in"  className="signin" type="submit">Sign In</Link>
//           )
//         }
//             {/* <img className="logo" src="https://img.icons8.com/?size=100&id=DtRs5e4zMQW8&format=png&color=000000" alt="" /> */}
//         </div>
//         <div >
//           {/* {
//             currentUser ?(
//               <>
//               <div className="signin">{currentUser.email}</div>
//               <Link to="/dashboard?tab=profile"  className="signin" type="submit">Profile</Link>
//               <Link to="/sign-in" onClick={handleSignout} className="signin" type="submit">Sign Out</Link></>
//             ):(
//               <Link to="/sign-in"  className="signin" type="submit">Sign In</Link>
//               )
//           } */}
//             {/* {
//             currentUser ?(
//               <img className="profilepicture" src={currentUser.profilePicture} alt="" />
//             ):(
//               <Link to="/sign-in"  className="signin" type="submit">Sign In</Link>
//               )
//           } */}
//             </div>
          
//       </div>
//     </div>
//       {
//         currentUser  && (
//           <>
//           <div className="hoversection">
//           <div  className="oldsection">
//           <div >{currentUser.email}</div>
//           <div><Link style={{color:"black"}} to="/dashboard?tab=profile"   type="submit">Profile</Link></div>
//           <div><Link style={{color:"black"}} to="/sign-in" onClick={handleSignout} type="submit">Sign Out</Link></div>
//           </div>
//           </div>
//           </>
//         )
//       }
//      </>
//   );
// }
// export default Header;
import React from "react";
import { Link } from 'react-router-dom';
import { CiCloudSun } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

function Header() {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  
  const handleSignout = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/user/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        localStorage.removeItem('access_token');
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <h2><span className="logo_heading">Saksham's </span>Blog</h2>
        </div>
        <div className="search">
          <input style={{ borderRadius: "7px", padding: "10px", paddingRight: "70px", paddingLeft: "5px", border: "none" }} type="search" placeholder="Search..." />
          <img className="searchicon" src="https://img.icons8.com/?size=100&id=132&format=png&color=000000" alt="" />
        </div>
        <div className="pages">
          <Link to="/home">Home</Link>
          <a href="/about">About</a>
          <a href="/projects">Projects</a>
        </div>
        <div className="theme sign-in">
          <div className="theme-button" style={{ display: "flex", gap: "40px" }}>
            <CiCloudSun style={{ fontSize: "25px" }} />
            {
              currentUser ? (
                <div className="profile-container">
                  <img className="profilepicture" src={currentUser && currentUser.profilePicture} alt="" />
                  <div className="hoversection">
                    <div className="oldsection">
                      <div>{currentUser.email}</div>
                      <div><Link  to="/dashboard?tab=profile" type="submit">Profile</Link></div>
                      <div><Link  to="/sign-in" onClick={handleSignout} type="submit">Sign Out</Link></div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/sign-in" className="signin" type="submit">Sign In</Link>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
