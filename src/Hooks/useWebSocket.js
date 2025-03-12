import { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

const useWebSocket = () => {
  const [clientes, setClientes] = useState([]);
  const [connection, setConnection] = useState(null); // Mantener la conexión en el estado

  useEffect(() => {
    // Crear la conexión y almacenarla en el estado
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:8084/hub") // Cambia esta URL si es necesario
      .build();

    connection.on("ClienteListar", (nuevoCliente) => {
      setClientes((prev) => [...prev, nuevoCliente]);
    });

    // connection.on("ClienteActualizado", (clienteActualizado) => {
    //   console.log("Cliente actualizado:", clienteActualizado);
    //   setClientes((prev) => {
    //     const index = prev.findIndex((cliente) => cliente.id === clienteActualizado.id);
    //     if (index >= 0) {
    //       const updatedClientes = [...prev];
    //       updatedClientes[index] = clienteActualizado;
    //       return updatedClientes;
    //     }
    //     return prev;
    //   });
    // });

    // connection.on("ClienteEliminado", (clienteId) => {
    //   console.log("Cliente eliminado con ID:", clienteId);
    //   setClientes((prev) => prev.filter((cliente) => cliente.id !== clienteId));
    // });

    // Iniciar la conexión
    connection
      .start()
      .then(() => console.log("Conectado al Hub"))
      .catch((err) => console.error("Error al conectar: ", err));

    // Guardar la conexión en el estado
    setConnection(connection);

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      connection.stop();
    };
  }, []);

  // Función para agregar cliente
  const ClienteListar = async (cliente) => {
    if (!connection) return; // Verificar que la conexión esté disponible
    try {
      console.log("Agregando cliente:", cliente);
      await connection.invoke("ClienteListar", cliente);
      console.log("Cliente agregado enviado al servidor");
    } catch (err) {
      console.error("Error al agregar cliente:", err);
    }
  };

  // Función para actualizar cliente
  // const actualizarCliente = async (cliente) => {
  //   if (!connection) return; // Verificar que la conexión esté disponible
  //   try {
  //     console.log("Actualizando cliente:", cliente);
  //     await connection.invoke("ClienteActualizado", cliente);
  //     console.log("Cliente actualizado enviado al servidor");
  //   } catch (err) {
  //     console.error("Error al actualizar cliente:", err);
  //   }
  // };

  // Función para eliminar cliente
  // const eliminarCliente = async (id) => {
  //   if (!connection) return; // Verificar que la conexión esté disponible
  //   try {
  //     console.log("Eliminando cliente con ID:", id);
  //     await connection.invoke("ClienteEliminado", id);
  //     console.log("Cliente eliminado enviado al servidor");
  //   } catch (err) {
  //     console.error("Error al eliminar cliente:", err);
  //   }
  // };

  return { clientes,ClienteListar };
};

export default useWebSocket;
