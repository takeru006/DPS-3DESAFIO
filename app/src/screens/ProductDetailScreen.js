import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { getProductById, updateStock } from "../services/product";

export default function ProductDetailScreen({ route, navigation }) {
  const id = route?.params?.id; 
  const [product, setProduct] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch {
      Alert.alert("Error", "Producto no encontrado");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProduct(); }, [id]);

  const handleUpdate = async () => {
    const cantidadNumerica = parseInt(cantidad, 10);
    if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
      Alert.alert("Error", "Ingrese una cantidad válida mayor a 0.");
      return;
    }
    if (cantidadNumerica > product.stock) {
      Alert.alert("Operación Rechazada", `No se permite stock negativo. Existencia actual: ${product.stock}`);
      return;
    }

    try {
      const nuevoStock = product.stock - cantidadNumerica;
      await updateStock(id, nuevoStock);
      Alert.alert("Operación Exitosa", "Salida de inventario procesada correctamente.");
      setCantidad("");
      loadProduct(); 
    } catch {
      Alert.alert("Error", "No se pudo actualizar en el servidor.");
    }
  };

  return (
    <View style={styles.container}>
      {/* BARRA SUPERIOR CON BOTÓN DE REGRESO OBLIGATORIO */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>⬅ Volver</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Ficha de Producto</Text>
        <View style={{ width: 60 }} />
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#007AFF" /></View>
      ) : (
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.label}>Descripción del Artículo</Text>
            <Text style={styles.value}>{product?.nombre}</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.label}>Cantidad en Almacén</Text>
            <Text style={styles.stockValue}>{product?.stock} unidades</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formTitle}>Registrar Salida de Mercancía</Text>
            <TextInput style={styles.input} placeholder="Cantidad a descontar" keyboardType="numeric" value={cantidad} onChangeText={setCantidad} />
            <View style={styles.btnWrapper}>
              <Button title="Confirmar Descuento" onPress={handleUpdate} color="#ff9500" />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  navBar: { height: 60, backgroundColor: "#fff", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#e5e5ea" },
  backButton: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: "#e5e5ea", borderRadius: 8 },
  backButtonText: { fontSize: 14, fontWeight: "600", color: "#007AFF" },
  navTitle: { fontSize: 18, fontWeight: "700", color: "#1c1c1e" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: { padding: 20 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 16, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  label: { fontSize: 13, color: "#8e8e93", textTransform: "uppercase", fontWeight: "600" },
  value: { fontSize: 20, fontWeight: "700", marginBottom: 12, color: "#1c1c1e", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#e5e5ea", marginVertical: 10 },
  stockValue: { fontSize: 24, fontWeight: "800", color: "#34c759", marginTop: 2 },
  form: { backgroundColor: "#fff", padding: 20, borderRadius: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  formTitle: { fontSize: 16, fontWeight: "700", marginBottom: 14, color: "#1c1c1e" },
  input: { borderWidth: 1, borderColor: "#e5e5ea", borderRadius: 10, padding: 12, marginBottom: 16, backgroundColor: "#fafafa", fontSize: 16 },
  btnWrapper: { borderRadius: 10, overflow: "hidden" }
});
