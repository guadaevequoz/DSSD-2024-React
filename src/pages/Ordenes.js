import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import authService from "../services/authService";
import { depositoService } from "../services/depositoService";
import { useNavigate } from "react-router-dom";

const Ordenes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [ordenes, setOrdenes] = useState([]);
  const [orden, setOrden] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (authService.getUser()) {
      setUser(authService.getUser());
    } else navigate("/login");

    getOrdenes();
  }, []);

  const getOrdenes = async () => {
    let res = await depositoService.getOrders();
    setOrdenes(res);
  };

  const mostrarOrden = async (id) => {
    let res = await depositoService.getOrderById(id);
    if (res) setOrden(res);
    setShowModal(true);
  };

  const handleTakeOrder = async () => {
    let response = await depositoService.assignOrder(orden.id, user.depositId);
    console.log(response);
    setStatus(response.status);
    if (response.status) {
      setMessage("Te has asignado la órden exitosamente.");
    } else
      setMessage(
        "La órden no ha podido ser asignada, por favor intenta nuevamente."
      );
    getOrdenes();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMessage("");
    setStatus("");
  };
  return (
    <>
      <Navbar user={user} />
      <div className="md:p-10 p-4">
        <h1 className="md:text-4xl text-xl font-bold mb-4">
          Órdenes disponibles
        </h1>
        <hr className="mb-4" />
        <div className="border-b">
          {ordenes.length === 0 ? (
            <div className="p-4 rounded bg-gray-100 text-center w-full text-black/80">
              Ups! Parece que no hay órdenes disponibles.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-4">
              {ordenes.map((orden) => (
                <div
                  key={orden.id}
                  className="bg-white shadow-md p-4 rounded-lg border"
                >
                  <h2 className="text-lg font-bold">Orden #{orden.id}</h2>
                  <p className="text-sm text-gray-500">
                    Fecha de creación:{" "}
                    {new Date(orden.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm mt-2 text-gray-600">
                    Observaciones: {orden.observations}
                  </p>
                  <button
                    className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 focus:outline-none"
                    onClick={() => mostrarOrden(orden.id)}
                  >
                    Ver más
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl sm:w-11/12 md:w-2/5 lg:w-1/3 max-w-lg mx-auto">
            <h2 className="text-3xl font-semibold text-teal-700 mb-4">
              Orden #{orden.id}
            </h2>
            {message === "" ? (
              <div>
                <p className="text-sm text-gray-500 mb-6">
                  Fecha de creación:{" "}
                  {new Date(orden.createdAt).toLocaleDateString()}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Materiales
                </h3>
                <ul className="space-y-2 mb-6">
                  {orden.materials &&
                    orden.materials.map((material) => (
                      <li
                        key={material.id}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <span className="text-gray-600 font-medium">
                          {material.material.name}
                        </span>
                        <span className="text-gray-500">
                          {material.amount} {material.material.unit}
                        </span>
                      </li>
                    ))}
                </ul>

                <p className="text-gray-700">
                  <span className="font-semibold">Observaciones:</span>{" "}
                  {orden.observations || "Ninguna"}
                </p>
              </div>
            ) : (
              <div
                className={`p-4 rounded ${
                  status === "success"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }  text-center`}
              >
                {message}
              </div>
            )}
            <div className="flex justify-end mt-6 space-x-3">
              {message === "" && (
                <button
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition duration-200"
                  onClick={handleTakeOrder}
                >
                  Tomar orden
                </button>
              )}
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                onClick={handleCloseModal}
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Ordenes;
