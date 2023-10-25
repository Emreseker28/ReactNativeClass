import { StackNavigationProp } from "@react-navigation/stack";
import { Person } from "../Model/Person";

export type ScreensList = {
    Home: undefined,
    ContactList: undefined,
    Details: {contact:Person},
    CreateContact: undefined
}

export type NavigationProps = StackNavigationProp<ScreensList>;