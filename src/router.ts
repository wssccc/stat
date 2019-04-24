import Vue from 'vue'
import Router from 'vue-router'
import Charts from './views/Charts.vue'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/table',
      name: 'table',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "table" */ './views/Table.vue')
    }
  ]
})
