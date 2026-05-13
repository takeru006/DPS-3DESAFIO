import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { login } from "../services/auth";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Error", "Credenciales incorrectas");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Usuario" onChangeText={setUsername} />
      <TextInput placeholder="Contraseña" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}