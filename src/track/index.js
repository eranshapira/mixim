import angular from 'angular';

import component from './component.js';
import './style.less';
import ngAudio from './ngAudio.js'

export default angular.module('imix.track', [
  ngAudio,
])
.component('mxTrack', component)
.name;
