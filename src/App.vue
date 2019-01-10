<template>
  <div id="app">
    <b-navbar toggleable="md" type="light" variant="light">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">Mindlogger</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <!-- <b-nav-item href="#">Link</b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right v-if="isLoggedIn">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>{{user.login}}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item v-else to="/login">Login</b-nav-item>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <div class="">
     <router-view v-on:login="saveToken" :isLoggedIn="isLoggedIn"
     :user="user" :authToken="authToken"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import _ from 'lodash';
// eslint-disable-next-line
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const localStorage = require('localStorage');

Vue.use(BootstrapVue);

export default {
  name: 'App',
  data() {
    return {
      user: {},
      authToken: {},
    };
  },
  computed: {
    isLoggedIn() {
      return !_.isEmpty(this.user);
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user')) || {};
    this.authToken = JSON.parse(localStorage.getItem('authToken')) || {};
  },
  methods: {
    saveToken(token) {
      console.log(token);
      this.user = token.user;
      this.authToken = token.authToken;
      localStorage.setItem('user', JSON.stringify(token.user));
      localStorage.setItem('authToken', JSON.stringify(token.authToken));
    },
    logout() {
      this.user = {};
      this.authToken = {};
      localStorage.setItem('user', {});
      localStorage.setItem('authToken', {});
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
