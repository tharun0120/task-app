import union from "../core/union";

const AuthResponse = union([
  "userAuthenticated",
  "invalidCredentials",
  "emailAlreadyExist",
]);

class Auth {
  user;
  init() {
    //Initialises authfacade(Checks if the user is already logged in or not)
    const user = localStorage.getItem("user");

    this.user = JSON.parse(user);
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
    if (resJSON.error) {
      return AuthResponse.emailAlreadyExist();
    } else {
      localStorage.setItem("user", JSON.stringify(resJSON));
      this.user = resJSON;
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
    if (resJSON.error === "Invalid Credentials") {
      return AuthResponse.invalidCredentials();
    } else {
      localStorage.setItem("user", JSON.stringify(resJSON));
      this.user = resJSON;

      return AuthResponse.userAuthenticated(resJSON);
    }
  }

  logoutCurrentUser() {
    localStorage.removeItem("user");
    fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.user.token,
      },
    });
  }
}

export default Auth;
