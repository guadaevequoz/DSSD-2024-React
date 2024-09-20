const authService = {
  isAuthenticated: false,
  user: undefined,

  login(DNI, password) {
    // llamada a la api
    if (DNI === "12345678") {
      this.isAuthenticated = true;
      this.user = {
        DNI: "12345678",
      };
      console.log("holaa", this.user);
      return true;
    } else {
      return false;
    }
  },

  logout() {
    this.isAuthenticated = false;
    this.user = undefined;
  },

  isLoggedIn() {
    return this.isAuthenticated;
  },

  getUser() {
    console.log("aaa", this.user);
    return this.user;
  },
};

export default authService;