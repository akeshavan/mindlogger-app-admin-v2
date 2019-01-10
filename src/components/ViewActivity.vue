<template>
  <div>
    <Loading v-if="status === 'loading'"/>
    <Unauthorized v-else-if="status === 'unauthorized'" />
    <div v-else class="activitySetOverview">
      <b-row>
        <b-col cols="3" class="pt-3 bg-light">
          <b-nav vertical pills class="w-100">

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
                  {{userData[subId].lastName}}, {{userData[subId].firstName}}
                 </span>
                </b-nav-item>
              </div>
          </b-nav>
        </b-col>
        <b-col cols="9" class="p-3">
          <router-view :activityData="activityData" :authToken="authToken"></router-view>
        </b-col>
      </b-row>
    </div>
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
import { getActivitySet, getUserMetadata } from '../api/api';
import Loading from './library/Loading';
import Unauthorized from './library/Unauthorized';

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
  },
  data() {
    return {
      activityData: {},
      status: 'loading',
      userData: {},
      userSearch: '',
    };
  },
  computed: {
    activityId() {
      return this.$route.params.activityId;
    },
    viewableUsers() {
      // eslint-disable-next-line
      return this.activityData.meta.members.viewers[this.user._id];
    },
    currentRoute() {
      return this.$router.currentRoute.name;
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
      return getActivitySet(this.activityId).then((resp) => {
        this.activityData = resp.data;
      });
    },
    isViewer(activity) {
      // eslint-disable-next-line
      const userId = this.user._id;
      return Object.keys(activity.meta.members.viewers).indexOf(userId) > -1;
    },
    getUserMetadata(userId) {
      console.log('getting usermetedata', userId);
      getUserMetadata(userId).then((resp) => {
        this.userData[userId] = resp.data;
        this.$forceUpdate();
      });
    },
  },
  mounted() {
    this.status = 'loading';
    this.getActivitySet().then(() => {
      this.status = 'complete';
      _.map(this.viewableUsers, this.getUserMetadata);
      if (!this.isViewer(this.activityData) || !this.isLoggedIn) {
        this.status = 'unauthorized';
      }
    });
  },
};
</script>
