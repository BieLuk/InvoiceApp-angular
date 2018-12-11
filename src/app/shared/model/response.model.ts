import {UserSimpleDto} from './user/user-dto';

export interface ResponseError {
  code: string;
  message: string;
  fieldName: string;
}

export interface Response {
  errors: ResponseError[];
}

export interface SingleResponse<T> extends Response {
  data: T;
}

export interface ListResponse<T> extends Response {
  data: T[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
}
export interface JwtAuthenticationResponse {
  accessToken: string;
  tokenType: string;
  userDTO: UserSimpleDto;
}
