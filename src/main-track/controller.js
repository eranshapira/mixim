export default class MainTrackComponentController {
  constructor() {
  }

  ready(wavesurfer) {
    this.wavesurfer = wavesurfer;
    this.onReady(wavesurfer);
  }
}
