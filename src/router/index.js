import { createRouter, createWebHistory } from 'vue-router';

import HomeRouter from './home/HomeRouter';
import UserRouter from './user/UserRouter';
import ProductRouter from './product/ProductRouter';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...HomeRouter,
    ...UserRouter,
    ...ProductRouter,
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
