import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";

export default function ScanScreen({ navigation }) {
  const [scannedId, setScannedId] = useState("");

  const handleSimulateScan = () => {
    if (!scannedId.trim()) {
      Alert.alert("Error", "Por favor, ingrese un ID para simular la lectura.");
      return;
    }
    navigation.navigate("Detalle", { id: scannedId.trim() });
    setScannedId("");
  };

  return (
    <View style={styles.container}>
      {/* BARRA SUPERIOR DE NAVEGACIÓN MANUAL */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>⬅ Volver</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Lector QR</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Simulador de Terminal QR</Text>
          <Text style={styles.subtitle}>Ingrese el identificador único del artículo de inventario.</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej: 12345 o QR001"
            autoCapitalize="none"
            value={scannedId}
            onChangeText={setScannedId}
          />

          <View style={styles.btnWrapper}>
            <Button title="Procesar Código QR" onPress={handleSimulateScan} color="#007AFF" />
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
  content: { flex: 1, justifyContent: "center", padding: 24 },
  card: { backgroundColor: "#fff", padding: 24, borderRadius: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  title: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 8, color: "#1c1c1e" },
  subtitle: { fontSize: 13, textAlign: "center", color: "#666", marginBottom: 24, lineHeight: 18 },
  input: { borderWidth: 1, borderColor: "#e5e5ea", borderRadius: 10, padding: 14, marginBottom: 20, fontSize: 16, backgroundColor: "#fafafa", textAlign: "center" },
  btnWrapper: { borderRadius: 10, overflow: "hidden" }
});
