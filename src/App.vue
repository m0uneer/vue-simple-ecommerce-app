<template>
  <div id="app">
    <div class="container">
      <div class="column is-7">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <router-link class="navbar-item" :to="{ name: 'home' }">Home</router-link>
              <router-link class="navbar-item" :to="{ name: 'productAdd' }">
                Add Product
              </router-link>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons" v-if="!currentUser">
                  <router-link class="button is-primary sign-up-button"
                               :to="{ name: 'userRegister' }">Register</router-link>
                  <router-link class="button" :to="{ name: 'userLogin' }">Log in</router-link>
                </div>
                <span class="username" v-if="currentUser">
                  Hello, {{ currentUser.username }}
                </span>
                <span class="username" v-if="currentUser">
                  (Last Login: {{
                    `${new Date(currentUser.lastLoginAt).toLocaleDateString()} -
                      ${new Date(currentUser.lastLoginAt).toLocaleTimeString()}`}})
                </span>
                <div class="buttons" v-if="currentUser">
                  <button class="button" @click.prevent="logOut">Log out</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div class="content-container">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBusService from '@/services/shared/EventBusService';

export default {
  name: 'App',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'userLogin' });
    },
  },
  mounted() {
    EventBusService.on('logout', () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBusService.remove('logout');
  },
};
</script>

<style>
html,
body {
  background: #f2f6fa;
}

.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-container {
  margin-top: 15px;
}

.sign-up-button {
  margin-right: 10px
}

.username {
  margin: auto 10px;
}
</style>
