
export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    typeUser: TypeUser;
}

export enum TypeUser {
    operative,
    admin,
    supervisor
}