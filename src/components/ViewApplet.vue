<template>
  <div>
    <Loading v-if="status === 'loading'"/>
    <Unauthorized v-else-if="status === 'unauthorized'" />
    <Error v-else-if="status === 'error'" :error="error"/>
    <div v-else-if="isLoggedIn" class="activitySetOverview">
      <b-row>
        <b-col class="pt-3 bg-light col-md-3 col-sm-12 col-xs-12">
          <b-nav vertical pills class="w-100">
            <b-nav-item to="/allApplets" exact v-if="isLoggedIn">
            <i class="fas fa-long-arrow-alt-left"></i>
            Your Applets
            </b-nav-item>
            <b-nav-item
             :to="'/review/'+ appletId +'/overview'">
              Overview
            </b-nav-item>

            <b-nav-text class="text-center">Users</b-nav-text>
              <!-- Search users -->
              <b-nav-form class="ml-3">
                <b-form-input class="mx-auto w-100"
                 type="text" placeholder="Search" v-model="userSearch">
                </b-form-input>
              </b-nav-form>

              <!-- Links to user's pages -->
              <div class="mt-3">
                <b-nav-item v-for="subId in searchUsers" :key="subId" class="w-100"
                 :to="'/review/'+ appletId + '/view_user/' + subId">
                 <span v-if="userData[subId]">
                   <span v-if="userData[subId].lastName">
                    {{userData[subId].lastName}}, {{userData[subId].firstName}}
                   </span>
                 </span>
                </b-nav-item>
              </div>
          </b-nav>
        </b-col>
        <b-col class="p-3 col-md-9 col-sm-12 col-xs-12">
          <div class="row">
            <b-col cols="8"></b-col>
            <b-col cols="4" class="text-right">
              <div v-if="isAManager">
                <b-button :to="`/manage/${appletId}`" variant="default" size="sm">
                  Go to management panel
                  <i class="fas fa-long-arrow-alt-right"></i>
                </b-button>
              </div>
            </b-col>
          </div>
          <transition name="fade" mode="out-in">
            <router-view :appletData="appletData" :authToken="authToken"></router-view>
          </transition>
        </b-col>
      </b-row>
    </div>
    <Unauthorized v-else />
  </div>
</template>

<style scoped>
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
</style>

<script>
import _ from 'lodash';
// import { getActivitySet, getUserMetadata } from '../api';
import Loading from './library/Loading';
import Unauthorized from './library/Unauthorized';
import Error from './library/Error/';


export default {
  name: 'viewApplet',
  props: {
    user: {
      type: Object,
    },
    isLoggedIn: {
      type: Boolean,
    },
    authToken: {
      type: Object,
    },
  },
  components: {
    Loading,
    Unauthorized,
    Error,
  },
  data() {
    return {
      appletData: {
        name: 'Fake Applet',
      },
      status: 'loading',
      error: {
        message: null,
      },
      userData: {
        userid0: {
          firstName: 'fake',
          lastName: 'user',
        },
      },
      userSearch: '',
      // viewableUsers: [],
    };
  },
  watch: {
    token() {
      if (this.token) {
        this.mount();
      }
    },
  },
  computed: {
    appletId() {
      return this.$route.params.appletId;
    },
    token() {
      return this.authToken.token;
    },
    viewableUsers() {
      // eslint-disable-next-line
      return ['userid0'];
    },
    currentRoute() {
      return this.$router.currentRoute.name;
    },
    isAManager() {
      return true;
    },
    searchUsers() {
      if (!this.userSearch) {
        return this.viewableUsers;
      }
      // eslint-disable-next-line
      return _.filter(this.viewableUsers, (value) => {
        return (this.userData[value]
          .firstName.toLowerCase() + this.userData[value]
          .lastName.toLowerCase())
          .indexOf(this.userSearch.toLowerCase()) > -1;
      });
    },
  },
  methods: {
    getApplet() {

    },
    isViewer() {
      return true;
    },
    isEditor() {
      return true;
    },
    isManager() {
      return true;
    },
    getUserMetadata() {

    },
    mount() {
      this.status = 'ready';
    },
  },
  mounted() {
    if (this.authToken.token) {
      this.mount();
    }
  },
};
</script>
