import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

const SideDrawer = ({ logout }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  return (
    <div className={showDrawer ? "side-drawer open" : "side-drawer"}>
      <div className="drawer-header">
        <div className="drawer-title">
          <h1 className="app-title l3">Task Tracker</h1>
          <h1 className="app-title l2">Task Tracker</h1>
          <h1 className="app-title l1">Task Tracker</h1>
        </div>
        <p
          className={showDrawer ? "drawer-btn drawer-btn-anim" : "drawer-btn"}
          onClick={toggleDrawer}
        >
          {"<"}
        </p>
      </div>
      <div className="drawer-about">
        <p>This application is developed using MERN Stack.</p>
        <a
          href="https://github.com/tharun0120/task-app/"
          target="_blank"
          rel="noopener noreferrer"
          className="drawer-github"
        >
          Github Repository
        </a>
      </div>
      <div className="drawer-spaced-box"></div>

      <div className="drawer-footer">
        {/* <hr className="solid-divider"></hr> */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideDrawer;
