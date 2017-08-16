import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';

export default class WavesurferComponentController {
  constructor($element, $scope) {
    'ngInject';
    this.$element = $element;
    this.$scope = $scope;
  }

  $onChanges(changes = {}) {
    if (changes.url && this.wavesurfer) {
      this.wavesurfer.load(changes.url);
    }
  }

  $onInit() {
    const wavesurfer = WaveSurfer.create({
      container: this.$element[0],
      waveColor: 'rgba(100, 100, 255, 0.7)',
      progressColor: 'purple',
    });
    this.wavesurfer = wavesurfer;
    if (this.url) {
      wavesurfer.load(this.url);
    }
    wavesurfer.on('ready', () => {
      inactiveTrack(wavesurfer);
      this.onReady({ wavesurfer: wavesurfer });
      this.$scope.$evalAsync();
    });
    wavesurfer.on('pause', () => {
      inactiveTrack(wavesurfer);
    });
    wavesurfer.on('play', () => {
      activeTrack(wavesurfer);
    });
  }
}

function inactiveTrack(ws) {
  ws.params.container.style.opacity = 0.6;
}

function activeTrack(ws) {
  ws.params.container.style.opacity = 1;
}
