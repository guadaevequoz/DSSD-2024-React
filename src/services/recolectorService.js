import axios from "axios";
import authService from "./authService";
const url = `http://localhost:15922/bonita/API`;
const processId = "7093799715754021597";

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
        "name": "ujuju",
        //"user_id": authService.getUser().id, --> falta actualizar BD
        "materials": materials,
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
