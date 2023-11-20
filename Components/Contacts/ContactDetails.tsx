import { Button, Text, View } from "react-native";
import { Person } from "../../Model/Person";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProps, ScreensList } from "../Screens";
import { useContext } from "react";
import { Context } from "../Data/Context";
import { Image } from "expo-image";

export const ContactDetails = () => {
    const route = useRoute<RouteProp<ScreensList, "Details">>();
    const {contacts, onDelete} = useContext(Context);
    const contact:Person|undefined = contacts.find(contact=>contact.id === route.params.contactId);
    const navigation = useNavigation<NavigationProps>();
    const onDeleteContact = () => {
        if (contact){
            onDelete(contact);
            navigation.navigate("ContactList");
        }
    }
    return (
        <View>
            <View>
                <Image source={contact?.image} style={{width:200, height:200, borderRadius:100, alignSelf:"center", margin:32}}></Image>
            </View>
            <View>
                <Text>{contact?.firstName}</Text>
                <Text>{contact?.lastName}</Text>
            </View>
            <View>
                <Button title="Face Detector" onPress={()=>navigation.navigate("FaceDetector", {contactID:route.params.contactId})}></Button>
            </View>
        </View>
    )
}