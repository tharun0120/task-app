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
  registerNewUser(name, email, password) {
    //mock call to auth api, returns either true or error(email already exist)
    let res = {
      user: {
        uID: "78dsa9f7",
        fullName: name,
        email: email,
        token: "1sdaf6s54f68sd1ngb5",
      },
    };
    localStorage.setItem("user", JSON.stringify(res.user));
    return AuthResponse.userAuthenticated(res);
  }

  loginWithEmail(email, password) {
    // mock call to auth api, returns either true or error(invalid cred)
    let res = {
      user: {
        uID: "78dsa9f7",
        fullName: "Alby",
        email: email,
        token: "1sdaf6s54f68sd1ngb5",
      },
    };
    console.log(res.user);
    localStorage.setItem("user", JSON.stringify(res.user));
    return AuthResponse.userAuthenticated(res);
  }

  logoutCurrentUser() {
    localStorage.removeItem("user");
  }
}

export default Auth;
