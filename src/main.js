// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import layout from './components/layout'

import indexPage from './pages/index'
import detailPage from './pages/detail'
import detailCountPage from './pages/detail/count'
import detailForecastPage from './pages/detail/forecast'
import detailAnalysisPage from './pages/detail/analysis'
import detailPublistPage from './pages/detail/publist'
import orderListPage from './pages/orderListPage'

Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(VueRouter);
Vue.use(VueResource);
let router = new VueRouter({
	mode:'hash',
	
	routes:[
		{
			path:'/',
			component:indexPage
		},
		{
			path:'/orderList',
			component:orderListPage
		},
		{
			path:'/detail',
			component:detailPage,
			redirect:'/detail/count',
			children:[
				{
					path:'count',
					component:detailCountPage
				},
				{
					path:'forecast',
					component:detailForecastPage
				},
				{
					path:'analysis',
					component:detailAnalysisPage
				},
				{
					path:'publist',
					component:detailPublistPage
				},
			]
		}
	
	]
	
	
})
new Vue({
  el: '#app',
  router,
  components: { layout },
  template: '<layout/>'
})
