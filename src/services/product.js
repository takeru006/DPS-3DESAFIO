/*import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/productos");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/productos/${id}`);
  return res.data;
};

export const updateStock = async (id, cantidad) => {
  const res = await api.put(`/productos/${id}`, { cantidad });
  return res.data;
};*/

//esta parte de abajo es prueba sin backend borrar si ya hay y quitar comentarios la parte de arriba que es el original
import {
  mockGetProducts,
  mockGetProductById,
  mockUpdateStock,
} from "./mockApi";

export const getProducts = async () => {
  return await mockGetProducts();
};

export const getProductById = async (id) => {
  return await mockGetProductById(id);
};

export const updateStock = async (id, cantidad) => {
  return await mockUpdateStock(id, cantidad);
};  