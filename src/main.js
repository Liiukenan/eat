import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResouce from 'vue-resource'
import store from './store.js'
Vue.use(VueResouce)
Vue.use(VueRouter)
Vue.config.productionTip = false;
import goods from './components/goods.vue';
import ratings from './components/ratings.vue';
import seller from './components/seller.vue';
const router=new VueRouter({
	linkActiveClass:'active',
	routes:[
	{
		path:'/',
		redirect:'/goods',
		component:goods
	},
	{
		path:'/goods',
		component:goods
	},
	{
		path:'/ratings',
		component:ratings
	},
	{
		path:'/seller',
		component:seller
	},
	]
})
new Vue({
  store,
  router,
  render:h=>h(App)
}).$mount('#app')
