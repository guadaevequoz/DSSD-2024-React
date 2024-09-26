import axios from "axios";

const url = `http://localhost:8080/??`;

const saveRoute = async (route, user) => {
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

export default saveRoute;
