<template>
  <form @submit.prevent="registerUser">
    <div class="box mini-box">
      <h1>Register a new user</h1>
      <div class="field">
        <div class="control">
          <label for="name" class="label">Username
            <input name="username" class="input" type="text" v-model="state.username">
          </label>
        </div>
        <p class="help is-danger" v-if="!varState.successful && v$.username.$error">
          {{ v$.username.$errors[0].$message }}
        </p>
      </div>
      <div class="field">
        <div class="control">
          <label for="name" class="label">Email
            <input name="email" class="input" type="email" v-model="state.email">
          </label>
        </div>
        <p class="help is-danger" v-if="!varState.successful && v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </p>
      </div>
      <div class="field">
        <div class="control">
          <label for="password" class="label">Password
            <input name="password" class="input" type="password" v-model="state.password">
          </label>
        </div>
        <p class="help is-danger" v-if="!varState.successful && v$.password.$error">
          {{ v$.password.$errors[0].$message }}
        </p>
      </div>
      <div class="field">
        <div class="control">
          <label for="confirmPassword" class="label">Confirm Password
            <input name="confirmPassword" class="input" type="password"
                   v-model="state.passwordConfirm">
          </label>
        </div>
        <p class="help is-danger" v-if="!varState.successful && v$.passwordConfirm.$error">
          {{ v$.passwordConfirm.$errors[0].$message }}
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
import { reactive, computed } from 'vue';
import useValidate from '@vuelidate/core';
import {
  required, email, minLength, sameAs,
} from '@vuelidate/validators';

import EventBusService from '@/services/shared/EventBusService';

export default {
  name: 'UserRegister',

  setup() {
    const state = reactive({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });

    const varState = reactive({
      successful: false,
      message: '',
    });

    const rules = computed(() => ({
      username: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      passwordConfirm: { required, sameAs: sameAs(state.password) },
    }));

    const v$ = useValidate(rules, state);
    return { state, v$, varState };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  mounted() {
    if (this.loggedIn) {
      this.$router.push({ name: 'home' });
    }
  },

  methods: {
    async registerUser() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }

      this.varState.message = '';
      this.varState.successful = false;
      try {
        const data = await this.$store.dispatch('register', this.state);
        this.varState.message = data?.messages?.map((msg) => msg.txt).join('\n');
        this.varState.successful = true;
        Object.keys(this.state).forEach((key) => { this.state[key] = ''; });
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
