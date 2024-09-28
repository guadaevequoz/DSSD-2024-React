import axios from "axios";
import authService from "./authService";
const url = `http://localhost:15922/bonita/API`;
const processId = "5454449622077517262";

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
        name: "ujuju",
        materials: materials,
      },
      {
        headers: {
          "X-Bonita-API-Token": authService.getToken(),
        },
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};

export const recolectorService = { saveRoute };
