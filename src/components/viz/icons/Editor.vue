<template>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" x="0px" y="0px" id="editor">
    <path fill-rule="evenodd" d="M18.6292254,13.4626395 L20.8538731,15.693005 L13.5656105,23 L11.3409628,23 L11.3409628,20.7696345 L18.6292254,13.4626395 Z M21.7753523,10.3084263 L24,12.5387918 L21.9552823,14.5887649 L19.7306346,12.3583994 L21.7753523,10.3084263 Z M8.1948359,12.4112351 L14.4870898,12.4112351 C15.1465596,12.4112351 15.7704865,12.5638038 16.3256699,12.8356554 L10.4567483,18.7196614 L4,18.7196614 L4,16.6168527 C4,14.2941542 5.87809201,12.4112351 8.1948359,12.4112351 Z M11.3409628,10.3084263 C9.60340491,10.3084263 8.1948359,8.89623699 8.1948359,7.15421317 C8.1948359,5.41218934 9.60340491,4 11.3409628,4 C13.0785208,4 14.4870898,5.41218934 14.4870898,7.15421317 C14.4870898,8.89623699 13.0785208,10.3084263 11.3409628,10.3084263 Z" />
    <!-- <text x="0" y="39" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Jenya K.</text>
    <text x="0" y="44" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text> -->
    <g v-if="num">
      <circle cx="18" stroke-width="1" cy="24" r="5.25"></circle>
      <text x="15.75" y="26.5" fill="white" font-size="7.5px" text-anchor="center" font-weight="bold">
        {{num}}
      </text>
    </g>
</svg>
</template>

<style lang="scss">
  @import '../../../custom-bootstrap.scss';
  #editor path {
    fill: $dark-blue;
  }

  #editor circle {
    fill: $dark-blue !important;
    stroke: $dark-dark-blue;
    stroke-width: 1.5;
  }

  #editor {
    width: 40%;
  }
</style>

<script>
export default {
  name: 'EditorIcon',
  props: {
    num: {
      type: Number,
    },
  },
};
</script>

