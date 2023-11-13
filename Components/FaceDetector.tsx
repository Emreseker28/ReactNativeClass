import { useIsFocused } from "@react-navigation/native";
import { Camera, CameraType, FaceDetectionResult } from "expo-camera"
import { FaceDetectorMode, FaceDetectorLandmarks, FaceFeature } from "expo-face-detector";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native"

export const FaceDetector = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [faces, setFaces] = useState<FaceFeature[]>([]);
    const isFocused = useIsFocused();
    
    useEffect(() => {
        const getPermissions = async () => {
            const status = await Camera.requestCameraPermissionsAsync();
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
    
    const handleFaceDetected = (results: FaceDetectionResult) =>{
        console.log(results.faces);
        setFaces(results.faces as FaceFeature[]);
    }

    const renderRectangle = (face:FaceFeature) => {
        return(
            <View
                key={face.faceID}
                style={[
                    styles.face,
                    {
                        //face.bounds.size.widht && height
                        ...face.bounds.size,
                        left: face.bounds.origin.x,
                        top: face.bounds.origin.y,
                        transform: [
                            {perspective: 600},
                            {rotateZ: `${face.rollAngle!.toFixed(0)}deg`},
                            {rotateY: `${face.yawAngle!.toFixed(0)}deg`}
                        ]
                    }
                ]}
            />
        )
    }

    return (
        <View style={styles.container}>
            {isFocused && 
            <Camera 
            type={CameraType.front}
            style={StyleSheet.absoluteFill}
                faceDetectorSettings={{
                    tracking: true,
                    mode:FaceDetectorMode.accurate,
                    detectLandmarks: FaceDetectorLandmarks.all,
                    minDetectionInterval: 200
                }}
                onFacesDetected={handleFaceDetected}
            />}
            <View style={styles.faceContainer}>
                {faces.map(renderRectangle)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    face:{
        padding:10,
        borderWidth: 2,
        borderRadius: 2,
        position:"absolute",
        borderColor: "blue",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    faceContainer:{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})