const PRODUCT_BASE_URL = '/products';

export default [{
  path: `${PRODUCT_BASE_URL}/add`,
  name: 'productAdd',
  meta: { title: 'Add a new product' },

  // Lazy-loading
  component: () => import('../../components/product/ProductAdd.vue'),
}, {
  path: `${PRODUCT_BASE_URL}/:id/update`,
  name: 'productUpdate',
  meta: { title: 'Update product' },

  // Lazy-loading
  component: () => import('../../components/product/ProductAdd.vue'),
}];
