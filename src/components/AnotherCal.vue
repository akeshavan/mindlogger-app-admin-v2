<template>
  <div>
    <vue-cal style="height: 650px"
    :disable-views="['years', 'year']"
    :events="events"
    >
    <div slot="event-renderer" slot-scope="{ event, view }">
      <div class="vuecal__event-title" v-html="event.name" />
      <p>
        <small>{{event.startTime}} - {{event.endTime}}</small>
      </p>
    </div>

    </vue-cal>
  </div>
</template>

<style>
  .vuecal__event-title {
    font-size: 0.8em !important;
    font-weight: bolder;
  }
  .vuecal__event {background-color: rgba(173, 216, 230, 0.5);}

  .vuecal__cell-events-count {
    background-color: crimson;
  }
</style>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  components: { VueCal },
  props: {
    events: {
      type: Array,
    },
  },
  data() {
    return {

    };
  },
};
</script>
