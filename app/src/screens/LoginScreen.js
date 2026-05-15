import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text, ActivityIndicator } from "react-native";
import { login } from "../services/auth";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Campos Requeridos", "Por favor ingresa tu usuario y contraseña.");
      return;
    }
    try {
      setLoading(true);
      await login(username.trim(), password);
      navigation.replace("Home"); 
    } catch (error) {
      Alert.alert("Fallo de Autenticación", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>📦 StockIntel</Text>
        <Text style={styles.subtitle}>Gestión de Inventario Inteligente</Text>
        
        <TextInput 
          style={styles.input}
          placeholder="Nombre de Usuario" 
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername} 
          editable={!loading}
        />
        
        <TextInput 
          style={styles.input}
          placeholder="Contraseña Segura" 
          secureTextEntry={true} 
          value={password}
          onChangeText={setPassword} 
          editable={!loading}
        />
        
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 10 }} />
        ) : (
          <View style={styles.btnBox}>
            <Button title="Iniciar Sesión" onPress={handleLogin} color="#007AFF" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#f0f2f5" },
  card: { backgroundColor: "#fff", padding: 28, borderRadius: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
  title: { fontSize: 28, fontWeight: "800", textAlign: "center", color: "#1c1c1e", marginBottom: 6 },
  subtitle: { fontSize: 14, textAlign: "center", color: "#666", marginBottom: 30, fontWeight: "500" },
  input: { borderWidth: 1, borderColor: "#e5e5ea", borderRadius: 10, padding: 14, marginBottom: 16, backgroundColor: "#fafafa", fontSize: 16 },
  btnBox: { marginTop: 8, borderRadius: 10, overflow: "hidden" }
});
