<template>
  <div class="mt-3">
    <Loading v-if="status==='loading'"/>
    <Unauthorized v-else-if="!authorized"/>
    <div v-else>
      <!-- Title, navigations, and description -->
      <span>
        <b-button :to="'/edit_activity_set/' + this.activitySetId" variant="default" size="sm">
          <i class="fas fa-long-arrow-alt-left"></i>
          Back to Activity Set: {{activitySetData.meta.shortName}}
        </b-button>
      </span>
      <b-container>
        <b-row>
          <b-col>
            <h2 class="text-center">
              <span class="text-muted">Editing </span>
              {{activityData.name}}
            </h2>
            <p class="lead text-center">
              {{activityData.meta.description}}
            </p>
          </b-col>
        </b-row>
      <!-- notifications collapse card -->
        <b-row class="mt3">
          <b-col>
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.accordion1 variant="light">
                  <i class="fas fa-sliders-h"></i> settings
                </b-btn>
              </b-card-header>
              <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <p class="card-text">
                    {{activityData.meta}}
                  </p>
                </b-card-body>
              </b-collapse>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <b-row class="mt-3 sticky">
        <b-col>
          <!-- Screen Preview Netflix -->
          <swiper :options="swiperOption"
           ref="swiper"
           class="bg-light pt-2"
           v-on:ready="swiperReady = true">
            <swiper-slide v-for="(screen, index) in activityData.meta.screens" :key="screen.name">
              <div v-if="screens[index]">
                <screen-preview :screenData="screens[index].meta"/>
              </div>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>

          <!-- Current Slide Editing Panel -->
          <div v-if="currentSlide != null && screens.length" class="container mt-3">
            <div v-if="screens[currentSlide]">
              <screen-editor :screenData="screens[currentSlide].meta" v-on:changedValue="updateScreen"/>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style scoped>
  h1, h2, h3 {
    font-weight: normal;
  }

  .lh {
    line-height: normal;
  }

.swiper-slide-active article.card.mb-2 {
    border-width: thick;
    border-color:#17a2b8;
    color: black;
}

article {
  height: 300px;
  width: 225px;
}

.swiper-slide {
    color: gray;
}

.swiper-container {
  min-height: 316px;
  position: sticky;
  top: 0;
}
</style>

<script>
import Vue from 'vue';
import _ from 'lodash';
// eslint-disable-next-line
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
// import _ from 'lodash';
import Loading from './library/Loading';
import Unauthorized from './library/Unauthorized';
import ScreenEditor from './library/ScreenEditor';
import ScreenPreview from './library/ScreenPreview';
import {
  getActivitySet,
  getUserMetadata,
  getActivityMetadata,
  getScreenMetadata,
} from '../api/api';


export default {
  name: 'EditActivity',
  props: {
    user: {
      type: Object,
    },
    isLoggedIn: {
      type: Boolean,
    },
    authToken: {
      type: Object,
    },
    activitySetId: {
      type: String,
    },
  },
  data() {
    return {
      activitySetData: {},
      activityData: {},
      status: 'loading',
      screens: [],
      swiperReady: false,
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 30,
        centeredSlides: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          1360: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          950: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          680: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          450: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
    };
  },
  components: {
    Loading,
    Unauthorized,
    swiper,
    swiperSlide,
    ScreenEditor,
    ScreenPreview,
  },
  computed: {
    currentSlide() {
      if (this.swiperReady) {
        return this.$refs.swiper.swiper.activeIndex;
      }
      return null;
    },
    activityId() {
      return this.$route.params.activityId;
    },
    authorized() {
      if (this.activitySetData) {
        if (this.activitySetData.meta) {
          return this.isEditor(this.activitySetData);
        }
      }
      if (this.status === 'loading') {
        return true;
      }
      return false;
    },
  },
  methods: {
    isEditor(activity) {
      // eslint-disable-next-line
      const userId = this.user._id;
      return activity.meta.members.editors.indexOf(userId) > -1;
    },
    getActivitySet() {
      return getActivitySet(this.activitySetId).then((resp) => {
        this.activitySetData = resp.data;
      }).catch((e) => {
        console.log('error', e);
      });
    },
    getUserMetadata(userId) {
      // console.log('getting usermetedata', userId);
      getUserMetadata(userId).then((resp) => {
        Vue.set(this.userData, userId, resp.data);
        this.$forceUpdate();
      });
    },
    getActivityMetadata() {
      return getActivityMetadata(this.activityId).then((resp) => {
        this.activityData = resp.data[0];
        this.status = 'ready';
        // eslint-disable-next-line
        return resp.data[0]._id;
      });
    },
    getScreenMetadata(parentFolderId) {
      getScreenMetadata(parentFolderId).then((resp) => {
        const data = _.map(resp.data, (d) => {
          const keys = Object.keys(d.meta);
          const newD = { ...d };
          /**
           * note: initialize empty fields here.
           */
          if (keys.indexOf('text') < 0) {
            newD.meta.text = '';
          }
          return newD;
        });
        this.screens = data;
      });
    },
    updateScreen(key, value) {
      const keys = Object.keys(this.screens[this.currentSlide].meta);
      if (keys.indexOf(key) < 0) {
        this.screens[this.currentSlide].meta[key] = value;
        Vue.set(this.screens[this.currentSlide].meta, key, value);
        this.$forceUpdate();
      } else {
        this.screens[this.currentSlide].meta[key] = value;
      }
      // Vue.$set(this.screens[this.currentSlide].meta, key, value);
    },
  },
  mounted() {
    this.getActivityMetadata().then(this.getScreenMetadata);
    this.getActivitySet();
    // this.getScreenMetadata();
  },
};
</script>
