<template>
<div class="has-text-weight-bold columns">
  <div class="column is-1">
    <img class="image" alt="product image" :src="item.image">
  </div>

  <div class="column is-11">
    [{{item.code}}] {{item.name}} (Quantity {{item.quantity}})
    <div class="buttons is-pulled-right">
      <router-link  v-if="item.id"
                    class="button product-button is-primary is-small has-text-white"
                   :to="{ name: 'productUpdate', params: { id: item.id } }">Update</router-link>
      <button class="button product-button is-danger is-small has-text-white"
              @click="removeProductItem(item.id)">Delete</button>
    </div>
    <p> {{item.category}}</p>
    <div class="has-text-primary has-text-weight-bold">
      <span class="price">
        <i class="fa fa-usd"></i>
        {{item.price}}
      </span>
      <span class="final-price">
        <i class="fa fa-usd"></i>
        {{(item.price - (item.price * item.discount / 100)).toFixed(2)}}
      </span>
      ({{item.discount}}% Discount)
    </div>
  </div>
</div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'ProductItem',
  props: ['item'],
  methods: mapActions(['removeProductItem']),
};

</script>
<style scoped>
.product-button {
  margin-left: 5px;
}

.price {
  text-decoration:line-through
}

.final-price {
  margin-left: 10px
}
</style>
