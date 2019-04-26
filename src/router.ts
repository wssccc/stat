import Vue from 'vue'
import Router from 'vue-router'
import Charts from '@/views/Charts.vue'
import Table from '@/views/Table.vue'
import Preview from '@/views/Preview.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/charts' },
    {
      path: '/charts',
      name: 'charts',
      component: Charts
    },
    {
      path: '/preview',
      name: 'preview',
      component: Preview
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    }
  ]
})
