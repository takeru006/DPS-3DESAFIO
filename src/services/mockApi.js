let fakeToken = "123456789";

// 📦 Base de datos falsa
let productos = [
  { id: 1, nombre: "Laptop", stock: 10 },
  { id: 2, nombre: "Mouse", stock: 25 },
  { id: 3, nombre: "Teclado", stock: 15 },
];

// 🔐 LOGIN
export const mockLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "1234") {
        resolve({ token: fakeToken });
      } else {
        reject("Credenciales incorrectas");
      }
    }, 500);
  });
};

// 📋 LISTAR PRODUCTOS
export const mockGetProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productos), 300);
  });
};

// 🔍 PRODUCTO POR ID
export const mockGetProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productos.find((p) => p.id == id);
      producto ? resolve(producto) : reject("No encontrado");
    }, 300);
  });
};

// 🔄 ACTUALIZAR STOCK
export const mockUpdateStock = (id, cantidad) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productos.find((p) => p.id == id);

      if (!producto) return reject("No encontrado");

      if (producto.stock - cantidad < 0) {
        return reject("Stock insuficiente");
      }

      producto.stock -= cantidad;

      resolve(producto);
    }, 300);
  });
};