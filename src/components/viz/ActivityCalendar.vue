<template>
    <g class="activityAxis" ref="g"
     :transform="`translate(${padding}, ${yTrans + 2*padding})`" text-anchor="left">
      <text :x="padding"  :y="-padding" fill="black" text-anchor="start">
        {{activity[0].meta.activity.name}}
      </text>
    </g>
</template>
<style>
  .dot {
    opacity: 0.9;
  }

  .domain {
    stroke: lightgray;
  }

  .tick line {
    stroke: lightgray;
  }
</style>

<script>
import moment from 'moment';

const d3 = require('d3');

window.d3 = d3;

export default {
  name: 'ActivityCalendar',
  props: {
    activity: {
      type: Array,
    },
    width: {
      type: Number,
    },
    tMin: {
      type: Object,
    },
    tMax: {
      type: Object,
    },
    idx: {
      type: Number,
    },
    height: {
      type: Number,
      default: 50,
    },
    padding: {
      type: Number,
      default: 5,
    },
    color: {
      type: String,
      default: 'red',
    },
  },
  methods: {
    getXScale() {
      if (this.tMin && this.tMax && this.width) {
        return d3.scaleTime()
          .domain([this.tMin.toDate(), this.tMax.toDate()])
          .range([this.padding, this.width - (2 * this.padding)]);
      }
      return null;
    },
    drawAxis() {
      d3.select(this.$refs.g).call(d3.axisBottom(this.xScale).ticks(5)
        .tickFormat(d3.timeFormat('%b-%d')));
    },
    drawDots() {
      d3.select(this.$refs.g)
        .selectAll('.dot')
        .data(this.activity)
        .enter()
        .append('circle')
        .attr('class', 'dot');

      d3.select(this.$refs.g)
        .selectAll('.dot')
        .attr('cy', 0)
        .attr('cx', d => this.xScale(moment(d.updated).toDate()))
        .attr('r', 5)
        .attr('fill', this.color);
    },
  },
  computed: {
    xScale() {
      const xScale = this.getXScale();
      if (xScale) {
        return this.getXScale();
      }
      return null;
    },
    yTrans() {
      return this.idx * this.height;
    },
  },
  watch: {
    width() {
      if (this.width && this.xScale) {
        this.drawAxis();
        this.drawDots();
      }
    },
  },
  mounted() {
    if (this.width && this.xScale) {
      this.drawAxis();
      this.drawDots();
    }
  },
};
</script>

