<template>
    <b-container>
      <b-row>
        <b-col class="text-center">
          <h1 id="user">
            <b-img
            thumbnail
            rounded
            width="75" height="75" blank-color="#777"
            class=""
            :src="userMetaData.gravatar_baseUrl"></b-img>

            {{userMetaData.firstName}} {{userMetaData.lastName}}
          </h1>
          <p class="lead">{{userMetaData.login}}</p>

        </b-col>
      </b-row>

      <!-- Table of Contents -->
      <!-- Jump to a specific activity -->

      <b-row>
        <b-col>
          <h5> Jump to: </h5>
        </b-col>
        <b-col offset="1" cols="11">
            <div v-for="(act) in activities" :key="act._id" class="mt-2">
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
          <div v-for="(act) in activities" :key="act._id" class="mt-2">
            <h2 :id="act[0].meta.activity.name" class="mb-0 pb-0">
              {{act[0].meta.activity.name}} ({{act.length}})
            </h2>
            <div class="mb-3">
              <small>
                <a href="#user">go to top</a>
              </small>
            </div>
            <ActivityView :activity="act"/>
          </div>
        </b-col>
      </b-row>
    </b-container>
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

const TIMEOUT = 10000;

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
  },
  computed: {
    userId() {
      return this.$route.params.userId;
    },
    activities() {
      return _.groupBy(this.userData, v => v.meta.activity['@id']);
    },
  },
  data() {
    return {
      userMetaData: {},
      userData: [],
    };
  },
  methods: {
    getUserMetadata() {
      return getUserMetadata(this.userId).then((resp) => {
        this.userMetaData = resp.data;
      });
    },
    getUserData() {
      /* eslint-disable */
      return getUserDataFolder(this.userId, this.authToken.token).then((resp) => {
        return resp.data[0]._id;
      }).then((folderId) => {
        return getUserActivitySetFolders(folderId, this.authToken.token).then((resp) => {
          return _.filter(resp.data, v => v.name === this.activityData.name)[0]._id;
        }).then((userActivityFolderId) => {
          getUserActivitySetData(userActivityFolderId, this.authToken.token).then((resp) => {
            this.userData = resp.data;
          });
        });
      });
      /* eslint-enable */
    },
    scrollTo(hashtag) {
      console.log('going to scroll to', hashtag);
      setTimeout(() => { location.href = hashtag; }, TIMEOUT);
    },
  },
  watch: {
    userId() {
      this.getUserMetadata().then(this.getUserData);
    },
  },
  mounted() {
    this.getUserMetadata().then(this.getUserData).then(() => {
      // From testing, without a brief timeout, it won't work.
      console.log('hash?', this.$route.hash);
      if (this.$route.hash) {
        setTimeout(() => this.scrollTo(this.$route.hash), TIMEOUT);
      }
    });
  },
};
</script>

