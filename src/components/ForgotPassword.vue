<template>
    <div id="forgot" class="text-center jumbotron mb-0">
    <h1> Reset Password </h1>

    <div id="forgotForm" class="container fluid">
      <b-alert :show="errors.show" variant="danger">{{errors.message}}</b-alert>
      <b-form @submit="onSubmit">
        <b-form-group id="usernameInputGroup"
                      label="Email address:"
                      label-for="email"
                      >
          <b-form-input id="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email">
          </b-form-input>
        </b-form-group>


        <b-button type="submit" variant="primary">Submit</b-button>

      </b-form>
    </div>

  </div>
</template>

<style>
  #forgot {
    min-height: 100vh;
  }

  #forgotForm {
    max-width: 400px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0px 0 7px 0px #80808036;
  }
</style>


<script>
import { forgotPassword } from '../api/api';

export default {
  name: 'forgot',
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      errors: {
        message: null,
        show: false,
        code: null,
      },
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      forgotPassword({ email: this.form.email }).then((resp) => {
        console.log('response from forgot', resp);
      }).catch((err) => {
        this.errors.code = err.response;
        if (this.errors.code.status === 401) {
          this.errors.message = 'We have no record of your email. Please create a new account!';
        } else {
          this.errors.message = err.message;
        }
        this.errors.show = true;
      });
    },
  },
};
</script>

