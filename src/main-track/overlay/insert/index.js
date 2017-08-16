import angular from 'angular';

import './style.less';

import component from './component.js';

export default angular.module('imix.mainTrack.overlay.insert', [
])
.component('mxOverlayInsert', component)
.filter('secondsToDateTime', function() {
    return function(seconds) {
        var d = new Date(0,0,0,0,0,0,0);
        d.setSeconds(seconds);
        return d;
    };
})
.name;
