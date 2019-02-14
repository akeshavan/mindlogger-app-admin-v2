<template>
    <b-container class="p-3">
      <!-- Are you sure you want to delete modal? -->
      <b-modal id="delete" ref="deleteModal" title="Deleting"
       v-on:ok="removeActivitySet" header-bg-variant="danger"
       header-text-variant="light" ok-variant="danger">
        <p class="my-4 lead">
          Are you sure you want to delete <strong>{{toDelete.shortName}}</strong> ?
        </p>
      </b-modal>

      <b-row class="jumbotron mb-0 pb-0 mt-3 pt-3">
        <b-col class="text-center">
          <h1>Activity Sets</h1>
          <p class="lead">An activity set consists of various activities (e.g. assessments).
            Each activity consists of various screens.
          </p>
          <img src="@/assets/custom/MentalModel.svg" class="w-75 mb-3"/>
          <p>Not sure where to start? Check out our User Guide:</p>
          <b-button to="/guide" size="lg" variant="primary">User Guide</b-button>
        </b-col>
      </b-row>
      <b-row v-if="isLoggedIn">
        <b-col>

          <h2>
            <img src="@/assets/custom/ActivitySetIcon.svg" class="highlightIcon"/>
            Your Activity Sets
          </h2>
          <p class="lead">
            Here are the activies you own, manage, or can view.
          </p>

          <transition name="fade" mode="out-in">
          <b-table striped hover responsive v-if="userActivityTable.length"
            :items="userActivityTable" :fields="userTableFields">
            <!-- A virtual column -->
            <template slot="logo" slot-scope="data">
              <span v-if="data.item.logoImage">
                <img :src="getImageURL(data.item.logoImage['@id'])" class="tableLogo">
              </span>
            </template>

            <template slot="manage" slot-scope="data">
              <span v-if="data.item.role.indexOf('Manager') > -1">
                 <b-button
                 v-b-tooltip.hover title="Manage User Roles"
                  size="sm"
                  variant="outline-primary"
                  :to="'/manage/'+data.item.activityId">
                   <i class="fas fa-users"></i>
                 </b-button>
              </span>
            </template>
            <template slot="view" slot-scope="data">
              <span v-if="data.item.role.indexOf('Viewer') > -1">
                 <b-button
                  size="sm"
                  variant="info"
                  v-b-tooltip.hover title="View data"
                  :to="'/view_activity/'+data.item.activityId">
                   <i class="fas fa-eye"></i>
                 </b-button>
              </span>
            </template>

            <template slot="edit" slot-scope="data">
              <span v-if="data.item.role.indexOf('Editor') > -1">
                 <b-button
                  size="sm"
                  variant="secondary"
                  v-b-tooltip.hover title="Edit activities"
                  :to="'/edit_activity_set/'+data.item.activityId">
                   <i class="fas fa-pen"></i>
                 </b-button>
              </span>
            </template>

            <template slot="delete" slot-scope="data">
              <span v-if="data.item.role.indexOf('Editor') > -1">
                <button type="button" class="close"
                 aria-label="Close" style="width:100%"
                 v-b-tooltip.hover title="Delete this activity set"
                 @click="deleteActivitySet(data.item)"
                 >
                <span aria-hidden="true">&times;</span>
              </button>
              </span>
            </template>

          </b-table>

          <Loading v-else />
          </transition>

          <b-row>
            <b-col class="text-center">
              <b-button @click="createNewActivitySet" class="mb-3" variant="success" size="lg">
                <i class="fas fa-plus mr-2"></i>Create New Activity Set
              </b-button>
            </b-col>
          </b-row>

        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <h2>Public Activity Sets</h2>
          <p class="lead">
            Here are all the other activity sets. You don't have permission to see them, though.
          </p>
          <b-table striped hover :items="remainingActivityTable" :fields="remainingTableFields">
            <!-- A virtual column -->
            <template slot="logo" slot-scope="data">
              <span v-if="data.item.logoImage">
                <img :src="getImageURL(data.item.logoImage['@id'])" class="tableLogo">
              </span>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

strong {
  font-weight: bold;
}

.tableLogo {
  max-height: 25px;
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
import _ from 'lodash';
import {
  getAllActivitySets,
  fullImageURL,
  createNewActivitySet,
} from '../api/api';
import Loading from './library/Loading';

export default {
  name: 'ActivitySets',
  props: {
    authToken: {
      type: Object,
    },
    isLoggedIn: {
      type: Boolean,
    },
    user: {
      type: Object,
    },
  },
  components: {
    Loading,
  },
  data() {
    return {
      status: 'loading',
      allActivitySets: [],
      userTableFields: ['logo', 'shortName', 'edit', 'manage', 'view', 'delete'],
      remainingTableFields: ['logo', 'shortName', 'description'],
      toDelete: {},
    };
  },
  computed: {
    token() {
      return this.authToken.token;
    },
    userActivitySets() {
      if (!this.isLoggedIn) {
        return [];
      }
      /** if the user is an editor, manager, or viewer on any of these activities, return true */
      return _.filter(this.allActivitySets,
        act => this.isEditor(act) || this.isManager(act) || this.isViewer(act));
    },
    remainingActivitySets() {
      if (!this.isLoggedIn) {
        return this.allActivitySets;
      }
      return _.filter(this.allActivitySets,
        act => !this.isEditor(act) && !this.isManager(act) && !this.isViewer(act));
    },
    userActivityMeta() {
      return _.map(this.userActivitySets, act => act.meta);
    },
    userActivityTable() {
      // eslint-disable-next-line
      return _.map(this.userActivityMeta, (act, index) => {
        return { logoImage: act.logoImage,
          shortName: act.shortName,
          description: act.description,
          role: this.getRole(this.userActivitySets[index]).join([', ']),
          // eslint-disable-next-line
          activityId: this.userActivitySets[index]['_id'],
        };
      });
    },
    remainingActivityMeta() {
      return _.map(this.remainingActivitySets, act => act.meta);
    },
    remainingActivityTable() {
      // eslint-disable-next-line
      return _.map(this.remainingActivityMeta, (act) => {
        return { logoImage: act.logoImage, shortName: act.shortName, description: act.description };
      });
    },
  },
  watch: {
    token() {
      if (this.token) {
        getAllActivitySets(this.authToken.token).then((resp) => {
          this.allActivitySets = resp.data;
          this.status = 'ready';
        });
      }
    },
  },
  mounted() {
    if (this.token) {
      getAllActivitySets(this.authToken.token).then((resp) => {
        this.allActivitySets = resp.data;
      });
    }
  },
  methods: {
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
    getRole(activity) {
      // eslint-disable-next-line
      const userId = this.user._id;
      const roles = [this.isEditor(activity), this.isManager(activity), this.isViewer(activity)];
      const roleNames = ['Editor', 'Manager', 'Viewer'];
      return _.filter(roleNames, (r, i) => roles[i]);
    },
    getImageURL(id) {
      return fullImageURL(id);
    },
    createNewActivitySet() {
      // eslint-disable-next-line
      createNewActivitySet(this.user._id, this.authToken.token).then((resp) => {
        // eslint-disable-next-line
        this.$router.push(`edit_activity_set/${resp.data._id}`);
      });
    },
    deleteActivitySet(item) {
      this.toDelete = item;
      this.$refs.deleteModal.show();
    },
    removeActivitySet() {
      console.log('removing...', this.toDelete);
      this.toDelete = {};
    },
  },
};
</script>

