<template>
  <div>
    <b-row>
      <b-col>
        <VueCtkDateTimePicker v-model="startTime"
        :onlyTime="true" :noLabel="true" :minuteInterval="10" :id="id"
        label="start time" format="hh:mm a" formatted="hh:mm a" />
      </b-col>
      <b-col v-if="useEnd">
        <VueCtkDateTimePicker v-model="endTime"
        :onlyTime="true" :noLabel="true" :minuteInterval="10" :id="id"
        label="end time" format="hh:mm a" formatted="hh:mm a" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from 'vue';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

export default {
  name: 'timeRanger',
  props: {
    id: {
      type: String,
      default: 'timePicker',
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    useEnd: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    startTime() {
      this.$emit('setStart', this.startTime);
    },
    endTime() {
      this.$emit('setEnd', this.endTime);
    },
  },
  data() {
    return {
      startTime: null,
      endTime: null,
    };
  },
  mounted() {
    this.startTime = this.start;
    this.endTime = this.end;
  },
};
</script>

