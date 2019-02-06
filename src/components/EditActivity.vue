<template>
  <div class="mt-3">
    <Loading v-if="status==='loading'"/>
    <Unauthorized v-else-if="!authorized"/>
    <div v-else>
      <!-- Are you sure you want to delete modal? -->
      <b-modal id="delete" title="Deleting"
       v-on:ok="removeScreen" header-bg-variant="danger"
       header-text-variant="light" ok-variant="danger">
        <p class="my-4 lead">Are you sure you want to delete this screen?</p>
      </b-modal>

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
                <textfield v-model="activityData.name" ttype="text" placeholder="title"
                @change="updateMetadata(1)">
               </textfield>
            </h2>
            <p class="lead text-center">
              <textfield v-model="activityData.meta.shortName" ttype="text"
               @change="updateMetadata"
               placeholder="short name">
               </textfield>
            </p>
            <p class="lead text-center">
              <textfield v-model="activityData.meta.description" ttype="textarea"
               @change="updateMetadata"
               placeholder="description">
               </textfield>
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
            <swiper-slide v-for="(screen) in activityData.meta.screens" :key="screen.name">
              <small>{{screen.name.slice(0,20)}}</small>
              <div v-if="screens[getIndex(screen)]">
                <screen-preview :screenData="screens[getIndex(screen)].meta"/>
              </div>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <!-- add/remove controls -->
          <div class="screen-controls mb-3 w-100 mx-auto">
            <b-button size="sm" variant="secondary" @click="moveLeft"
              v-if="currentSlide">
              <i class="fas fa-arrow-left"></i>
            </b-button>
            <b-button size="sm" variant="info" @click="addBefore">
              <i class="fas fa-arrow-left"></i>  <i class="fas fa-plus"></i>
            </b-button>


            <b-button size="sm" variant="danger" v-b-modal.delete>
              <i class="fas fa-trash"></i>
            </b-button>


            <b-button size="sm" variant="info" @click="addAfter">
              <i class="fas fa-plus"></i>  <i class="fas fa-arrow-right"></i>
            </b-button>

            <b-button size="sm" variant="secondary" @click="moveRight"
              v-if="currentSlide !== screens.length - 1">
              <i class="fas fa-arrow-right"></i>
            </b-button>

          </div>

          <!-- Current Slide Editing Panel -->
          <div v-if="currentSlide != null && screens.length" class="container mt-3">
            <div v-if="screens[currentScreenIndex]">
              <screen-editor
                :key="screens[currentScreenIndex].name"
                :screenName="screens[currentScreenIndex].name"
                :allScreenNames="activityData.meta.screens"
               :screenData="screens[currentScreenIndex].meta"
               v-on:changedValue="updateScreen"
               v-on:changedName="updateScreenName"
               />
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
  height: 280px;
  width: 225px;
}

.swiper-slide {
    color: gray;
}

.swiper-container {
  min-height: 316px;
  /* position: sticky;
  top: 0; */
}

