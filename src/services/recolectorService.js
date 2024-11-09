import axios from "axios";
import authService from "./authService";
//const url = `http://localhost:15922/bonita/API`;
const url = `http://13.58.229.86:8080/`;
//const urlAPI = `http://13.58.229.86:3000/api`;
const urlAPI = `http://localhost:3000/api`;
const processId = "5691512096063948652";
axios.defaults.withCredentials = true;
axios.defaults.headers.common = {
  Authorization: `Bearer ${authService.getJWT()}`,
};

/**
 * Subir el form de la ruta
 * @param {*} userId
 * @param {*} materials
 * @returns
 */
const saveRoute = async (userId, materials) => {
  try {
    const response = await axios.post(
      url + `/bpm/process/${processId}/instantiation`,
      {
        user_id: authService.getUser().id,
        materials: materials,
      },
      {
        headers: {
          "X-Bonita-API-Token": authService.getToken(),
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};

const getMaterials = async () => {
  try {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${authService.getJWT()}`,
    };
    const response = await axios.get(urlAPI + `/materials`);
    return response.data.data.materials;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return false;
  }
};

const getRequestsByCurrentUser = async () => {
  try {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${authService.getJWT()}`,
    };
    const response = await axios.get(urlAPI + `/requests/me`);

    return response.data.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return false;
  }
};

const currentUserHasPending = async () => {
  try {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${authService.getJWT()}`,
    };
    const response = await axios.get(urlAPI + `/requests/me/pending`);
    console.log(response);
    return response.data.data.hasPending;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return false;
  }
};

export const recolectorService = {
  saveRoute,
  getMaterials,
  getRequestsByCurrentUser,
  currentUserHasPending,
};
