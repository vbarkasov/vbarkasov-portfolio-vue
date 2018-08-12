import Vue from 'vue'
import Router from 'vue-router'
import Portfolio from '@/pages/Portfolio'
import PortfolioItem from '@/pages/PortfolioItem'
import Tags from '@/pages/Tags'
import About from '@/pages/About'
import Contacts from '@/pages/Contacts'
import Extensions from '@/pages/Extensions'

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
    },
    {
      path: '/page/about',
      name: 'About',
      component: About
    },
    {
      path: '/page/contacts',
      name: 'Contacts',
      component: Contacts
    },
    {
      path: '/page/browser-extensions-development',
      name: 'Extensions',
      component: Extensions
    }
  ]
})
