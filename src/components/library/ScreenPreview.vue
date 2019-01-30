<template>
  <b-card footer-tag="footer"
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <p class="card-text lh">
      {{screenData.text}}
    </p>

    <div class="card-text">
      <div v-if="screenData.surveyType === 'list'">
        <b-form-group>
          <b-form-radio-group :options="screenData.survey.options"
                              stacked
                              disabled
                              name="radiosStacked">
          </b-form-radio-group>
        </b-form-group>
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

<style scoped>
  .card-body {
    padding: 10px !important;
    overflow-y: scroll;
  }
</style>


<script>
export default {
  name: 'ScreenPreview',
  props: {
    screenData: {
      type: Object,
    },
  },
};
</script>

