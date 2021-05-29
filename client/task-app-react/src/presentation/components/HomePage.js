import { useHistory } from "react-router-dom";

const HomePage = ({ router }) => {
  const history = useHistory();
  history.push("/login");

  return <></>;
};

export default HomePage;
