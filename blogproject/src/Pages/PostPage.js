import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';

function PostPage() {
    const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);
console.log(post);
  return (
    <div className="postpagesection">
        <h1>
        {post && post.title}
        </h1>
        <div style={{margin:"auto" ,border:"0.2px solid black",borderRadius:"10px",padding:"5px",marginBottom:"20px",marginTop:"20px"}}>{post && post.category}</div>
        <div className="postpageimage" style={{margin:"auto"}}>
            <img style={{
                width:"800px",
                height:"400px"
            }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRisBStt3gKDIuTMrT829FqFv2j2WhodeXkGw&usqp=CAU" alt="" />
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontWeight:"bold",borderBottom:"1px solid grey",fontStyle:"italic"}} >
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div dangerouslySetInnerHTML={{__html:post && post.content}} style={{width:"900px"}}></div>
      <CallToAction/>
<CommentSection postId={ post && post._id}/>
    </div>
  )
}

export default PostPage
