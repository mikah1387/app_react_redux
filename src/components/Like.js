import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/usersSlice";

const Like = ({ post }) => {

  const [like, setLike] = useState(post.likes);
  const {users} = useSelector((state) => state.usersReducer);
  const [likeUser, setLikeUser] = useState(users[0].likes);

  const dispatch = useDispatch();
   
 useEffect(() => {
   
    setLikeUser(users[0].likes);
  }, [ users]);
   
  
  const handelLike = () => {
    setLike(like + 1);
  
    dispatch(updateUser({ id: users[0].id, likes: likeUser + 1 }));


  };
  return (
    <div>
      <img src="./icons/clap.png" className="clap" alt="clap" onClick = {handelLike} />
      <span>{like}</span>
    </div>
  );
};

export default Like;
