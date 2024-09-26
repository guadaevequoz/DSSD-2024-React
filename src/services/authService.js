import axios from "axios";

const url = `http://localhost:8080/bonita`;

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

  loginToAPI: async (userId, materials) => {
    try {
      const response = await axios.post(
        url + `/loginService`,
        {
          username: "walter.bates",
          password: "bpm",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  },
};

export default authService;
