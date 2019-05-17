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

