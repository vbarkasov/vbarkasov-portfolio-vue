<template>
  <div class="portfolio-list card-columns px-4">
    <vue-headful
      title="Vladimir Barkasov - Portfolio site of front-end developer"
    />
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
  props: ['items'],
  components: {
    PortfolioCard
  }
}
</script>

<style scoped>
</style>
