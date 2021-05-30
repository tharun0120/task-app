import { useHistory } from "react-router-dom";
import "./css/HomePage.css";

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
    <div className="hp-container">
      <h1>Hello {user.name}!</h1>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default HomePage;
