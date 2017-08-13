import angular from 'angular';

import './style.less';

import component from './component.js';
import insert from './insert';

export default angular.module('imix.mainTrack.overlay', [
  insert,
])
.component('mxTrackOverlay', component)
.name;
