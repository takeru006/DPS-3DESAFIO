/*import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export const login = async (username, password) => {
  const response = await api.post("/login", {
    username,
    password,
  });

  const token = response.data.token;

  await AsyncStorage.setItem("token", token);

  return token;
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
};*/

//esta parte de abajo es prueba sin backend borrar si ya hay y quitar comentarios la parte de arriba que es el original
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockLogin } from "./mockApi";

export const login = async (username, password) => {
  const response = await mockLogin(username, password);

  await AsyncStorage.setItem("token", response.token);

  return response.token;
};