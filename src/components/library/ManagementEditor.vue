<template>
  <div>

    <!-- Are you sure you want to delete modal? -->
    <b-modal :id="`delete_${role}`"
      title="Deleting"
      v-on:ok="removeUser"
      header-bg-variant="danger"
      header-text-variant="light"
      ok-variant="danger">
      <p class="my-4 lead">
        <strong>Are you sure you want to delete
          <span class="text-danger">{{toDelete.email}}</span>
        from <b>{{role}}</b> ?</strong>
      </p>
    </b-modal>

    <!-- Warning, trying to add a user that doesn't exist -->
    <b-modal :id="`warning_${role}`"
      ref="warning"
      title="Oops"
      v-on:ok="removeUser"
      header-bg-variant="warning"
      header-text-variant="dark"
      :ok-only="true"
      ok-variant="warning">
      <p class="my-4 lead">
        <strong>
          <span class="text-danger">{{query}}</span>
        has not been added as a <span class="text-danger"><b>user</b></span> yet!
        Please add them as a user before adding them to a <span class="text-info"><b>viewer</b></span>.</strong>
      </p>
    </b-modal>

    <!-- Are you sure you want to delete a user from a viewer modal? -->
    <b-modal :id="`delete_user_${role}`"
      title="Deleting"
      v-on:ok="removeUserFromViewer"
      header-bg-variant="danger"
      header-text-variant="light"
      ok-variant="danger">
      <p v-if="toDeleteUser[1]" class="my-4 lead">
        <strong>Are you sure you want to delete user
          <span class="text-danger" >{{toDeleteUser[1].email}}</span>
        from viewer <b v-if="toDeleteUser[0] != null">
          {{editorTable[toDeleteUser[0]].email}}</b> ?</strong>
      </p>
    </b-modal>

    <!-- Add a new user modal -->
    <b-modal :id="`inviteUser_${role}`" ref="inviteUser" :title="`Invite ${query}`"
      v-on:ok="inviteUser"
      :header-bg-variant="variant"
      header-text-variant="light"
      :ok-variant="variant">
      <p class="my-4">
        <h4 class="mb-3">Create a new Mindlogger account for
          <strong :class="`text-${variant}`">{{query}}</strong>
        </h4>
      <b-form-group :id="`emailAddressInputGroup_${role}`"
                    label="Email address:"
                    :label-for="`emailAddress_${role}`"
                    description="">
        <b-form-input :id="`emailAddress_${role}`"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group :id="`usernameInputGroup_${role}`"
                    label="Username:"
                    :label-for="`usernameInput_${role}`"
                    description="">
        <b-form-input :id="`usernameInput_${role}`"
                      type="text"
                      v-model="form.login"
                      required
                      placeholder="Choose a username">
        </b-form-input>
      </b-form-group>

      <b-form-group :id="`firstNameInputGroup_${role}`"
                    label="First Name:"
                    :label-for="`firstNameInput_${role}`"
                    description="">
        <b-form-input :id="`firstNameInput_${role}`"
                      type="text"
                      v-model="form.firstName"
                      required
                      placeholder="First Name">
        </b-form-input>
      </b-form-group>

      <b-form-group :id="`lastNameInputGroup_${role}`"
                    label="Last Name:"
                    :label-for="`lastNameInput_${role}`"
                    description="">
        <b-form-input :id="`lastNameInput_${role}`"
                      type="text"
                      v-model="form.lastName"
                      required
                      placeholder="Last Name">
        </b-form-input>
      </b-form-group>

      <b-form-group :id="`passwordInputGroup_${role}`"
                    label="Password:"
                    :label-for="`passwordInput_${role}`">
        <b-form-input :id="`passwordInput_${role}`"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Password">
        </b-form-input>
      </b-form-group>

      <b-form-group :id="`password2InputGroup_${role}`"
                    label="Confirm Password:"
                    :label-for="`password2Input_${role}`">
        <b-alert :show="!validated" variant="danger">
          Make sure your passwords match!
        </b-alert>
        <b-form-input :id="`password2Input_${role}`"
                      type="password"
                      v-model="form.password2"
                      required
                      placeholder="Confirm password">
        </b-form-input>
      </b-form-group>
    </b-modal>

    <!-- search bar -->
    <b-row class="mb-1">
      <b-col></b-col>
      <b-col>
        <b-input-group>
          <b-input-group-text slot="prepend">
              <strong :class="`text-${variant}`"><i class="fas fa-search"></i></strong>
          </b-input-group-text>
          <b-form-input v-model="search"></b-form-input>
        </b-input-group>
      </b-col>

    </b-row>

    <!--
      user table
    -->
    <b-table responsive striped hover :items="filteredTable" :fields="tableFields">
      <template slot="action" slot-scope="data">
        <b-button size="sm"
          class="close" aria-label="Close"
          v-if="canRemove[data.index]">
          <!-- <i class="fas fa-trash"></i> -->
          <span aria-hidden="true" v-b-modal="`delete_${role}`" @click="toDelete = data.item">
            &times;
          </span>
        </b-button>
      </template>
      <template v-if="type==='enhanced'" slot="select" slot-scope="data">
        <b-form-checkbox :id="`checkbox_${data.item._id}`"
                        v-model="selected[data.item._id]"
                        :value="true"
                        :unchecked-value="false">
        </b-form-checkbox>
      </template>

    <template slot="show_users" slot-scope="row">
      <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
      <b-button size="sm" variant="outline-danger"
       @click.stop="row.toggleDetails" class="mr-2">
       {{ row.detailsShowing ? 'Hide' : 'Show'}} Users
      </b-button>
    </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Users:</b></b-col>
            <b-col>
              <div v-if="row.item.users.length">
                <!-- {{row}} -->
                <b-table responsive hover small :items="row.item.users" :fields="subFields">
                  <template slot="action" slot-scope="data">
                    <b-button size="sm"
                      class="close" aria-label="Close"
                    >
                      <span aria-hidden="true"
                       v-b-modal="`delete_user_${role}`"
                       @click="toDeleteUser = [row.index,data.item]">
                        &times;
                      </span>
                    </b-button>
                  </template>
                </b-table>
              </div>
            </b-col>
          </b-row>
          <b-button size="sm" variant="outline-danger"
           @click="row.toggleDetails">Hide Users</b-button>
        </b-card>
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
        :data="validUsersToView"
        v-if="selectedViewers"
      >
      <template slot="append">
        <button :class="`btn btn-${variant}`" @click="addUserToViewer"
         :disabled="!query" >
          Add User to Viewers
        </button>
      </template>
      </vue-bootstrap-typeahead>

      <!-- AUTOCOMPLETE USER -->
      <vue-bootstrap-typeahead size="lg"
        prepend="Email"
        type='email'
        v-model="query"
        :serializer="s => s.email"
        :data="allUsers"
        v-else
      >
      <template slot="append">
        <button :class="`btn btn-${variant}`" @click="addUser" :disabled="!query">
          Add
        </button>
      </template>
      </vue-bootstrap-typeahead>

    </div>
  </div>
