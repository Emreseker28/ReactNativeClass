import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

export const AppBarcodeScanner = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = (event:BarCodeEvent) => {
        setScanned(true);
        const text = event.data;
        alert(text);
    }
    useEffect(() => {
        const getPermissions = async () => {
            const status = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status.granted);
        }
        getPermissions();
    }, []);

    if (hasPermission == null){
        return (<Text>Requesting for camera permission</Text>);
    }

    if (hasPermission == false){
        return (<Text>No access to camera</Text>);
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                type="back"
                barCodeTypes={[
                            BarCodeScanner.Constants.BarCodeType.qr,
                            BarCodeScanner.Constants.BarCodeType.ean13
                            ]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})