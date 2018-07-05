// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import layout from './components/layout'
import indexPage from './pages/index'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(VueRouter);
Vue.use(VueResource);
let router = new VueRouter({
	mode:'history',
	
	routes:[
		{
			path:'/',
			component:indexPage
		}
	
	]
	
	
})
new Vue({
  el: '#app',
  router,
  components: { layout },
  template: '<layout/>'
})
