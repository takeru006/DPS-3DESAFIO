// inventario-api/server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = 3000;
const JWT_SECRET = "mi_clave_secreta_super_segura_123";

// ==========================================
// MIDDLEWARES GLOBALES CRÍTICOS (Arriba del todo)
// ==========================================
app.use(cors()); // Habilita la conexión desde dispositivos externos/Wi-Fi
app.use(express.json()); // OBLIGATORIO: Permite que Express lea req.body en peticiones POST/PUT

// ==========================================
// ESTRUCTURA DE DATOS EN MEMORIA (Base de datos simulada)
// ==========================================
const usuarios = [
  { id: 1, username: "admin", password: "123" },
  { id: 2, username: "usuario1", password: "password" }
];

const productos = [
  { id: "12345", nombre: "Laptop Dell Inspiron", stock: 15 },
  { id: "67890", nombre: "Monitor Samsung 24'", stock: 8 },
  { id: "ABCDE", nombre: "Teclado Mecánico Logitech", stock: 3 },
  { id: "QR001", nombre: "Mouse Inalámbrico HP", stock: 25 }
];

// ==========================================
// ENDPOINTS DEL SISTEMA (Sección 2.2 + Funcionalidad Extra)
// ==========================================

/**
 * 1. POST /login 
 * Autentica al usuario y devuelve un JWT válido por 2 horas
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
  }

  const user = usuarios.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ token });
});

/**
 * 2. GET /productos 
 * Devuelve el listado completo de productos (Ruta protegida)
 */
app.get("/productos", authMiddleware, (req, res) => {
  res.json(productos);
});

/**
 * 3. GET /productos/:id 
 * Devuelve la información de un producto específico mediante su ID (Ruta protegida)
 */
app.get("/productos/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ message: "Producto no encontrado en el inventario" });
  }

  res.json(producto);
});

/**
 * 4. PUT /productos/:id 
 * Actualiza la cantidad en stock de un producto específico (Ruta protegida)
 */
app.put("/productos/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { stock } = req.body; 

  if (stock === undefined || isNaN(stock)) {
    return res.status(400).json({ message: "La cantidad de stock es inválida" });
  }

  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  if (stock < 0) {
    return res.status(400).json({ message: "Operación inválida: No se permite stock negativo" });
  }

  producto.stock = stock;
  res.json({ message: "Stock actualizado con éxito", producto });
});

/**
 * EXTRA FUNCIONAL: POST /productos 
 * Registra un nuevo producto en la estructura de datos en memoria (Ruta protegida)
 */
app.post("/productos", authMiddleware, (req, res) => {
  const { id, nombre, stock } = req.body;

  // Verificación de datos recibidos del cliente móvil
  if (!id || !nombre || stock === undefined || isNaN(stock)) {
    return res.status(400).json({ message: "Todos los campos (ID, Nombre, Stock) son obligatorios." });
  }

  // Validación: Evitar duplicación de identificadores QR
  const existe = productos.find(p => p.id === id);
  if (existe) {
    return res.status(400).json({ message: "El ID de este producto ya se encuentra registrado." });
  }

  if (parseInt(stock, 10) < 0) {
    return res.status(400).json({ message: "No se permite registrar productos con stock inicial negativo." });
  }

  const nuevoProducto = {
    id: id.toString().trim(),
    nombre: nombre.toString().trim(),
    stock: parseInt(stock, 10)
  };

  productos.push(nuevoProducto); // Inserta de manera dinámica en el array
  res.status(201).json({ message: "Producto agregado con éxito", producto: nuevoProducto });
});

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Servidor de inventario corriendo en http://localhost:${PORT}`);
});
