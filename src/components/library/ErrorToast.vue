<template>
  <div class="mx-auto">
    <b-alert :show="dismissCountDown"
              id="errToast"
             dismissible
             variant="danger"
             @dismissed="reset"
             @dismiss-count-down="countDownChanged">
      {{error.message}}
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
