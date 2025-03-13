import axios from "axios";

export const AuthLoguin = async (username, password) => {
  try {
    const URL = "http://localhost:8084/api/auth/login";
    const response = await axios.post(URL, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error.response?.data || error);
    throw error;
  }
};

export const ValidationLoguin = async (token) => {
  try {
    const URL = "http://localhost:8084/api/Protected";
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al validar el token:", error.response?.data || error);
    throw error;
  }
};
