<template>
    <b-container class="p-3">
      <!-- Are you sure you want to delete modal? -->
      <b-modal id="delete" ref="deleteModal" title="Deleting"
       v-on:ok="removeApplet" header-bg-variant="danger"
       header-text-variant="light" ok-variant="danger">
        <p class="my-4 lead">
          Are you sure you want to delete <strong>{{toDelete.shortName}}</strong> ?
        </p>
      </b-modal>

      <!-- <b-row class="jumbotron mb-0 pb-0 mt-3 pt-3">
        <b-col class="text-center">
          <h1>Applets</h1>
          <p class="lead">An applet consists of various activities (e.g. assessments).
            Each activity consists of a sequence of screens.
          </p>
          <img src="@/assets/custom/MentalModel.svg" class="w-75 mb-3"/>
          <div class="mb-3">
            <p>Not sure where to start? Check out our User Guide:</p>
            <b-button to="/guide" size="lg" variant="primary">User Guide</b-button>
          </div>
        </b-col>
      </b-row> -->

      <b-row v-if="isLoggedIn" class="mt-3">
        <b-col>

          <h1 class="text-center">
            <img src="@/assets/custom/ActivitySetIcon.svg" class="highlightIcon"/>
            Your Applets
          </h1>
          <p class="lead text-center">
            Here are the applets that you manage or can review.
          </p>

          <transition name="fade" mode="out-in">
            <div v-if="status === 'ready'">
              <AllAppletsTable :allApplets="allApplets"/>
              <b-row>
                <b-col class="text-center">
                  <b-button class="mb-3" variant="primary" size="lg">
                    <i class="fas fa-plus mr-2"></i>Add New Applet
                  </b-button>
                </b-col>
              </b-row>
            </div>
            <!-- <b-table striped hover responsive v-if="userActivityTable.length || status === 'ready'"
              :items="userActivityTable" :fields="userTableFields">
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
                  v-b-tooltip.hover title="Delete this applet"
                  @click="deleteActivitySet(data.item)"
                  >
                  <span aria-hidden="true">&times;</span>
                </button>
                </span>
              </template>

            </b-table> -->

            <Loading v-else-if="status === 'loading'" />
          </transition>

          <Error v-if="error.show" :error="error"/>

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
import api from '@bit/akeshavan.mindlogger-web.api';
import _ from 'lodash';
import Loading from './library/Loading';
import Error from './library/Error/';
import config from '../config';
import AllAppletsTable from './AllAppletsTable';


/**
 * This is the main dashboard to view all the applets for a user.
 */

export default {
  name: 'AllApplets',
  props: {
    /**
     * auth token from auth route.
     */
    authToken: {
      type: Object,
    },
    /**
     * boolean that tells us if user is logged in.
     */
    isLoggedIn: {
      type: Boolean,
    },
    /**
     * user data from auth route
     */
    user: {
      type: Object,
    },
  },
  components: {
    Loading,
    Error,
    AllAppletsTable,
  },
  data() {
    return {
      /**
       * status to show loading component or not.
       */
      status: 'loading',
      /**
       * a list of all applets as a manager
       */
      allManagerApplets: [],
      /**
       * a list of all applets as a reviewer
       */
      allReviewerApplets: [],
      /**
       * stage an applet data for deletion
       */
      toDelete: {},
      /**
       * if there is an error in grabbing applets, store the message here.
       */
      error: {
        show: false,
        message: '',
      },
    };
  },
  computed: {
    /**
     * quick reference for authtoken.
     */
    token() {
      return this.authToken.token;
    },
    /**
     * combine the applets that you can see as a manager,
     * and applets you can see as a user
     */
    allApplets() {
      const output = [];
      _.map(this.allManagerApplets, (m) => {
        const id = m.applet._id;
        const canReview = _.filter(this.allReviewerApplets, r => r.applet._id === id).length > 0;
        output.push({ ...m, reviewer: canReview, manager: true });
      });
      _.map(this.allReviewerApplets, (r) => {
        const id = r.applet._id;
        const canManage = _.filter(this.allManagerApplets, m => m.applet._id === id).length > 0;
        if (!canManage) {
          output.push({ ...r, reviewer: true, manager: false });
        }
      });
      return output;
    },
  },
  watch: {
    /**
     * if the authtoken changes, then fetch the applets if the user is logged in
     */
    token() {
      if (this.token) {
        this.getManagerApplets();
      }
    },
  },
  /**
   * if there is a token, then fetch all applets for the user.
   */
  mounted() {
    if (this.token) {
      this.getManagerApplets();
    }
  },
  methods: {
    /**
     * get all of the applets that this user can manage
     */
    getManagerApplets() {
      this.status = 'loading';
      api.getAppletsForUser({
        apiHost: config.apiHost,
        token: this.token,
        user: this.user._id,
        role: 'manager',
      }).then((resp) => {
        this.allManagerApplets = resp.data;
        this.getReviewerApplets();
        // this.status = 'ready';
      }).catch((e) => {
        this.status = 'error';
        this.error.message = e.message;
        this.error.show = true;
      });
    },
    /**
     * get all of the applets this user can review
     */
    getReviewerApplets() {
      this.status = 'loading';
      api.getAppletsForUser({
        apiHost: config.apiHost,
        token: this.token,
        user: this.user._id,
        role: 'reviewer',
      }).then((resp) => {
        this.allReviewerApplets = resp.data;
        this.status = 'ready';
      }).catch((e) => {
        this.status = 'error';
        this.error.message = e.message;
        this.error.show = true;
      });
    },
    /**
     * show the delete applet modal to make sure
     */
    deleteApplet(item) {
      this.toDelete = item;
      this.$refs.deleteModal.show();
    },
    /**
     * TODO: actually delete the applet on the server.
     */
    removeApplet() {
      console.log('removing...', this.toDelete);
      this.toDelete = {};
    },
  },
};
</script>

