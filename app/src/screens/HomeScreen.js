import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { logout } from "../services/auth";

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido al Sistema</Text>
      <Text style={styles.subHeader}>Seleccione una operación logística</Text>

      <View style={styles.menuBox}>
        <View style={styles.btnWrapper}>
          <Button title="🔍 Simular Escáner QR" onPress={() => navigation.navigate("Scan")} color="#007AFF" />
        </View>

        <View style={styles.btnWrapper}>
          <Button title="📋 Ver Lista de Productos" onPress={() => navigation.navigate("Listado")} color="#34c759" />
        </View>
      </View>
      
      <View style={styles.btnWrapper}>
        <Button title="➕ Agregar Nuevo Producto" onPress={() => navigation.navigate("Agregar")} color="#ff9500" />
      </View>


      <View style={styles.logoutWrapper}>
        <Button title="Cerrar Sesión Activa" onPress={handleLogout} color="#ff3b30" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#f0f2f5", justifyContent: "center" },
  header: { fontSize: 26, fontWeight: "800", textAlign: "center", color: "#1c1c1e", marginBottom: 4 },
  subHeader: { fontSize: 15, textAlign: "center", color: "#666", marginBottom: 40 },
  menuBox: { backgroundColor: "#fff", padding: 24, borderRadius: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3, marginBottom: 30 },
  btnWrapper: { marginVertical: 10, borderRadius: 10, overflow: "hidden", height: 44, justifyContent: "center" },
  logoutWrapper: { borderRadius: 10, overflow: "hidden" }
});
