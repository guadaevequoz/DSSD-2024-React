import axios from "axios";

const url = `http://localhost:8080/??`;

const confirmRoute = async (route, user) => {
  try {
    const response = await axios.post(
      url,
      {
        route: route,
        user: user,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};

const getRouteByRecolectorDNI = async (dni) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
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
};
