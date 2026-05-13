/*
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";

export default function ScanScreen({ navigation }) {
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
      setPermission(status === "granted");
    });
  }, []);

  const handleScan = ({ data }) => {
    navigation.navigate("Detalle", { id: data });
  };

  return (
    <BarCodeScanner
      onBarCodeScanned={handleScan}
      style={{ flex: 1 }}
    />
  );
}*/