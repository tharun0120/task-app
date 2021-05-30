import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./infrastructure/AuthFacade";
import LoginForm from "./presentation/components/LoginForm";
import RegisterForm from "./presentation/components/RegisterForm";
import HomePage from "./presentation/components/HomePage";
import LoadingScreen from "./presentation/components/LoadingScreen";

function App() {
  const mAuth = new Auth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const currUser = mAuth.init();
    if (currUser && !user) {
      const foundUser = JSON.parse(currUser);
      setUser(foundUser);
    }
    loading && setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginWithEmail = (email, password) => {
    let res = mAuth.loginWithEmail(email, password);

    res.match({
      userAuthenticated: (props) => {
        setUser(props.user);
      },
    });
  };

  const registerNewUser = (name, email, password) => {
    let res = mAuth.registerNewUser(name, email, password);
    res.match({
      userAuthenticated: (props) => {
        setUser(props.user);
      },
    });
  };
  const logoutUser = () => {
    mAuth.logoutCurrentUser();
    setUser();
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register">
            <RegisterForm onRegister={registerNewUser} />
          </Route>
          <Route path="/login">
            <LoginForm onLogin={loginWithEmail} />
          </Route>

          <Route path="/">
            <SplashScreen
              loading={loading}
              user={user}
              logoutUser={logoutUser}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const SplashScreen = ({ loading, user, logoutUser }) => {
  if (loading) {
    return <LoadingScreen />;
  }
  return <HomePage user={user} onLogout={logoutUser} />;
};

export default App;
