
export class Auth {

    constructor(centro, username, password) {
      this.centro = centro;
      this.username = username;
      this.password = password;
    }

    toJson() {
      return {
        usuario: this.username,
        password: this.password
      }
    }
}