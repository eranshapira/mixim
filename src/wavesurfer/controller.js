import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js';

let counter = 0;
export default class WavesurferComponentController {
  constructor($element, $scope) {
    'ngInject';
    counter++;
    this.$element = $element;
    this.$scope = $scope;
  }

  $onChanges(changes = {}) {
    if (changes.url && this.wavesurfer) {
      this.wavesurfer.load(changes.url);
    }
  }

  $postLink() {
    this.wavesurfer = WaveSurfer.create({
      container: this.$element[0],
      waveColor: 'rgba(100, 100, 255, 0.7)',
      progressColor: 'purple'
    });
    this.wavesurfer.load(this.url);
    this.wavesurfer.on('ready', () => {
      this.onReady({ wavesurfer: this.wavesurfer });
      this.$scope.$evalAsync();
    });
  }
}
