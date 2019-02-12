<template>
  <div class="mt-3">
    <!-- back to activity set -->
    <span>
      <b-button :to="'/activitySets'" variant="default" size="sm">
        <i class="fas fa-long-arrow-alt-left"></i>
        Back to your Activity Sets
      </b-button>
    </span>

    <b-container>
      <Loading v-if="status==='loading'"/>
      <unauthorized v-else-if="!authorized" />
      <div v-else>

      <!-- Are you sure you want to delete modal? -->
      <b-modal id="delete"
       title="Deleting"
       v-on:ok="removeEditor"
       header-bg-variant="danger"
       header-text-variant="light"
       ok-variant="danger">
        <p class="my-4 lead">
          <strong>Are you sure you want to delete
            <span class="text-danger">{{toDelete.email}}</span>
          ?</strong>
        </p>
      </b-modal>

      <!-- Add a new user modal -->
      <b-modal id="inviteUser" ref="inviteUser" :title="`Invite ${query}`"
       v-on:ok="inviteUser" header-bg-variant="success"
       header-text-variant="light" ok-variant="success">
        <p class="my-4">
          <h4 class="mb-3">Create a new Mindlogger account for
            <strong class="text-primary">{{query}}</strong>
          </h4>
        <b-form-group id="emailAddressInputGroup"
                      label="Email address:"
                      label-for="emailAddress"
                      description="">
          <b-form-input id="emailAddress"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="usernameInputGroup"
                      label="Username:"
                      label-for="usernameInput"
                      description="">
          <b-form-input id="usernameInput"
                        type="text"
                        v-model="form.login"
                        required
                        placeholder="Choose a username">
          </b-form-input>
        </b-form-group>

        <b-form-group id="firstNameInputGroup"
                      label="First Name:"
                      label-for="firstNameInput"
                      description="">
          <b-form-input id="firstNameInput"
                        type="text"
                        v-model="form.firstName"
                        required
                        placeholder="First Name">
          </b-form-input>
        </b-form-group>

        <b-form-group id="lastNameInputGroup"
                      label="Last Name:"
                      label-for="lastNameInput"
                      description="">
          <b-form-input id="lastNameInput"
                        type="text"
                        v-model="form.lastName"
                        required
                        placeholder="Last Name">
          </b-form-input>
        </b-form-group>

        <b-form-group id="passwordInputGroup"
                      label="Password:"
                      label-for="passwordInput">
          <b-form-input id="passwordInput"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Password">
          </b-form-input>
        </b-form-group>

        <b-form-group id="password2InputGroup"
                      label="Confirm Password:"
                      label-for="password2Input">
          <b-alert :show="!validated" variant="danger">
            Make sure your passwords match!
          </b-alert>
          <b-form-input id="password2Input"
                        type="password"
                        v-model="form.password2"
                        required
                        placeholder="Confirm password">
          </b-form-input>
        </b-form-group>
        </p>
      </b-modal>

        <b-row class="mt-3">
          <b-col class="text-center">
            <h2> Role Management: <span class="actName">{{activityData.name}}</span> </h2>
          </b-col>
        </b-row>
      <b-row class="mt-3 text-center">
        <b-col
        :class="{'fancytab activeTab border-primary': currentTab === 0,
        'fancytab': currentTab !== 0}"
         @click="setTab(0)">
          <!-- <img src="@/assets/icons/noun_editor_1307710.svg"
           class="img role-icon mx-auto" alt="Thumbnail" /> -->
           <editor-icon :num="activityData.meta.members.editors.length"/>
          <p class="lead text-primary"><strong>Editors</strong></p>
          <p>Editors can create and edit Activity Sets</p>
        </b-col>
        <b-col
        :class="{'fancytab activeTab border-success': currentTab === 1,
        'fancytab': currentTab !== 1}"
         @click="setTab(1)">
          <!-- <img src="@/assets/icons/noun_team_666360.svg"
           class="img role-icon mx-auto" alt="Thumbnail" /> -->
           <manager-icon :num="activityData.meta.members.managers.length" />
          <p class="lead text-success"><strong>Managers</strong></p>
          <p>Managers can assign users and viewers of an activity set.</p>
        </b-col>
        <b-col
        :class="{'fancytab activeTab border-danger': currentTab === 2,
        'fancytab': currentTab !== 2}"
         @click="setTab(2)">
          <!-- <img src="@/assets/icons/noun_Phone User_159534.svg"
           class="img role-icon mx-auto" alt="Thumbnail" /> -->
           <user-icon :num="activityData.meta.members.users.length"/>
          <p class="lead text-danger"><strong>Users</strong></p>
          <p>Users have access to activity sets on their phones through the mindlogger app.</p>
        </b-col>
        <b-col
        :class="{'fancytab activeTab border-info': currentTab === 3,
        'fancytab': currentTab !== 3}"
         @click="setTab(3)">
          <!-- <img src="@/assets/icons/noun_analyst_1186422.svg"
           class="img role-icon mx-auto" alt="Thumbnail" /> -->
           <viewer-icon :num="numViewers"/>
          <p class="lead text-info"><strong>Viewers</strong></p>
          <p>Viewers can see the data of specific users</p>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-card no-body class="hideBorder">
            <!--


              START TABS


            -->
            <b-tabs nav-class="hideTabHeader" ref="tabs" v-on:input="setTab" v-model="currentTab">
              <b-tab title="editors" active>
                <b-row class="mb-1">
                  <b-col></b-col>
                  <b-col>
                    <b-input-group>
                      <b-input-group-text slot="prepend">
                          <strong class="text-primary"><i class="fas fa-search"></i></strong>
                      </b-input-group-text>
                      <b-form-input></b-form-input>
                    </b-input-group>
                  </b-col>

                </b-row>

                <b-table responsive striped hover :items="editorTable" :fields="tableFields">
                  <template slot="action" slot-scope="data">
                    <!-- <b-button variant="info" size="sm"
                    :to="'/edit_activity_set/' + activityId + '/edit_activity/' + data.item.id">
                      edit
                    </b-button> -->
                    <b-button size="sm"
                     class="close" aria-label="Close"
                     v-if="editorTable.length > 1 && !(data.item._id == user._id)">
                      <!-- <i class="fas fa-trash"></i> -->
                      <span aria-hidden="true" v-b-modal.delete @click="toDelete = data.item">&times; </span>
                    </b-button>
                  </template>
                </b-table>

                <div class="mt-3">
                  <p>Add a new or existing user by providing an email address</p>


                  <!-- AUTOCOMPLETE USER -->
                  <vue-bootstrap-typeahead size="lg"
                    prepend="Email"
                    type='email'
                    v-model="query"
                    :serializer="s => s.email"
                    :data="allUsers"
                  >
                  <template slot="append">
                  <button class="btn btn-primary" @click="addEditor" :disabled="!query">
                  Add
                  </button>
                  </template>
                  </vue-bootstrap-typeahead>

                </div>

              </b-tab>
              <b-tab title="managers" >
                <b-table striped hover :items="managerTable" :fields="tableFields"></b-table>
              </b-tab>
              <b-tab title="users">
                <b-table striped hover :items="userTable" :fields="tableFields"></b-table>
              </b-tab>
              <b-tab title="viewers">
                {{activityData.meta.members.viewers}}
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="jumbotron"></b-col>
      </b-row>
      </div>
    </b-container>
  </div>
