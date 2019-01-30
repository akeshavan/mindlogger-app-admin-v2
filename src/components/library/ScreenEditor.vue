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

      <!-- can this question be skipped? -->
      <b-row class="my-1 mt-3">
        <b-col sm="12" class="text-center">
                  <b-form-checkbox id="skippable"
                        v-model="skippable"
                        :value="true"
                        :unchecked-value="false">
          This question can be skipped.
        </b-form-checkbox>
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

            <!-- delete action -->
            <template slot="actions" slot-scope="row">
              <button type="button" class="close" aria-label="Close" style="width:100%"
               @click="removeSurvetListOption(row)">
                <span aria-hidden="true">&times;</span>
              </button>
            </template>
          </b-table>
          <b-button variant="outline-success" class="w-100" @click="addSurveyListOption">Add Option</b-button>
        </b-col>
      </b-row>
      {{screenData}}
    </div>
  </div>
</template>

<style>
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
      skippable: null,
    };
  },
  methods: {
    setSurveyListOptions() {
      if (this.screenData.surveyType === 'list') {
        this.surveyListOptions = this.screenData.survey.options;
      }
    },
    updateSurveyList() {
      const newSurvey = { ...this.screenData.survey };
      newSurvey.options = this.surveyListOptions;
      this.$emit('changedValue', 'survey', newSurvey);
    },
    setSurveyListText(value, index) {
      this.surveyListOptions[index].text = value;
      this.updateSurveyList();
    },
    removeSurvetListOption(loc) {
      this.surveyListOptions.splice(loc.index, 1);
    },
    addSurveyListOption() {
      this.surveyListOptions.push({
        text: `option ${this.surveyListOptions.length}`,
        type: 'text',
      });
      this.updateSurveyList();
    },
  },
  watch: {
    text() {
      this.$emit('changedValue', 'text', this.text);
    },
    skippable() {
      this.$emit('changedValue', 'skippable', this.skippable);
    },
    screenData() {
      this.text = this.screenData.text;
      this.skippable = this.screenData.skippable;
      this.setSurveyListOptions();
    },
  },
  mounted() {
    this.text = this.screenData.text;
    this.skippable = this.screenData.skippable;
    this.setSurveyListOptions();
  },
};
</script>
