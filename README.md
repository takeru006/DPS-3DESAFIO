# DPS-3DESAFIO
# 1. Clonar el repositorio público de GitHub
git clone https://github.com

# 2. Entrar a la carpeta raíz del proyecto descargado
cd DPS-3DESAFIO

# 3. Entrar a la carpeta del backend
cd inventario-api

# 4. Instalar las dependencias de Node.js (express, jsonwebtoken, cors)
npm install

# 5. Iniciar el servidor de la API
node server.js
Paso 2: Configurar la IP Local de su ComputadoraPara que su teléfono celular se conecte con su servidor local, debe averiguar su dirección de red:Abrir otra terminal y ejecutar: ipconfig.Buscar la Dirección IPv4 de su adaptador Wi-Fi activo (ejemplo: 192.168.1.25).Abrir el archivo app/src/services/api.js en VS Code y reemplazar la constante con su propia IP:
javascriptconst API_URL = "http://CAMBIA_POR_SU_IP_AQUÍ:3000";
Paso 3: Instalar Dependencias del Móvil y Reinstalar la Cámarapowershell
# 1. Regresar a la raíz y entrar a la carpeta de la app móvil
cd ..
cd app

# 2. Instala todas las librerías base (axios, navegaciones, async-storage)
npm install --legacy-peer-deps

# 3. Instalar la librería nativa de la cámara oficial de Expo
npm install expo-camera --legacy-peer-deps
