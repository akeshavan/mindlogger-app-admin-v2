<template>
  <div>
    <vue-cal style="height: 650px"
    :disable-views="['years', 'year']"
></vue-cal>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  components: { VueCal },
  data() {
    return {

    };
  },
};
</script>
