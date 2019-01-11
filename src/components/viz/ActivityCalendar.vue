<template>
    <g class="activityAxis" ref="g"
     :transform="`translate(${padding}, ${yTrans + 2*padding})`" text-anchor="left">
      <text :x="padding"  :y="-padding" fill="black" text-anchor="start">
        {{title}}
      </text>
      <g v-if="role==='scrub'" class="brush" ref="brush" :transform="`translate(0, -${height/2})`">
      </g>
    </g>
</template>
<style>
  .dot {
    opacity: 0.9;
  }

  .scrubDot {
    opacity: 0.5;
    stroke: black;
    stroke-width: 0.5;
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
    role: {
      type: String,
      default: 'data',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      brush: null,
    };
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
      d3.select(this.$refs.g)
        .call(d3.axisBottom(this.xScale).ticks(5));
      // .tickFormat(d3.timeFormat('%b-%d')));
    },
    drawDots() {
      const className = this.role === 'data' ? 'dot' : 'scrubDot';

      d3.select(this.$refs.g)
        .selectAll(`.${className}`)
        .data(this.activity)
        .enter()
        .append('circle')
        .attr('class', className);

      d3.select(this.$refs.g)
        .selectAll(`.${className}`)
        .attr('cy', 0)
        .attr('cx', d => this.xScale(moment(d.updated).toDate()))
        .attr('r', 5)
        .attr('fill', this.color);
    },
    brushed() {
      const s = d3.event.selection;
      console.log('d3 event selection', s);
      if (s) {
        const newRange = s.map(this.xScale.invert, this.xScale);
        this.$emit('setRange', newRange);
      } else {
        this.$emit('setRange', [this.tMin, this.tMax]);
      }
    },
    drawScrub() {
      const brush = d3.brushX()
        .extent([[this.padding, 0], [this.width - (2 * this.padding), this.height]])
        .on('brush end', this.brushed);
      this.brush = brush;
      d3.select(this.$refs.brush)
        .call(brush);
    },
    redrawScrub(min, max) {
      this.brush.on('brush end', null);
      d3.select(this.$refs.brush)
        .call(this.brush.move, [this.xScale(min.toDate()), this.xScale(max.toDate())]);
      this.brush.on('brush end', this.brushed);
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
        if (this.role === 'scrub') {
          this.drawScrub();
        }
      }
    },
    tMin() {
      this.drawAxis();
      this.drawDots();
    },
    tMax() {
      this.drawAxis();
      this.drawDots();
    },
  },
  mounted() {
    if (this.width && this.xScale) {
      this.drawAxis();
      this.drawDots();
      if (this.role === 'scrub') {
        this.drawScrub();
      }
    }
  },
};
</script>