</template>

<style scoped>
  .role-icon {
    width: 40%;
  }

  .actName {
    text-emphasis: w;
  }

  .activeTab {
    border-style: solid;
    border-width: thin;
    border-bottom-color: white !important;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-style: none;
  }

  .fancytab {
    cursor: pointer;
    border-bottom-style: solid;
    border-bottom-width: thin;
    border-bottom-color: lightgray;
  }

  .fancytab:hover {
    font-weight: bolder;
    background: #f8f9fa;
  }

  .hideTabHeader {
    visibility: hidden;
  }

  .nav-tabs {
    visibility: hidden;
  }

  .hideBorder {
    border-style: none;
  }
</style>

<script>
import Vue from 'vue';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import _ from 'lodash';
import Loading from './library/Loading';
import Unauthorized from './library/Unauthorized';
import {
  getActivitySet,
  getUserMetadata,
  getAllUsers,
  addExistingUserToActivitySet,
  getActivitySetAccess,
  removeUserFromActivitySet,
  // getAllActivitySets,
  // fullImageURL,
  // getActivitiesInActivitySet,
  // getActivityMetadata,
  // updateActivitySetMetadata,
} from '../api/api';
import ManagerIcon from './viz/icons/Manager';
import EditorIcon from './viz/icons/Editor';
import UserIcon from './viz/icons/User';
import ViewerIcon from './viz/icons/Viewer';

