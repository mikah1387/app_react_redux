import React from "react";

const User = ({user}) => {
  return (
    <div className="user-container">
      <div className="user">
        <h3>{user[0].pseudo}</h3>
        <img src="./img/bill-gates.png" alt="bill gates" />
        <p>Age : {user[0].age}</p>
        <p>Like(s) : {user[0].likes}</p>
      </div>
    </div>
  );
};

export default User;
