import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { getProductById, updateStock } from "../services/product";

export default function ProductDetailScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [cantidad, setCantidad] = useState("");

  const loadProduct = async () => {
    const data = await getProductById(id);
    setProduct(data);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleUpdate = async () => {
    if (parseInt(cantidad) <= 0) {
      Alert.alert("Error", "Cantidad inválida");
      return;
    }

    try {
      await updateStock(id, parseInt(cantidad));
      Alert.alert("Éxito", "Stock actualizado");
      loadProduct();
    } catch {
      Alert.alert("Error", "No se pudo actualizar");
    }
  };

  if (!product) return <Text>Cargando...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>{product.nombre}</Text>
      <Text>Stock: {product.stock}</Text>

      <TextInput
        placeholder="Cantidad a restar"
        keyboardType="numeric"
        onChangeText={setCantidad}
      />

      <Button title="Actualizar" onPress={handleUpdate} />
    </View>
  );
}