import controller from './controller';

export default {
  template: require('./template.html'),
  bindings: {
    onReady: '&',
    mainTrack: '<',
    insertions: '<',
  },
  controller,
};
