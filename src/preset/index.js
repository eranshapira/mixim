import angular from 'angular';

const mainTrack = {
  name: 'Israel anthem',
  url: '/_assets/mainTrack.mp3',
};

const tracks = [{
    index: 1,
    name: 'Hairdryer',
    url: 'http://shapiraweb.com/ronen/Hairdryer.mp3',
    cue: 10,
    gain: 0
  }, {
    index: 2,
    name: 'Phone Ringing',
    url: 'http://shapiraweb.com/ronen/Phone_Ringing.mp3',
    cue: 20,
    gain: 0
  }, {
    index: 3,
    name: 'Kitchen Noises',
    url: 'http://shapiraweb.com/ronen/Kitchen_Noises.mp3',
    cue: 30,
    gain: 0
  }, {
    index: 4,
    name: 'Toliet Flush',
    url: 'http://shapiraweb.com/ronen/Toliet_Flush_Very_Close.mp3',
    cue: 40,
    gain: 0
}];

export default angular.module('imax.presets', [])
  .constant('Preset', {
      name: 'First preset',
      mainTrack,
      tracks,
  })
  .name;
