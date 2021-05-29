import LoginForm from "./presentation/components/LoginForm";
import { useState, useEffect } from "react";
import Auth from "./infrastructure/AuthFacade";

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
    console.log("res", res);
  };

  return (
    <div className="App">
      <LoginForm onLogin={loginWithEmail} />
    </div>
  );
}

export default App;
