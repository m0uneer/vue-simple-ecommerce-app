class TokenService {
  static getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.refreshToken;
  }

  static getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.accessToken;
  }

  static updateLocalAccessToken(token) {
    const user = JSON.parse(localStorage.getItem('user'));
    user.accessToken = token;
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  static setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static removeUser() {
    localStorage.removeItem('user');
  }
}

export default TokenService;
