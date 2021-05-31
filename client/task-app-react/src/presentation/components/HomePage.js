import { useHistory } from "react-router-dom";
import "./css/HomePage.css";
import TaskCard from "./TaskCard";
import AppBar from "./AppBar";
const HomePage = ({ user, onLogout }) => {
  const history = useHistory();

  if (!user) {
    history.push("/login");
    return <></>;
  }

  const logout = () => {
    onLogout();
    history.push("/login");
  };

  return (
    <div className="app-container">
      <AppBar />
      <div className="hp-container">
        <TaskCard></TaskCard>
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
};

export default HomePage;
