import union from "../core/union";

const AuthResponse = union([
  "userAuthenticated",
  "invalidCredentials",
  "emailAlreadyExist",
]);
class Auth {
  Auth() {}
  init() {
    //Initialises authfacade(Checks if the user is already logged in or not)
    const user = localStorage.getItem("user");
    return user;
  }

  async registerNewUser(name, email, password) {
    let req = {
      name: name,
      email: email,
      password: password,
    };
    let res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    let resJSON = await res.json();
    console.log(resJSON);
    if (resJSON.error) {
      return AuthResponse.emailAlreadyExist();
    } else {
      localStorage.setItem("user", JSON.stringify(resJSON));
      return AuthResponse.userAuthenticated(resJSON);
    }
  }

  async loginWithEmail(email, password) {
    let req = {
      email: email,
      password: password,
    };
    let res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    let resJSON = await res.json();
    console.log(resJSON);
    if (resJSON.error === "Invalid Credentials") {
      return AuthResponse.invalidCredentials();
    } else {
      localStorage.setItem("user", JSON.stringify(resJSON));
      return AuthResponse.userAuthenticated(resJSON);
    }
  }

  logoutCurrentUser() {
    localStorage.removeItem("user");
  }
}

export default Auth;
