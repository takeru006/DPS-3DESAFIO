import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ScanScreen from "./src/screens/ScanScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import ProductListScreen from "./src/screens/ProductListScreen";
import AddProductScreen from "./src/screens/AddProductScreen"; // Importación de la funcionalidad extra

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Login");
  const [params, setParams] = useState({});

  // Simulador de navegación estructurado y seguro anti-excepciones en iOS
  const navigation = {
    navigate: (screenName, screenParams = {}) => {
      setParams(screenParams);
      setCurrentScreen(screenName);
    },
    replace: (screenName) => {
      setParams({});
      setCurrentScreen(screenName);
    },
    goBack: () => {
      // Retorno lógico según la pantalla en la que se encuentre el usuario
      if (currentScreen === "Detalle") {
        setCurrentScreen("Listado"); // Si viene del detalle de un producto, regresa al listado
      } else {
        setCurrentScreen("Home"); // En cualquier otro caso, regresa al Menú Principal
      }
    }
  };

  const route = { params };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5", paddingTop: StatusBar.currentHeight }}>
      {/* Sistema de Renderizado Condicional de Pantallas */}
      {currentScreen === "Login" && <LoginScreen navigation={navigation} />}
      {currentScreen === "Home" && <HomeScreen navigation={navigation} />}
      {currentScreen === "Scan" && <ScanScreen navigation={navigation} />}
      {currentScreen === "Listado" && <ProductListScreen navigation={navigation} />}
      {currentScreen === "Detalle" && <ProductDetailScreen navigation={navigation} route={route} />}
      {currentScreen === "Agregar" && <AddProductScreen navigation={navigation} />}
    </SafeAreaView>
  );
}
