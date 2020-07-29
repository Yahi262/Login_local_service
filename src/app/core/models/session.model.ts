import {User} from "./user.model";
/*Aqui se expresa una session iniciada con un token que autentifica al usuario */
export class Session{
    public token: string;
    public user: User;
}