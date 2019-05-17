<template>
  <div>
    <div v-for="(range, index) in ranges" :key="`${id}__${index}`" class="mt-2">
      <b-row>
        <b-col :cols="11">
          <TimeRanges :id="`tr__${id}__${index}`" :useEnd="useEnd"
           v-on:setStart="(r) => {setStart(r, index)}"
           v-on:setEnd="(r) => {setEnd(r, index)}"
          />
        </b-col>
        <b-col :cols="1">
          <b-button @click="removeRange(index)" variant="outline-danger">Remove</b-button>
        </b-col>
      </b-row>
    </div>
    <div class="mt-2">
    <b-button @click="addRange" variant="outline-success">Add</b-button>
    </div>
  </div>
</template>

<script>
import TimeRanges from './TimeRanges';

export default {
  name: 'timerangegroup',
  components: {
    TimeRanges,
  },
  props: {
    id: {
      type: String,
      default: 'timerange',
    },
    useEnd: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ranges: [{
        start: null,
        end: null,
      }],
    };
  },
  methods: {
    addRange() {
      this.ranges.push({
        start: null,
        end: null,
      });
    },
    removeRange(idx) {
      this.ranges.splice(idx, 1);
    },
    setStart(t, i) {
      this.ranges[i].start = t;
    },
    setEnd(t, i) {
      this.ranges[i].end = t;
    },
  },
};
</script>

