import axios from "axios";

export const ObtenerClientes = async () => {
    try {
        const response = await axios.get("https://localhost:8086/api/Cliente");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const AgregarClientes = async (cliente) => {
    try {
        const response = await axios.post("https://localhost:8086/api/Cliente/Agregar", cliente, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const ActualizarClientes = async (id, cliente) => {
    try {
        const response = await axios.put(`https://localhost:8086/api/Cliente/Actualizar/${id}`, cliente, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const EliminarClientes = async (id) => {
    try {
        const response = await axios.delete(`https://localhost:8086/api/Cliente/Eliminar/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
