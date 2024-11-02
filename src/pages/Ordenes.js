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

  useEffect(() => {
    if (authService.getUser()) {
      setUser(authService.getUser());
    } else navigate("/login");

    const getOrdenes = async () => {
      let res = await depositoService.getOrders();
      setOrdenes(res);
    };
    getOrdenes();
  }, []);

  const getOrdenesCompletas = async () => {
    let res = await depositoService.getOrderById(2);
    setOrden(res);
  };

  const mostrarOrden = () => {
    getOrdenesCompletas();
    console.log(orden);
    setShowModal(true);
  };

  const handleTakeOrder = () => {
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
                  onClick={mostrarOrden}
                >
                  Ver más
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal carga/editar */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-50 md:w-1/3">
            <h2 className="text-2xl mb-4">
              {"Orden "}#{orden.id}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Fecha de creación:{" "}
              {new Date(orden.createdAt).toLocaleDateString()}
            </p>
            <h3>Materiales:</h3>
            <div className="mb-4">
              {orden.materials.map((material) => (
                <div key={material.id}>
                  <li className="text-lg mt-2 text-gray-600">
                    {material.material.name +
                      " " +
                      material.amount +
                      " " +
                      material.material.unit}
                  </li>
                </div>
              ))}
            </div>

            <p className="text-sm mt-2 text-gray-600">
              Observaciones: {orden.observations}
            </p>
            <div className="flex justify-end">
              <button
                className="bg-teal-700 text-white px-4 py-2 rounded-lg mr-2 hover:bg-teal-600"
                onClick={handleTakeOrder}
              >
                Tomar órden
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Ordenes;
