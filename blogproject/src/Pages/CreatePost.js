import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {  useNavigate } from "react-router-dom";

function CreatePost() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:4000/api/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token':localStorage.getItem("access_token")
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
    setPublishError('Something went wrong');
  }
};
  return (
    <div className="createpost">
      <h1 style={{margin:"auto",paddingTop:"30px"}}>Create a Post</h1>
      <form className="createpostform" onSubmit={handleSubmit} action="">
        <div className="topsection">
        <input type="text" className="title" required placeholder="Title"  onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }/>
        <select className="selectbox"  onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            } >
          <option value="Select a category">Select a category</option>

          <option value="JavaScript">javascript</option>
          <option value="React">React</option>
          <option value="Node Js">Node Js</option>
        </select>
        </div>
        
        <ReactQuill  onChange={(e) =>
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
              Publish
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

export default CreatePost;
