'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = angular.module('mxmx', ['ngMaterial', 'ngAnimate', 'ngAudio', 'wavesurfer.angular']);
var trackComponentTemplate = '<md-card>\n        <md-card-title>\n          <md-card-title-text>\n            <md-input-container>\n  <h6 ng-bind="$ctrl.track.name"></h6>\n<small ng-bind="$ctrl.track.url"></small>\n          </md-card-title-text>\n          <md-card-title-media>\n          </md-card-title-media>\n        </md-card-title>\n        <md-card-content>\n         <div flex layout="row">\n          <div layout-align="start center" flex>\n            <p>{{$ctrl.audio.currentTime}}</p>    \n         </div>\n          <div>\n            <p>{{$ctrl.audio.remaining}}</p>    \n          </div>\n         </div>\n          <p ng-if="$ctrl.audio.canPlay" ng-init="$ctrl.mxAudioContext.setReady($ctrl.track)">\n         <md-slider flex min="0" max="{{ $ctrl.audio.duration }}" ng-model="$ctrl.audio.currentTime">\n   <md-progress-linear md-mode="determinate" value="{{$ctrl.audio.progress * 100}}"></md-progress-linear>\n          </p>\n        </md-card-content>\n        <md-card-actions layout="row" layout-align="end center">\n          <md-button class="md-icon-button" aria-label="Play" ng-click="$ctrl.audio.play()" ng-show="$ctrl.audio.paused">\n            <i class="fa fa-play" aria-hidden="true"></i>\n          </md-button>\n          <md-button class="md-icon-button" aria-label="Stop" ng-click="$ctrl.audio.pause()" ng-show="$ctrl.audio.canPlay && !$ctrl.audio.paused">\n            <i class="fa fa-pause" aria-hidden="true"></i>\n          </md-button>\n          <md-button class="md-icon-button" aria-label="Decrease volume">\n            <i class="fa fa-volume-down" aria-hidden="true"></i>\n          </md-button>\n          <md-button class="md-icon-button" aria-label="Increase volume">\n            <i class="fa fa-volume-up" aria-hidden="true"></i>\n          </md-button>\n        </md-card-actions>\n      </md-card>';
var mainTrack = {
    name: 'Israel Anthem',
    url: 'http://www.noiseaddicts.com/samples_1w72b820/4207.mp3',
    options: {},
    endSeconds: 0,
    startSeconds: 0,
    delay: 0,
    gain: 0
};
var tracks = [{
    name: 'Hairdryer',
    url: 'http://shapiraweb.com/ronen/Hairdryer.mp3',
    cue: 10,
    gain: 0
}, {
    name: 'Phone Ringing',
    url: 'http://shapiraweb.com/ronen/Phone_Ringing.mp3',
    cue: 20,
    gain: 0
}, {
    name: 'Kitchen Noises',
    url: 'http://shapiraweb.com/ronen/Kitchen_Noises.mp3',
    cue: 30,
    gain: 0
}, {
    name: 'Toliet Flush',
    url: 'http://shapiraweb.com/ronen/Toliet_Flush_Very_Close.mp3',
    cue: 40,
    gain: 0
}];
app.constant('Preset', {
    name: 'First preset',
    mainTrack: mainTrack,
    tracks: tracks
});
app.constant('Tracks', tracks);

var TrackController = function () {
    function TrackController(ngAudio, $scope, $timeout, mxAudioContext) {
        _classCallCheck(this, TrackController);

        this.ngAudio = ngAudio;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.mxAudioContext = mxAudioContext;
    }

    TrackController.prototype.$onInit = function $onInit() {
        var _this = this;

        this.audio = this.ngAudio.load(this.track.url);
        this.track.audio = this.audio;
        this.$scope.$on('mxPause', function () {
            _this.$timeout.cancel(_this.delayPlayTimer);
            _this.audio.pause();
        });
        this.$scope.$on('mxPlay', function () {
            _this.delayPlayTimer = _this.$timeout(function () {
                _this.audio.currentTime = _this.mxAudioContext.currentTime + _this.track.startSeconds - _this.track.delay;
                _this.audio.play();
            }, (_this.track.delay - _this.mxAudioContext.currentTime) * 1000);
            if (_this.track.endSeconds) {
                _this.$timeout(function () {
                    _this.audio.pause();
                }, (_this.track.endSeconds - _this.mxAudioContext.currentTime) * 1000);
            }
        });
    };

    return TrackController;
}();

