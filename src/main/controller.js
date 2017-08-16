export default class MainController {
  constructor(Preset, $scope) {
    this.Preset = Preset;
    this.mainTrack = Preset.mainTrack;
    this.tracks = Preset.tracks;
    this.insertions = Preset.insertions;
    this.$scope = $scope;
    this.currentTime = 0;
    this.updateCurrentTime = updateCurrentTime.bind(this);
  }

  onReady(wavesurfer) {
    this.wavesurfer = wavesurfer;
    wavesurfer.on('audioprocess', () => this.currentTime = this.wavesurfer.getCurrentTime());
    wavesurfer.on('seek', this.updateCurrentTime);
  }

  deleteTrack(index) {
    return this.tracks.splice(index, 1);
  }

  addTrack() {
    this.tracks.push({ index: Math.max(0, ...(this.tracks.map(x => x.index + 1))) });
    return this.tracks;
  }

  addInsert(track) {
    this.insertions.push({ id: track.index, cue: this.currentTime, gain: 0 });
  }
}

function updateCurrentTime() {
  this.currentTime = this.wavesurfer.getCurrentTime();
  $scope.$apply();
}
