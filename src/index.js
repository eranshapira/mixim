import angular from 'angular';

import 'angular/angular-csp.css';
import './index.less';
import mainModule from './main';

export default angular.module('imix', [
  mainModule,
])
.name;

angular.bootstrap(document.documentElement, ['imix']);
