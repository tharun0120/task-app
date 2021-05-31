import React from "react";
import avatar from "./avatar2.png";
const AppBar = () => {
  return (
    <div className="appbar">
      <h1 className="app-title">Task Tracker</h1>
      <img src={avatar} alt="Avatar" class="avatar"></img>
    </div>
  );
};

export default AppBar;
