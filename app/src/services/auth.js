import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    const token = response.data.token;
    await AsyncStorage.setItem("token", token);
    return token;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Error al conectar con el servidor";
    throw new Error(errorMsg);
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
