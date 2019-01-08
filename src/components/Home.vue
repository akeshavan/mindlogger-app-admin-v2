<template>
  <div class="home">
    <b-container>
      <div class="row">
        <div class="col-12 text-center">
          <h1 >Mindlogger App Builder</h1>
          <p class="lead">A dashboard to build mindlogger applications and visualize data</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-center" v-if="!isLoggedIn">
          <b-button variant="primary" to="/login">Log In</b-button>
          <b-button variant="success">Sign Up</b-button>
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
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
