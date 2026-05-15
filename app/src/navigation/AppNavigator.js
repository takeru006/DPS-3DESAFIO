import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ScanScreen from "../screens/ScanScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductListScreen from "../screens/ProductListScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{ detachPreviousScreen: true }} // Optimiza el desmontaje en iOS
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Inicio" }} />
      <Stack.Screen name="Scan" component={ScanScreen} options={{ title: "Escanear QR" }} />
      <Stack.Screen name="Detalle" component={ProductDetailScreen} options={{ title: "Detalle de Producto" }} />
      <Stack.Screen name="Listado" component={ProductListScreen} options={{ title: "Inventario Disponible" }} />
       <Stack.Screen name="Agregar" component={ProductListScreen} options={{ title: "Añadir producto" }} />
    </Stack.Navigator>
  );
}
