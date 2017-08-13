export default class MainController {
  constructor(Preset) {
    this.Preset = Preset;
    this.mainTrack = Preset.mainTrack;
    this.tracks = Preset.tracks;
    this.insertions = Preset.insertions;
  }

  onReady(wavesurfer) {
    this.wavesurfer = wavesurfer;
  }

  deleteTrack(index) {
    return this.tracks.splice(index, 1);
  }

  addTrack() {
    this.tracks.push({ index: Math.max(0, ...(this.tracks.map(x => x.index + 1))) });
    return this.tracks;
  }
}
