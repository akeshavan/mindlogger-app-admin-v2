<template>
  <div>
    <div class="d1 card mb-3 pb-3">
      <div class="d2">
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
.d5 {
    /* height:3000px */
}

</style>


<script>
import _ from 'lodash';
import moment from 'moment';
import SubTable from './SubTable';

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
  },
  components: {
    SubTable,
  },
  data() {
    return {
      tableFields: ['datetime', 'response'],
      filter: null,
    };
  },
  computed: {
    activityDataTable() {
      // if a date range has been specified, then filter the output.
      let allData = [];

      if (this.dateRange) {
        allData = _.map(_.filter(this.activity, (v) => {
          const min = this.dateRange[0];
          const max = this.dateRange[1];
          const time = moment(v.updated);
          // console.log(time, max);
          return time >= min && time <= max;
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

