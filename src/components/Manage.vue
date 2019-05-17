<template>
  <div class="mt-3">
    <!-- back to applet -->
    <div class="row">
      <b-col cols="3">
      <span>
        <b-button :to="'/allApplets'" variant="default" size="sm">
          <i class="fas fa-long-arrow-alt-left"></i>
          Back to your applets
        </b-button>
      </span>
      </b-col>
      <b-col cols="6"></b-col>
      <b-col cols="3" class="text-right">
        <div v-if="isAViewer">
          <b-button :to="`/review/${appletId}`" variant="default" size="sm">
            View data
            <i class="fas fa-long-arrow-alt-right"></i>
          </b-button>
        </div>
      </b-col>
    </div>

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
        :class="{'fancytab activeTab border-success': currentTab === 0,
        'fancytab': currentTab !== 0}"
         @click="setTab(0)">
          <!-- <img src="@/assets/icons/noun_team_666360.svg"
           class="img role-icon mx-auto" alt="Thumbnail" /> -->
           <manager-icon :num="managerTable.length" />
          <p class="lead text-success"><strong>Managers</strong></p>
          <p>Managers can assign users and viewers of an applet.</p>
        </b-col>
        <b-col
        :class="{'fancytab activeTab border-danger': currentTab === 1,
        'fancytab': currentTab !== 1}"
         @click="setTab(1)">
          <!-- <img src="@/assets/icons/noun_Phone User_159534.svg"
           class="img role-icon mx-auto" alt="Thumbnail" /> -->
           <user-icon :num="userTable.length"/>
          <p class="lead text-danger"><strong>Users</strong></p>
          <p>Users have access to applets on their phones through the mindlogger app.</p>
        </b-col>
        <b-col
        :class="{'fancytab activeTab border-info': currentTab === 2,
        'fancytab': currentTab !== 2}"
         @click="setTab(2)">
          <!-- <img src="@/assets/icons/noun_analyst_1186422.svg"
           class="img role-icon mx-auto" alt="Thumbnail" /> -->
           <viewer-icon :num="viewerTable.length"/>
          <p class="lead text-info"><strong>Reviewers</strong></p>
          <p>Reviewers can see the data of specific users</p>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-card no-body class="hideBorder">
            <!--


              START TABS


            -->
            <b-tabs nav-class="hideTabHeader" ref="tabs" v-on:input="setTab" v-model="currentTab">
              <b-tab title="managers" active>
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
      <!-- make things bigger for the dropdown -->
      <!-- <b-row>
        <b-col class="jumbotron"></b-col>
      </b-row>
      <b-row>
        <b-col class="jumbotron"></b-col>
      </b-row> -->
      </div>


      <div class="mt-3 pt-3 mb-3 pb-3">
        <h2 class="mt-3 mb-3 text-center">Scheduling</h2>
        <div v-for="act in activities" :key="act.name" class="mt-3 mb-3">
          <h4 class="mt-3">{{act.name}}</h4>
          <b-form-checkbox
            v-model="act.unrestricted"
            class="mt-3 mb-3"
          >
            <div>No restrictions</div>
            <small>User can respond anytime,
              and any number of times</small>
          </b-form-checkbox>

          <div>
            <div>Repeat</div>
            <b-form-select v-model="act.repeatUnit"
              :options="act.repeatUnitOptions"
              :disabled="act.unrestricted"
              class="mt-3 mb-3"
              ></b-form-select>

            <div v-if="act.repeatUnit === 'week'">
              <b-form-group  :disabled="act.unrestricted"
              label="on:"
              >
                <b-form-checkbox-group
                  :disabled="act.unrestricted"
                  v-model="act.repeatUnitSubOptions[act.repeatUnit]"
                  :options="repeatUnitSubOptionsCategories[act.repeatUnit]"
                  buttons
                  button-variant="outline-primary"
                  size="sm"
                  name="buttons-2"
                ></b-form-checkbox-group>
              </b-form-group>
            </div>


            <div v-if="act.repeatUnit === 'month'">
              <b-form-group  :disabled="act.unrestricted"
              label="by date:"
              >
                <b-form-checkbox-group
                  :disabled="act.unrestricted"
                  v-model="act.monthFrequencySubOptions.byDate"
                  :options="repeatUnitSubOptionsCategories[act.repeatUnit].byDate"
                  buttons
                  button-variant="outline-primary"
                  size="sm"
                  name="buttons-2"
                ></b-form-checkbox-group>
              </b-form-group>

              <b-form-group  :disabled="act.unrestricted"
              label="and/or on every:"
              >
                <b-form-checkbox-group
                  :disabled="act.unrestricted"
                  v-model="act.monthFrequencySubOptions.byWeek"
                  :options="repeatUnitSubOptionsCategories[act.repeatUnit].byWeek"
                  buttons
                  button-variant="outline-primary"
                  size="sm"
                  name="buttons-2"
                ></b-form-checkbox-group>
              </b-form-group>

              <b-form-group  :disabled="act.unrestricted"
              >
                <b-form-checkbox-group
                  :disabled="act.unrestricted"
                  v-model="act.monthFrequencySubOptions.byDay"
                  :options="repeatUnitSubOptionsCategories[act.repeatUnit].byDay"
                  buttons
                  button-variant="outline-primary"
                  size="sm"
                  name="buttons-2"
                ></b-form-checkbox-group>
              </b-form-group>

            </div>


              <b-row>
                <b-col>
              <b-form-group label="Duration" class="mt-3 mb-3">
                <b-form-radio-group
                  :disabled="act.unrestricted"
                  v-model="act.startTime.duration"
                  :options="act.startTime.durationOptions"
                ></b-form-radio-group>
              </b-form-group>

                </b-col>
                <b-col>
              <div class="mt-3 mb-3">
                <div>Number of responses over duration</div>
                <b-form-input :disabled="act.unrestricted"
                  v-model="act.startTime.numResponses" type="number" ></b-form-input>
              </div>
                </b-col>
              </b-row>


              <!-- if time range -->
              <b-row v-if="act.startTime.duration === 'timeRange'" class="mt-3 mb-3">
                show time range options here.
              </b-row>

              <!-- if time range -->
              <b-row v-if="act.startTime.duration === 'allDay'" class="mt-3 mb-3">
                notifications
              </b-row>

          </div>
          <hr>
        </div>
        <AnotherCal />
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
/* eslint-disable */
import _ from 'lodash';
// import 'tui-calendar/dist/tui-calendar.css';
// import { Calendar } from '@toast-ui/vue-calendar';
/* eslint-enable */
import Loading from './library/Loading';
import Unauthorized from './library/Unauthorized';
import ManagerIcon from './viz/icons/Manager';
import EditorIcon from './viz/icons/Editor';
import UserIcon from './viz/icons/User';
import ViewerIcon from './viz/icons/Viewer';
import ManagementEditor from './library/ManagementEditor';

