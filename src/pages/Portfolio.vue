<template>
  <div class="portfolio-list card-columns">
    <portfolio-card
      v-for="item in items"
      v-bind:item="item"
      v-bind:key="item.id"
    ></portfolio-card>
  </div>
</template>

<script>
import PortfolioCard from '../components/PortfolioCard.vue'

export default {
  name: 'Portfolio',
  data () {
    return {
      title: 'Portfolio'
    }
  },
  methods: {},
  props: ['items'],
  components: {
    PortfolioCard
  }
}
</script>

<style scoped>
</style>
