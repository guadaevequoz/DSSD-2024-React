import axios from "axios";

const url = `http://localhost:15922/bonita`;
let apiToken;

const authService = {
  isAuthenticated: false,
  user: undefined,

  login(DNI, password) {
    // llamada a la api
    if (DNI === "12345678") {
      this.isAuthenticated = true;
      this.user = {
        DNI: "12345678",
        rol: "recolector",
      };
      this.loginToAPI();
      console.log("holaa", this.user);
      return true;
    } else if (DNI === "23456789") {
      this.isAuthenticated = true;
      this.user = {
        DNI: "23456789",
        rol: "deposito",
      };
      return true;
    } else {
      return false;
    }
  },

  logout() {
    this.isAuthenticated = false;
    this.user = undefined;
    //localStorage.clear();
  },

  isLoggedIn() {
    return this.isAuthenticated;
  },

  getUser() {
    console.log("aaa", this.user);
    return this.user;
  },

  loginToAPI: async () => {
    try {
      const params = new URLSearchParams();
      
      params.append("username", "walter.bates");
      params.append("password", "bpm");

      const response = await axios.post(
        url + `/loginservice`, params,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          withCredentials: true
        },
      );
      apiToken = document.cookie
        .split(" ")
        .find(el => el.startsWith("X-Bonita-API-Token"))
        .split("=")[1];

      return response.data;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  },

  getToken: () => {
    return apiToken;
  }
};

export default authService;
