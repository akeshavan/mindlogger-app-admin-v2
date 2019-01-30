<template>
  <router-view :activitySetId="activitySetId"
   :authToken="authToken"
   :user="user"
   :isLoggedIn="isLoggedIn"
   ></router-view>
</template>

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
};
</script>

