import Vue from 'vue';
import './ui-framework/uview-ui';
import App from './App.vue';

Vue.config.productionTip = false;

const app = new (
  typeof App === 'function' ? App : Vue.extend(Object.assign({ mpType: 'app' }, App))
)();
app.$mount();
