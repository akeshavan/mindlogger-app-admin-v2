<template>
  <div>
    <div>
      <!-- screen name -->
      <b-row class="my-1">
        <b-col sm="2" class="text-right">
          <label for="type-text">Screen Id:</label>
        </b-col>
        <b-col sm="10">
          <b-form-group>
          <b-form-input id="type-text" type="text"
         v-model="name" :rows="3"
         :state="nameState"
         @change="updateName"
         aria-describedby="inputLiveHelp inputLiveFeedback"
         >
          <b-form-invalid-feedback id="inputLiveFeedback">
            <!-- This will only be shown if the preceeding input has an invalid state -->
            This name is taken. Choose another.
          </b-form-invalid-feedback>
          <b-form-text id="inputLiveHelp">
            <!-- this is a form text block (formerly known as help block) -->
            This needs to be a unique name
          </b-form-text>
          </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- text question -->
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

      <!-- Survey Type -->
      <b-row class="mt-3">
        <b-col sm="2" class="text-right">
          <label for="type-survey">Survey Type:</label>
        </b-col>
        <b-col sm="10">
          <b-form-select
          v-model="surveyType" :options="surveyTypeOptions" class="mb-3" id="type-survey" />
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
          <b-button variant="outline-primary" class="w-100" @click="addSurveyListOption">
            Add Option
          </b-button>
        </b-col>
      </b-row>

      <!-- if surveyType is List -->
      <b-row v-if="screenData.surveyType === 'slider'" class="mt-3">
        <b-col sm="2" class="text-right">
          <label for="optionTable">Slider Options:</label>
        </b-col>
        <b-col sm="10">
          <b-table ref="listTable"
           id="optionTable" :items="surveyListOptions" :fields="surveyListFields">
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
          <b-button variant="outline-primary" class="w-100" @click="addSurveyListOption">
            Add Option
          </b-button>
        </b-col>
      </b-row>

      <!-- if survey type is table -->
      <b-row v-if="screenData.surveyType === 'table'" class="mt-3">
        <b-col sm="2" class="text-right">
          <label for="type-text">Table Rows:</label>
        </b-col>
        <b-col sm="10">
          <b-table :items="tableRowNames" :fields="tableFields" striped>
            <template slot="name" slot-scope="data">
              <textfield v-model="data.value"
               :index="data.index"
               ttype="text"
               v-on:input="setTableRowName"
               >
               <!-- v-on:input="setSurveyListText"
               v-on:needsSave="needsSave"> -->
               </textfield>
            </template>

            <!-- delete action -->
            <template slot="action" slot-scope="row">
              <button v-if="row.index" type="button" class="close"
               aria-label="Close" style="width:100%"
               @click="removeTableRow(row)">
                <span aria-hidden="true">&times;</span>
              </button>
            </template>

          </b-table>
          <b-button variant="outline-primary" class="w-100" @click="addTableRowName">
            Add row name
          </b-button>
        </b-col>
      </b-row>
      <b-row v-if="screenData.surveyType === 'table'" class="mt-3">
        <b-col sm="2" class="text-right">
          <label for="type-text">Table Columns:</label>
        </b-col>
        <b-col sm="10">
          <b-table :items="tableColNames" :fields="tableFields" striped>
            <template slot="name" slot-scope="data">
              <textfield v-model="data.value"
               :index="data.index"
               ttype="text"
               v-on:input="setTableColName"
               >
               <!-- v-on:input="setSurveyListText"
               v-on:needsSave="needsSave"> -->
               </textfield>
            </template>

            <!-- delete action -->
            <template slot="action" slot-scope="row">
              <button v-if="row.index" type="button" class="close" aria-label="Close"
              style="width:100%"
               @click="removeTableCol(row)">
                <span aria-hidden="true">&times; </span>
              </button>
            </template>

          </b-table>
          <b-button variant="outline-primary" class="w-100" @click="addTableColName">
            Add column name
          </b-button>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col>
          <h5 class="text-muted text-center"> data schema </h5>
          <p class="text-center text-muted"> <small>this is for development purposes. </small></p>
          <p>{{screenData}}</p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style>