var MixerController = function () {
    function MixerController(Preset, Tracks, mxAudioContext, $scope) {
        _classCallCheck(this, MixerController);

        this.tracks = Tracks;
        this.preset = Preset;
        this.mxAudioContext = mxAudioContext;
        this.$scope = $scope;
    }

    MixerController.prototype.play = function play() {
        this.mxAudioContext.startTime = new Date();
        this.mxAudioContext.playing = true;
        this.$scope.$broadcast('mxPlay');
    };

    MixerController.prototype.pause = function pause() {
        this.mxAudioContext.pauseTime = new Date();
        this.mxAudioContext.playing = false;
        this.mxAudioContext.msPassed = (this.mxAudioContext.pauseTime - this.mxAudioContext.startTime) / 1000;
        this.$scope.$broadcast('mxPause');
    };

    MixerController.prototype.stop = function stop() {
        this.mxAudioContext.msPassed = 0;
        delete this.mxAudioContext.startTime;
        delete this.mxAudioContext.pauseTime;
        this.mxAudioContext.playing = false;
        this.$scope.$broadcast('mxPause');
    };

    return MixerController;
}();

var MxAudioContext = function () {
    function MxAudioContext(Tracks, $rootScope) {
        _classCallCheck(this, MxAudioContext);

        this.currentMs = 0;
        this.tracks = Tracks;
        this.playing = false;
        this.readyTracks = 0;
        this.$rootScope = $rootScope;
    }

    MxAudioContext.prototype.setReady = function setReady(track) {
        this.readyTracks++;
        if (this.readyTracks === this.tracks.length) {
            this.$rootScope.$broadcast('mxReady');
        }
    };

    _createClass(MxAudioContext, [{
        key: 'ready',
        get: function get() {
            return this.readyTracks === this.tracks.length;
        }
    }, {
        key: 'duration',
        get: function get() {
            var _Math;

            return (_Math = Math).max.apply(_Math, this.tracks.map(function (x) {
                return (x.endSeconds || x.audio.audio.duration) - x.startSeconds + x.delay;
            }));
        }
    }, {
        key: 'currentTime',
        get: function get() {
            var _Math2;

            return (_Math2 = Math).min.apply(_Math2, [0].concat(this.tracks.map(function (x) {
                return Math.max(0, (x.audio.currentTime || 0) + x.delay - x.startSeconds);
            })));
        },
        set: function set(durationValue) {
            this.msPassed = durationValue;
            this.tracks.forEach(function (x) {
                return x.audio.currentTime = durationValue - x.startSeconds + x.delay;
            });
        }
    }]);

    return MxAudioContext;
}();

app.controller('MixerController', MixerController);
app.component('mxTrack', {
    bindings: {
        track: '<',
        timeDelay: '<'
    },
    template: trackComponentTemplate,
    controller: TrackController
});

