import {UserSimpleDto} from '../user/user-dto';

export interface ClientDto {
  id: number;
  name: string;
  email: string;
  website: string;
  phone: string;
  street: string;
  postcode: string;
  city: string;
  nip: string;
  comment: string;
  user: UserSimpleDto;
}
