import axios from "axios";

const url = `http://localhost:8080/API/`;
const processId = "1";

/**
 * Subir el form de la ruta
 * @param {*} userId
 * @param {*} materials
 * @returns
 */
const saveRoute = async (userId, materials) => {
  try {
    const response = await axios.post(
      url + `/bpm/process/{{${processId}}}/instantiation`,
      {
        recolector_id: userId,
        materials: materials,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/x-www-form-urlencoded",
          "X-Bonita-API-Token": "holacomoestas",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};

export const recolectorService = { saveRoute };
