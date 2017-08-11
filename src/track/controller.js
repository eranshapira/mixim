export default class TrackComponentController {
  constructor($element, $scope, ngAudio) {
    'ngInject';
    this.$element = $element;
    this.$scope = $scope;
    this.ngAudio = ngAudio;
  }

  $onInit() {
    this.audio = this.ngAudio.load(this.track.url);
  }

  $postLink() {
  }
}
