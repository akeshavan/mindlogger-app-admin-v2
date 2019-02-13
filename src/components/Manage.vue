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
                <management-editor
                 :editorTable="editorTable"
                 :tableFields="tableFields"
                 :user="user"
                 role="editors"
                 variant="primary"
                 type="regular"
                 :canRemoveYourself="false"
                 :canBeEmpty="false"
                 :form="form"
                 :allUsers="allUsers"
                 v-on:removeUser="removeUser"
                 v-on:inviteUser="inviteUser"
                 v-on:addUser="addUser"
                 />

              </b-tab>
              <b-tab title="managers" >
                <management-editor
                 :editorTable="managerTable"
                 :tableFields="tableFields"
                 :user="user"
                 variant="success"
                 role="managers"
                 type="regular"
                 :canRemoveYourself="false"
                 :canBeEmpty="false"
                 :form="form"
                 :allUsers="allUsers"
                 v-on:removeUser="removeUser"
                 v-on:inviteUser="inviteUser"
                 v-on:addUser="addUser"
                 />
              </b-tab>
              <b-tab title="users">
                <management-editor
                 :editorTable="userTable"
                 :tableFields="tableFields"
                 :canRemoveYourself="true"
                 :canBeEmpty="true"
                 variant="danger"
                 :user="user"
                 role="users"
                 type="regular"
                 :form="form"
                 :allUsers="allUsers"
                 v-on:removeUser="removeUser"
                 v-on:inviteUser="inviteUser"
                 v-on:addUser="addUser"
                 />
              </b-tab>
              <b-tab title="viewers">
                <management-editor
                 :editorTable="viewerTable"
                 :tableFields="viewerTableFields"
                 :subFields="tableFields"
                 :canRemoveYourself="true"
                 :canBeEmpty="true"
                 variant="info"
                 :user="user"
                 role="viewers"
                 type="enhanced"
                 :form="form"
                 :allUsers="allUsers"
                 :validUsersToView="validUsersToView"
                 v-on:removeUser="removeViewer"
                 v-on:inviteUser="inviteUser"
                 v-on:addUser="addViewer"
                 v-on:addUsertoViewer="addUserToViewer"
                 v-on:removeUserFromViewer="removeUserFromViewer"
                 />
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="jumbotron"></b-col>
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
import ManagementEditor from './library/ManagementEditor';

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
      viewerTableFields: ['select', 'firstName', 'lastName', 'email', 'numUsers', 'show_users', 'action'],
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
    ManagementEditor,
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
    validUsersToView() {
      return _.filter(this.allUsers, u => this.activityData.meta.members.users.indexOf(u._id) > -1);
    },
    viewerTable() {
      if (this.activityData) {
        return _.map(Object.keys(this.activityData.meta.members.viewers), (e) => {
          if (this.userData[e]) {
            const { firstName, lastName, email, _id } = this.userData[e];
            // eslint-disable-next-line
            const numUsers = this.activityData.meta.members.viewers[_id].length;
            return {
              firstName,
              lastName,
              email,
              numUsers,
              _id,
              _rowVariant: numUsers ? '' : 'warning',
              // eslint-disable-next-line
              users: _.map(this.activityData.meta.members.viewers[_id], i => this.userData[i]),
              _showDetails: false };
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
    removeUser(role, data) {
      const editors = [...this.activityData.meta.members[role]];

      _.remove(editors,
      // eslint-disable-next-line
        d => d === data._id);

      this.activityData.meta.members[role] = editors;
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
    removeViewer(role, data) {
      console.log('you want to remove viewer', data);
      this.activityData.meta.members[role] = _.pick(this.activityData.meta.members[role],
        // eslint-disable-next-line
        _.filter(Object.keys(this.activityData.meta.members[role]), k => k !== data._id));
      // Why doesn't the below line work?
      // Vue.delete(this.activityData.meta.members[role], data.id);
      removeUserFromActivitySet({
        token: this.authToken.token,
        parentId: this.activityId,
        name: this.activityData.name,
        metadata: this.activityData.meta,
      });
    },
    setTab(index) {
      this.currentTab = index;
    },
    getAllUsers() {
      getAllUsers(this.authToken.token).then((resp) => {
        this.allUsers = resp.data;
      });
    },
    addUser(role, data) {
      this.activityData.meta.members[role] = data.newList;
      // eslint-disable-next-line
      this.getUserMetadata(data.id);

      addExistingUserToActivitySet({
        token: this.authToken.token,
        parentId: this.activityId,
        name: this.activityData.name,
        metadata: this.activityData.meta,
      }).then((resp) => {
        console.log('response from put', resp);
      });
    },
    addViewer(role, data) {
      Vue.set(this.activityData.meta.members[role], data.id, []);
      this.getUserMetadata(data.id);

      addExistingUserToActivitySet({
        token: this.authToken.token,
        parentId: this.activityId,
        name: this.activityData.name,
        metadata: this.activityData.meta,
      }).then((resp) => {
        console.log('response from put', resp);
      });
    },
    inviteUser(role, data) {
      console.log('you want to invite', role, data);
    },
    getActivitySetAccess() {
      getActivitySetAccess({ token: this.authToken.token, activitySetId: this.activityId })
        .then((resp) => {
          this.access = resp.data;
        });
    },
    addUserToViewer({ user, selected }) {
      console.log('adding', user, 'to', selected);
      _.map(selected, (s) => {
        const existingUsers = this.activityData.meta.members.viewers[s];
        // eslint-disable-next-line
        existingUsers.push(user._id);
        this.activityData.meta.members.viewers[s] = _.uniq(existingUsers);
      });
      addExistingUserToActivitySet({
        token: this.authToken.token,
        parentId: this.activityId,
        name: this.activityData.name,
        metadata: this.activityData.meta,
      }).then((resp) => {
        console.log('response from put', resp);
      });
    },
    removeUserFromViewer({ user, viewer }) {
      let existingUsers = this.activityData.meta.members.viewers[viewer];
      existingUsers = _.uniq(_.filter(existingUsers, u => u !== user));
      this.activityData.meta.members.viewers[viewer] = existingUsers;
      removeUserFromActivitySet({
        token: this.authToken.token,
        parentId: this.activityId,
        name: this.activityData.name,
        metadata: this.activityData.meta,
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

