import React, { useState } from "react";

const respuestas = [
  {
    pregunta: ["horario", "abierto", "abrir", "cierran", "cierra"],
    respuesta: "Nuestro spa está abierto de lunes a viernes de 9:00 a 18:00 hs.",
  },
  {
    pregunta: ["direccion", "dónde", "ubicación", "local"],
    respuesta: "Estamos en Av. Principal 123, Ciudad.",
  },
  {
    pregunta: ["telefono", "contacto", "celular"],
    respuesta: "Puedes contactarnos al 1234-5678.",
  },
  {
    pregunta: ["turno", "reserva", "reservar"],
    respuesta: "Puedes reservar un turno desde la sección de reservas de la web.",
  },
];

function obtenerRespuesta(mensaje) {
  const texto = mensaje.toLowerCase();
  for (let r of respuestas) {
    if (r.pregunta.some(p => texto.includes(p))) {
      return r.respuesta;
    }
  }
  return "¡Hola! ¿En qué puedo ayudarte? Pregúntame por horarios, dirección o cómo reservar.";
}

export default function ChatBot() {
  const [mensajes, setMensajes] = useState([
    { autor: "bot", texto: "¡Hola! Soy el asistente virtual del spa. ¿En qué puedo ayudarte?" }
  ]);
  const [input, setInput] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const usuarioMsg = { autor: "usuario", texto: input };
    const botMsg = { autor: "bot", texto: obtenerRespuesta(input) };
    setMensajes([...mensajes, usuarioMsg, botMsg]);
    setInput("");
  };

  return (
    <div style={{
      position: "fixed", bottom: 20, right: 20, width: 320, background: "#fff",
      border: "1px solid #ccc", borderRadius: 8, boxShadow: "0 2px 8px #0002", zIndex: 1000
    }}>
      <div style={{ padding: 10, borderBottom: "1px solid #eee", background: "#f5f5f5" }}>
        <b>ChatBot Spa</b>
      </div>
      <div style={{ maxHeight: 220, overflowY: "auto", padding: 10 }}>
        {mensajes.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.autor === "bot" ? "left" : "right", margin: "6px 0" }}>
            <span style={{
              display: "inline-block",
              background: msg.autor === "bot" ? "#e0e0e0" : "#cce5ff",
              padding: "6px 12px", borderRadius: 16
            }}>{msg.texto}</span>
          </div>
        ))}
      </div>
      <form onSubmit={enviar} style={{ display: "flex", borderTop: "1px solid #eee" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tu pregunta..."
          style={{ flex: 1, border: "none", padding: 8, outline: "none" }}
        />
        <button type="submit" style={{ border: "none", background: "#007bff", color: "#fff", padding: "0 16px", borderRadius: "0 0 8px 0" }}>
          Enviar
        </button>
      </form>
    </div>
  );
}