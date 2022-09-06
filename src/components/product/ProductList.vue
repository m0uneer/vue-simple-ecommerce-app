<template>
  <div id="products" class="box">
    <div class="product-list" v-if="productItems.length">
      <div v-for="item in productItems" :key="item.id" class="product-list-item">
        <ProductItem :item='item'/>
      </div>
    </div>
    <div class="product-count has-text-weight-bold">
      <span v-if="productItems.length">{{ productItems.length }} Product(s)</span>
      <span v-else> No Products. Please add one.</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductItem from './ProductItem.vue';

export default {
  name: 'ProductList',
  created() {
    if (this.currentUser) {
      this.$store.dispatch('getProductItems');
    }
  },
  computed: {
    ...mapGetters(['productItems']),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser || (typeof process !== 'undefined' && process.env.Node_ENV === 'test')) {
      this.$router.push({ name: 'userLogin' });
    }
  },
  components: {
    ProductItem,
  },
};
</script>

<style scoped>
.product-list {
  padding-top: 10px;
}

.product-list-item {
  padding: 10px 0;
}

.product-count {
  text-align: center
}
</style>
