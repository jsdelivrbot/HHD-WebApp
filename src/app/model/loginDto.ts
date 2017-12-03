import {User} from './user';

export class LoginDto {

  authenticationToken: string;
  refreshToken: string;
  user: User;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
