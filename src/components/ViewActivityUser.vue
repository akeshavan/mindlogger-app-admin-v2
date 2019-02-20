<template>
  <div>
    <Loading v-if="status==='loading'"/>
    <Error v-else-if="status==='error'" :error="error"/>
    <b-container v-else>
      <b-row>
        <b-col class="text-center">
          <h1 id="user">
            <b-img
            thumbnail
            rounded
            width="75" height="75" blank-color="#777"
            class=""
            :src="userMetaData.gravatar_baseUrl"
            v-if="userMetaData.gravatar_baseUrl"
            ></b-img>

            {{userMetaData.firstName}} {{userMetaData.lastName}}
          </h1>
          <p class="lead">{{userMetaData.login}}</p>

        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col>
          <all-activites-calendar :id="'chart__'+userId"
           :data="activitiesArray" :isBoss="true"
           v-on:setGlobalDateRange="setGlobalDateRange"
           v-on:setFilterDateRange="setFilterDateRange"
           :filterDateRange="filterDateRange"
          />
        </b-col>
      </b-row>

      <!-- Table of Contents -->
      <!-- Jump to a specific activity -->

      <b-row class="mt-3">
        <b-col>
          <h5> Activities in {{activityData.name}}: </h5>
        </b-col>
        <b-col offset="1" cols="11">
            <div v-for="(act) in activities" :key="act._id" class="mt-3">
              <p>
                <a :href="'#' + act[0].meta.activity.name">
                  {{act[0].meta.activity.name}} ({{act.length}})
                </a>
              </p>
            </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div v-for="(act, index) in activitiesArray" :key="act._id" class="mt-2">
            <!-- TODO: make this its own component -->
            <h2 :id="act[0].meta.activity.name" class="mb-0 pb-0">
              {{act[0].meta.activity.name}} ({{act.length}})
            </h2>
            <div class="mb-3">
              <small>
                <a href="#user">go to top</a>
              </small>
            </div>
            <all-activites-calendar
             :id="'subchart__'+index"
             :data="[act]"
             :dateRange="globalDateRange"
             :filterDateRange="filterDateRange"
             :colorArr="getColorArr(index)"
             v-on:setFilterDateRange="setFilterDateRange"
             />
            <ActivityView :activity="act" :dateRange="filterDateRange"
            :color="getColorArr(index)[0]"/>
          </div>
        </b-col>
      </b-row>
    </b-container>
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
import { getUserMetadata, getUserDataFolder, getUserActivitySetFolders, getUserActivitySetData } from '../api/api';
import ActivityView from './library/ActivityView';
import Loading from './library/Loading';
import Error from './library/Error';
import config from '../config';
import AllActivitesCalendar from './viz/AllActivitiesCalendar';

const d3 = require('d3');

const TIMEOUT = 1000;

export default {
  name: 'ViewActivityUser',
  props: {
    authToken: {
      type: Object,
    },
    activityData: {
      type: Object,
    },
  },
  components: {
    ActivityView,
    Loading,
    Error,
    AllActivitesCalendar,
  },
  computed: {
    userId() {
      return this.$route.params.userId;
    },
    activities() {
      return _.groupBy(this.userData, v => v.meta.activity['@id']);
    },
    activitiesArray() {
      return _.map(this.activities, a => a);
    },
  },
  data() {
    return {
      userMetaData: {},
      userData: [],
      status: 'loading',
      error: {
        message: null,
        response: null,
      },
      globalDateRange: null,
      filterDateRange: null,
    };
  },
  methods: {
    getUserMetadata() {
      return getUserMetadata(this.userId).then((resp) => {
        this.userMetaData = resp.data;
      }).catch((e) => {
        this.error.message = e.message;
      });
    },
    getUserData() {
      this.status = 'loading';
      /* eslint-disable */

      // find the user's Responses folder. This is the only folder they have, so it should be the first.
      return getUserDataFolder(this.userId, this.authToken.token)
        .then((resp) => {
          if (!resp.data.length) {
            throw { message: `User ${this.userId} has an empty data folder!
              Check ${config.apiHost}/folder?parentType=user&parentId=${this.userId}&name=Responses` };
          }
          return resp.data[0]._id;
        })
        // within Responses, get a list of applet folders
        .then(folderId => getUserActivitySetFolders(folderId, this.authToken.token))
        // grab the folder name that matches the activity we want.
        .then(resp => _.filter(resp.data, v => v.name === this.activityData.name)[0]._id)
        // get all the data from this folder Id
        .then((userActivityFolderId) => getUserActivitySetData(userActivityFolderId, this.authToken.token))
        // save the data to our component and say that we are ready!
        .then((resp) => {
            this.userData = resp.data;
            this.status = 'ready';
          })
        .catch((e) => {
          this.error.message = e.message;
          this.status = 'error';
        });
      /* eslint-enable */
    },
    scrollTo(hashtag) {
      // console.log('going to scroll to', hashtag);
      setTimeout(() => { location.href = hashtag; }, TIMEOUT);
    },
    setGlobalDateRange(dateRange) {
      this.globalDateRange = dateRange;
      this.$forceUpdate();
    },
    setFilterDateRange(dateRange) {
      this.filterDateRange = dateRange;
      this.$forceUpdate();
    },
    getColorArr(i) {
      return [d3.schemeCategory10[i % 10]];
    },
  },
  watch: {
    userId() {
      this.status = 'loading';
      this.getUserMetadata().then(this.getUserData);
    },
  },
  mounted() {
    this.getUserMetadata().then(this.getUserData).then(() => {
      // From testing, without a brief timeout, it won't work.
      if (this.$route.hash) {
        setTimeout(() => this.scrollTo(this.$route.hash), TIMEOUT);
      }
    });
  },
};
</script>

