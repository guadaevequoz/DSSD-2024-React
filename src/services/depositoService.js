import axios from "axios";
import authService from "./authService";

const url = `${process.env.REACT_APP_BONITA_URL}/API`;
const urlAPI = `${process.env.REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;
const processId = `${process.env.REACT_APP_PROCESO_DEPOSITO_ID}`;

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

    const response = await axios.put(
      url + `/bpm/humanTask/${route[0].id}`,
      {
        assigned_id: 1,
        state: "completed",
        variables: [
          {
            name: "materialesDeposito",
            value: materials.map((el) => {
              return {
                material_id: +el.id,
                material_amount: +el.quantity,
              };
            }),
          },
          {
            name: "depositoId",
            value: authService.getUser().depositId,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
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
      withCredentials: true,
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
    const response = await axios.get(
      url + `/bpm/caseVariable/${caseId}/materialesRecolector`,
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/x-www-form-urlencoded",
          "X-Bonita-API-Token": authService.getToken(),
        },
        withCredentials: true,
      }
    );

    let data = response.data.value.replace(/=/g, ":");
    data = data.replace(/(\w+):/g, '"$1":');

    return JSON.parse(data);
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

const getOrders = async () => {
  try {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${authService.getJWT()}`,
    };
    const response = await axios.get(urlAPI + `/orders`);

    return response.data.data.orders;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return false;
  }
};

const getOrderById = async (id) => {
  try {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${authService.getJWT()}`,
    };
    const response = await axios.get(urlAPI + `/orders/${id}`);
    return response.data.data.order;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return false;
  }
};

const getOrdersByDepositId = async (id) => {
  try {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${authService.getJWT()}`,
    };
    const response = await axios.get(urlAPI + `/orders/me`);
    return response.data.data.orders;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return false;
  }
};

const assignOrder = async (orderId, depositId) => {
  try {
    const response = await axios.post(url + `/bpm/process/${processId}/instantiation`, {
      "order_id": orderId,
      "deposit_id": depositId,
      "token": authService.getJWT()
    }, {
      headers: {
        "X-Bonita-API-Token": authService.getToken()
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return false;
  }
};

const sendOrder = async (order) => {
  try {

    const firstResponse = await axios.get(url + `/bpm/humanTask?f=caseId%3D${order.caseId}`);

    const response = await axios.put(url + `/bpm/humanTask/${firstResponse.data[0].id}`,
      {
        "assigned_id": 1,
        "state": "completed"
      },
      {
        headers: {
          "X-Bonita-API-Token": authService.getToken()
        },
        withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return false;
  }
};

const getDepositById = async (depositId) => {
  try {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${authService.getJWT()}`,
    };
    const response = await axios.get(urlAPI + `/deposits/${depositId}`);

    return response.data.data.deposit;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return false;
  }
};

export const depositoService = {
  confirmRoute,
  getRouteByRecolectorDNI,
  searchRoutes,
  getRouteByCaseId,
  getRouteMaterials,
  getOrders,
  getOrderById,
  getOrdersByDepositId,
  assignOrder,
  getDepositById,
  sendOrder,
};