</template>

<style></style>

<script>
import _ from 'lodash';
import Vue from 'vue';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';

export default {
  name: 'ManagementTable',
  props: {
    user: {
      type: Object,
    },
    editorTable: {
      type: Array,
    },
    tableFields: {
      type: Array,
    },
    role: {
      type: String,
    },
    form: {
      type: Object,
    },
    allUsers: {
      type: Array,
    },
    validUsersToView: {
      type: Array,
    },
    canRemoveYourself: {
      type: Boolean,
      default: false,
    },
    canBeEmpty: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'primary',
    },
    type: {
      type: String,
      default: 'regular',
    },
    subFields: {
      type: Array,
    },
  },
  data() {
    return {
      query: '',
      search: '',
      toDelete: {},
      toDeleteUser: [],
      selected: {},
    };
  },
  components: {
    VueBootstrapTypeahead,
  },
  computed: {
    validated() {
      return this.form.password === this.form.password2;
    },
    selectedViewers() {
      const keys = Object.keys(this.selected);
      const anySelected = _.filter(keys, k => this.selected[k]).length;
      return anySelected;
    },
    filteredTable() {
      if (!this.search) {
        return this.editorTable;
      }
      return _.filter(this.editorTable, (e) => {
        // search by first name, last name and email.
        const inFirst = e.firstName.indexOf(this.search) > -1;
        const inLast = e.lastName.indexOf(this.search) > -1;
        const inEmail = e.email.indexOf(this.search) > -1;
        return inFirst || inLast || inEmail;
      });
    },
    canRemove() {
      if (this.editorTable.length === 1) {
        // there is only 1 item left. Can you delete it?
        if (!this.canBeEmpty) {
          return [false];
        }
        return [true];
      }
      // there is more than 1 item. Loop through and check for yourself.
      // if you can remove yourself, awesome
      // if not, don't let them!
      return _.map(this.editorTable, (t) => {
        let decision = true;
        if (!this.canRemoveYourself) {
          // eslint-disable-next-line
          if (t._id === this.user._id) {
            decision = false;
          }
        }

        return decision;
      });
    },
  },
  methods: {
    removeUser() {
      this.$emit('removeUser', this.role, this.toDelete);
    },
    delete(item) {
      console.log('delete');
      this.toDelete = item;
      this.$refs.delete.show();
    },
    inviteUser() {
      this.$emit('inviteUser', this.role, this.form);
    },
    addUser() {
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
        let currentEditors = _.map(this.editorTable, t => t._id);
        // eslint-disable-next-line
        currentEditors.push(item._id);
        currentEditors = _.uniq(currentEditors);
        console.log('current editors', currentEditors);
        // eslint-disable-next-line
        this.$emit('addUser', this.role, { newList: currentEditors, id:item._id });
        this.query = '';
      }
    },
    addUserToViewer() {
      const matches = _.filter(this.allUsers, f => f.email === this.query);
      let item = null;
      if (matches.length) {
        item = matches[0];
      }
      if (!item) {
        this.$refs.warning.show();
        return;
      }

      console.log('you want to add', item, 'to', this.selected);
      const selectedList = _.filter(Object.keys(this.selected), s => this.selected[s]);

      this.$emit('addUsertoViewer', { user: item, selected: selectedList });
    },
    removeUserFromViewer() {
      console.log('you want to delete', this.toDeleteUser);
      // eslint-disable-next-line
      this.$emit('removeUserFromViewer', { viewer: this.editorTable[this.toDeleteUser[0]]._id,
      // eslint-disable-next-line
        user: this.toDeleteUser[1]._id });
    },
  },
  mounted() {
    if (this.type === 'enhanced') {
      _.map(this.editorTable, (t) => {
        console.log(t);
        // eslint-disable-next-line
        Vue.set(this.selected, t._id, false);
      });
    }
  },
};
</script>

