import { Text, View } from "react-native";
import { Person } from "../../Model/Person";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScreensList } from "../Screens";

export const ContactDetails = () => {
    const route = useRoute<RouteProp<ScreensList, "Details">>();
    const contact:Person = route.params.contact;

    return (
        <View>
            <Text>{contact.firstName}</Text>
            <Text>{contact.lastName}</Text>
        </View>
    )
}