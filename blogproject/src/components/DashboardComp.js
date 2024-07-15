import React, { useEffect, useState } from 'react'
import { MdOutlineArrowUpward } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbMessage } from "react-icons/tb";

import { FaRegFileLines } from "react-icons/fa6";
import { useSelector } from 'react-redux';
function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/user/getusers?limit=5',{
            method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access_token':localStorage.getItem("access_token")
          }, 
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/post/getposts?limit=5',{
            method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access_token':localStorage.getItem("access_token")
          }, 
        });
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/comment/getcomments?limit=5',{
            method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access_token':localStorage.getItem("access_token")
          }, 
        });
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className='dashcontainer'>
        <div className="container1 item">
        <div className="item1">
            <div className="leftcontainer1">
                <div className="topcontainer1">
                    <h1 style={{color:"grey"}}>Total Users</h1>
                    <p style={{fontSize:"40px"}}>{totalUsers}</p>
                </div>
                <div className="bottomcontainer1" style={{color:"green"}}>
                   <MdOutlineArrowUpward/> {lastMonthUsers} <span style={{color:"grey"}}>Last Month</span>
                </div>
            </div> 
            <div className="rightcontainer1" style={{marginTop:"20px"}} >
                <HiOutlineUserGroup  style={{color:"white",padding:"10px",fontSize:"60px",backgroundColor:"rgb(0, 113, 128)",borderRadius:"50%",margin:"20px"}}/>
            </div>
        </div>
        <div className="item1">
        <div className="leftcontainer1">
                <div className="topcontainer1">
                    <h1 style={{color:"grey"}}>Total Comments</h1>
                    <p style={{fontSize:"40px"}}>{totalComments}</p>
                </div>
                <div className="bottomcontainer1" style={{color:"green"}}>
                   <MdOutlineArrowUpward/> {lastMonthComments} <span style={{color:"grey"}}>Last Month</span>
                </div>
            </div> 
            <div className="rightcontainer1" style={{marginTop:"20px"}} >
                <TbMessage  style={{color:"white",padding:"10px",fontSize:"60px",backgroundColor:"rgb(80,63,251)",borderRadius:"50%",margin:"20px"}}/>
            </div>
        </div>
        <div className="item1">
        <div className="leftcontainer1">
                <div className="topcontainer1">
                    <h1 style={{color:"grey"}}>Total Posts</h1>
                    <p style={{fontSize:"40px"}}>{totalPosts}</p>
                </div>
                <div className="bottomcontainer1" style={{color:"green"}}>
                   <MdOutlineArrowUpward/> {lastMonthPosts} <span style={{color:"grey"}}>Last Month</span>
                </div>
            </div> 
            <div className="rightcontainer1" style={{marginTop:"20px"}} >
                <FaRegFileLines  style={{color:"white",padding:"10px",fontSize:"60px",backgroundColor:"lightgreen",borderRadius:"50%",margin:"20px"}}/>
            </div>
        </div>
        </div>
        <div className="container2">
        <div className="item2"  >
            <div className="recent" style={{margin:"10px"}}>
                <div className="recentuser">
                    Recent Users
                </div>
                <div className="seeall">
                    <button style={{border:"none",background:"transparent",fontWeight:"bold"}}>See All</button>
                </div>
            </div>
            <div className="imageuser" style={{backgroundColor:"lightgrey",padding:"10px"}}>
                <div className="userimage" style={{marginLeft:"10px",marginBottom:"10px"}}>
                    {/* <img src={currentUser.profilePicture} alt="" /> */}
                    User Image
                </div>
                <div className="username" style={{marginBottom:"10px"}}>
                    UserName
                </div>
            </div>
            {
                users.map((user)=>(
                    <div key={user._id} className="imageuser" style={{marginTop:"10px"}}>
                <div className="userimage" style={{marginLeft:"10px",marginBottom:"10px"}}>
                    <img  src={user.profilePicture} style={{width:"50px",borderRadius:"50%",marginLeft:"10px"}} alt="" />
                </div>
                <div className="username" style={{marginTop:"10px"}}>
                    {user.username}
                </div>
            </div>
                ))
            }
        </div>
        <div className="item3"> <div className="recent" style={{margin:"10px"}}>
                <div className="recentuser">
                    Recent Comments
                </div>
                <div className="seeall">
                    <button style={{border:"none",background:"transparent",fontWeight:"bold"}}>See All</button>
                </div>
            </div>
            <div className="imageuser" style={{backgroundColor:"lightgrey",padding:"10px"}}>
                <div className="userimage" style={{marginLeft:"10px",marginBottom:"10px"}}>
                    {/* <img src={currentUser.profilePicture} alt="" /> */}
                    Comments Content
                </div>
                <div className="username" style={{marginBottom:"10px"}}>
                    Likes
                </div>
            </div>
            {
                comments.map((comment)=>(
                    <div key={comment._id} className="imageuser" style={{marginTop:"10px"}}>
                <div className="userimage" style={{marginLeft:"10px",marginBottom:"10px"}}>
                    {/* <img  src={user.profilePicture} style={{width:"50px",borderRadius:"50%",marginLeft:"10px"}} alt="" /> */}
                    {comment.content}
                </div>
                <div className="username" style={{marginTop:"10px"}}>
                    {comment.numberOfLikes}
                </div>
            </div>
                ))
            }</div>
        </div> 
    </div>
  )
}

export default DashboardComp