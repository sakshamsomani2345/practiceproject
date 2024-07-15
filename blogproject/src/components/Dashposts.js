// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// function Dashposts() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [userPosts, setUserPosts] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [postIdToDelete, setPostIdToDelete] = useState("");
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch(`http://localhost:4000/api/post/getposts?userId=${currentUser._id}`);
//         const data = await res.json();
//         if (res.ok) {
//           setUserPosts(data.posts);
//           if (data.posts.length < 9) {
//             setShowMore(false);
//           }
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     if (currentUser.isAdmin) {
//       fetchPosts();

//     }
//   }, [currentUser._id]);
//   console.log(userPosts);

//   return (
//     <div className="dashposts">
//       {currentUser.isAdmin && userPosts.length>0?(
//        <>
//         <div className="dashpostsection">
//         <div className="datecreated">Date Updated</div>
//         <div className="userimage">Post Image</div>
//         <div className="username">Post Title</div>
//         <div className="useremail">Category</div>
//         <div className="admin">Delete</div>
//         <div className="deleteuser">Edit</div>
//       </div>

//       {userPosts.map((post) => (
//         <div className="dashpostsection" key={post._id}>
//           <div className="datecreated" style={{color:"black"}}> {new Date(post.updatedAt).toLocaleDateString()}</div>
//           <div className="userimage">
//             <img  style={{width:"20px"}}  src={post.image} alt="" />
//           </div>
//           <div className="username">{post.title}</div>
//           <div className="useremail">{post.category}</div>
//           <div className="admin">Admin</div>
//           <div className="deleteuser">Delete</div>
//         </div>
//       ))}
//        </>
//       ):(
//         <h1>no  post</h1>
//       )}

//     </div>
//   );
// }

// export default Dashposts;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Dashposts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/post/getposts?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  console.log(userPosts);
  const handlemore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `http://localhost:4000/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `http://localhost:4000/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'access_token':localStorage.getItem("access_token")
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dashposts">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <div className="dashpostsection header">
            <div className="datecreated">Date Updated</div>
            <div className="userimage">Post Image</div>
            <div className="username">Post Title</div>
            <div className="useremail">Category</div>
            <div className="admin">Delete</div>
            <div className="edituser">Edit</div>
          </div>

          {userPosts.map((post) => (
            <div className="dashpostsection" key={post._id}>
              <div className="datecreated">
                {new Date(post.updatedAt).toLocaleDateString()}
              </div>
              <div className="userimage">
                <Link to={`/post/${post.slug}`}>
                  {" "}
                  <img src={post.image} alt="" />
                </Link>
              </div>

              <div className="username">
                {" "}
                <Link style={{ color: "grey" }} to={`/post/${post.slug}`}>
                  {post.title}
                </Link>
              </div>
              <div className="useremail">{post.category}</div>
              <div className="admin">
                <button
                  onClick={()=>{
                    setShowModal(true);
                    setPostIdToDelete(post._id)
                  }}

                >
                  Delete
                </button>
              </div>
              <div className="edituser">
                <Link to={`/update-post/${post._id}`}>
                  <button
                  >
                    Edit
                  </button>
                </Link>
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

export default Dashposts;
