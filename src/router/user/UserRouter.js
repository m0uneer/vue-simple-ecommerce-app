const USER_BASE_URL = '/users';

export default [{
  path: `${USER_BASE_URL}/register`,
  name: 'userRegister',
  meta: { title: 'Register a new user' },

  // Lazy-loading
  component: () => import('../../components/user/UserRegister.vue'),
}, {
  path: `${USER_BASE_URL}/login`,
  name: 'userLogin',
  meta: { title: 'User Login' },

  // Lazy-loading
  component: () => import('../../components/user/UserLogin.vue'),
}];
