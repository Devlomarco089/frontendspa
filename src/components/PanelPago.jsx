import React from "react";
import { useCart } from "../context/CartContext";
import { Navbar } from "./NavBar";

// Agrupa los ítems del carrito por fecha de horario
function agruparPorFecha(items) {
  const grupos = {};
  items.forEach(item => {
    let fecha = item.horario_fecha || (item.horario_detalle && item.horario_detalle.fecha);
    if (!fecha) fecha = 'Sin fecha';
    if (!grupos[fecha]) grupos[fecha] = [];
    grupos[fecha].push(item);
  });
  return grupos;
}

export function PanelPago() {
  const { cartItems, removeFromCart, clearCart, getTotal } = useCart();
  const [mensaje, setMensaje] = React.useState("");
  const [error, setError] = React.useState("");
  const [metodoPago, setMetodoPago] = React.useState("web");
  const [tipoTarjeta, setTipoTarjeta] = React.useState("");
  const accessToken = localStorage.getItem("accessToken");

  const gruposPorFecha = agruparPorFecha(cartItems);

  const handleRemove = async (itemId) => {
    await removeFromCart(itemId);
  };

  // Función para pagar solo un grupo (un día)
  const handlePagarGrupo = async (fecha, itemsGrupo) => {
    setMensaje("");
    setError("");
    if (itemsGrupo.length === 0) return;
    if (metodoPago === "web" && !tipoTarjeta) {
      setError("Debes seleccionar el tipo de tarjeta.");
      return;
    }
    try {
      const servicios = itemsGrupo.map(item => ({
        servicio: item.servicio,
        horario: item.horario,
        nota: item.nota || ""
      }));
      const body = { servicios };
      const response = await fetch("http://localhost:8000/api/ordenes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error("Error al crear la orden");
      const ordenes = await response.json();
      for (const orden of Array.isArray(ordenes) ? ordenes : [ordenes]) {
        const pagarBody = { metodo_pago: metodoPago };
        if (metodoPago === "web") pagarBody.tipo_tarjeta = tipoTarjeta;
        const pagarResp = await fetch(`http://localhost:8000/api/pagar-orden/${orden.id}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(pagarBody)
        });
        if (!pagarResp.ok) {
          const errData = await pagarResp.json();
          throw new Error(errData.error || "Error al procesar el pago de la orden");
        }
      }
      setMensaje(`¡Pago realizado y orden creada con éxito para el día ${fecha}!`);
      // Quitar del carrito solo los items pagados
      for (const id of itemsGrupo.map(i => i.id)) {
        await removeFromCart(id);
      }
    } catch (err) {
      setError(err.message || "Error al procesar el pago. Intenta nuevamente.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-pink-400">Panel de Pago</h2>
      {mensaje && <div className="text-green-600 mb-4">{mensaje}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {Object.keys(gruposPorFecha).length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Servicios en el carrito</h3>
          <p className="text-gray-600">No hay servicios en el carrito.</p>
        </div>
      )}
      {Object.entries(gruposPorFecha).map(([fecha, itemsGrupo]) => {
        // Calcular descuento para este grupo (solo si hay fecha válida)
        let anticipa48hs = false;
        let aplicaDescuento = false;
        let total = 0;
        let totalConDescuento = 0;
        if (fecha !== 'Sin fecha') {
          anticipa48hs = itemsGrupo.every(item => {
            const fechaTurno = new Date(item.horario_fecha || (item.horario_detalle && item.horario_detalle.fecha));
            const hoy = new Date();
            hoy.setHours(0,0,0,0);
            const diff = (fechaTurno - hoy) / (1000 * 60 * 60 * 24);
            return diff >= 2;
          });
          aplicaDescuento = metodoPago === "web" && anticipa48hs;
          total = itemsGrupo.reduce((sum, item) => sum + parseFloat(item.servicio_detalle?.precio || 0), 0);
          totalConDescuento = aplicaDescuento ? (total * 0.85).toFixed(2) : total.toFixed(2);
        } else {
          total = itemsGrupo.reduce((sum, item) => sum + parseFloat(item.servicio_detalle?.precio || 0), 0);
          totalConDescuento = total.toFixed(2);
        }
        return (
          <div key={fecha} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-2">Servicios para el día {fecha}</h3>
            <ul>
              {itemsGrupo.map((item) => (
                <li key={item.id} className="mb-3 flex justify-between items-center">
                  <span>
                    Servicio: {item.servicio_detalle?.nombre || item.servicio} {item.nota && `| Nota: ${item.nota}`}
                  </span>
                  <button
                    className="ml-4 px-2 py-1 bg-red-200 text-red-700 rounded"
                    onClick={() => handleRemove(item.id)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
            <div className="text-right font-bold mt-4">
              Total: ${total.toFixed(2)}
              {aplicaDescuento && (
                <div className="text-green-600 text-sm mt-1">¡Pagando con tarjeta y anticipación de 48hs tienes 15% de descuento!</div>
              )}
              {aplicaDescuento && (
                <div className="text-pink-600 font-bold">Total con descuento: ${totalConDescuento}</div>
              )}
            </div>
            <button
              className="w-full py-2 mt-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300"
              onClick={() => handlePagarGrupo(fecha, itemsGrupo)}
            >
              Pagar este grupo
            </button>
          </div>
        );
      })}
      {/* Selección de método de pago */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Método de Pago</h3>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="metodoPago"
              value="web"
              checked={metodoPago === "web"}
              onChange={() => setMetodoPago("web")}
            />
            Tarjeta
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="metodoPago"
              value="efectivo"
              checked={metodoPago === "efectivo"}
              onChange={() => setMetodoPago("efectivo")}
            />
            Efectivo
          </label>
        </div>
        {metodoPago === "web" && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Tipo de Tarjeta:</label>
            <select
              value={tipoTarjeta}
              onChange={e => setTipoTarjeta(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecciona tipo de tarjeta</option>
              <option value="debito">Débito</option>
              <option value="credito">Crédito</option>
            </select>
            {/* Simulación de formulario de tarjeta */}
            {tipoTarjeta && (
              <div className="mt-4 p-4 bg-gray-50 rounded border">
                <h4 className="font-semibold mb-2">Datos de la tarjeta ({tipoTarjeta === 'debito' ? 'Débito' : 'Crédito'})</h4>
                <form onSubmit={e => e.preventDefault()}>
                  <div className="mb-2">
                    <label className="block text-sm">Número de tarjeta</label>
                    <input type="text" maxLength={19} className="w-full p-2 border rounded" placeholder="0000 0000 0000 0000" disabled />
                  </div>
                  <div className="mb-2 flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm">Vencimiento</label>
                      <input type="text" maxLength={5} className="w-full p-2 border rounded" placeholder="MM/AA" disabled />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm">CVV</label>
                      <input type="text" maxLength={4} className="w-full p-2 border rounded" placeholder="123" disabled />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm">Nombre en la tarjeta</label>
                    <input type="text" className="w-full p-2 border rounded" placeholder="Nombre Apellido" disabled />
                  </div>
                  <button className="w-full py-2 mt-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed" disabled>
                    Simulación: No se realiza ningún pago real
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default PanelPago;