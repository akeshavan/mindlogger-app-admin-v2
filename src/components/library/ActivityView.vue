<template>
  <div class="scrollTable">
    <div class="d1 mb-3 pb-3">
      <div class="text-right w-100 mb-1">
        <small class="text-right">{{activityDataTable.length}} items</small>
        <small class="text-left">
          <a :href="`data:application/octet-stream,${stringActivity}`"> download </a>
        </small>
        <b-button @click="runReducer" size="sm" v-if="reducerURL" :disabled="status === 'loading'">
          <span v-if="status === 'ready'">run reducer</span>
          <span v-else>loading..</span>
        </b-button>
        <b-collapse :id="'collapse' + id" class="mt-2" v-if="reducerURL" ref="collapse">
          <b-card>
            <div v-if="reducedData.length">
              <BarPlot
                key="barplot"
                ref="barplot"
                :data="reducedData"
                xName="sleep_time"
                yName="time_slept_hours"
                :width="width"
                :color="color"
                title="Hours slept"
                />
            </div>
          </b-card>
        </b-collapse>


      </div>
      <div class="d2 card">
        <div class="d3">
          <div class="d3-2">
            <div class="d4">
              <div class="d5">
                <b-table hover :items="activityDataTable" :fields="tableFields">
                  <template slot="response" slot-scope="data">
                    <SubTable :responseData="data.item.responses"></SubTable>
                  </template>
                </b-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.scrollTable {
  margin-bottom: 4em;
  height: -webkit-fill-available;
}

.d1 {
    height: 500px;
}
.d2 {
    height: 100%;
}
.d3 {
   height:100%;
   position: relative;
}
.d3-2{
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    /* padding-top: 50px; */
    width: 100%;
    position: absolute;
    top: 0;
}
.d4
{
  position: relative;
  max-height: 100%;
  overflow: auto;
}

</style>


<script>
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import SubTable from './SubTable';
// import functions from '../../api/functions';
import BarPlot from '../viz/BarCalendar';

window.moment = moment;

export default {
  name: 'ActivityView',
  props: {
    activity: {
      type: Array,
    },
    dateRange: {
      type: Array,
    },
    color: {
      type: String,
      default: 'red',
    },
    id: {
      type: String,
      default: 'av',
    },
  },
  components: {
    SubTable,
    BarPlot,
  },
  data() {
    return {
      tableFields: ['datetime', 'response'],
      filter: null,
      reducedData: [],
      width: 0,
      status: 'ready',
    };
  },
  watch: {
    reducedData() {
      if (this.$refs.barplot) {
        this.width = this.$refs.barplot.clientWidth;
      }
    },
  },
  methods: {
    runReducer() {
      this.status = 'loading';
      axios({
        method: 'POST',
        url: this.reducerURL,
        headers: {
          'Content-Type': 'application/json',
        },
        data: this.filteredActivity,
      })
        .then((resp) => {
          this.reducedData = resp.data;
          this.status = 'ready';
          this.$refs.collapse.show = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleResize() {
      if (this.$refs.barplot) {
        this.width = this.$refs.barplot.clientWidth;
      }
    },
  },
  mounted() {
    if (this.$refs.barplot) {
      this.width = this.$refs.barplot.clientWidth;
    }
  },
  computed: {
    activityName() {
      return this.activity[0].meta.activity.name;
    },
    filteredActivity() {
      let allData = this.activity;
      if (this.dateRange) {
        allData = _.filter(this.activity, (v) => {
          const min = this.dateRange[0];
          const max = this.dateRange[1];
          const time = moment(v.updated);

          return time >= min && time <= max.add(1, 'second');
          // eslint-disable-next-line
        });
      }
      return allData;
    },
    stringActivity() {
      return JSON.stringify(this.filteredActivity, null, 2);
    },
    activityDataTable() {
      // if a date range has been specified, then filter the output.
      let allData = [];

      if (this.dateRange) {
        allData = _.map(_.filter(this.activity, (v) => {
          const min = this.dateRange[0];
          const max = this.dateRange[1];
          const time = moment(v.updated);

          return time >= min && time <= max.add(1, 'second');
          // eslint-disable-next-line
        }), (a) => {
          return {
            datetime: moment(a.updated).format('MMM Do, Y @ h:mm A'),
            responses: a.meta.responses,
          };
        });
      } else {
        // eslint-disable-next-line
        allData = _.map(this.activity, (a) => {
          return {
            datetime: moment(a.updated).format('MMM Do, Y @ h:mm A'),
            responses: a.meta.responses,
          };
        });
      }

      return allData;
    },
  },
};
</script>

