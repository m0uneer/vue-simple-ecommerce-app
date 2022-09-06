import TokenService from '@/services/user/TokenService';
import AuthService from '@/services/user/AuthService';
import * as types from './UserMutationTypes';

const localUser = TokenService.getUser();
const state = localUser
  ? { status: { loggedIn: true }, user: localUser }
  : { status: { loggedIn: false }, user: null };

const actions = {
  login({ commit }, user) {
    return AuthService.login(user)
      .then((loggedInUser) => {
        commit(types.LOGIN_SUCCESS, loggedInUser);
        return loggedInUser;
      })
      .catch((error) => {
        commit(types.LOGIN_FAILURE);
        throw error;
      });
  },

  logout({ commit }) {
    AuthService.logout();
    commit(types.LOGOUT);
  },

  register({ commit }, user) {
    return AuthService.register(user).then(
      (response) => {
        commit(types.REGISTER_SUCCESS);
        return response.data;
      },
      (error) => {
        commit(types.REGISTER_FAILURE);
        throw error;
      },
    );
  },

  refreshToken({ commit }, accessToken) {
    commit(types.REFRESH_TOKEN, accessToken);
  },
};

const mutations = {
  [types.LOGIN_SUCCESS](mState, user) {
    // eslint-disable-next-line no-param-reassign
    mState.status.loggedIn = true;
    // eslint-disable-next-line no-param-reassign
    mState.user = user;
  },
  [types.LOGIN_FAILURE](mState) {
    // eslint-disable-next-line no-param-reassign
    mState.status.loggedIn = false;
    // eslint-disable-next-line no-param-reassign
    mState.user = null;
  },
  [types.LOGOUT](mState) {
    // eslint-disable-next-line no-param-reassign
    mState.status.loggedIn = false;
    // eslint-disable-next-line no-param-reassign
    mState.user = null;
  },
  [types.REGISTER_SUCCESS](mState) {
    // eslint-disable-next-line no-param-reassign
    mState.status.loggedIn = false;
  },
  [types.REGISTER_FAILURE](mState) {
    // eslint-disable-next-line no-param-reassign
    mState.status.loggedIn = false;
  },
  [types.REFRESH_TOKEN](mState, accessToken) {
    // eslint-disable-next-line no-param-reassign
    mState.status.loggedIn = true;
    // eslint-disable-next-line no-param-reassign
    mState.user = { ...mState.user, accessToken };
  },
};

const userModule = {
  state,
  mutations,
  actions,
};

export default userModule;
