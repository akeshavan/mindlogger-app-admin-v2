<template>
  <div>
    <Unauthorized v-if="!authorized" />
    <Loading v-if="status==='loading'" />
    <div v-else class="main container">
      <p class="lead text-muted text-center mt-3">Edit Activity Set </p>
      <h1 class="text-center mt-3">
        <b-img v-if="activityData.meta.logoImage"
          thumbnail
          rounded
          width="75" height="75" blank-color="#777"
          class=""
          :src="getImageURL(activityData.meta.logoImage['@id'])">
        </b-img>
        <textfield v-model="activityData.meta.shortName"
          ttype="text"
          placeholder="short name"
          @change="updateMetadata"
        />
      </h1>
      <p class="lead text-center">
          <textfield v-model="activityData.name"
          ttype="text"
          placeholder="name"
          @change="updateMetadata"
        />
      </p>
      <b-row>
        <b-col>
          <p class="lead text-center">
          <textfield v-model="activityData.meta.description"
          ttype="text"
          placeholder="description"
          @change="updateMetadata"
          />
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-center">
          <h3>{{activityData.meta.members.editors.length}}</h3>
          <p>Editors</p>
        </b-col>
        <b-col class="text-center">
          <h3>{{activityData.meta.members.managers.length}}</h3>
          <p>Managers</p>
        </b-col>
        <b-col class="text-center">
          <h3>{{activityData.meta.members.users.length}}</h3>
          <p>Users</p>
        </b-col>
        <b-col class="text-center">
          <h3>{{Object.keys(activityData.meta.members.viewers).length}}</h3>
          <p>Viewers</p>
        </b-col>
        <b-col class="text-center">
          <h3>{{activities.length}}</h3>
          <p>Activities</p>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col>
          <h3> Activities </h3>

          <p>in this activity set are:</p>

          <b-button @click="createNewActivity" class="mb-3" variant="success">
            <i class="fas fa-plus mr-2"></i>Create New Activity
          </b-button>

           <b-table striped hover outlined responsive
           :items="activitiesTable" :fields="activityTableFields">
            <template slot="name" slot-scope="data">
              <span v-if="data.item.id != null">
                <router-link
                  :to="'/edit_activity_set/' + activityId + '/edit_activity/' + data.item.id">
                  {{data.item.name}}
                </router-link>
              </span>
              <span v-else>
                {{data.item.name}} (error) {{data.item}}
              </span>

            </template>
            <template slot="actions" slot-scope="data">
              <!-- <b-button variant="info" size="sm"
               :to="'/edit_activity_set/' + activityId + '/edit_activity/' + data.item.id">
                edit
              </b-button> -->
              <b-button size="sm" class="close" aria-label="Close">
                <!-- <i class="fas fa-trash"></i> -->
                <span aria-hidden="true">&times; </span>
              </b-button>
            </template>
           </b-table>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col>
          <h3> Role Management </h3>
          <p> Add/remove editors, managers, viewers, and users</p>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="editors" active>
                editors
              </b-tab>
              <b-tab title="managers" >
                managers
              </b-tab>
              <b-tab title="users">
                users
              </b-tab>
              <b-tab title="viewers">
                viewers
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style scoped>
  h1, h2, h3 {
    font-weight: normal;
  }
</style>

<script>
import Vue from 'vue';
import _ from 'lodash';
import Loading from './library/Loading';
import Unauthorized from './library/Unauthorized';
import {
  getActivitySet,
  getUserMetadata,
  fullImageURL,
  getActivitiesInActivitySet,
  getActivityMetadata,
  updateActivitySetMetadata,
  createNewActivity,
} from '../api/api';
import ActivitySetOverview from './ActivitySetOverview';
import { Textfield } from './library/ScreenEditor';


export default {
  name: 'EditActivitySet',
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
    activitySetId: {
      type: String,
    },
  },
  components: {
    Loading,
    Unauthorized,
    ActivitySetOverview,
    Textfield,
  },
  data() {
    return {
      activityData: {},
      status: 'loading',
      userData: {},
      userSearch: '',
      activities: [],
      activitiesMetadata: {},
      activityTableFields: [
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'screens',
          sortable: true,
        },
        {
          key: 'actions',
        },
      ],
    };
  },
  computed: {
    activityId() {
      return this.activitySetId;
    },
    authorized() {
      if (this.activityData) {
        if (this.activityData.meta) {
          const isEditor = this.isEditor(this.activityData);
          const isManager = this.isManager(this.activityData);
          return isEditor || isManager;
        }
      }
      if (this.status === 'loading') {
        return true;
      }
      return false;
    },
    activitiesTable() {
      const outputTable = _.map(this.activities, (d, i) => {
        let description = '';
        let screens = null;
        let id = null;
        if (this.activitiesMetadata[i]) {
          description = this.activitiesMetadata[i].meta.description;
          screens = this.activitiesMetadata[i].meta.screens.length;
          // eslint-disable-next-line
          id = d._id;
        }
        return {
          name: d.name,
          description,
          screens,
          id,
        };
      });
      return outputTable;
    },
  },
  methods: {
    getImageURL(id) {
      return fullImageURL(id);
    },
    getActivitySet() {
      return getActivitySet(this.activityId, this.authToken.token).then((resp) => {
        this.activityData = resp.data;
        // eslint-disable-next-line
        return this.activityData._id;
      }).then(id => getActivitiesInActivitySet(id, this.authToken.token))
        .then((resp) => {
          console.log('got some activities', resp.data);
          this.activities = resp.data;
          _.map(resp.data, (d, i) => {
            // eslint-disable-next-line
            getActivityMetadata(d._id, this.authToken.token).then((resp_md) => {
              if (resp_md.data.length) {
                const val = resp_md.data[0];
                if (!val.meta.screens) {
                  val.meta.screens = [];
                }
                Vue.set(this.activitiesMetadata, i, val);
                this.$forceUpdate();
              }
            });
          });
        })
        .catch((e) => {
          console.log('error in get activity set', e);
        });
    },
    getUserMetadata(userId) {
      // console.log('getting usermetedata', userId);
      getUserMetadata(userId).then((resp) => {
        Vue.set(this.userData, userId, resp.data);
        this.$forceUpdate();
      });
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
    isViewer(activity) {
      // eslint-disable-next-line
      const userId = this.user._id;
      return Object.keys(activity.meta.members.viewers).indexOf(userId) > -1;
    },
    updateMetadata() {
      const name = this.activityData.name;
      const metadata = this.activityData.meta;
      updateActivitySetMetadata({
        name,
        metadata,
        parentId: this.activityId,
        token: this.authToken.token,
      }).then(() => {
        // TODO: tell the user it was saved
      }).catch((e) => {
        // TODO: tell the user their input wasn't saved.
        console.log('error in update metadata', e);
      });
    },
    createNewActivity() {
      createNewActivity({
        name: 'untitled activity',
        parentId: this.activityId,
        token: this.authToken.token,
      }).then((resp) => {
        // eslint-disable-next-line
        this.$router.push(`${this.activityId}/edit_activity/${resp.data._id}`);
      }).catch((e) => {
        console.log('error in create new activity', e);
      });
    },
  },
  mounted() {
    this.status = 'loading';
    this.getActivitySet().then(() => {
      this.status = 'complete';
    });
  },
};
</script>

