import angular from 'angular';

import './style.less';

import wavesurfer from '../wavesurfer';
import track from '../track';
import preset from '../preset';

import trackOverlay from './overlay';
import component from './component.js';


export default angular.module('imix.mainTrack', [
  wavesurfer,
  preset,
  track,
  trackOverlay,
])
.component('mxMainTrack', component)
.name;
