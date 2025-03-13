import axios from "axios";

export const ObtenerClientes = async () => {
    try {
        const response = await axios.get("http://localhost:8084/api/Cliente");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const AgregarClientes = async (cliente) => {
    try {
        const response = await axios.post("http://localhost:8084/api/Cliente/Agregar", cliente, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const ActualizarClientes = async (id, cliente) => {
    try {
        const response = await axios.put(`http://localhost:8084/api/Cliente/Actualizar/${id}`, cliente, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const EliminarClientes = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8084/api/Cliente/Eliminar/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
