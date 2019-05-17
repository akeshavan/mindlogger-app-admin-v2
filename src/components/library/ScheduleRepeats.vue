<template>
  <div v-if="!act.unrestricted && act.longitudinal">
    <h5 class="mb-3">Recurrence Options</h5>

    <b-form-group label="Scheduling reference point">
      <b-form-radio-group
        v-model="act.userStart"
        :options="userStartOptions"
        :name="`userstart-${act.name}`"
        stacked
      ></b-form-radio-group>
    </b-form-group>

    <div v-if="!act.userStart">
      <div> Repeat by </div>
      <b-form-select v-model="act.repeatUnit"
        :options="act.repeatUnitOptions"
        :disabled="act.unrestricted"
        class="mt-3 mb-3"
        ></b-form-select>

      <div v-if="act.repeatUnit === 'week'">
        <b-form-group  :disabled="act.unrestricted"
        label="on specific days of the week:"
        >
          <b-form-checkbox-group
            :disabled="act.unrestricted"
            v-model="act.repeatUnitSubOptions[act.repeatUnit]"
            :options="repeatUnitSubOptionsCategories[act.repeatUnit]"
            buttons
            button-variant="outline-primary"
            size="sm"
            name="buttons-2"
          ></b-form-checkbox-group>
        </b-form-group>
      </div>


      <div v-if="act.repeatUnit === 'month'">
        <b-form-group  :disabled="act.unrestricted"
        label="by date:"
        >
          <b-form-checkbox-group
            :disabled="act.unrestricted"
            v-model="act.monthFrequencySubOptions.byDate"
            :options="repeatUnitSubOptionsCategories[act.repeatUnit].byDate"
            buttons
            button-variant="outline-primary"
            size="sm"
            name="buttons-2"
          ></b-form-checkbox-group>
        </b-form-group>

        <b-form-group  :disabled="act.unrestricted"
        label="and/or on every:"
        >
          <b-form-checkbox-group
            :disabled="act.unrestricted"
            v-model="act.monthFrequencySubOptions.byWeek"
            :options="repeatUnitSubOptionsCategories[act.repeatUnit].byWeek"
            buttons
            button-variant="outline-primary"
            size="sm"
            name="buttons-2"
          ></b-form-checkbox-group>
        </b-form-group>

        <b-form-group  :disabled="act.unrestricted"
        >
          <b-form-checkbox-group
            :disabled="act.unrestricted"
            v-model="act.monthFrequencySubOptions.byDay"
            :options="repeatUnitSubOptionsCategories[act.repeatUnit].byDay"
            buttons
            button-variant="outline-primary"
            size="sm"
            name="buttons-2"
          ></b-form-checkbox-group>
        </b-form-group>

      </div>


        <b-row v-if="!act.unrestricted">
          <b-col>
            <b-form-group label="Duration" class="mt-3 mb-3">
              <b-form-radio-group
                :disabled="act.unrestricted"
                v-model="act.startTime.duration"
                :options="act.startTime.durationOptions"
              ></b-form-radio-group>
            </b-form-group>

          </b-col>
          <b-col>
        <div class="mt-3 mb-3" v-if="!act.unrestricted">
          <div>Number of responses
            <span v-if="act.startTime.duration === 'allDay'">in a day</span>
            <span v-else>per time range</span>
          </div>
          <b-form-input :disabled="act.unrestricted"
            v-model="act.startTime.numResponses" type="number" ></b-form-input>
        </div>
          </b-col>
        </b-row>


        <!-- if time range -->
        <div v-if="act.startTime.duration === 'timeRange'" class="mt-3 mb-3">
            <p>This activity will be available during the following times:</p>
            <TimeRangeGroup id="hi"/>
        </div>


        <div class="mt-3 mb-3" v-if="!act.unrestricted">
          <p>Send notifications at the following times:</p>
          <TimeRangeGroup id="notifications" :useEnd="false"/>
        </div>

    </div>
    <div v-else>
      <b-row>
        <b-col>
          Repeat
        </b-col>
      </b-row>
      <b-row>
        <b-col :cols="1">
          <span>every</span>
        </b-col>
        <b-col :cols="5">
          <b-form-input placeholder="N" type="number" value="1"></b-form-input>
        </b-col>
        <b-col :cols="5">
          <b-form-select v-model="act.repeatUnit"
            :options="act.repeatUnitOptions"
            :disabled="act.unrestricted"
            ></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col>
          <p> from when the user first submits data </p>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col :cols="3">
          <span>Duration for this activity:</span>
        </b-col>
        <b-col :cols="4">
          <b-form-input placeholder="N" type="number" value="1"></b-form-input>
        </b-col>
        <b-col :cols="4">
          <b-form-select
            value="hours"
            :options="durationOptions"
            ></b-form-select>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col cols="4">
          Number of responses over duration:
        </b-col>
        <b-col cols="8">
          <b-form-input placeholder="N" type="number" value="1"></b-form-input>
        </b-col>
      </b-row>

          <b-form-checkbox
            class="mt-3 mb-3"
          >
            <div>Send notification at start time</div>
          </b-form-checkbox>

    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import TimeRangeGroup from './TimeRangeGroup';

export default {
  name: 'repeater',
  components: {
    TimeRangeGroup,
  },
  props: {
    act: {
      type: Object,
    },
  },
  data() {
    return {
      userStartOptions: [
        { text: 'Relative to the first time a user responds', value: true },
        { text: 'Absolute date times', value: false },
      ],
      durationOptions: [
        { text: 'hours', value: 'hours' },
        { text: 'days', value: 'days' },
      ],
      repeatUnitSubOptionsCategories: {
        week: [
          {
            text: 'M',
            value: 'Monday',
          },
          {
            text: 'Tu',
            value: 'Tuesday',
          },
          {
            text: 'W',
            value: 'Wednesday',
          },
          {
            text: 'Th',
            value: 'Thursday',
          },
          {
            text: 'F',
            value: 'Friday',
          },
          {
            text: 'Sa',
            value: 'Saturday',
          },
          {
            text: 'Su',
            value: 'Sunday',
          },
        ],
        month: {
          byDate: _.map(_.range(28), i => ({ text: i + 1, value: i + 1 })),
          byWeek: [
            {
              text: '1st',
              value: 1,
            },
            {
              text: '2nd',
              value: 2,
            },
            {
              text: '3rd',
              value: 3,
            },
            {
              text: '4th',
              value: 4,
            },
          ],
          byDay: [
            {
              text: 'M',
              value: 'Monday',
            },
            {
              text: 'Tu',
              value: 'Tuesday',
            },
            {
              text: 'W',
              value: 'Wednesday',
            },
            {
              text: 'Th',
              value: 'Thursday',
            },
            {
              text: 'F',
              value: 'Friday',
            },
            {
              text: 'Sa',
              value: 'Saturday',
            },
            {
              text: 'Su',
              value: 'Sunday',
            },
          ],
        },
      },
    };
  },
};
</script>
