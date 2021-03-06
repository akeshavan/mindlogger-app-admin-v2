<template>
  <div>
    <Loading v-if="status === 'loading'"/>
    <Unauthorized v-else-if="status === 'unauthorized'" />
    <Error v-else-if="status === 'error'" :error="error"/>
    <div v-else-if="isLoggedIn" class="activitySetOverview">
      <b-row>
        <b-col class="pt-3 bg-light col-md-3 col-sm-12 col-xs-12">
          <b-nav vertical pills class="w-100">
            <b-nav-item to="/activitySets" exact v-if="isLoggedIn">
            <i class="fas fa-long-arrow-alt-left"></i>
            Your Applets
            </b-nav-item>
            <b-nav-item
             :to="'/view_activity/'+ activityId +'/overview'">
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
                 :to="'/view_activity/'+ activityId + '/view_user/' + subId">
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
              <div v-if="isAnEditor">
                <b-button :to="`/edit_activity_set/${activityId}`" variant="default" size="sm">
                  Go to editor panel
                  <i class="fas fa-long-arrow-alt-right"></i>
                </b-button>
              </div>
              <div v-if="isAManager">
                <b-button :to="`/manage/${activityId}`" variant="default" size="sm">
                  Go to management panel
                  <i class="fas fa-long-arrow-alt-right"></i>
                </b-button>
              </div>
            </b-col>
          </div>
          <transition name="fade" mode="out-in">
            <router-view :activityData="activityData" :authToken="authToken"></router-view>
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
import Vue from 'vue';
import { getActivitySet, getUserMetadata } from '../api/api';
import Loading from './library/Loading';
import Unauthorized from './library/Unauthorized';
import Error from './library/Error/';


export default {
  name: 'viewActivity',
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
      activityData: {},
      status: 'loading',
      error: {
        message: null,
      },
      userData: {},
      userSearch: '',
      // viewableUsers: [],
    };
  },
  computed: {
    activityId() {
      return this.$route.params.activityId;
    },
    viewableUsers() {
      // eslint-disable-next-line
      return Object.keys(this.userData) // this.activityData.meta.members.viewers[this.user._id];
    },
    currentRoute() {
      return this.$router.currentRoute.name;
    },
    isAnEditor() {
      if (this.activityData.meta) {
        return this.isEditor(this.activityData);
      }
      return null;
    },
    isAManager() {
      if (this.activityData.meta) {
        return this.isManager(this.activityData);
      }
      return null;
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
    getActivitySet() {
      return getActivitySet(this.activityId, this.authToken.token).then((resp) => {
        this.activityData = resp.data;
      });
    },
    isViewer(activity) {
      // eslint-disable-next-line
      const userId = this.user._id;
      return Object.keys(activity.meta.members.viewers).indexOf(userId) > -1;
    },
    isEditor(activity) {
      // eslint-disable-next-line
      const userId = this.user._id;
      return activity.meta.members.editors.indexOf(userId) > -1;
    },
    isManager(activity) {
      // eslint-disable-next-line
      const userId = this.user._id;
      return activity.meta.members.managers.indexOf(userId) > -1;
    },
    getUserMetadata(userId) {
      // console.log('getting usermetedata', userId);
      getUserMetadata(userId).then((resp) => {
        Vue.set(this.userData, userId, resp.data);
        this.$forceUpdate();
      });
    },
    mount() {
      this.status = 'loading';
      this.getActivitySet().then(() => {
        this.status = 'complete';
        // eslint-disable-next-line
        const viewableUsers = this.activityData.meta.members.viewers[this.user._id];
        _.map(viewableUsers, this.getUserMetadata);
        if (!this.isViewer(this.activityData) || !this.isLoggedIn) {
          this.status = 'unauthorized';
        }
      })
        .catch((e) => {
          this.status = 'error';
          this.error.message = e.message;
        });
    },
  },
  mounted() {
    if (this.authToken.token) {
      this.mount();
    }
  },
  deactivated() {
    this.$destroy();
  },
};
</script>
