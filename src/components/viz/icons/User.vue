<template>
<svg xmlns:dc="http://purl.org/dc/elements/1.1/" id="user" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 100 125" version="1.1" x="0px" y="0px">
    <g transform="translate(0,-952.36216)">
        <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:2;stroke-miterlimit:10;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="m 63.480737,975.92493 c -2.458058,9.01263 -6.813716,14.89251 -14.835257,14.83524 -8.193077,-0.0585 -14.835256,-6.64196 -14.835258,-14.83524 -3e-6,-8.19329 6.64197,-14.83527 14.835258,-14.83527 8.193289,0 16.991109,6.93069 14.835257,14.83527 z" />
        <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:2;stroke-miterlimit:10;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="m 31.192545,988.84617 c -4.971771,1.83595 -11.830663,2.84239 -12.229699,13.65443 -0.399035,10.8119 4.535312,28.1641 2.321932,46.0875 l 28.165329,-0.2032 c -3.983437,-22.0402 0.384687,-24.0361 0.43022,-34.2684 0.04552,-10.2324 -3.912357,-18.92495 -6.531407,-22.4844 -2.619049,-3.55944 8.77379,-5.60514 -1.39037,-10.91409 -10.164161,-5.30894 -6.806409,6.66599 -10.766005,8.12816 z" />
        <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:2;stroke-miterlimit:10;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="m 33.964692,995.95163 c -0.950191,0.006 -1.918814,0.25175 -2.824852,0.76239 -2.899325,1.6339 -4.02246,5.33918 -2.518141,8.30778 l 13.908671,27.4507 c 0.100491,0.1983 0.213256,0.3855 0.33116,0.5667 0.06583,0.5286 0.278452,1.0015 0.711213,1.3735 0.624408,0.5367 1.460646,0.8404 2.375898,0.9757 1.445377,0.4482 3.070546,0.3167 4.531764,-0.5067 0.415884,-0.2344 0.790998,-0.5155 1.131275,-0.8268 0.224691,-0.1502 0.454396,-0.2944 0.657872,-0.4667 6.800938,-5.7596 8.873837,-17.961 13.92318,-22.8024 5.049343,-4.8414 6.506562,-7.4792 5.41021,-8.4596 -1.061402,-0.9492 -7.23423,2.5964 -8.540723,4.1358 l -1.473546,1.7358 0.197806,-0.9957 c -1.45431,-2.177 4.551766,-5.8156 1.899429,-5.6184 -2.428493,0.1805 -5.30413,2.9265 -5.253245,4.4694 0.08596,2.6066 0.816233,3.1771 -1.511329,7.6456 -1.663326,3.0458 -4.495351,6.35 -6.883824,8.8158 -7.114726,-5.702 -7.132269,-15.8577 -10.949858,-23.39124 -1.034214,-2.04096 -3.032544,-3.18582 -5.12296,-3.17163 z" />
        <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:2;stroke-miterlimit:10;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" d="m 61.120202,1005.1246 19.164295,-13.02982 c 0.787459,-0.53539 1.902142,-0.36929 2.499291,0.37243 0.597149,0.74172 0.443939,1.76987 -0.34352,2.30526 l -19.164295,13.02983 c -0.78746,0.5354 -1.902142,0.3693 -2.499291,-0.3725 -0.597149,-0.7417 -0.44394,-1.7698 0.34352,-2.3052 z" />
    </g>
      <g v-if="num">
        <circle cx="75" cy="100" r="22"></circle>
        <text x="66" y="109" fill="white" font-size="30px" text-anchor="center" font-weight="bold">
          {{num}}
        </text>
      </g>
    <!-- <text x="0" y="115" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Bastien Ho</text>
    <text x="0" y="120" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text> -->
</svg>
</template>

<style lang="scss">
  @import '../../../custom-bootstrap.scss';
  #user path {
    fill: $red !important;
  }

  #user circle {
    fill: $red !important;
    stroke: $dark-red;
    stroke-width: 6;
  }

  #user {
    width: 40%;
  }
</style>

<script>
export default {
  name: 'UserIcon',
  props: {
    num: {
      type: Number,
    },
  },
};
</script>

