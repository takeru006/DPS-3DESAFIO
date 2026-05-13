import { View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Button title="Ver Productos" onPress={() => navigation.navigate("Lista")} />
      <Button title="Escanear QR" onPress={() => navigation.navigate("Scan")} />
    </View>
  );
}