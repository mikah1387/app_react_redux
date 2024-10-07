import React, { useEffect } from "react";
import PostForm from "./components/PostForm";
import Post from "./components/Post";
import User from "./components/User";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPost } from "./store/postsSlice";
import { fetchUsers } from "./store/usersSlice";

const App = () => {
  
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.postsReducer);
  const { users, statusUser, errorUser }=useSelector((state) => state.usersReducer);
 
   
      // dispatch(fetchUsers("http://localhost:3000/users"));
   
  useEffect(() => {
    
    if (status === "idle") {
      dispatch(fetchPosts("http://localhost:3000/posts"));
    }
    if (statusUser === "idle") {
      dispatch(fetchUsers("http://localhost:3000/users"));
      
    }
  }, [dispatch, status, statusUser]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  if (statusUser === "loading") {
    return <div>Loading...</div>;
  }

  if (statusUser === "failed") {
    return <div>Error: {errorUser}</div>;
  }
    if (!articles.length || !users.length) {
      return <div>No data available</div>;
    }
  


     
  
  return (
    <div>
      <h1>Extreme</h1>
      <PostForm />
      <div className="content">
        <div className="post-container">{articles.map((post) => <Post key={post.id} post={post} />)}</div>
        <User user ={users} />
      </div>
    </div>
  );
};

export default App;
