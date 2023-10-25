export type Person = {
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    room:number;
}

export const createContact = (id:string, firstName:string, lastName:string, email:string, roomNumber: number):Person => ({
        id:id,
        firstName:firstName,
        lastName:lastName,
        email:email,
        room:roomNumber
    })