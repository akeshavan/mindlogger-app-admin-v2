<template>
  <b-container>
    <b-alert show variant="danger">{{error.message}}</b-alert>
  </b-container>
</template>
<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: Object,
    },
  },
};
</script>

