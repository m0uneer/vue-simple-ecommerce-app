<template>
  <form @submit.prevent="loginUser">
    <div class="box mini-box">
      <h1>Login</h1>
      <div class="field">
        <div class="control">
          <label for="name" class="label">Email
            <input name="email" class="input" type="email" v-model="state.email">
          </label>
        </div>
        <p class="help is-danger" v-if="v$.email.$error"> {{ v$.email.$errors[0].$message }} </p>
      </div>
      <div class="field">
        <div class="control">
          <label for="password" class="label">Password
            <input name="password" class="input" type="password" v-model="state.password">
          </label>
        </div>
        <p class="help is-danger" v-if="v$.password.$error">
          {{ v$.password.$errors[0].$message }}
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
import { required, email } from '@vuelidate/validators';

export default {
  name: 'UserLogin',

  setup() {
    const state = reactive({
      email: '',
      password: '',
    });

    const varState = reactive({
      successful: false,
      message: '',
    });

    const rules = computed(() => ({
      email: { required, email },
      password: { required },
    }));

    const v$ = useValidate(rules, state);
    return { state, v$, varState };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  created() {
    if (this.loggedIn) {
      this.$router.push({ name: 'home' });
    }
  },

  methods: {
    async loginUser() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }

      this.varState.message = '';
      this.varState.successful = false;
      try {
        await this.$store.dispatch('login', this.state);
        this.$router.push({ name: 'home' });
      } catch (error) {
        // @TODO, this error handling needs to defined in a service
        const valMsg = error.response?.data?.validationErrors?.map((err) => err.message).join('\n');
        const errMsg = error.response?.data?.messages?.map((msg) => msg.txt).join('\n');
        this.varState.message = valMsg || errMsg || error.message || error.toString();
        this.varState.successful = false;
      }
    },
  },
};

</script>