.screen-controls {
  text-align: center;
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
import Textfield from './library/Textfield';
import ScreenPreview from './library/ScreenPreview';
import {
  getActivitySet,
  getUserMetadata,
  getActivityMetadata,
  initializeActivity,
  getScreenMetadata,
  updateActivityMetadata,
  addScreen,
  updateScreen,
  deleteScreen,
} from '../api/api';
import schemas from '../api/schemas';


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
      activityData: {
        meta: {
          shortName: 'untitled activity',
          description: 'add a description',
        },
        name: 'full name of untitled activity',
      },
      status: 'loading',
      screens: [],
      swiperReady: false,
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 30,
        centeredSlides: true,
        mousewheel: false,
        grabCursor: true,
        keyboard: {
          enabled: true,
        },
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
    Textfield,
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
    currentScreenIndex() {
      return this.getIndex(this.activityData.meta.screens[this.currentSlide]);
    },
  },
  methods: {
    isEditor(activity) {
      // eslint-disable-next-line
      const userId = this.user._id;
      return activity.meta.members.editors.indexOf(userId) > -1;
    },
    getActivitySet() {
      return getActivitySet(this.activitySetId, this.authToken.token).then((resp) => {
        console.log('activity set data', resp);
        this.activitySetData = resp.data;
      }).catch((e) => {
        console.log('error in getActivitySet', e);
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
      return getActivityMetadata(this.activityId, this.authToken.token).then((resp) => {
        if (resp.data.length) {
          this.activityData = resp.data[0];
          if (Object.keys(this.activityData).indexOf('meta') < 0) {
            this.activityData.meta = {
              screens: [],
            };
          }
          this.status = 'ready';
          // eslint-disable-next-line
          return resp.data[0]._id;
        }
        return initializeActivity({
          name: this.activityData.name,
          id: this.activityId,
          token: this.authToken.token,
        }).then((resp1) => {
          this.activityData = resp1.data;
          if (Object.keys(this.activityData).indexOf('meta') < 0) {
            this.activityData.meta = {
              screens: [],
            };
          }
          this.status = 'ready';
          // eslint-disable-next-line
          return this.activityData._id;
        });
      }).catch((e) => {
        console.log('error in getActivityMetadata', e);
      });
    },
    getScreenMetadata(parentFolderId) {
      if (parentFolderId) {
        getScreenMetadata(parentFolderId, this.authToken.token).then((resp) => {
          const data = _.map(resp.data, (d) => {
            const keys = Object.keys(d.meta);
            const newD = { ...d };
            /**
             * note: initialize empty fields here.
             */
            if (keys.indexOf('text') < 0) {
              newD.meta.text = '';
            }
            if (keys.indexOf('surveyType') < 0) {
              newD.meta.surveyType = 'infoScreen';
            }
            if (!newD.meta.surveyType) {
              newD.meta.surveyType = 'infoScreen';
            }
            if (keys.indexOf('survey') < 0) {
              newD.meta.survey = {
                increments: 'Discrete',
                orientation: 'vertical',
                mode: 'single',
                options: [],
              };
            }
            return newD;
          });
          this.screens = data;
        }).catch((e) => {
          console.log('error in getScreenMetadata', e);
        });
      } else {
        console.log('there are not any screens yet. initializing one now.');
        const screenSchema = schemas.screenSchema();
        this.addScreen(screenSchema.name).then((resp) => {
          this.screens.push(screenSchema);
          const activityScreenSchema = {
            // eslint-disable-next-line
            id: `item/${resp.data._id}`,
            name: screenSchema.name,
          };
          this.activityData.meta.screens = [activityScreenSchema];
          return this.updateMetadata();
        });
      }
    },
    updateScreen(key, value) {
      const keys = Object.keys(this.screens[this.currentScreenIndex].meta);
      if (keys.indexOf(key) < 0) {
        this.screens[this.currentScreenIndex].meta[key] = value;
        Vue.set(this.screens[this.currentScreenIndex].meta, key, value);
        this.$forceUpdate();
      } else {
        this.screens[this.currentScreenIndex].meta[key] = value;
      }
      this.updateCurrentScreen();
      // Vue.$set(this.screens[this.currentSlide].meta, key, value);
    },
    getIndex(activityScreenIndex) {
      if (activityScreenIndex) {
        const nameMatcher = activityScreenIndex.name;
        const screen = _.filter(this.screens, s => s.name === nameMatcher);
        const screenIdx = _.indexOf(this.screens, screen[0]);
        return screenIdx;
      }
      return 0;
    },
    addScreen(name) {
      // eslint-disable-next-line
      return addScreen({ name, folderId: this.activityData._id, token: this.authToken.token });
    },
    addBefore() {
      const screenSchema = schemas.screenSchema();
      this.addScreen(screenSchema.name).then((resp) => {
        console.log('response from addScreen is', resp);
        this.screens.push(screenSchema);
        const activityScreenSchema = {
          // eslint-disable-next-line
          id: `item/${resp.data._id}`,
          name: screenSchema.name,
        };
        this.activityData.meta.screens.splice(this.currentSlide, 0, activityScreenSchema);
        return this.updateMetadata();
      });
    },
    addAfter() {
      const screenSchema = schemas.screenSchema();
      console.log('adding after');
      this.addScreen(screenSchema.name).then((resp) => {
        console.log('adding screen');
        this.screens.push(screenSchema);
        const activityScreenSchema = {
          // eslint-disable-next-line
          id: `item/${resp.data._id}`,
          name: screenSchema.name,
        };
        if (!this.activityData.meta.screens) {
          this.activityData.meta.screens = [];
        }
        this.activityData.meta.screens.splice(this.currentSlide + 1, 0, activityScreenSchema);
        this.$refs.swiper.swiper.activeIndex += 1;
        return this.updateMetadata();
      });
    },
    removeScreen() {
      const value = this.activityData.meta.screens[this.currentSlide];
      console.log('removing', value);
      deleteScreen({ itemId: value.id, token: this.authToken.token }).then((resp) => {
        console.log(resp);
        this.screens.splice(this.currentScreenIndex, 1);
        this.activityData.meta.screens.splice(this.currentSlide, 1);
        Vue.set(this.activityData.meta, 'screens', [...this.activityData.meta.screens]);
        return this.updateMetadata();
      });
    },
    moveRight() {
      const order = this.activityData.meta.screens;
      [order[this.currentSlide],
        order[this.currentSlide + 1]] = [order[this.currentSlide + 1],
        order[this.currentSlide]];
      this.$refs.swiper.swiper.activeIndex += 1;
      this.$forceUpdate();
    },
    moveLeft() {
      const order = this.activityData.meta.screens;
      [order[this.currentSlide],
        order[this.currentSlide - 1]] = [order[this.currentSlide - 1],
        order[this.currentSlide]];
      this.$refs.swiper.swiper.activeIndex -= 1;
      this.$forceUpdate();
    },
    updateScreenName(name) {
      const idx = this.currentScreenIndex;
      this.activityData.meta.screens[this.currentSlide].name = name;
      this.screens[idx].name = name;
    },
    updateCurrentScreen() {
      if (this.activityData.meta.screens[this.currentSlide]) {
        if (this.activityData.meta.screens[this.currentSlide].id) {
          updateScreen({
            name: this.activityData.meta.screens[this.currentSlide].name,
            metadata: this.screens[this.currentScreenIndex].meta,
            screenPath: this.activityData.meta.screens[this.currentSlide].id,
            token: this.authToken.token,
          }).then((resp) => {
            // console.log('updated screen', resp);
            this.updateMetadata();
          });
        }
      }
    },
    updateMetadata(doName = false) {
      updateActivityMetadata({
        name: this.activityData.name,
        metadata: this.activityData.meta,
        // eslint-disable-next-line
        parentId: this.activityData._id,
        token: this.authToken.token,
      }).then(() => {
        if (doName) {
          return this.updateMetadataName();
        }
        return 0;
      });
    },
    updateMetadataName() {
      // ak: i'm not sure why the "name" option doesn't sync well.
      updateActivityMetadata({
        name: this.activityData.name,
        metadata: {},
        parentId: this.activityId,
        token: this.authToken.token,
      }).then((resp) => {
        console.log(resp);
      });
    },
  },
  mounted() {
    this.getActivityMetadata().then(this.getScreenMetadata);
    this.getActivitySet();
    // this.getScreenMetadata();
  },
};
</script>
