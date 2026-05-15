import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getProducts } from "../services/product";

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Detalle", { id: item.id })}>
          <View style={{ padding: 10 }}>
            <Text>{item.nombre}</Text>
            <Text>Stock: {item.stock}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}   