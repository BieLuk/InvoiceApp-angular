import {UserSimpleModel} from '../user/user.model';

export interface ClientModel {
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
  user: UserSimpleModel;

}
