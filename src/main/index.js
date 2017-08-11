import angular from 'angular';

import './style.less';

import wavesurfer from '../wavesurfer';
import preset from '../preset';
import component from './component.js';

export default angular.module('imix.main', [
  wavesurfer,
  preset,
])
.component('mxMain', component)
.name;
