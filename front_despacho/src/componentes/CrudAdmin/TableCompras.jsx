import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { FormDespacho } from "./FormDespacho";
import axios from "axios";

export const TableCompras = () => {
  const [ventas, setVentas] = useState([]);

  const compras = async () => {
    await axios.get("http://192.168.30/api/v1/ventas", {
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((response) => {
      console.log(response.data);
      setVentas(response.data);
    });
  };

  // Llamada a la función para obtener los datos cuando el componente se monta
  useEffect(() => {
    compras();
  }, []);

  // state que controla el modal
  const [openModal, setOpenModal] = useState(false);

  // state que abre el modal junto con la data del id seleccionado
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  
  const handleAbrirModal = (venta) => {
    setVentaSeleccionada(venta);
    setOpenModal(true);
  };

  return (
    <>
      <section className="flex justify-center mb-8 w-full">
        {/* Aquí aplicamos la clase CSS que pegaste en index.css */}
        <div className="tabla-contenedor overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              {/* Encabezado limpio y destacado */}
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Orden de Compra</th>
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Dirección</th>
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Fecha de Compra</th>
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Valor Total</th>
                <th className="p-4 font-bold text-gray-700 uppercase text-sm">Acción</th>
              </tr>
            </thead>
            <tbody>
              {ventas
                .filter((venta) => !venta.despachoGenerado)
                .map((venta) => (
                  <tr key={venta.idVenta} className="border-b hover:bg-gray-50 transition-colors duration-200">
                    <td className="p-4 text-gray-800">{venta.idVenta}</td>
                    <td className="p-4 text-gray-600">{venta.direccionCompra}</td>
                    <td className="p-4 text-gray-600">{venta.fechaCompra}</td>
                    <td className="p-4 text-gray-800 font-semibold">${venta.valorCompra}</td>
                    <td className="p-4">
                      {/* Botón mejorado con Tailwind */}
                      <button
                        onClick={() => handleAbrirModal(venta)}
                        className="py-2 px-6 bg-[#00a680] text-white font-medium rounded-lg shadow hover:bg-[#008f6d] transition-all duration-300"
                      >
                        Generar Despacho
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
        {ventaSeleccionada && (
          <FormDespacho
            venta={ventaSeleccionada}
            onClose={() => {
              // onclose es un prop que pasa funciones al modal con el form abierto, por ende al cerrarse, se ejecutan esas 2 funciones
              setOpenModal(false);
              compras();
            }}
          />
        )}
      </Modal>
    </>
  );
};