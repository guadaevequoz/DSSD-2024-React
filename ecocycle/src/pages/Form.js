import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [materialType, setMaterialType] = useState("");
  const [materialQuantity, setMaterialQuantity] = useState("");
  const [materials, setMaterials] = useState([]);
  const [user, setUser] = useState("");

  // esto se deberia ir a buscar a la api supongo
  const materialTypes = ["Cartón", "Papel", "Vidrio", "Aluminio"];

  useEffect(() => {
    if (authService.getUser()) setUser(authService.getUser());
    else navigate("/login");
  }, []);

  const handleAddMaterial = () => {
    setShowModal(true);
  };

  const handleSaveMaterial = () => {
    if (materialType && materialQuantity) {
      setMaterials([
        ...materials,
        { name: materialType, quantity: materialQuantity },
      ]);
      setMaterialType("");
      setMaterialQuantity("");
      setShowModal(false);
    } else {
      //lógica para q completen todo?
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveRoute = () => {
    console.log(materials);
  };

  const handleDeleteMaterial = (index) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleCancel = (index) => {
    setMaterials([]);
  };

  return (
    <>
      <Navbar user={user} />
      <div className="p-10">
        <h1 className="text-4xl font-bold mb-4">Nuevo recorrido</h1>
        <hr className="mb-4" />
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">Materiales</span>
          <button
            className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-lg hover:bg-green-600"
            onClick={handleAddMaterial}
          >
            +
          </button>
        </div>

        {/* Lista de materiales */}
        <div className="mb-6">
          {materials.length > 0 ? (
            materials.map((material, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 mb-2 border rounded-lg bg-gray-100 shadow-sm"
              >
                <div className="flex items-center">
                  {/* icono circular q agrego joaco pero no sé para que es */}
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-4">
                    <span className="text-green-700 font-bold">
                      {material.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">{material.name}</p>
                    <p className="text-sm text-gray-600">
                      {material.quantity} kg
                    </p>
                  </div>
                </div>
                {/* botones de editar o eliminar */}
                <div className="flex items-center">
                  <button
                    className="text-gray-500 hover:text-red-500 mx-2"
                    onClick={() => handleDeleteMaterial(index)}
                  >
                    x
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No se han agregado materiales aún.</p>
          )}
        </div>

        {/* Botones de guardar o cancelar */}
        <div className="flex items-center mb-4">
          <div className="flex justify-end">
            <button
              className="bg-teal-700 text-white px-4 py-2 rounded-lg mr-2 hover:bg-teal-600"
              onClick={handleSaveRoute}
            >
              Cargar recorrido
            </button>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg sm:w-50 md:w-1/3">
              <h2 className="text-2xl mb-4">Agregar material</h2>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Tipo</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                >
                  <option value="">Selecciona un tipo</option>
                  {materialTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">
                  Cantidad (kg)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={materialQuantity}
                  onChange={(e) => setMaterialQuantity(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-teal-700 text-white px-4 py-2 rounded-lg mr-2 hover:bg-teal-600"
                  onClick={handleSaveMaterial}
                >
                  Agregar
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
      </div>
    </>
  );
};

export default Form;