export default {
  name: 'manage',
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
  data() {
    return {
      status: 'loading',
      activityData: {},
      userData: {},
      access: [],
      tableFields: ['firstName', 'lastName', 'email', 'action'],
      toDelete: {},
      query: '',
      currentTab: 0,
      allUsers: [],
      form: {
        email: null,
        username: null,
        password: '',
        password2: '',
        firstName: null,
        lastName: null,
      },
    };
  },
  components: {
    Loading,
    Unauthorized,
    ManagerIcon,
    EditorIcon,
    UserIcon,
    ViewerIcon,
    VueBootstrapTypeahead,
  },
  computed: {
    activityId() {
      return this.$route.params.activitySetId;
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
    numViewers() {
      return Object.keys(this.activityData.meta.members.viewers).length;
    },
    editorTable() {
      if (this.activityData) {
        return _.map(this.activityData.meta.members.editors, (e) => {
          if (this.userData[e]) {
            const { firstName, lastName, email, _id } = this.userData[e];
            return { firstName, lastName, email, _id };
          }
          return {};
        });
      }
      return [{}];
    },
    managerTable() {
      if (this.activityData) {
        return _.map(this.activityData.meta.members.managers, (e) => {
          if (this.userData[e]) {
            const { firstName, lastName, email, _id } = this.userData[e];
            return { firstName, lastName, email, _id };
          }
          return {};
        });
      }
      return [{}];
    },
    userTable() {
      if (this.activityData) {
        return _.map(this.activityData.meta.members.users, (e) => {
          if (this.userData[e]) {
            const { firstName, lastName, email, _id } = this.userData[e];
            return { firstName, lastName, email, _id };
          }
          return {};
        });
      }
      return [{}];
    },
    validated() {
      return this.form.password === this.form.password2;
    },
  },
  methods: {
    getActivitySet() {
      return getActivitySet(this.activityId, this.authToken.token).then((resp) => {
        this.activityData = resp.data;
        this.status = 'complete';
        // eslint-disable-next-line
        return this.activityData._id;
      })
        .catch((e) => {
          console.log('error in get activity set', e);
        });
    },
    /**
     * For all userId's in this.activityData.meta.members, get their metadata
     * and store it in this.userData[userId]
     */
    getAllUserMetadata() {
      const keys = ['editors', 'managers', 'users'];
      let allUsers = [];
      _.map(keys, (k) => {
        allUsers = allUsers.concat(this.activityData.meta.members[k]);
      });
      // viewers has a different structure.
      const allViewers = Object.keys(this.activityData.meta.members.viewers);
      _.map(allViewers, (v) => {
        allUsers.push(v);
        allUsers = allUsers.concat(this.activityData.meta.members.viewers[v]);
      });
      allUsers = _.uniq(allUsers);
      _.map(allUsers, this.getUserMetadata);
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
    removeEditor() {
      const editors = [...this.activityData.meta.members.editors];
      _.remove(editors,
      // eslint-disable-next-line
        d => d === this.toDelete._id);

      this.activityData.meta.members.editors = editors;
      // tell the server to get rid of this.
      removeUserFromActivitySet({
        token: this.authToken.token,
        parentId: this.activityId,
        name: this.activityData.name,
        metadata: this.activityData.meta,
      });
      // .then((resp) => {
      //   console.log('delete', resp.data);
      // });
    },
    setTab(index) {
      this.currentTab = index;
    },
    getAllUsers() {
      getAllUsers(this.authToken.token).then((resp) => {
        this.allUsers = resp.data;
      });
    },
    addEditor() {
      console.log('you want to add', this.query);
      const matches = _.filter(this.allUsers, f => f.email === this.query);
      let item = null;
      if (matches.length) {
        item = matches[0];
      }
      if (!item) {
        console.log('you want to add a new user, launch the modal!');
        this.form.email = this.query;
        this.$refs.inviteUser.show();
      } else {
        console.log('you want to add', item);
        // eslint-disable-next-line
        this.activityData.meta.members.editors.push(item._id);
        // eslint-disable-next-line
        this.getUserMetadata(item._id);

        addExistingUserToActivitySet({
          token: this.authToken.token,
          parentId: this.activityId,
          name: this.activityData.name,
          metadata: this.activityData.meta,
        }).then((resp) => {
          console.log('response from put', resp);
          this.query = '';
        });
      }
    },
    inviteUser() {
      console.log('you want to invite');
    },
    getActivitySetAccess() {
      getActivitySetAccess({ token: this.authToken.token, activitySetId: this.activityId })
        .then((resp) => {
          this.access = resp.data;
        });
    },
  },
  mounted() {
    this.status = 'loading';
    this.getActivitySet().then(() => {
      this.status = 'complete';
      this.getAllUserMetadata();
      this.getAllUsers();
      // TODO: does the access object even matter?
      // this.getActivitySetAccess();
    });
  },
};
</script>

