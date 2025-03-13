import { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

const useWebSocket = () => {
  const [clientes, setClientes] = useState([]);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:8086/hub")
      .withAutomaticReconnect() // Permite reconexiones automáticas si se cae la conexión
      .build();

    connection.on("ClienteListar", (nuevosClientes) => {
      console.log("Clientes actualizados desde SignalR:", nuevosClientes);
      setClientes(nuevosClientes); // Reemplazar la lista en lugar de agregar
    });

    connection
      .start()
      .then(() => console.log("Conectado al Hub"))
      .catch((err) => console.error("Error al conectar: ", err));

    setConnection(connection);

    return () => {
      connection.stop();
    };
  }, []);

  // Método para agregar, actualizar o eliminar clientes
  const ClienteListar = async (cliente) => {
    console.log("Cliente recibido en ClienteListar:", cliente);
    if (!connection) return;
    try {
      console.log("Enviando cliente al servidor:", cliente);
      await connection.invoke("ClienteListar", cliente);
    } catch (err) {
      console.error("Error al enviar cliente:", err);
    }
  };

  return { clientes, ClienteListar };
};

export default useWebSocket;
