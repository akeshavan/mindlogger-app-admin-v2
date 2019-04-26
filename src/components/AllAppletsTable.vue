<template>
  <div>
    <b-table borderless striped responsive :items="appletItems" :fields="appletFields"
      tbody-td-class="align-middle">
      <!-- A custom formatted column -->
      <template slot="image" slot-scope="data">
          <b-img rounded="circle" alt="Circle image" :src="data.value" v-bind="imgProps">

          </b-img>
      </template>

      <!-- <template slot="name" slot-scope="data">
        <router-link :to="`/applet/${encodeURIComponent(data.item.url)}`">
          {{data.value}}
        </router-link>
      </template> -->

      <template slot="manage" slot-scope="data">
        <!-- <b-form-group class="align-middle">
          <b-form-radio-group
            id="btn-radios-2"
            v-model="data.item.selected"
            :options="options"
            buttons
            button-variant="outline-primary"
            size="sm"
            class="pt-3"
            name="radio-btn-outline"
          ></b-form-radio-group>
        </b-form-group> -->
        <b-button variant="success" class="mt-1 mb-1" v-if="data.item.manager && data.item.appletId" :to="`/manage/${data.item.appletId}`">Manage</b-button>
        <b-button variant="info" class="mt-1 mb-1" v-if="data.item.reviewer && data.item.appletId" :to="`/review/${data.item.appletId}`">Review</b-button>
      </template>

    </b-table>
  </div>
</template>

<style>
 td {
   vertical-align: middle !important;
 }
</style>

<script>
export default {
  name: 'AllAppletsTable',
  props: {
    allApplets: {
      type: Array,
    },
  },
  data() {
    return {
      appletFields: [
        {
          key: 'image',
          label: '',
        },
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'manage',
          label: '',
        },
      ],
      imgProps: { blank: false,
        width: 50,
        height: 50,
        class: 'm1' },
      options: [
        { text: 'On', value: true },
        { text: 'Off', value: false },
      ],
    };
  },
  computed: {
    appletItems() {
      // eslint-disable-next-line
      return _.map(this.allApplets, (applet, index) => {
        const a = applet.applet;
        return { name: a['http://www.w3.org/2004/02/skos/core#prefLabel'] ? a['http://www.w3.org/2004/02/skos/core#prefLabel'][0]['@value'] : '',
          url: a['http://schema.org/url'] ? a['http://schema.org/url'][0]['@value'] : a['http://schema.org/url'] || a.url || '',
          description: a['http://schema.org/description'] ? a['http://schema.org/description'][0]['@value'] : '',
          image: a['http://schema.org/image'] ? a['http://schema.org/image'][0]['@value'] : a['http://schema.org/image'] || `https://picsum.photos/400/400/?image=${350 + index}`,
          selected: true,
          manager: applet.manager,
          reviewer: applet.reviewer,
          appletId: a._id ? a._id.split('applet/')[1] : null,
        };
      });
    },
  },
};
</script>
