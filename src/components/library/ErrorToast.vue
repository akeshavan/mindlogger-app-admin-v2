<template>
  <div class="mx-auto">
    <b-alert :show="dismissCountDown"
              id="errToast"
              class="w-100 text-center"
             dismissible
             variant="danger"
             @dismissed="reset"
             @dismiss-count-down="countDownChanged">
      <p>Uh oh. There was an error:</p>
      <p>"{{error.message}}"</p>
      <p>Your changes probably aren't being saved!</p>
    </b-alert>
    <!-- <b-btn @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-btn> -->
  </div>
</template>

<style>
  #errToast {
    position: fixed;
    top: 0;
    z-index:999;
  }
</style>


<script>
export default {
  props: {
    error: {
      type: Object,
    },
  },
  data() {
    return {
      dismissSecs: 50,
      dismissCountDown: 0,
    };
  },
  methods: {
    reset() {
      this.dismissCountDown = 0;
      this.$emit('resetError');
    },
    countDownChanged(dismissCountDown) {
      if (!dismissCountDown) {
        this.$emit('resetError');
      }
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
  mounted() {
    this.showAlert();
  },
};
</script>
