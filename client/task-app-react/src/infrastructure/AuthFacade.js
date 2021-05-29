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
    console.log("mAuth init");
  }
  registerNewUser(name, email, password) {
    //mock call to auth api, returns either true or error(email already exist)
  }

  loginWithEmail(email, password) {
    // mock call to auth api, returns either true or error(invalid cred)
    let res;
    if (password === "123") {
      res = AuthResponse.invalidCredentials();
    } else {
      res = AuthResponse.userAuthenticated({ uID: "78dsa9f7" });
    }
    return res;
  }
}

export default Auth;
