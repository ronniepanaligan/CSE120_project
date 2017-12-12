class Auth {
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }
  static deauthenticateUser() {
    localStorage.removeItem("token");
  }
}

export default Auth;
