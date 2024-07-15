import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
function DashUsers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');
  const [postIdToDelete, setPostIdToDelete] = useState("");

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await fetch(`http://localhost:4000/api/user/getusers`,{
              method: 'GET',
          headers: {
            'Content-Type': 'application/json','access_token':localStorage.getItem("access_token")
          },
          // body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (res.ok) {
            setUsers(data.users);
            if (data.users.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if (currentUser.isAdmin) {
        fetchUsers();
      }
    }, [currentUser._id]);
    const openModal = () => {
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };
    const handlemore = async () => {
      const startIndex = users.length;
      try {
        const res = await fetch(`http://localhost:4000/api/user/getusers?startIndex=${startIndex}`);
        const data = await res.json();
        if (res.ok) {
          setUsers((prev) => [...prev, ...data.users]);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const handleDeletePost = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/user/delete/${userIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json','access_token':localStorage.getItem("access_token")
                  },
            });
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
                setShowModal(false);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
      };
    
  return (
    <div className="dashposts">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <div className="dashpostsection header">
            <div className="datecreated">Date Created</div>
            <div className="userimage">User Image</div>
            <div className="username">Username</div>
            <div className="useremail">Email</div>
            <div className="edituser">Delete</div>
            <div className="admin">Admin</div>
          </div>

          {users.map((post) => (
            <div className="dashpostsection" key={post._id}>
              <div className="datecreated">
                {new Date(post.updatedAt).toLocaleDateString()}
              </div>
              <div className="userimage">
                <Link to={`/post/${post.slug}`}>
                  {" "}
                  <img style={{width:"80px",borderRadius:"50%"}} src={post.profilePicture} alt="" />
                </Link>
              </div>

              <div className="username">
                {" "}
                <Link style={{ color: "grey" }} to={`/post/${post.slug}`}>
                  {post.username}
                </Link>
              </div>
              <div className="useremail">{post.email}</div>
              <div className="admin">
                <button
                  onClick={()=>{
                    setShowModal(true);
                    setUserIdToDelete(post._id)
                  }}

                >
                  Delete
                </button>
              </div>
              <div className="edituser">
               {!post.isAdmin?(<ImCross style={{color:"red"}} />):(<TiTick style={{color:"green",fontSize:"35px"}}/>)}
              </div>
            </div>
          ))}
          {
            showMore && (
              <button onClick={handlemore} style={{
                color:"green",border:"none",background:"transparent",margin:"auto",width:"100%",fontSize:"20px",padding:"10px"
              }}>Show more</button>
            )
          }
        </>
      ) : (
        <h1>No posts</h1>
      )}
       <div
          className={`modal ${showModal ? "display-block" : "display-none"}`}
        >
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Are you sure you want to delete your Account</h2>
            <button onClick={handleDeletePost}>Yes</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
    </div>
  );
}

export default DashUsers;
