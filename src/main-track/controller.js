export default class MainTrackComponentController {
  constructor(ngAudio, Preset) {
    this.ngAudio = ngAudio;
    this.tracks = Preset.tracks;
  }

  ready(wavesurfer) {
    this.wavesurfer = wavesurfer;
    this.onReady(wavesurfer);
    this.wavesurfer.on('audioprocess', checkForTrigger.bind(this));
    this.wavesurfer.on('play', () => {
      this.lastPosition = 0;
    });
  }
}

function checkForTrigger() {
  this.currentPosition = this.wavesurfer.getCurrentTime();
  const triggers = getTriggers(this.insertions, this.lastPosition, this.currentPosition);
  this.lastPosition = this.currentPosition;
  playInsertions(triggers, this.ngAudio, this.tracks);
}

function getTriggers(insertions, start, end) {
  return insertions.filter(x => x.cue >= start && x.cue <= end);
}

function playInsertions(triggers, ngAudio, tracks) {
  triggers.forEach((item) => {
    playAudio(tracks.find(x => x.index === item.id), ngAudio);
  })
}

function playAudio(track, ngAudio) {
  ngAudio.play(track.url);
  // console.log('playing', track.url);
}
