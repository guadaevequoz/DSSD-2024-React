import axios from "axios";
axios.defaults.withCredentials = true;

//const url = `http://localhost:15922/bonita`;
const urlBonita = `http://13.58.229.86:8080/`;
const urlAPI = `http://13.58.229.86:3000/api`;

let apiToken;
let jwt;

const authService = {
  isAuthenticated: false,
  user: undefined,

  login: async (username, password) => {
    try {
      const response = await axios.post(urlAPI + `/users/login`, {
        username: username,
        password: password,
      });
      jwt = response.data.token;
      return response.data.data.user;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      return false;
    }
  },

  getToken: () => {
    return apiToken;
  },

  getJWT: () => {
    return jwt;
  },

  logout: async () => {
    try {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${jwt}`,
      };
      const response = await axios.get(urlAPI + `/users/logout`);
      console.log(response);

      return true;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      return false;
    }
  },

  isLoggedIn() {
    return this.isAuthenticated;
  },

  setUser(user) {
    this.user = user;
    this.isAuthenticated = true;
  },

  getUser() {
    return this.user;
  },

  deleteCredentials() {
    this.user = undefined;
    this.isAuthenticated = false;
  },

  loginToAPI: async () => {
    try {
      const params = new URLSearchParams();

      params.append("username", "walter.bates");
      params.append("password", "bpm");

      const response = await axios.post(urlBonita + `/loginservice`, params, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      });
      apiToken = document.cookie
        .split(" ")
        .find((el) => el.startsWith("X-Bonita-API-Token"))
        .split("=")[1];

      return response.data;
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  },
};

export default authService;
