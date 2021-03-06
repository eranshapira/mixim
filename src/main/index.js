import angular from 'angular';

import './style.less';

import wavesurfer from '../wavesurfer';
import track from '../track';
import mainTrack from '../main-track';
import preset from '../preset';

import component from './component.js';

export default angular.module('imix.main', [
  wavesurfer,
  preset,
  track,
  mainTrack,
])
.component('mxMain', component)
.name;
