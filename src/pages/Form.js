import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import authService from "../services/authService";
import { useNavigate, useParams } from "react-router-dom";
import { depositoService } from "../services/depositoService";
import { recolectorService } from "../services/recolectorService";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showModalEnd, setShowModalEnd] = useState(false);
  const [materialType, setMaterialType] = useState("");
  const [materialTypes, setMaterialTypes] = useState([]);
  const [materialQuantity, setMaterialQuantity] = useState("");
  const [materials, setMaterials] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [user, setUser] = useState("");
  const [saved, setSaved] = useState(false);
  const [ended, setEnded] = useState(false);
  const [response, setResponse] = useState(null);
  const [pending, setPending] = useState(false);

  // esto se deberia ir a buscar a la api supongo
  //let materialTypes = [];
  // const materialTypes = [
  //   { id: 1, name: "Cartón" },
  //   { id: 2, name: "Vidrio" },
  //   { id: 3, name: "Madera"},
  //   { id: 3, name: "Madera" },
  //   { id: 4, name: "Papel" },
  //   { id: 5, name: "Tela" }
  //   { id: 5, name: "Tela" },
  // ];

  useEffect(() => {
    if (authService.getUser()) setUser(authService.getUser());
    else navigate("/login");

    const getMaterials = async () => {
      let res = await depositoService.getRouteMaterials(id);
      res = res.map((el) => {
        return {
          id: el.material_id,
          quantity: el.material_amount,
          name: materialTypes.filter((mt) => mt.id == el.material_id)[0].name,
        };
      });
      setMaterials(res);
    };
    const getMaterialTypes = async () => {
      let res = await recolectorService.getMaterials();
      console.log(res);
      setMaterialTypes(res);
      // materialTypes = [...res];
      console.log(materialTypes);
    };
    const getPending = async () => {
      let res = await recolectorService.currentUserHasPending();
      setPending(res);
    };

    if (id) {
      getMaterials();
    } else {
      getPending();
    }

    getMaterialTypes();
  }, []);

  const handleAddMaterial = () => {
    setEditingIndex(null);
    setMaterialType("");
    setMaterialQuantity("");
    setShowModal(true);
  };

  const handleSaveMaterial = () => {
    if (materialType && materialQuantity) {
      if (editingIndex !== null) {
        // editar material existente
        const updatedMaterials = materials.map((material, index) =>
          index === editingIndex
            ? {
                id: materials[index].id,
                name: materialType,
                quantity: materialQuantity,
              }
            : material
        );
        setMaterials(updatedMaterials);
      } else {
        // agregar nuevo material
        setMaterials([
          ...materials,
          {
            id: +materialType,
            name: materialType,
            quantity: +materialQuantity,
          },
        ]);
      }

      setMaterialType("");
      setMaterialQuantity("");
      setShowModal(false);
    } else {
      // Lógica para que completen todo
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveRoute = async () => {
    console.log(materials);
    let recorrido = {
      materials: materials.map((el) => {
        return {
          material_id: +el.id,
          material_amount: +el.quantity,
        };
      }),
    };

    const res = await recolectorService.saveRoute(
      user.id,
      recorrido["materials"]
    );
    setResponse(res);
    setSaved(true);
  };

  const handleDeleteMaterial = (index) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleEditMaterial = (index) => {
    console.log(materials[index]);
    setEditingIndex(index);
    setMaterialType(materials[index].name);
    setMaterialQuantity(materials[index].quantity);
    setShowModal(true);
  };

  const handleCancel = (index) => {
    setMaterials([]);
  };

  const handleEnd = (index) => {
    setShowModalEnd(true);
  };

  const handleSave = () => {
    setEnded(true);
    depositoService.confirmRoute(id, materials);
    navigate("/solicitudes");
  };

  const handleCloseModalFinalizar = () => {
    setShowModalEnd(false);
  };

  const getNombre = (name) => {
    return materialTypes.find((e) => e.id === +name).name;
  };

  return (
    <>
      <Navbar user={user} />
      <div className="md:p-10 p-4">
        <h1 className="md:text-4xl text-xl font-bold mb-4">
          {id ? "Confirmar entrega" : "Nuevo recorrido"}
        </h1>
        <hr className="mb-4" />
        {!pending ? (
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Materiales</span>
            {!id && (
              <button
                className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-lg hover:bg-green-600"
                onClick={handleAddMaterial}
              >
                +
              </button>
            )}
          </div>
        ) : (
          <div className="p-4 rounded bg-red-100 text-red-600 text-center w-full ">
            Tenes una orden en proceso. Recuerda que hasta que no la completes
            no podes iniciar una nueva.
          </div>
        )}

        {saved && response && (
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 mb-2 border rounded-lg bg-green-100 shadow-sm text-green-800">
              Se ha cargado tu recorrido con el número #{response["caseId"]}!
              Dirígete al depósito con el número indicado para que la orden sea
              recibida.
            </div>
          </div>
        )}
        {/* Lista de materiales */}
        {!saved && !pending && (
          <>
            <div className="mb-6">
              {materials.length > 0 && !pending ? (
                materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 mb-2 border rounded-lg bg-gray-100 shadow-sm"
                  >
                    <div className="flex items-center">
                      {/* icono circular q agrego joaco pero no sé para que es */}
                      <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-4">
                        <span className="text-green-700 font-bold">
                          {getNombre(material.id).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold">{getNombre(material.id)}</p>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4 md:size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                      <button
                        className="text-gray-500 hover:text-blue-500 mx-2"
                        onClick={() => handleEditMaterial(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4 md:size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No se han agregado materiales aún.
                </p>
              )}
            </div>
            <div className="flex items-center mb-4">
              <div className="flex justify-end">
                {user.role === "recolector" && (
                  <>
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
                  </>
                )}
                {user.role === "depósito" && (
                  <button
                    className="bg-teal-700 text-white px-4 py-2 rounded-lg mr-2 hover:bg-teal-600"
                    onClick={handleEnd}
                  >
                    Finalizar
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Modal carga/editar */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg sm:w-50 md:w-1/3">
              <h2 className="text-2xl mb-4">
                {editingIndex !== null ? "Editar material" : "Agregar material"}
              </h2>
              <p>{materialTypes.length}</p>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Tipo</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={materialTypes.find((m) => m.id === materialType)}
                  onChange={(e) => setMaterialType(e.target.value)}
                >
                  {materialTypes.map((type, index) => (
                    <option value={type.id} key={index}>
                      {type.name}
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
                  {editingIndex !== null ? "Guardar" : "Agregar"}
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

        {/* Modal finalizar */}
        {showModalEnd && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg sm:w-50 md:w-1/3">
              <h2 className="text-2xl mb-4">Confirmar recorrido</h2>
              <div className="mb-4">
                Estás a punto de confirmar los siguientes datos:
                {materials.length > 0 &&
                  materials.map((material) => (
                    <li>
                      {material.name}: {material.quantity} kg
                    </li>
                  ))}
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-teal-700 text-white px-4 py-2 rounded-lg mr-2 hover:bg-teal-600"
                  onClick={handleSave}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                  onClick={handleCloseModalFinalizar}
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
