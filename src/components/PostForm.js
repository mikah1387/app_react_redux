import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNewPost, addPost } from "../store/postsSlice";

const PostForm = () => {

  const dispatch = useDispatch();
  const author = useSelector((state) => state.usersReducer.users[0].pseudo);
  
  

  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const title = form.current.title.value;
    const content = form.current.content.value; 
    // Utilisation de FormData pour récupérer les données du formulaire
    // const formData = new FormData(e.target); // 'e.target' est le formulaire
    // const title = formData.get("title"); // Récupère la valeur du champ 'title'
    // const content = formData.get("content"); // Récupère la valeur du champ 'content'
    // // Récupère la valeur du champ 'author'

    // Dispatch de l'action addPost avec les données du formulaire
    dispatch(addPost({ title, content, author: author }));
    dispatch(AddNewPost({title, content, author: author }));

    // Réinitialisation du formulaire
    e.target.reset();
  };
  return (
    <div className="form-container">
      <form  ref={form} onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Titre du poste" />
        <textarea name="content" placeholder="Postez vos pensées..."></textarea>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default PostForm;
