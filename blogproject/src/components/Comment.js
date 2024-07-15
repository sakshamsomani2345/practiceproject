import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { FaRegThumbsUp } from "react-icons/fa";
function Comment({ comment, onLike, onDelete,onEdit }) {
  const [user, setUser] = useState({});
  console.log(user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'access_token':localStorage.getItem("access_token")
          }, 
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/user/${comment.userId}`
        );
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };
  return (
    // <div>
    //   <div className="leftcomment">
    //     <img src={currentUser.profilePicture} alt="" />
    //   </div>
    //   <div className="rightcomment">
    //     <div className="date">
    //       <span>one@gmail.com </span>
    //       <span>{moment(comment.createdAt).fromNow()}</span>
    //     </div>
    //     <div className="commentcontent">{comment.content}</div>
    //     <div className="commentlike">
    //       <button onClick={() => onLike(comment._id)}>
    //         <FaRegThumbsUp></FaRegThumbsUp>
    //       </button>
    //       <p className="text-gray-400">
    //         {comment.numberOfLikes > 0 &&
    //           comment.numberOfLikes +
    //             " " +
    //             (comment.numberOfLikes === 1 ? "like" : "likes")}
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="comments-list">
      {/* {comments.map(comment => ( */}
      <div key={comment.id} className="comment">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedContent}
               onChange={(e) => setEditedContent(e.target.value)}
            />
            <button
            //  onClick={() => handleSaveEdit(comment.id)}
            onClick={()=>handleSave()}
            >
              Save
            </button>
            <button onClick={()=>setIsEditing(false)}>cancel</button>
          </>
        ) : (
          <>
            <p>{comment.content}</p>
            <div
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
              //  onClick={() => handleLikeComment(comment.id)  }
            >
              {" "}
              <button onClick={() => onLike(comment._id)}>
                <FaRegThumbsUp></FaRegThumbsUp>
              </button>
              <p style={{ color: "grey" }} className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "Like" : "Likes")}
              </p>
            </div>
            <button
              style={{ background: "red" }}
              onClick={() => handleEdit()}
            >
              Edit
            </button>
            <button onClick={()=>{onDelete(comment._id)}} >Delete</button>
          </>
        )}
      </div>
      {/* ))} */}
    </div>
  );
}

export default Comment;
// import React, { useState } from 'react';

// const CommentBox = () => {
//   const [comments, setComments] = useState([
//     { id: 1, text: 'This is the first comment', likes: 0 },
//   ]);
//   const [newComment, setNewComment] = useState('');
//   const [isEditing, setIsEditing] = useState(null);
//   const [editedComment, setEditedComment] = useState('');

//   const handleAddComment = () => {
//     if (newComment.trim()) {
//       setComments([...comments, { id: Date.now(), text: newComment, likes: 0 }]);
//       setNewComment('');
//     }
//   };

//   const handleDeleteComment = (id) => {
//     setComments(comments.filter(comment => comment.id !== id));
//   };

//   const handleEditComment = (id) => {
//     setIsEditing(id);
//     const comment = comments.find(comment => comment.id === id);
//     setEditedComment(comment.text);
//   };

//   const handleSaveEdit = (id) => {
//     setComments(comments.map(comment => comment.id === id ? { ...comment, text: editedComment } : comment));
//     setIsEditing(null);
//     setEditedComment('');
//   };

//   const handleLikeComment = (id) => {
//     setComments(comments.map(comment => comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment));
//   };

//   return (
//     <div className="comment-box">
//       <h2>Comments</h2>
//       <div className="comments-list">
//         {comments.map(comment => (
//           <div key={comment.id} className="comment">
//             {isEditing === comment.id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editedComment}
//                   onChange={(e) => setEditedComment(e.target.value)}
//                 />
//                 <button onClick={() => handleSaveEdit(comment.id)}>Save</button>
//               </>
//             ) : (
//               <>
//                 <p>{comment.text}</p>
//                 <button onClick={() => handleLikeComment(comment.id)}>Like ({comment.likes})</button>
//                 <button onClick={() => handleEditComment(comment.id)}>Edit</button>
//                 <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommentBox;
