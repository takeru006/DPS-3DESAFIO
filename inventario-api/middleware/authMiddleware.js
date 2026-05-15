// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Usa la misma clave secreta que definas al generar el token
const JWT_SECRET = "mi_clave_secreta_super_segura_123"; 

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Validar presencia del token (Requisito 3)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  // Extraer el string del token puro
  const token = authHeader.split(" ")[1];

  try {
    // Validar validez y expiración (Requisito 3)
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Inyecta los datos del usuario autenticado en la petición
    next(); // Permite el paso al siguiente controlador
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado." });
  }
};
