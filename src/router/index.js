import Vue from 'vue'
import Router from 'vue-router'
import Portfolio from '@/pages/Portfolio'
import PortfolioItem from '@/pages/PortfolioItem'
import Tags from '@/pages/Tags'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Portfolio',
      component: Portfolio
    },
    {
      path: '/portfolio/:itemSlug',
      name: 'PortfolioItem',
      component: PortfolioItem
    },
    {
      path: '/tags/:tags',
      name: 'Tags',
      component: Tags
    }
  ]
})
