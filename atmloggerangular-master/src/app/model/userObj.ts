import { Role } from './role';

export interface UserObj {
  id: number;
  ldapCn: string;
  fullName: string;
  email: string;
  active: boolean;
  roles: Role[];
}