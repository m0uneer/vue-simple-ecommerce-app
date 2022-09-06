import axiosInstance from '@/services/shared/ApiService';
import TokenService from '@/services/user/TokenService';
import EventBusService from '@/services/shared/EventBusService';

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => { throw error; },
  );

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== '/users/login' && err.response) {
        // Access Token was expired
        // eslint-disable-next-line no-underscore-dangle
        if (err.response.status === 401 && !originalConfig._retry) {
          // eslint-disable-next-line no-underscore-dangle
          originalConfig._retry = true;
          try {
            const res = await axiosInstance.post('/users/refresh-token', {
              refreshToken: TokenService.getLocalRefreshToken(),
            });
            const { accessToken } = res.data.data;
            store.dispatch('refreshToken', accessToken);
            TokenService.updateLocalAccessToken(accessToken);
            return axiosInstance(originalConfig);
          } catch (_error) {
            EventBusService.dispatch('logout');
            throw _error;
          }
        }
      }

      if (err.status === 403) EventBusService.dispatch('logout');
      throw err;
    },
  );
};

export default setup;
