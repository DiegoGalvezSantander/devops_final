import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);

  const despacho = async () => {
    await axios
      .get("http://192.168.3.20/api/v1/despachos", {
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((response) => {
        console.log(response.data);
        setDespachos(response.data);
      });
  };

  // Llamada a la función para obtener los datos cuando el componente se monta
  useEffect(() => {
    despacho();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  return (
    <>
      <section className="flex justify-center mb-8 w-full">
        {/* Contenedor unificado con sombra y bordes redondeados */}
        <div className="tabla-contenedor overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              {/* Encabezado con tipografía corregida y estilo limpio */}
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Orden Despacho</th>
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Orden Compra</th>
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Dirección de Entrega</th>
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Fecha Despacho</th>
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Patente Camión</th>
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Estado</th>
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Intentos</th>
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Acción</th>
              </tr>
            </thead>
            <tbody>
              {despachos.map((despacho) => (
                <tr key={despacho.idDespacho} className="border-b hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-4 text-gray-800 font-medium">{despacho.idDespacho}</td>
                  <td className="p-4 text-gray-600">{despacho.idCompra}</td>
                  <td className="p-4 text-gray-600">{despacho.direccionCompra}</td>
                  <td className="p-4 text-gray-600">{despacho.fechaDespacho}</td>
                  <td className="p-4 text-gray-700 font-mono text-sm">{despacho.patenteCamion}</td>
                  
                  {/* Badge dinámico para reflejar el estado del despacho */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      despacho.entregado 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {despacho.entregado ? "Entregado" : "Pendiente"}
                    </span>
                  </td>
                  
                  <td className="p-4 text-gray-600">{despacho.intento}</td>
                  <td className="p-4">
                    {/* Botón adaptado al esquema de color profesional */}
                    <button
                      onClick={() => handleAbrirModal(despacho)}
                      className="py-2 px-6 bg-[#00a680] text-white font-medium rounded-lg shadow hover:bg-[#008f6d] transition-all duration-300"
                    >
                      Cerrar despacho
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Modal
        onClose={() => {
          setOpenModal(false);
        }}
        open={openModal}
      >
        {despachoSeleccionado && (
          <FormCierreDespacho
            despacho={despachoSeleccionado}
            onClose={() => {
              setOpenModal(false);
              despacho();
            }}
          />
        )}
      </Modal>
    </>
  );
};