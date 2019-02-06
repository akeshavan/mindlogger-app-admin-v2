<template>
  <div>
      <input ref="input" class="textfield"
      v-autowidth="{minWidth: '100px', comfortZone: 10}"
      :value="value" :placeholder="getPlaceholder()"
      v-on:input="onInput" v-if="ttype=='text'"
      v-on:change="onChange"
      >
      <textarea v-on:change="onChange"
      class="textfield text-center"
      :value="value"
      :placeholder="getPlaceholder()"
      v-on:input="onInput" v-else>
      </textarea>
    </div>
</template>

<style scoped>
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
import Vue from 'vue';
import VueInputAutowidth from 'vue-input-autowidth';

Vue.use(VueInputAutowidth);

export default {
  name: 'Textfield',
  props: ['value', 'placeholder', 'index', 'ttype'],
  computed: {
    style() {
      const charLen = this.value.length;
      const perChar = 20;
      let width = perChar * charLen;
      if (width < 200) {
        width = '200px';
      } else {
        width = `${width}px`;
      }
      return {
        width,
      };
    },
  },
  methods: {
    onChange() {
      this.$emit('change', this.value);
    },
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
</script>
