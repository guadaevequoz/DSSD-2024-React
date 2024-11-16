import axios from "axios";
axios.defaults.withCredentials = true;

const urlBonita = `${process.env.REACT_APP_BONITA_URL}`;
const urlAPI = `${process.env.REACT_APP_API_URL_LOCAL}`;

let apiToken;
let jwt;

const authService = {
  isAuthenticated: false,
  user: undefined,

  loginToAPI: async function() {
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

  login: async function(username, password) {
    try {
      const response = await axios.post(urlAPI + `/users/login`, {
        username: username,
        password: password,
      });

      jwt = response.data.token;
      this.loginToAPI();

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

};

export default authService;
