import axios from '../shared/ApiService';
import Config from '../../config';
import TokenService from './TokenService';

class AuthService {
  static async login(user) {
    const response = await axios.post(`${Config.USERS_API_URL}/login`, user);
    TokenService.setUser(response.data.data);
    return response.data.data;
  }

  static logout() {
    TokenService.removeUser();
  }

  static register(user) {
    return axios.post(`${Config.USERS_API_URL}/register`, {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default AuthService;
