import axios from "axios";

const url = `http://localhost:8080/API`;

/**
 * Valida la ruta en un deposito
 * @param {*} caseId
 * @param {*} materials
 * @param {*} depositoId
 * @returns
 */
const confirmRoute = async (caseId, materials, depositoId) => {
  try {
    const response = await axios.put(
      url + `/bpm/humanTaskcaseId%3D${caseId}`,
      {
        materials: materials,
        deposito_id: depositoId,
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

/**
 * Busca una ruta por caseId
 * @param {*} id
 * @returns
 */
const getRouteByCaseId = async (id) => {
  try {
    const response = await axios.get(url + "humanTask", {
      headers: {
        Accept: "application/json",
        "Content-type": "application/x-www-form-urlencoded",
        "X-Bonita-API-Token": "holacomoestas",
      },
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};

// esto por ahora no se usa porque no tenemos api
const getRouteByRecolectorDNI = async (dni) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/x-www-form-urlencoded",
        "X-Bonita-API-Token": "holacomoestas",
      },
      params: { dni: dni },
    });
    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};

const searchRoutes = async (id) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};

export const depositoService = {
  confirmRoute,
  getRouteByRecolectorDNI,
  searchRoutes,
  getRouteByCaseId,
};
