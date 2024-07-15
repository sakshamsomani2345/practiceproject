import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import {  useNavigate,useParams } from "react-router-dom";

function UpdatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`http://localhost:4000/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          console.log(data.posts);
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);
  return (
    <div className="createpost">
      <h1 style={{margin:"auto",paddingTop:"30px"}}>Update a Post</h1>
      <form className="createpostform" onSubmit={handleSubmit} action="">
        <div className="topsection">
        <input type="text" className="title" required placeholder="Title" value={formData.title}  onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }/>
        <select value={formData.category} className="selectbox"  onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            } >
          <option  value="Select a category">Select a category</option>

          <option value="JavaScript">javascript</option>
          <option value="React">React</option>
          <option value="Node Js">Node Js</option>
        </select>
        </div>
        
        <ReactQuill value={formData.content}     onChange={(e) =>
              setFormData({ ...formData, content:e })
          
            } required theme="snow" placeholder="write something" style={{height:"390px",width:"800px"}}/>
        <div className="updatebutton" style={{
            display:"flex",justifyContent:"center",marginTop:"50px"
        }}>
            <button
              style={{
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "20px",
                color: "white",
                border: "none",
              }}
              className="publishbutton"
            >
              Update
            </button>
            </div>
      </form>
      {publishError && (
          <h5
            style={{
              backgroundColor: "#ebd1d6",
              width: "800px",
              borderRadius: "10px",
              padding: "10px",
              color: "#e35471",
            }}
          >
            {publishError}
          </h5>
        )}
    </div>
  );
}

export default UpdatePost;
