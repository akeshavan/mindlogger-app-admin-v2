<template>
    <b-container class="p-3">
      <b-row>
        <b-col class="text-center">
          <h1>Activity Sets</h1>
          <p class="lead">A collection of activities.</p>
        </b-col>
      </b-row>
      <b-row v-if="isLoggedIn">
        <b-col>
          <h2>Your Activity Sets</h2>
          <p class="lead">
            Here are the activies you own, manage, or can view.
          </p>
          <b-table striped hover :items="userActivityTable" :fields="userTableFields">
            <!-- A virtual column -->
            <template slot="logo" slot-scope="data">
              <span v-if="data.item.logoImage">
                <img :src="getImageURL(data.item.logoImage['@id'])" class="tableLogo">
              </span>
            </template>

            <template slot="actions" slot-scope="data">
              <span v-if="data.item.role.indexOf('Editor') > -1">
                 <b-button
                  size="sm"
                  variant="secondary"
                  :to="'/edit_activity/'+data.item.activityId">
                   Edit
                 </b-button>
              </span>
              <span v-if="data.item.role.indexOf('Viewer') > -1">
                 <b-button
                  size="sm"
                  variant="info"
                  :to="'/view_activity/'+data.item.activityId">
                   View
                 </b-button>
              </span>
            </template>

          </b-table>
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

.tableLogo {
  max-height: 25px;
}
</style>

<script>
import _ from 'lodash';
import { getAllActivitySets, fullImageURL } from '../api/api';

export default {
  name: 'ActivitySets',
  props: {
    isLoggedIn: {
      type: Boolean,
    },
    user: {
      type: Object,
    },
  },
  data() {
    return {
      allActivitySets: [],
      userTableFields: ['logo', 'shortName', 'role', 'actions'],
      remainingTableFields: ['logo', 'shortName', 'description'],
    };
  },
  computed: {
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
  mounted() {
    getAllActivitySets().then((resp) => {
      this.allActivitySets = resp.data;
    });
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
  },
};
</script>

