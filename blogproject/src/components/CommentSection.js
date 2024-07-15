import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  console.log(currentUser);
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(
        `http://localhost:4000/api/comment/likeComment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/comment/getPostComments/${postId}`
        );
        if (res.ok) {
          const data = await res.json();
          setComments(data);
          //   console.log(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(
        `http://localhost:4000/api/comment/deleteComment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  
  return (
    <div>
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as: one</p>

          <Link to={"/dashboard?tab=profile"} style={{ color: "black" }}>
            {/* @{currentUser.username} */}
          </Link>
        </div>
      ) : (
        <div>
          You must be signed in to comment.
          <Link to={"/sign-in"}>Sign In</Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          style={{ border: "1px solid grey" }}
          action=""
        >
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="Add a comment..."
            name=""
            maxLength={200}
            id=""
            cols="50"
            rows="3"
          ></textarea>
          <div>
            <p> {200 - comment.length} characters remaining</p>
            <button>submit</button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <>
          <div style={{display:"flex",gap:"3px"}}>
            <p>Comments</p>
            <div>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
            //   onDelete={(commentId) => {
            //     setShowModal(true);
            //     setCommentToDelete(commentId);
            //   }}
            onEdit={handleEdit}
              onDelete= {handleDelete}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default CommentSection;
