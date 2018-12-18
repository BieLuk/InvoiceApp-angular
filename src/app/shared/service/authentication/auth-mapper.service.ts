import {Injectable} from '@angular/core';
import {UserDto, UserLoginDto, UserSignUpDto} from '../../model/user/user-dto';
import {UserLoginModel, UserModel, UserSignUpModel} from '../../model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthMapperService {
  constructor() {}

  mapLoginDtoToLoginModel(dto: UserLoginDto): UserLoginModel {
    return {
      id: dto.id,
      usernameOrEmail: dto.usernameOrEmail,
      password: dto.password,
      token: dto.token
    };
  }

  mapLoginModelToLoginDto(model: UserLoginModel): UserLoginDto {
    return {
      id: model.id,
      usernameOrEmail: model.usernameOrEmail,
      password: model.password,
      token: model.token
    };
  }

  mapSignUpDtoToSignUpModel(dto: UserSignUpDto): UserSignUpModel {
    return {
      name: dto.name,
      username: dto.username,
      email: dto.email,
      password: dto.password,
    };
  }

  mapSignUpModelToSignUpDto(model: UserSignUpModel): UserSignUpDto {
    return {
      name: model.name,
      username: model.username,
      email: model.email,
      password: model.password,
    };
  }

}
