import React, { useState } from "react";
import Like from "./Like";
import { useDispatch } from "react-redux";
import { addPost, deletePost, updatePost } from "../store/postsSlice";

const Post = ({ post }) => {
  const [editToggle, setEditToggle] = useState(false);
  const dispatch = useDispatch();
  const id = post.id;
    const handleSubmit = (e) => {
      e.preventDefault();   
      const formData = new FormData(e.target); // 'e.target' est le formulaire
      const content = formData.get("content"); // Récupère la valeur du champ 'content' // Récupère la valeur du 
      dispatch(updatePost({ id, content }));

      e.target.reset();
      setEditToggle(!editToggle);
    };

  return (
    <div className="post">
      <div className="edit-delete">
        <img
          src="./icons/edit.svg"
          alt="edit"
          onClick={() => setEditToggle(!editToggle)}
        />
        <img
          src="./icons/delete.svg"
          alt="delete"
          onClick={() => dispatch(deletePost(post.id))}
        />
      </div>

      <h2>{post.title}</h2>
      <img
        src="https://picsum.photos/1500/400"
        className="post-img"
        alt="img-post"
      />

      {editToggle ? (
        <form onSubmit={handleSubmit}>
          <textarea autoFocus={true} name="content" defaultValue={post.content}></textarea>
          <input type="submit" value="Valider modification" />
        </form>
      ) : (
        <p>{post.content}</p>
      )}

      <div className="author">
        <h5>{post.author}</h5>
        <Like post={post} />
      </div>
    </div>
  );
};

export default Post;
