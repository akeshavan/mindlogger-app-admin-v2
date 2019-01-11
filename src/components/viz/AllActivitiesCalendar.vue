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
       :title="act[0].meta.activity.name"
       :height="axisHeight"
       :padding="padding"
       :color="getColor(index)"
      />

      <activity-calendar
       key="scrubber"
       ref="scrub"
       :activity="dataFlat"
       :width="width"
       :tMin="sMin"
       :tMax="sMax"
       :idx="data.length"
       :height="axisHeight"
       :padding="padding"
       role="scrub"
       color="white"
       title="Zoom / Pan"
       v-on:setRange="setNewRange"
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
    /**
     * if this is the boss calendar,
     * it calculates its total date range and shares it to the parent.
     * If its not the boss, then it needs a date range as a prop.
     */
    isBoss: {
      type: Boolean,
      default: false,
    },
    /**
     * override the data's date range for the scrubber.
     */
    dateRange: {
      type: Array,
    },
    /**
     * filter date range for the non-scrubber components.
     */
    filterDateRange: {
      type: Array,
    },
    /**
     * optional color array
     */
    colorArr: {
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
      sMin: null,
      sMax: null,
      axisHeight: 50,
      padding: 15,
    };
  },
  created() {
    if (!this.isBoss && this.dateRange) {
      this.tMin = this.dateRange[0];
      this.sMin = this.dateRange[0];
      this.tMax = this.dateRange[1];
      this.sMax = this.dateRange[1];
    } else {
      const { min, max } = this.getDateRange();
      this.tMin = min;
      this.sMin = min;
      this.tMax = max;
      this.sMax = max;
      if (this.isBoss) {
        this.$emit('setGlobalDateRange', [min, max]);
      }
    }
  },
  watch: {
    dateRange() {
      if (!this.isBoss && this.dateRange) {
        this.tMin = this.dateRange[0];
        this.sMin = this.dateRange[0];
        this.tMax = this.dateRange[1];
        this.sMax = this.dateRange[1];
      }
    },
    filterDateRange() {
      this.tMin = this.filterDateRange[0];
      this.tMax = this.filterDateRange[1];
      this.$refs.scrub.redrawScrub(this.tMin, this.tMax);
      this.$forceUpdate();
    },
  },
  computed: {
    /**
     * for the time scrubber, flatten all the data as a reference.
     */
    dataFlat() {
      // eslint-disable-next-line
      const dataFlat = _.map([].concat.apply([], this.data), _.clone);
      return dataFlat;
    },
  },
  methods: {
    handleResize() {
      this.width = this.getWidth();
      // this.height = this.getHeight();
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
      const colorArr = this.colorArr || d3.schemeCategory10;
      return colorArr[i % colorArr.length];
    },
    setNewRange(newRange) {
      const mRange = _.map(newRange, l => moment(l.toISOString()));
      const min = moment.min(mRange);
      const max = moment.max(mRange);
      this.tMin = min;
      this.tMax = max;
      this.$forceUpdate();
      this.$emit('setFilterDateRange', [min, max]);
    },
  },
  mounted() {
    this.width = this.getWidth();
    this.height = this.setHeight((this.data.length + 1) * this.axisHeight);
    this.getDateRange();
  },
};
</script>

