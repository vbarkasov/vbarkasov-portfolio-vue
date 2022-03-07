<template>
  <div class="portfolio-list card-columns px-4">
    <vue-headful
      title="Vladimir Barkasov - Portfolio site of front-end developer"
    />
    <portfolio-card
      v-for="item in portfolioSorted"
      v-bind:item="item"
      v-bind:key="item.id"
    ></portfolio-card>
  </div>
</template>

<script>
import PortfolioCard from '../components/PortfolioCard.vue'
import portfolioItems from '@/store/data.json'

export default {
  name: 'Portfolio',
  data () {
    return {
      title: 'Portfolio',
      portfolioSorted: []
    }
  },
  props: ['items'],
  components: {
    PortfolioCard
  },
  created () {
    const portfolioSorted = portfolioItems.items.sort((a, b) => {
      const timeA = new Date(a.timeText).getTime()
      const timeB = new Date(b.timeText).getTime()
      if (timeA > timeB) {
        return -1
      }
      if (timeA < timeB) {
        return 1
      }
      return 0
    })
    this.portfolioSorted = portfolioSorted
  }
}
</script>

<style scoped>
</style>
