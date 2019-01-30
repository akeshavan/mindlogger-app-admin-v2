<template>
  <div>
    <div>
      <b-row class="my-1">
        <b-col sm="2" class="text-right">
          <label for="type-text">Text:</label>
        </b-col>
        <b-col sm="10"><b-form-textarea id="type-text" type="text" v-model="text" :rows="3">
          </b-form-textarea>
        </b-col>
      </b-row>

      <!-- if surveyType is List -->
      <b-row v-if="screenData.surveyType === 'list'" class="mt-3">
        <b-col sm="2" class="text-right">
          <label for="optionTable">List Options:</label>
        </b-col>
        <b-col sm="10">
          <b-table id="optionTable" :items="surveyListOptions" :fields="surveyListFields">
            <template slot="text" slot-scope="data">
              <textfield v-model="data.value"
               :index="data.index"
               ttype="text"
               v-on:input="setSurveyListText"
               >
               <!-- v-on:input="setSurveyListText"
               v-on:needsSave="needsSave"> -->
               </textfield>
            </template>
          </b-table>
          <b-button >Add Option</b-button>
        </b-col>
      </b-row>
      {{screenData}}
    </div>
  </div>
</template>

<style scoped>
  .textfield {
    border-style: none;
    background-color: #ffffff00;
    width: 100%;
    text-align: center;
  }
</style>


<script>

export const Textfield = {
  props: ['value', 'placeholder', 'index', 'ttype'],
  template: `
  <div>
    <input class="textfield" :value="value" :placeholder="getPlaceholder()" v-on:input="onInput" v-if="ttype=='text'">
    <textarea class="textfield text-center" :value="value" :placeholder="getPlaceholder()" v-on:input="onInput" v-else></textarea>
  </div>
  `,
  methods: {
    onInput(e) {
      const value = e.target.value;
      // Add this line
      this.$emit('input', value, this.index);
      this.$emit('needsSave', true);
    },
    getPlaceholder() {
      if (!this.value && this.placeholder) {
        return this.placeholder;
      }
      return '';
    },
  },
};

export default {
  name: 'ScreenEditor',
  props: {
    screenData: {
      type: Object,
    },
  },
  components: {
    Textfield,
  },
  data() {
    return {
      text: '',
      surveyListFields: ['text', 'type', 'actions'],
      surveyListOptions: [],
    };
  },
  methods: {
    setSurveyListOptions() {
      if (this.screenData.surveyType === 'list') {
        this.surveyListOptions = this.screenData.survey.options;
      }
    },
    setSurveyListText(value, index) {
      this.surveyListOptions[index].text = value;
      const newSurvey = { ...this.screenData.survey };
      newSurvey.options = this.surveyListOptions;
      this.$emit('changedValue', 'survey', newSurvey);
    },
  },
  watch: {
    text() {
      this.$emit('changedValue', 'text', this.text);
    },
    screenData() {
      this.text = this.screenData.text;
      this.setSurveyListOptions();
    },
  },
  mounted() {
    this.text = this.screenData.text;
    this.setSurveyListOptions();
  },
};
</script>
