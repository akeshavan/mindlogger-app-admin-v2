<template>
  <div class="mt-3">
    <div class="row">
      <b-col cols="2">
      <span>
        <b-button :to="'/activitySets'" variant="default" size="sm">
          <i class="fas fa-long-arrow-alt-left"></i>
          Back to your Activity Sets
        </b-button>
      </span>
      </b-col>
      <b-col cols="8"></b-col>
      <b-col cols="2">
        <div v-if="isAManager">
          <b-button :to="`/manage/${activityId}`" variant="default" size="sm">
            Go to management panel
            <i class="fas fa-long-arrow-alt-right"></i>
          </b-button>
        </div>
        <div v-if="isAViewer">
          <b-button :to="`/view_activity/${activityId}`" variant="default" size="sm">
            View data
            <i class="fas fa-long-arrow-alt-right"></i>
          </b-button>
        </div>
      </b-col>
    </div>
    <Unauthorized v-if="!authorized" />
    <Loading v-if="status==='loading'" />
    <div v-else class="main container">

      <!-- delete modal -->

      <b-modal id="deleteActivity" ref="deleteModal" title="Deleting"
       v-on:ok="deleteActivity(toDelete.id)" header-bg-variant="danger"
       header-text-variant="light" ok-variant="danger">
        <p class="my-4 lead">Are you sure you want to delete
          <b class="text-bold">{{toDelete.name}} </b>?
        </p>
      </b-modal>

      <!-- main content -->
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
          <h3>
            <img src="@/assets/custom/ActivitiesIcon.svg" class="mr-3 highlightIcon"/>
            Activities
          </h3>

          <p>in this activity set are:</p>

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
                <!-- {{data.item.name}} (error) {{data.item}} -->
                loading..
              </span>

            </template>
            <template slot="actions" slot-scope="data">
              <!-- <b-button variant="info" size="sm"
               :to="'/edit_activity_set/' + activityId + '/edit_activity/' + data.item.id">
                edit
              </b-button> -->
              <b-button size="sm" class="close" aria-label="Close">
                <!-- <i class="fas fa-trash"></i> -->
                <span aria-hidden="true" @click="removeActivity(data.item)">&times; </span>
              </b-button>
            </template>
           </b-table>
           <b-row>
             <b-col class="text-center">
              <b-button @click="createNewActivity" class="mb-3" variant="success" size="lg">
                <i class="fas fa-plus mr-2"></i>Create New Activity
              </b-button>
             </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style scoped>
  h1, h2, h3 {
    font-weight: normal;
  }
  text-bold {
    font-weight: bold;
  }

  .highlightIcon {
    height: 50px;
    background: #00cce2;
    padding: 10px;
    border-style: solid;
    border-color: white;
    border-radius: 10px;
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
  deleteActivity,
} from '../api/api';
import ActivitySetOverview from './ActivitySetOverview';
import Textfield from './library/Textfield';


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
      toDelete: {},
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
    isAViewer() {
      if (this.activityData.meta) {
        return this.isViewer(this.activityData);
      }
      return null;
    },
    isAManager() {
      if (this.activityData.meta) {
        return this.isManager(this.activityData);
      }
      return null;
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
    removeActivity(stage) {
      console.log(stage);
      this.toDelete = stage;
      this.$refs.deleteModal.show();
    },
    deleteActivity(id) {
      console.log('deleting activity....', id);
      deleteActivity({ activityId: id, token: this.authToken.token }).then((resp) => {
        console.log(resp);
        this.toDelete = {};
        this.status = 'loading';
        this.getActivitySet().then(() => {
          this.status = 'complete';
        });
      });
    },
  },
  mounted() {
    this.status = 'loading';
    this.getActivitySet().then(() => {
      this.status = 'complete';
    });
  },
  // deactivated() {
  //   this.$destroy();
  // },
};
</script>

