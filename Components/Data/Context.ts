import { createContext } from "react";
import { Person } from "../../Model/Person"

export type ContextData = {
    contacts: Person[];
    onCreate: (newPerson:Person)=> void;
    onDelete: (person:Person) => void;
}

export const Context = createContext<ContextData>({
    contacts: [],
    onCreate: (newPerson) =>{},
    onDelete: (person) => {}
});