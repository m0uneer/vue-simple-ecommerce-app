<template>
  <form @submit.prevent="submitProduct">
    <div class="box">
      <h1>Add new product</h1>
      <div class="field">
        <div class="control">
          <label for="name" class="label">Name
            <input name="name" v-model="state.name" class="input" type="text">
          </label>
        </div>
        <p class="help is-danger" v-if="!varState.successful && v$.name.$error">
          {{ v$.name.$errors[0].$message }}
        </p>
      </div>
      <div class="field">
        <div class="control">
          <label for="category" class="label">Category
            <input name="category" v-model="state.category" class="input" type="text">
          </label>
        </div>
        <p class="help is-danger" v-if="!varState.successful && v$.category.$error">
          {{ v$.category.$errors[0].$message }}
        </p>
      </div>
      <div class="field">
        <div class="control">
          <label for="image" class="label">Image
            <input name="image" v-on:change="setImageValue" class="input" type="file">
          </label>
        </div>
        <p class="help is-danger" v-if="!varState.successful && v$.image.$error">
          {{ v$.image.$errors[0].$message }}
        </p>
      </div>
      <div class="field">
        <div class="control">
          <label for="price" class="label">Price
            <input name="price" v-model="state.price" class="input" type="number">
          </label>
        </div>
        <p class="help is-danger" v-if="!varState.successful && v$.price.$error">
          {{ v$.price.$errors[0].$message }}
        </p>
      </div>
      <div class="field">
        <div class="control">
          <label for="quantity" class="label">Quantity
            <input name="quantity" v-model="state.quantity" class="input" type="number">
          </label>
        </div>
        <p class="help is-danger" v-if="!varState.successful && v$.quantity.$error">
          {{ v$.quantity.$errors[0].$message }}
        </p>
      </div>
      <div class="field">
        <div class="control">
          <label for="discount" class="label">Discount
            <input name="discount" v-model="state.discount" class="input" type="number">
          </label>
        </div>
        <p class="help is-danger" v-if="!varState.successful && v$.discount.$error">
          {{ v$.discount.$errors[0].$message }}
        </p>
      </div>
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <hr>
      <div v-if="varState.message" class="message"
           :class="varState.successful ? 'is-success' : 'is-danger'">
        <div class="message-header">
          <p> {{varState.message}} </p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { computed, reactive } from 'vue';
import {
  required, decimal, integer, minValue, maxValue,
} from '@vuelidate/validators';
import useValidate from '@vuelidate/core';

import EventBusService from '@/services/shared/EventBusService';

export default {
  name: 'ProductAdd',
  setup() {
    const state = reactive({
      name: '',
      category: '',
      image: '',
      price: '',
      quantity: '',
      discount: '',
    });

    const varState = reactive({
      successful: false,
      message: '',
    });

    const rules = computed(() => ({
      name: { required },
      category: { required },
      image: { required },
      price: { required, decimal },
      quantity: { required, integer },
      discount: { required, minValue: minValue(0), maxValue: maxValue(100) },
    }));

    const v$ = useValidate(rules, state);
    return { state, v$, varState };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push({ name: 'userLogin' });
    }
  },

  methods: {
    async fetchData(id) {
      this.state = await this.$store.dispatch('getProductItem', id);
    },

    setImageValue(ev) {
      // eslint-disable-next-line prefer-destructuring
      this.state.image = ev.target.files[0];
    },

    async submitProduct() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }

      this.varState.message = '';
      this.varState.successful = false;
      const formData = new FormData();
      formData.append('image', this.state.image, this.state.image.name);
      Object.keys(this.state).forEach((key) => {
        if (key === 'image') return;
        formData.append(key, this.state[key]);
      });

      try {
        const data = this.$route.params.id
          ? await this.$store.dispatch('updateProductItem', formData)
          : await this.$store.dispatch('addProductItem', formData);

        this.varState.message = data?.messages?.map((msg) => msg.txt).join('\n');
        this.varState.successful = true;
        if (!this.$route.params.id) {
          Object.keys(this.state).forEach((key) => { this.state[key] = ''; });
        }
      } catch (error) {
        // @TODO, this error handling needs to defined in a service
        const valMsg = error.response?.data?.validationErrors?.map((err) => err.message).join('\n');
        const errMsg = error.response?.data?.messages?.map((msg) => msg.txt).join('\n');
        this.varState.message = valMsg || errMsg || error.message || error.toString();
        this.varState.successful = false;
        if (error.response && error.response.status === 403) {
          EventBusService.dispatch('logout');
        }
      }
    },
  },
};

</script>
