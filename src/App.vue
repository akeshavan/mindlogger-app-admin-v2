<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" class="site-header">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">
        Mindlogger
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/activitySets" exact v-if="isLoggedIn">Your Activity Sets</b-nav-item>
          <b-nav-item to="/guide" exact>User Guide</b-nav-item>

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
      <transition name="fade" mode="out-in">
        <!-- <keep-alive :exclude="['view_activity']"> -->
        <router-view v-on:login="saveToken" :isLoggedIn="isLoggedIn"
        :user="user" :authToken="authToken" keep/>
        <!-- </keep-alive> -->
     </transition>
    </div>

    <!-- The footer -->

    <footer class="bg-light pt-3 pb-3 mt-3">
      <b-row>
        <b-col class="text-center">
          <p class="mt-3">
          <!-- TODO: unhardcode this logo and text! -->
          <img class="logo"
          src="https://27c2s3mdcxk2qzutg1z8oa91-wpengine.netdna-ssl.com/wp-content/themes/childmind/assets/img/cmi-logo-vert-ko.svg" />
          © <a href="https://childmind.org">Child Mind Institute</a> MATTER Lab 2019</p>
        </b-col>
      </b-row>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import _ from 'lodash';
// eslint-disable-next-line
import style from './custom-bootstrap.scss';
// eslint-disable-next-line
import 'bootstrap/dist/css/bootstrap.css';
// eslint-disable-next-line
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

const localStorage = require('localStorage');

Vue.use(BootstrapVue);

/**
 * App.vue is the main entrypoint to the app.
 */

export default {
  name: 'App',
  data() {
    return {
      /**
       * stores user data returned from authentication route
       */
      user: {},
      /**
       * stores the auth token returned from authentication route.
       * this is used for every subsequent REST call.
       */
      authToken: {},
    };
  },
  computed: {
    /**
     * tells us if the user is logged in
     * since empty objects evaluate to true in JS (crazy, i know)
     * we use a lodash function to evaluate an empty object.
     */
    isLoggedIn() {
      return !_.isEmpty(this.user);
    },
  },
  /**
   * check to see if a user is logged in by looking at local storage
   */
  mounted() {
    try {
      this.user = JSON.parse(localStorage.getItem('user')) || {};
      this.authToken = JSON.parse(localStorage.getItem('authToken')) || {};
    } catch (error) {
      this.user = {};
      this.authToken = {};
    }
  },
  methods: {
    /**
     * save the authtoken to localstorage
     */
    saveToken(token) {
      this.user = token.user;
      this.authToken = token.authToken;
      localStorage.setItem('user', JSON.stringify(token.user));
      localStorage.setItem('authToken', JSON.stringify(token.authToken));
    },
    /**
     * clear the tokens when the user logs out
     */
    logout() {
      this.user = {};
      this.authToken = {};
      localStorage.setItem('user', {});
      localStorage.setItem('authToken', {});
    },
  },
};

</script>

<style lang="scss">
  @import './custom-bootstrap.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';

   .logo {
    background: $dark-blue;
    border-style: solid;
    border-radius: 25px;
    border-width: 0px;
    padding: 10px;
    height: 40px;
  }
</style>

<style>
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,200,400');

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: 'IBM Plex Sans', 'Avenir', Helvetica, Arial, sans-serif;
  /* font-weight: 100; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
h1, h2, h3 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

  .hideTabHeader {
    display: none;
  }

</style>
