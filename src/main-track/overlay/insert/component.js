import controller from './controller';

export default {
  template: require('./template.html'),
  bindings: {
    insert: '<',
    trackDuration: '<',
  },
  controller,
};
