export class User {

  email: String;
  alternateEmail: String;
  balance: number;
  ableToOrder: boolean;
  role: String;
  enabled: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
