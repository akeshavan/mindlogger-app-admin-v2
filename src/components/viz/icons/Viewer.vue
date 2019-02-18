<template>
  <svg xmlns="http://www.w3.org/2000/svg" id="viewer" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 32 40" style="enable-background:new 0 0 32 32;" xml:space="preserve">
      <!-- eslint-disable -->
      <g>
          <path d="M14.9,23.1c-1.4,1.4-3.3,2.3-5.4,2.3s-4-0.9-5.4-2.3C1.6,24.9,0,27.7,0,31c0,0.6,0.4,1,1,1h17.1   c0.6,0,1-0.4,1-1C19.1,27.7,17.4,24.9,14.9,23.1z" />
          <path d="M9.5,23.5c3,0,5.4-2.4,5.4-5.4s-2.4-5.4-5.4-5.4s-5.4,2.4-5.4,5.4S6.5,23.5,9.5,23.5z" />
          <path d="M31,0H16.1c-0.6,0-1,0.4-1,1v11.5c0,0.6,0.4,1,1,1h2v2.4c0,0.4,0.2,0.7,0.5,0.9c0.3,0.2,0.7,0.2,1,0   l5-3.2H31c0.6,0,1-0.4,1-1V1C32,0.4,31.6,0,31,0z M20.8,9.8h-2V6.6h2V9.8z M24.6,9.8h-2V5.1h2V9.8z M28.3,9.8h-2V3.5h2V9.8z" />
      </g>
      <g v-if="num">
        <circle cx="20" cy="32" r="7"></circle>
        <text x="17" y="35.5" fill="white" font-size="10px" text-anchor="center" font-weight="bold">
          {{num}}
        </text>
      </g>
      <!-- <text x="0" y="47" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Creative Stall</text>
      <text x="0" y="52" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text> -->
  </svg>
</template>

<style lang="scss">
  @import '../../../custom-bootstrap.scss';
  #viewer path {
    fill: $light-blue !important;
  }

  #viewer circle {
    fill: $light-blue !important;
    stroke: $dark-light-blue;
    stroke-width: 2;
  }

  #viewer {
    width: 40%;
  }
</style>

<script>
export default {
  name: 'ViewerIcon',
  props: {
    num: {
      type: Number,
    },
  },
};
</script>

