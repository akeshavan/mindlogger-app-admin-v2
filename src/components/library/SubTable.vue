<template>
    <b-table striped :items="tableData" thead-class="hidden"></b-table>
</template>
<style>
  .hidden {
    display: none;
  }
</style>

<script>
import _ from 'lodash';

export default {
  name: 'SubTable',
  props: {
    responseData: {
      type: Array,
    },
  },
  methods: {
    extractData(d) {
      if (!d.data) {
        return null;
      }
      if (d.data.survey) {
        return d.data.survey;
      }
      if (d.data.text) {
        return d.data.text;
      }
      return 'FIX';
    },
  },
  computed: {
    tableData() {
      // eslint-disable-next-line
      return _.filter(_.map(this.responseData, (d) => {
        return {
          text: d.text,
          survey: this.extractData(d),
        };
      }), d => d.survey != null);
    },
  },
};
</script>
