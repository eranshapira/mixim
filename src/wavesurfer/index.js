import angular from 'angular';
import ngMaterial from 'angular-material';
import ngAria from 'angular-aria';
import ngAnimate from 'angular-animate';

import component from './component.js';
import './style.less';

export default angular.module('imix.wavesurfer', [
  ngMaterial,
  ngAria,
  ngAnimate,
])
.component('mxWavesurfer', component)
.name;
