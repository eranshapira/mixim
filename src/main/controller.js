export default class MainController {
  constructor(Preset) {
    this.mainTrack = Preset.mainTrack;
  }

  onReady(wavesurfer) {
    this.wavesurfer = wavesurfer;
  }
}
