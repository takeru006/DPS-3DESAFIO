import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { getProducts } from "../services/product";

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch {
      Alert.alert("Error", "No se pudo obtener el listado del servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Detalle", { id: item.id })}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nombre}</Text>
        <Text style={styles.idText}>ID único: {item.id}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={[styles.stockText, item.stock === 0 && styles.noStock]}>
          {item.stock} u.
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* BARRA SUPERIOR CON BOTÓN DE REGRESO */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>⬅ Menú</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Existencias Totales</Text>
        <View style={{ width: 60 }} />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList 
          data={products} 
          keyExtractor={(item) => item.id.toString()} 
          renderItem={renderItem} 
          contentContainerStyle={styles.listContainer}
          onRefresh={fetchProducts} 
          refreshing={loading} 
        />
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
  listContainer: { padding: 16 },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginVertical: 6, flexDirection: "row", justifyContent: "space-between", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  cardContent: { flex: 1 },
  name: { fontSize: 16, fontWeight: "700", color: "#1c1c1e" },
  idText: { fontSize: 13, color: "#8e8e93", marginTop: 2 },
  badge: { backgroundColor: "#e5f9ed", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  stockText: { fontSize: 15, fontWeight: "700", color: "#34c759" },
  noStock: { color: "#ff3b30" }
});
