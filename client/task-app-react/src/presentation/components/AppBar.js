import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
const AppBar = ({ logout }) => {
  return (
    <div className="appbar">
      <h1 className="app-title">Task Tracker</h1>
      <FaSignOutAlt className="avatar" onClick={logout} />
    </div>
  );
};

export default AppBar;
