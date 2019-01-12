import {RoleDto} from '../role/role-dto';

export interface UserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  street: string;
  postcode: string;
  city: string;
  nip: string;
  regon: string;
  active: boolean;
  roles: RoleDto[];
}

export interface UserSimpleDto {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  street: string;
  postcode: string;
  city: string;
  nip: string;
  regon: string;
  active: boolean;
  roles: RoleDto[];
}

export interface UserLoginDto {
  id: number;
  usernameOrEmail: string;
  password: string;
  token: string;
}

export interface UserSignUpDto {
  name: string;
  username: string;
  email: string;
  password: string;
}
