import Vue from 'vue'
import Router from 'vue-router'
import Machine from '@/components/page/machine/machine'
import Uigrab from '@/components/page/uigrab/uigrab'
import Uicheck from '@/components/page/uicheck/uicheck'
import oHelp from '@/components/components/setting/page/help/help'
import oRecord from '@/components/components/setting/page/record/record'
import oSet from '@/components/components/setting/page/oset/oset'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import bus from 'vue-bus';


Vue.use(iView);
Vue.use(Router);
Vue.use(bus);


export default new Router({
  routes: [
	   {
	   	path:'/',
	   	name:'Machine',
	   	component:Machine,
	   	meta:{
	   		keepAlive:true
	   	}
	   },
	   {//qidongjiankong
      path: '/startup',
      name: 'Uicheck',
      component: Uicheck
    },
    {
      path: '/uigrab',
      name: 'Uigrab',
      component: Uigrab
    },
    {
      path: '/help',
      name: 'oHelp',
      component: oHelp
    },
    {
      path: '/record',
      name: 'oRecord',
      component: oRecord
    },
    {
      path: '/oset',
      name: 'oSet',
      component: oSet
    },
  ]
})
