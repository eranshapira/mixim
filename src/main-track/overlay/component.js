import controller from './controller';

export default {
  template: require('./template.html'),
  bindings: {
    insertions: '<',
    trackDuration: '<',
  },
  controller,
};
