import axios from '@/services/shared/ApiService';
import * as types from '@/store/product/ProductMutationTypes';
import Config from '@/config';

const state = {
  productItems: [],
};

const mutations = {
  [types.UPDATE_PRODUCT_ITEMS](mState, payload) {
    // eslint-disable-next-line no-param-reassign
    mState.productItems = payload;
  },
};

const actions = {
  getProductItems({ commit }) {
    return axios.get(Config.PRODUCTS_API_URL).then((response) => {
      commit(types.UPDATE_PRODUCT_ITEMS, response.data.data);
    });
  },

  // eslint-disable-next-line no-empty-pattern
  getProductItem({ }, productId) {
    return axios.get(`${Config.PRODUCTS_API_URL}/${productId}`)
      .then((response) => response.data.data);
  },

  addProductItem({ commit }, productsItem) {
    return axios.post(Config.PRODUCTS_API_URL, productsItem, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {
      commit(types.UPDATE_PRODUCT_ITEMS, response.data);
      return response.data;
    });
  },

  updateProductItem({ commit }, productItem) {
    return axios.put(`${Config.PRODUCTS_API_URL}/${productItem.id}`, productItem, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {
      commit(types.UPDATE_PRODUCT_ITEMS, response.data);
      return response.data;
    });
  },

  removeProductItem({ commit }, productId) {
    return axios.delete(`${Config.PRODUCTS_API_URL}/${productId}`).then((response) => {
      commit(types.UPDATE_PRODUCT_ITEMS, response.data.data);
    });
  },
};

const getters = {
  productItems: (mState) => mState.productItems,
};

const productModule = {
  state,
  mutations,
  actions,
  getters,
};

export default productModule;
