<template>
  <div class="w-100" ref="chart">
    <svg :width="width" :height="height" ref="svg">
      <g class="activityAxis" ref="g"
      :transform="`translate(${padding}, ${padding})`" text-anchor="left">
        <g ref="xAxis"
          :transform="`translate(0, ${height - 2 * padding})`"
          text-anchor="left">

        </g>
        <g ref="yAxis" :transform="`translate(${padding})`">
          <text :x="padding/2"  :y="0" fill="black" text-anchor="start">
            {{title}}
          </text>
        </g>

      </g>
    </svg>
    <resize-observer @notify="handleResize" />
  </div>
</template>
<style>
  .dot {
    opacity: 1;
  }

  .dot:hover {
    fill: red;
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

  .d3-tip {
  line-height: 1;
  font-weight: bold;
  padding: 12px;
  background: #212529;
  color: #fff;
  border-radius: 2px;
}

/* Creates a small triangle extender for the tooltip */
.d3-tip:after {
  box-sizing: border-box;
  display: inline;
  font-size: 15px;
  width: 100%;
  line-height: 1;
  color: #212529;
  content: "\25BC";
  position: absolute;
  text-align: center;
}

/* Style northward tooltips differently */
.d3-tip.n:after {
  margin: -3px 0 0 0;
  top: 100%;
  left: 0;
}

</style>

<script>
import moment from 'moment';
import _ from 'lodash';
import d3Tip from 'd3-tip';

const d3 = require('d3');

d3.tip = d3Tip;

window.d3 = d3;

export default {
  name: 'BarPlot',
  props: {
    data: {
      type: Array,
    },
    xName: {
      type: String,
    },
    yName: {
      type: String,
    },
    height: {
      type: Number,
      default: 200,
    },
    padding: {
      type: Number,
      default: 25,
    },
    color: {
      type: String,
      default: 'red',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      width: 0,
      tip: null,
    };
  },
  methods: {
    handleResize() {
      if (this.$refs.chart) {
        this.width = this.$refs.chart.clientWidth;
      }
    },
    getDateRange() {
      const allDateTimes = [];
      _.map(this.data, (d) => {
        allDateTimes.push(moment(d[this.xName]));
      });
      const min = moment.min(allDateTimes);
      const max = moment.max(allDateTimes);
      return { min, max };
    },
    getXScale() {
      if (this.width) {
        const tMin = this.dateRange.min;
        const tMax = this.dateRange.max;
        return d3.scaleTime()
          .domain([tMin.toDate(), tMax.toDate()])
          .range([this.padding, this.width - (2 * this.padding)]);
      }
      return null;
    },
    getYScale() {
      const yMin = this.yValueRange.min;
      const yMax = this.yValueRange.max;
      return d3.scaleLinear()
        .domain([yMin, yMax])
        .range([this.height - (this.padding * 2), 0]);
    },
    drawAxis() {
      d3.select(this.$refs.xAxis)
        .call(d3.axisBottom(this.xScale).ticks(5));
      // .tickFormat(d3.timeFormat('%b-%d')));
      d3.select(this.$refs.yAxis)
        .call(d3.axisLeft(this.yScale).ticks(5));
    },
    drawDots() {
      const className = 'dot';

      d3.select(this.$refs.g)
        .selectAll(`.${className}`)
        .data(this.data)
        .enter()
        .append('rect')
        .attr('class', className);

      d3.select(this.$refs.g)
        .selectAll(`.${className}`)
        .attr('y', d => this.yScale(d[this.yName]))
        .attr('height', d => (this.height - (2 * this.padding)) - this.yScale(d[this.yName]))
        .attr('width', '10')
        .attr('x', d => this.xScale(moment(d[this.xName]).toDate()))
        // .attr('r', 5)
        .attr('fill', this.color);

      if (this.tip) {
        d3.select(this.$refs.g)
          .selectAll(`.${className}`)
          .on('mouseover', this.tip.show)
          .on('mouseout', this.tip.hide);
      }
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
    yScale() {
      const yScale = this.getYScale();
      if (yScale) {
        return this.getYScale();
      }
      return null;
    },
    dateRange() {
      return this.getDateRange();
    },
    yValueRange() {
      const min = 0;
      const max = d3.max(this.data, d => d[this.yName]);
      return { min, max };
    },
  },
  watch: {
    width() {
      if (this.width && this.xScale && this.yScale) {
        this.drawAxis();
        this.drawDots();
      }
    },
    data() {
      this.drawAxis();
      this.drawDots();
    },
  },
  mounted() {
    this.width = this.$refs.chart.clientWidth;
    this.$nextTick(() => {
      this.drawAxis();
      this.drawDots();
      const formatter = d3.format('.1f');
      this.tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(d => `
        <div>${moment(d[this.xName]).format('LL')}</div>
        
        <div style='color:${this.color}' class="text-center mt-1">
          <strong>
          ${formatter(d[this.yName])}
          </strong>
        </div>`);
      d3.select(this.$refs.svg).call(this.tip);
    });
  },
};
</script>

