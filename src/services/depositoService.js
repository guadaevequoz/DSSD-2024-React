import axios from "axios";
import authService from "./authService";

const url = `http://localhost:15922/bonita/API`;

/**
 * Valida la ruta en un deposito
 * @param {*} caseId
 * @param {*} materials
 * @param {*} depositoId
 * @returns
 */
const confirmRoute = async (caseId, materials) => {
  try {

    const route = await getRouteByCaseId(caseId);

    console.log(materials);
    
    const response = await axios.put(
      url + `/bpm/humanTask/${route[0].id}`,
      {
        "assigned_id": 4,
        "state": "completed",
        "variables": [
          {
            "name": "materialesDeposito",
            "value": materials.map((el) => { 
              return {
                "material_id": +el.id,
                "material_amount": +el.quantity
              }
            })
          },
          { 
            "name": "depositoId",
            "value": authService.getUser().depositId
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Bonita-API-Token": authService.getToken(),
        },
        withCredentials: true
      },
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
    const response = await axios.get(url + "/bpm/humanTask?f=caseId%3D" + id, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/x-www-form-urlencoded",
        "X-Bonita-API-Token": authService.getToken(),
      },
      withCredentials: true
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

const getRouteMaterials = async (caseId) => {
  try {
    const response = await axios.get(url + `/bpm/caseVariable/${caseId}/materialesRecolector`, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/x-www-form-urlencoded",
        "X-Bonita-API-Token": authService.getToken(),
      },
      withCredentials: true
    });
    
    let data = response.data.value.replace(/=/g, ":");
    data = data.replace(/(\w+):/g, '"$1":');

    return JSON.parse(data);
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
}

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
  getRouteMaterials
};
