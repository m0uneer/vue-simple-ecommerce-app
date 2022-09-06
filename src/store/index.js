import { createStore } from 'vuex';

import auth from './user/UserStore';
import product from './product/ProductStore';

export default createStore({
  modules: {
    auth,
    product,
  },
});
