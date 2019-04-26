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
          <applet-calendar :id="'chart__'+userId"
           :data="activities" :isBoss="true"
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
          <h5> Activities in {{appletData.name}}: </h5>
        </b-col>
        <b-col offset="1" cols="11">
            <div v-for="(act) in activities" :key="act._id" class="mt-3">
              <p>
                <a :href="'#' + act.name">
                  {{act.name}} ({{act.data.length}})
                </a>
              </p>
            </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div v-for="(act, index) in activities" :key="act._id" class="mt-2">
            <!-- TODO: make this its own component -->
            <h2 :id="act.name" class="mb-0 pb-0">
              {{act.name}} ({{act.data.length}})
            </h2>
            <div class="mb-3">
              <small>
                <a href="#user">go to top</a>
              </small>
            </div>
            <applet-calendar
             :id="'subchart__'+index"
             :data="[act]"
             :dateRange="globalDateRange"
             :filterDateRange="filterDateRange"
             :colorArr="getColorArr(index)"
             v-on:setFilterDateRange="setFilterDateRange"
             />
            <!-- <ActivityView :activity="act" :dateRange="filterDateRange"
            :color="getColorArr(index)[0]"/> -->
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
import ActivityView from './library/ActivityView';
import Loading from './library/Loading';
import Error from './library/Error/';
import AppletCalendar from './viz/AppletCalendar';

const d3 = require('d3');

export default {
  name: 'ViewActivityUser',
  props: {
    authToken: {
      type: Object,
    },
    appletData: {
      type: Object,
    },
  },
  components: {
    ActivityView,
    Loading,
    Error,
    AppletCalendar,
  },
  computed: {
    userId() {
      return this.$route.params.userId;
    },
    activities() {
      return [{
        name: 'Morning',
        _id: 'actid0',
        data: [
          {
            time_of_response: '2019-04-26T23:06:30.105Z',
          },
          {
            time_of_response: '2019-02-21T23:06:30.105Z',
          },
          {
            time_of_response: '2019-03-22T23:06:30.105Z',
          },
        ],
      },
      {
        name: 'Evening',
        _id: 'actid1',
        data: [
          {
            time_of_response: '2019-02-23T23:06:30.105Z',
          },
          {
            time_of_response: '2019-03-22T23:06:30.105Z',
          },
        ],
      }];
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

    },
    getUserData() {
      this.status = 'ready';
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

    },
  },
  mounted() {
    this.status = 'ready';
  },
};
</script>

