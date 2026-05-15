import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/productos");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/productos/${id}`);
  return res.data;
};

export const updateStock = async (id, nuevaCantidad) => {
  const res = await api.put(`/productos/${id}`, { stock: nuevaCantidad });
  return res.data;
};
export const createProduct = async (id, nombre, stock) => {
  const res = await api.post("/productos", { id, nombre, stock });
  return res.data;
};


