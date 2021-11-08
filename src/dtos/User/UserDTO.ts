export interface UserDTO {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  typeUser: TypeUser;
}

export enum TypeUser {
  operative,
  admin,
  supervisor
}