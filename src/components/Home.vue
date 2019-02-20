<template>
  <div class="mt-3 home">
    <b-container>
      <div class="row">
        <div class="col-12 text-center jumbotron mb-0 pb-0">
          <h1 >Mindlogger Admin Dashboard v2</h1>
          <p class="lead">A dashboard to build mindlogger applications and visualize data</p>
        </div>
      </div>

      <b-row class="mt-3 pt-3">
        <b-col class="text-center">
          <img class="mx-auto w-100"
           src="../assets/undraw/undraw_prototyping_process_rswj.svg"/>
        </b-col>
        <b-col class="text-center">
          <img class="mx-auto w-100"
           src="../assets/undraw/undraw_data_trends_b0wg.svg"/>
        </b-col>
        <b-col class="text-center">
          <img class="mx-auto w-100"
           src="../assets/undraw/undraw_experts3_3njd.svg"/>
        </b-col>
      </b-row>
      <b-row class="mt-2 mb-3 pb-3">
        <b-col class="text-center">
          <p>
            Build Mindlogger EMAs
          </p>
        </b-col>
        <b-col class="text-center">
          <p>
            Visualize, interact with, and download data
          </p>
        </b-col>
        <b-col class="text-center">
          <p>
            Manage study roles
          </p>
        </b-col>
      </b-row>
      <div class="row mt-3">
        <div class="col-12 text-center" v-if="!isLoggedIn">
          <b-button variant="primary" to="/login">Log In</b-button>
          <b-button variant="success" to="/signup">Sign Up</b-button>
        </div>
        <div v-else class="col-12 text-center">
          <h3>Welcome, {{user.firstName}} !</h3>
           <b-button variant="danger" size="lg" to="/activitySets">Manage Applets</b-button>
        </div>
        <b-col class="mt-3 text-center">
          <div v-if="isLoggedIn">
            <p>Check out our User Guide:</p>
            <b-button to="/guide" size="lg" variant="primary">User Guide</b-button>
          </div>
        </b-col>
      </div>

      <div class="row">
        <div class="col-12 text-center jumbotron mb-3 pb-3">
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
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
      msg: 'Welcome to Your Vue.js App',
    };
  },
  mounted() {

  },
};
</script>

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
</style>
