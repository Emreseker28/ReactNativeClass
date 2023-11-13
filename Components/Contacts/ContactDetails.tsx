import { Text, View } from "react-native";
import { Person } from "../../Model/Person";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProps, ScreensList } from "../Screens";
import { useContext } from "react";
import { Context } from "../Data/Context";

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
            <Text>{contact?.firstName}</Text>
            <Text>{contact?.lastName}</Text>
        </View>
    )
}