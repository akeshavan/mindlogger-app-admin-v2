<template>
  <transition name="fade" mode="out-in">
    <router-view :activitySetId="activitySetId"
    :authToken="authToken"
    :user="user"
    :isLoggedIn="isLoggedIn"
    ></router-view>
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<script>
export default {
  name: 'EditActivitySetParentRoute',
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
  },
  computed: {
    activitySetId() {
      return this.$route.params.activitySetId;
    },
  },
  deactivated() {
    this.$destroy();
  },
};
</script>