import AnotherCal from './AnotherCal';

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
      repeatUnitSubOptionsCategories: {
        week: [
          {
            text: 'M',
            value: 'Monday',
          },
          {
            text: 'Tu',
            value: 'Tuesday',
          },
          {
            text: 'W',
            value: 'Wednesday',
          },
          {
            text: 'Th',
            value: 'Thursday',
          },
          {
            text: 'F',
            value: 'Friday',
          },
          {
            text: 'Sa',
            value: 'Saturday',
          },
          {
            text: 'Su',
            value: 'Sunday',
          },
        ],
        month: {
          byDate: _.map(_.range(28), i => ({ text: i + 1, value: i + 1 })),
          byWeek: [
            {
              text: '1st',
              value: 1,
            },
            {
              text: '2nd',
              value: 2,
            },
            {
              text: '3rd',
              value: 3,
            },
            {
              text: '4th',
              value: 4,
            },
          ],
          byDay: [
            {
              text: 'M',
              value: 'Monday',
            },
            {
              text: 'Tu',
              value: 'Tuesday',
            },
            {
              text: 'W',
              value: 'Wednesday',
            },
            {
              text: 'Th',
              value: 'Thursday',
            },
            {
              text: 'F',
              value: 'Friday',
            },
            {
              text: 'Sa',
              value: 'Saturday',
            },
            {
              text: 'Su',
              value: 'Sunday',
            },
          ],
        },
      },
      activities: [
        {
          name: 'EMA: Morning',
          unrestricted: true,
          repeatUnit: 'day',
          repeatUnitOptions: ['day', 'week', 'month'],
          repeatUnitSubOptions: {
            week: [],
            month: [],
          },
          monthFrequencySubOptions: {
            byDate: [],
            byWeek: [],
            byDay: [],
          },
          startTime: {
            exact: false,
            random: false,
            allDay: false,
            duration: 'allDay',
            durationOptions: [
              { text: 'All Day', value: 'allDay' },
              { text: 'Time Range', value: 'timeRange' },
            ],
            numResponses: 1,
            range: {
              start: new Date(),
              end: new Date(),
            },
            durationHours: 3,
          },
        },
        {
          name: 'EMA: Evening',
          unrestricted: true,
          repeatUnit: 'week',
          repeatUnitOptions: ['day', 'week', 'month'],
          repeatUnitSubOptions: {
            week: [],
            month: [],
          },
          monthFrequencySubOptions: {
            useDate: false,
            byDate: [],
            byWeek: [1],
            byDay: ['Monday', 'Wednesday', 'Friday'],
          },
          startTime: {
            exact: false,
            random: false,
            allDay: true,
            duration: 'allDay',
            durationOptions: [
              { text: 'All Day', value: 'allDay' },
              { text: 'Time Range', value: 'timeRange' },
            ],
            numResponses: 1,
            range: {
              start: new Date(),
              end: new Date(),
            },
            durationHours: 1.5,
          },
        },
      ],
      userData: {},
      access: [],
      tableFields: ['firstName', 'lastName', 'email', 'action'],
      viewerTableFields: ['select', 'firstName', 'lastName', 'email', 'numUsers', 'show_users', 'action'],
      currentTab: 0,
      allUsers: [
        {
          firstName: 'fake',
          lastName: 'manager',
          email: 'fakemanager@gmail.com',
        },
        {
          firstName: 'fake2',
          lastName: 'manager2',
          email: 'fakemanager2@gmail.com',
        },
        {
          firstName: 'fake',
          lastName: 'user',
          email: 'fakeuser@gmail.com',
        },
        {
          firstName: 'fake',
          lastName: 'reviewer',
          email: 'fakereviewer@gmail.com',
        },
      ],
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
    AnotherCal,
  },
  computed: {
    appletId() {
      return this.$route.params.appletId;
    },
    authorized() {
      return true;
    },
    isAViewer() {
      return true;
    },
    isAnEditor() {
      return false;
    },
    numViewers() {
      return this.viewerTable.length;
    },
    editorTable() {
      return [];
    },
    managerTable() {
      return [{
        firstName: 'fake',
        lastName: 'manager',
        email: 'fakemanager@gmail.com',
      },
      {
        firstName: 'fake2',
        lastName: 'manager2',
        email: 'fakemanager2@gmail.com',
      }];
    },
    userTable() {
      return [{
        firstName: 'fake',
        lastName: 'user',
        email: 'fakeuser@gmail.com',
      }];
    },
    validUsersToView() {
      return this.userTable;
    },
    viewerTable() {
      return [{
        firstName: 'fake',
        lastName: 'reviewer',
        email: 'fakereviewer@gmail.com',
        users: this.userTable,
      }];
    },
    validated() {
      return this.form.password === this.form.password2;
    },
  },
  methods: {
    getAppletRoles() {
      this.status = 'complete';
    },
    /**
     * For all userId's in this.activityData.meta.members, get their metadata
     * and store it in this.userData[userId]
     */
    getAllUserMetadata() {

    },
    getUserMetadata() {
      // console.log('getting usermetedata', userId);
    },
    isEditor() {
      // eslint-disable-next-line
      const userId = this.user._id;
      return true;
    },
    isManager() {
      // eslint-disable-next-line
      const userId = this.user._id;
      return true;
    },
    isViewer() {
      // eslint-disable-next-line
      const userId = this.user._id;
      return true;
    },
    removeUser() {

    },
    removeViewer() {
    },
    setTab() {
    },
    getAllUsers() {

    },
    addUser() {

    },
    addViewer() {

    },
    inviteUser() {
    },
    getAppletAccess() {

    },
    addUserToViewer() {

    },
    removeUserFromViewer() {

    },
  },
  mounted() {
    this.status = 'loading';
    this.getAppletRoles();
  },
};
</script>

