import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configurado exactamente con tu IP de Wi-Fi y puerto del servidor Node.js
const API_URL = "http://192.168.1.9:3000"; 

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Interceptor automático para inyectar el JWT en las rutas protegidas (Requisito 1.1)
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error al recuperar el token del storage", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