app.service('mxAudioContext', MxAudioContext)(function (angular, WaveSurfer) {
    'use strict';

    var module = angular.module('wavesurfer.angular', ['ui.slider']);

    module.directive('wavesurfer', wavesurferDirective).filter('hms', hmsFilter);

    wavesurferDirective.$inject = ['$rootScope', '$timeout'];
    function wavesurferDirective($rootScope, $timeout) {
        var uuid = 1;

        return {
            restrict: 'AE',
            scope: {
                url: '=',
                peaks: '=?',
                autoLoad: '=?',
                options: '='

            },
            template: '<div class="waveform" id="{{::uniqueId}}">\n    <div class="waveform-control">\n        <span ng-click="load()">\n            <i class="fa" ng-class="{\'fa-spinner fa-spin\': isLoading, \'fa-play\' : !isPlaying, \'fa-pause\': isPlaying}"></i>\n        </span>\n    </div>\n    <div class="waveform-volume">\n        <i class="fa fa-volume-up" ng-click="isVolumeActive = !isVolumeActive"></i>\n        <div class="volume-control" ng-class="{active: isVolumeActive}">\n            <div ui-slider="{orientation: \'vertical\', range: \'min\'}" class="slider"\n                 min="0"\n                 max="100"\n                 step="1"\n                 ng-model="volume">\n            </div>\n        </div>\n    </div>\n    <div class="waveform-wavesurfer">\n        <div class="time-total">{{progress | hms}}</div>\n        <div class="time-left">-{{remaining | hms}}</div>\n        <div class="audio">\n            <div class="default-wave" ng-show="!isWavesurferLoaded()" ng-style="{\'margin-top\': defaultWavePosition}"></div>\n        </div>\n    </div>\n</div>',
            link: function link(scope, element) {
                var waveformContainer = element.find('div.audio')[0],
                    length = 0,
                    wavesurfer = undefined,
                    defaultOptions = {
                    hideScrollbar: true,
                    height: 50,
                    waveColor: "#337ab7",
                    normalize: true,
                    progressColor: "#23527c",
                    container: waveformContainer
                };

                var options = angular.extend(defaultOptions, scope.options);

                waveformContainer.style.height = options.height + 'px';

                scope.isPlaying = false;
                scope.isLoading = false;
                scope.uniqueId = 'waveform_' + uuid++;
                scope.isVolumeActive = false;
                scope.volume = 50;
                scope.progress = 0;
                scope.remaining = 0;
                scope.autoLoad = !!scope.autoLoad;
                scope.defaultWavePosition = options.height / 2;

                /**
                 * On ready
                 */
                var ready = function ready() {
                    length = Math.floor(wavesurfer.getDuration());

                    if (!scope.autoLoad) {
                        scope.$emit('wavesurfer:stop');
                    }

                    $timeout(function () {
                        scope.remaining = length;
                        scope.isLoading = false;
                        scope.playPause();
                    });
                };

                /**
                 * Update time during playing audio
                 * @param {Number} time
                 */
                var audioprocess = function audioprocess(time) {
                    $timeout(function () {
                        scope.progress = time;
                        scope.remaining = length - time;
                    });
                };

                /**
                 * On finish
                 * Move cursor to start
                 */
                var finish = function finish() {
                    scope.isPlaying = false;
                    wavesurfer.seekTo(0);
                };

                /**
                 * Init WaveSurfer functionality
                 * @param {Array} peaks peak array
                 */
                var init = function init(peaks) {
                    wavesurfer = WaveSurfer.create(options);
                    wavesurfer.load(scope.url, peaks || null);

                    wavesurfer.on('ready', ready);
                    wavesurfer.backend.on('audioprocess', audioprocess);
                    wavesurfer.on('finish', finish);

                    scope.$watch('volume', function (value) {
                        if (value) {
                            wavesurfer.setVolume(value / 100);
                        }
                    });
                };

                /**
                 * Load audio record
                 */
                scope.load = function () {
                    if (!angular.isDefined(wavesurfer)) {
                        scope.isLoading = true;
                        init(scope.peaks);
                    } else {
                        if (!wavesurfer.isPlaying()) {
                            scope.$emit('wavesurfer:stop');
                        }
                        scope.playPause();
                    }
                };

                //is autoLoad param is passed
                //load audio file automatically
                if (scope.autoLoad) {
                    scope.load();
                }

                /**
                 * Pause
                 */
                scope.pause = function () {
                    wavesurfer.pause();
                    scope.isPlaying = false;
                };

                /**
                 * Play or pause
                 */
                scope.playPause = function () {
                    scope.isPlaying = !scope.isPlaying;
                    scope.isVolumeActive = false;
                    wavesurfer.playPause();
                };

                /**
                 * Stop
                 */
                scope.stop = function () {
                    wavesurfer.stop();
                    scope.isPlaying = false;
                };

                /**
                 * Forward
                 */
                scope.forward = function () {
                    wavesurfer.skipForward();
                };

                /**
                 * Backward
                 */
                scope.backward = function () {
                    wavesurfer.backward();
                };

                /**
                 * Check if WaveSurfer is loaded
                 * @returns {Boolean}
                 */
                scope.isWavesurferLoaded = function () {
                    return angular.isDefined(wavesurfer);
                };

                /**
                 * Subscribe on wavesurfer:stop event
                 * and stop another wavesurfer
                 */
                $rootScope.$on('wavesurfer:stop', function () {
                    if (angular.isDefined(wavesurfer) && wavesurfer.isPlaying()) {
                        scope.stop();
                    }
                });
            }
        };
    }

    hmsFilter.$inject = [];
    function hmsFilter() {
        return function (str) {
            var duration = parseInt(str, 10),
                hours = Math.floor(duration / 3600),
                minutes = Math.floor((duration - hours * 3600) / 60),
                seconds = duration - hours * 3600 - minutes * 60;

            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return hours + ':' + minutes + ':' + seconds;
        };
    }
}(window.angular, window.WaveSurfer));