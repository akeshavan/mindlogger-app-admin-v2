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

    <!-- Add a new user modal -->
    <b-modal :id="`inviteUser_${role}`" ref="inviteUser" :title="`Invite ${query}`"
      v-on:ok="inviteUser" header-bg-variant="success"
      header-text-variant="light" ok-variant="success">
      <p class="my-4">
        <h4 class="mb-3">Create a new Mindlogger account for
          <strong class="text-primary">{{query}}</strong>
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
          <b-form-input></b-form-input>
        </b-input-group>
      </b-col>

    </b-row>

    <!--
      user table
    -->
    <b-table responsive striped hover :items="editorTable" :fields="tableFields">
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
  },
  data() {
    return {
      query: '',
      search: '',
      toDelete: {},
    };
  },
  components: {
    VueBootstrapTypeahead,
  },
  computed: {
    validated() {
      return this.form.password === this.form.password2;
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
      console.log('delete')
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
        // eslint-disable-next-line
        this.$emit('addUser', this.role, { newList: currentEditors, id:item._id });
        this.query = '';
      }
    },
  },
};
</script>

