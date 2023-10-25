import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ContactList } from "./Contacts/ContactList";
import { ContactDetails } from "./Contacts/ContactDetails";
import { Home } from "./Home";
import { CreateContact } from "./Contacts/CreateContact";
import { Person, createContact } from "../Model/Person";
import { useState } from "react";
import { Context } from "./Data/Context";


const Stack = createStackNavigator();
export const Main = () => {
    let initContacts = [
        createContact("1", "Tom", "Cruise", "tom.cruise@example.com", 123),
        createContact("2", "Emma", "Thompson", "emma.thompson@example.com", 234),
        createContact("3", "Barack", "Obama", "barack.obama@example.com", 345),
    ];

    const [state, setState] = useState(initContacts);
    
    const onCreate = (newContact:Person) => {
        setState(state.concat(newContact));
    }

    const onDelete = (contactToDelete:Person) => {
        setState(state.filter(contact => contact.id != contactToDelete.id));
    }

    return (
        <Context.Provider value={{contacts:state, onCreate, onDelete}}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ContactList" component={ContactList} />
                <Stack.Screen name="Details" component={ContactDetails} />
                <Stack.Screen name='CreateContact' component={CreateContact} />
            </Stack.Navigator>
        </NavigationContainer>
        </Context.Provider>
    )
}