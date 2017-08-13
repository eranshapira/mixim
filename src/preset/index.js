import angular from 'angular';

const mainTrack = {
  name: 'Israel anthem',
  url: '/_assets/mainTrack.mp3',
};

const tracks = [{
    index: 1,
    name: 'Hairdryer',
    url: 'http://shapiraweb.com/ronen/Hairdryer.mp3',
  }, {
    index: 2,
    name: 'Phone Ringing',
    url: 'http://shapiraweb.com/ronen/Phone_Ringing.mp3',
  }, {
    index: 3,
    name: 'Kitchen Noises',
    url: 'http://shapiraweb.com/ronen/Kitchen_Noises.mp3',
  }, {
    index: 4,
    name: 'Toliet Flush',
    url: 'http://shapiraweb.com/ronen/Toliet_Flush_Very_Close.mp3',
}];

const insertions = [{
  id: 1,
  cue: 3,
  gain: 0
}, {
  id: 1,
  cue: 50,
  gain: 0,
}, {
  id: 2,
  cue: 60,
  gain: 0,
}, {
  id: 2,
  cue: 14,
  gain: 0,
}, {
  id: 3,
  cue: 71,
  gain: 0,
}, {
  id: 4,
  cue: 6,
  gain: 0,
}];

export default angular.module('imax.presets', [])
  .constant('Preset', {
      name: 'First preset',
      mainTrack,
      tracks,
      insertions,
  })
  .name;
