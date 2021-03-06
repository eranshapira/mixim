import controller from './controller';

export default {
  template: require('./template.html'),
  bindings: {
    index: '@',
    track: '<',
    onReady: '&',
    onDelete: '&',
    onAdd: '&',
  },
  controller,
};
