import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./infrastructure/AuthFacade";
import LoginForm from "./presentation/components/LoginForm";
import RegisterForm from "./presentation/components/RegisterForm";
import HomePage from "./presentation/components/HomePage";
import Loader from "./presentation/components/Loader";

function App() {
  const mAuthRef = useRef();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mAuth = new Auth();
    mAuthRef.current = mAuth;
    const currUser = mAuth.init();
    if (currUser && !user) {
      const foundUser = JSON.parse(currUser);
      setUser(foundUser);
    }
    loading && setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginWithEmail = async (email, password) => {
    let res = await mAuthRef.current.loginWithEmail(email, password);
    console.log(res);
    res.match({
      userAuthenticated: (props) => {
        setUser(props);
      },
      invalidCredentials: () => {},
    });
    return res;
  };

  const registerNewUser = async (name, email, password) => {
    let res = await mAuthRef.current.registerNewUser(name, email, password);

    res.match({
      userAuthenticated: (props) => {
        setUser(props);
      },
      emailAlreadyExist: () => {},
    });
    return res;
  };
  const logoutUser = () => {
    mAuthRef.current.logoutCurrentUser();
    setUser();
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register">
            <RegisterForm onRegister={registerNewUser} currUser={user} />
          </Route>
          <Route path="/login">
            <LoginForm onLogin={loginWithEmail} currUser={user} />
          </Route>
          <Route
            path="/about"
            component={() => {
              window.location.href = "https://example.com/1234";
              return null;
            }}
          />
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
    return <Loader />;
  }
  return <HomePage user={user} onLogout={logoutUser} />;
};

export default App;
