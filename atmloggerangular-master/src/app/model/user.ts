import { Role } from "./role";

export interface User{
    id?: number;
    ldapCn: string;
    email: string;
    fullName: string;
    active: boolean;
    createdAt: Date;
    lastLoginAt?: Date;
    roles: Role[];
}