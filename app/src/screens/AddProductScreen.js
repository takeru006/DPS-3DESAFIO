import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { createProduct } from "../services/product";

export default function AddProductScreen({ navigation }) {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!id.trim() || !nombre.trim() || !stock.trim()) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const stockNum = parseInt(stock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      Alert.alert("Error", "El stock debe ser un número mayor o igual a 0.");
      return;
    }

    try {
      setLoading(true);
      await createProduct(id.trim(), nombre.trim(), stockNum);
      Alert.alert("Éxito", "Producto registrado en el inventario.");
      navigation.goBack(); // Regresa de inmediato al menú
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "No se pudo registrar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>⬅ Volver</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Nuevo Producto</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>ID del Producto / Valor QR</Text>
          <TextInput style={styles.input} placeholder="Ej: QR005" autoCapitalize="none" value={id} onChangeText={setId} editable={!loading} />

          <Text style={styles.label}>Nombre del Producto</Text>
          <TextInput style={styles.input} placeholder="Ej: Teclado Inalámbrico" value={nombre} onChangeText={setNombre} editable={!loading} />

          <Text style={styles.label}>Stock Inicial</Text>
          <TextInput style={styles.input} placeholder="Ej: 10" keyboardType="numeric" value={stock} onChangeText={setStock} editable={!loading} />

          <View style={styles.btnWrapper}>
            <Button title={loading ? "Registrando..." : "Guardar Producto"} onPress={handleCreate} color="#34c759" disabled={loading} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  navBar: { height: 60, backgroundColor: "#fff", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#e5e5ea" },
  backButton: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: "#e5e5ea", borderRadius: 8 },
  backButtonText: { fontSize: 14, fontWeight: "600", color: "#007AFF" },
  navTitle: { fontSize: 18, fontWeight: "700", color: "#1c1c1e" },
  content: { padding: 20 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  label: { fontSize: 13, color: "#8e8e93", fontWeight: "600", marginBottom: 4 },
  input: { borderWidth: 1, borderColor: "#e5e5ea", borderRadius: 10, padding: 12, marginBottom: 16, backgroundColor: "#fafafa", fontSize: 16 },
  btnWrapper: { borderRadius: 10, overflow: "hidden", marginTop: 10 }
});
