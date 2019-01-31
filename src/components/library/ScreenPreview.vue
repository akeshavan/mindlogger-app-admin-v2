<template>
  <b-card footer-tag="footer"
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 preview">

    <p class="card-text lh">
      {{screenData.text}}
    </p>

    <div class="card-text">

      <!-- list view -->
      <div v-if="screenData.surveyType === 'list'">
        <b-form-group>
          <b-form-radio-group :options="screenData.survey.options"
                              stacked
                              disabled
                              name="radiosStacked">
          </b-form-radio-group>
        </b-form-group>
      </div>

      <!-- table view -->
      <div v-if="screenData.surveyType === 'table'">
        <b-table :items="surveyTable" small outlined striped class="specialTable"></b-table>
      </div>

      <!-- slider view -->
      <div v-if="screenData.surveyType === 'slider'" style="">
        <vue-slider ref="slider" v-bind="sliderOptions">
        </vue-slider>
      </div>

    </div>

    <em slot="footer">
      <b-row>
        <b-col class="text-right">
          <b-button size="sm" v-if="screenData.skippable" disabled variant="default">
            Skip
          </b-button>
        </b-col>
      </b-row>
    </em>
  </b-card>
</template>

<style>
  .preview .card-body {
    padding: 10px !important;
    overflow-y: scroll;
  }

  .preview .card-footer {
    min-height: 56px;
  }

  .preview .specialTable th {
      height: 34px;
  }
</style>


<script>
import _ from 'lodash';
import vueSlider from 'vue-slider-component';

export default {
  name: 'ScreenPreview',
  props: {
    screenData: {
      type: Object,
    },
  },
  components: {
    vueSlider,
  },
  computed: {
    surveyTable() {
      if (this.screenData.surveyType === 'table') {
        const entries = _.map(this.screenData.survey.rows, (rowName) => {
          const entry = { '   ': rowName };
          this.screenData.survey.cols.forEach((val) => {
            entry[val] = '________';
          });
          return entry;
        });
        return entries;
      }
      return [];
    },
    sliderOptions() {
      const data = _.map(this.screenData.survey.options, d => d.text);
      const isDiscrete = this.screenData.survey.increments === 'Discrete';
      const orientation = this.screenData.survey.orientation;
      return {
        direction: orientation,
        height: 100,
        width: 4,
        style: {
          display: 'inline-block',
          marginLeft: '50px',
        },
        data,
        piecewise: isDiscrete,
        piecewiseLabel: true,
        tooltip: false,
      };
    },
  },
};
</script>

