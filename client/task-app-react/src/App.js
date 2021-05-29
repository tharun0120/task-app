import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Auth from "./infrastructure/AuthFacade";
import LoginForm from "./presentation/components/LoginForm";
import RegisterForm from "./presentation/components/RegisterForm";
import HomePage from "./presentation/components/HomePage";

function App() {
  const mAuth = new Auth();
  useEffect(() => {
    mAuth.init();
  });

  const [user, setuser] = useState({
    uId: 0,
  });

  const loginWithEmail = (email, password) => {
    let res = mAuth.loginWithEmail(email, password);
  };

  const registerNewUser = (name, email, password) => {
    let res = mAuth.registerNewUser(name, email, password);
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginForm onLogin={loginWithEmail} />
          </Route>
          <Route path="/register">
            <RegisterForm onRegister={registerNewUser} />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
