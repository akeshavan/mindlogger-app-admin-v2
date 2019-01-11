<template>
  <div id="chart">
    <svg :id="id" ref="chart">
      <activity-calendar v-for="(act, index) in data"
       :key="act.name"
       :width="width"
       :activity="act"
       :tMin="tMin"
       :tMax="tMax"
       :idx="index"
       :height="axisHeight"
       :padding="padding"
       :color="getColor(index)"
      />
    </svg>
    <resize-observer @notify="handleResize" />
  </div>
</template>

<style scoped>
  svg {
    min-width: 200px;
    /* min-height: 200px; */
    width: 100%;
    /* height: 100%; */
    /* background-color: #f8f9fa; */
  }

  .chart {
    width: 100%;
    /* height: 200px; */
    position: relative;
  }

  .activityAxis {
    width: 100%;
    height: 200px;
  }
</style>


<script>
import Vue from 'vue';
import VueResize from 'vue-resize';
import _ from 'lodash';
import moment from 'moment';
import 'vue-resize/dist/vue-resize.css';
import ActivityCalendar from './ActivityCalendar';

Vue.use(VueResize);

const d3 = require('d3');

export default {
  name: 'AllActivitiesCalendar',
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
    },
  },
  components: {
    ActivityCalendar,
  },
  data() {
    return {
      width: 0,
      height: 0,
      tMin: null,
      tMax: null,
      axisHeight: 50,
      padding: 15,
    };
  },
  created() {
    const { min, max } = this.getDateRange();
    this.tMin = min;
    this.tMax = max;
  },
  computed: {

  },
  methods: {
    handleResize() {
      this.width = this.getWidth();
      this.height = this.getHeight();
    },
    getWidth() {
      return this.$refs.chart.clientWidth;
    },
    setHeight(h) {
      const totalH = h + (2 * this.padding);
      d3.select(this.$refs.chart).style('height', `${totalH}px`);
    },
    getDateRange() {
      const allDateTimes = [];
      _.map(this.data, (d) => {
        _.map(d, (e) => {
          allDateTimes.push(moment(e.created));
        });
      });
      const min = moment.min(allDateTimes);
      const max = moment.max(allDateTimes);
      return { min, max };
    },
    getColor(i) {
      return d3.schemeCategory10[i % 10];
    },
  },
  mounted() {
    this.width = this.getWidth();
    this.height = this.setHeight(this.data.length * this.axisHeight);
    this.getDateRange();
  },
};
</script>

