<template>
  <div>
    <b-table hover :items="activityDataTable" :fields="tableFields">
      <template slot="response" slot-scope="data">
        <SubTable :responseData="data.item.responses"></SubTable>
      </template>
    </b-table>
  </div>
</template>

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
  },
  components: {
    SubTable,
  },
  data() {
    return {
      tableFields: ['datetime', 'response'],
    };
  },
  computed: {
    activityDataTable() {
      // eslint-disable-next-line
      return _.map(this.activity, (a) => {
        return {
          datetime: moment(a.created).format('MMM Do, Y @ h:mm A'),
          responses: a.meta.responses,
        };
      });
    },
  },
};
</script>