.textfield {
    border-style: dashed;
    border-top-style: none;
    border-left-style: none;
    border-right-style: none;
    border-width: thin;
    border-color:#007bff;
    background-color: #ff020200;
    width: -webkit-fill-available;
    text-align: center;
}
</style>


<script>
import _ from 'lodash';

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
    screenName: {
      type: String,
    },
    allScreenNames: {
      type: Array,
    },
  },
  components: {
    Textfield,
  },
  data() {
    return {
      text: '',
      name: '',
      nameState: true,
      surveyListFields: ['text', 'type', 'actions'],
      surveyListOptions: [],
      skippable: null,
      tableRowNames: [],
      tableColNames: [],
      tableFields: ['name', 'action'],
      surveyType: null,
      surveyTypeOptions: [
        {
          value: 'list',
          text: 'list',
        },
        {
          value: 'table',
          text: 'table',
        },
        {
          value: 'slider',
          text: 'slider',
        },
        {
          value: 'infoScreen',
          text: 'infoScreen',
        },
      ],
    };
  },
  methods: {
    setSurveyListOptions() {
      this.surveyListOptions = [];
      if (this.screenData.surveyType === 'list' || this.screenData.surveyType === 'slider') {
        this.surveyListOptions = [...this.screenData.survey.options];
        // this.$refs.listTable.refresh();
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
    setSurveyTable() {
      this.tableRowNames = [];
      this.tableColNames = [];
      if (this.screenData.surveyType === 'table') {
        this.tableRowNames = _.map(this.screenData.survey.rows, r => ({ name: r }));
        this.tableColNames = _.map(this.screenData.survey.cols, c => ({ name: c }));
      }
    },
    updateSurveyTable() {
      const newSurvey = { ...this.screenData.survey };
      newSurvey.rows = _.map(this.tableRowNames, t => t.name);
      newSurvey.cols = _.map(this.tableColNames, t => t.name);
      this.$emit('changedValue', 'survey', newSurvey);
    },
    setTableRowName(value, index) {
      this.tableRowNames[index].name = value;
      this.updateSurveyTable();
    },
    setTableColName(value, index) {
      this.tableColNames[index].name = value;
      this.updateSurveyTable();
    },
    removeTableCol(loc) {
      this.tableColNames.splice(loc.index, 1);
      this.updateSurveyTable();
    },
    removeTableRow(loc) {
      this.tableRowNames.splice(loc.index, 1);
      this.updateSurveyTable();
    },
    addTableRowName() {
      this.tableRowNames.push({ name: `row ${this.tableRowNames.length}` });
      this.updateSurveyTable();
    },
    addTableColName() {
      this.tableColNames.push({ name: `col ${this.tableColNames.length}` });
      this.updateSurveyTable();
    },
    updateName() {
      // TODO: make sure the name is unique! otherwise bugs happen.
      const isClash = _.filter(this.allScreenNames, a => a.name === this.name).length;
      if (!isClash) {
        this.$emit('changedName', this.name);
        this.nameState = true;
      } else {
        this.nameState = false;
      }
    },
  },
  watch: {
    text() {
      this.$emit('changedValue', 'text', this.text);
    },
    surveyType() {
      this.$emit('changedValue', 'surveyType', this.surveyType);
    },
    skippable() {
      this.$emit('changedValue', 'skippable', this.skippable);
    },
    screenData() {
      this.text = this.screenData.text;
      this.skippable = this.screenData.skippable;
      this.surveyType = this.screenData.surveyType;
      this.setSurveyListOptions();
      this.setSurveyTable();
    },
    screenName() {
      this.name = this.screenName;
    },
  },
  mounted() {
    this.text = this.screenData.text;
    this.name = this.screenName;
    this.skippable = this.screenData.skippable;
    this.surveyType = this.screenData.surveyType;
    this.setSurveyListOptions();
    this.setSurveyTable();
  },
};
</script>
