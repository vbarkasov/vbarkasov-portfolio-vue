<template>
  <div class="px-4">
    <vue-headful
      :title="pageTitle"
    />
    <h1>Search results by tag: <span v-for="tag in tags" :key="tag">{{ tag }}</span></h1>
    <div class="portfolio-list card-columns">
      <portfolio-card
        v-for="result in results"
        v-bind:item="result"
        v-bind:key="result.id"
      ></portfolio-card>
    </div>
  </div>
</template>

<script>
import PortfolioCard from '../components/PortfolioCard.vue'

export default {
  'name': 'Tags',
  data () {
    return {
      'title': 'Tags'
    }
  },
  'props': ['items'],
  'computed': {
    'results': function () {
      const results = new Set()

      if (this.items.length === 0 || this.tags.length === 0) {
        return
      }

      for (let ti = 0, tlen = this.tags.length; ti < tlen; ti++) {
        for (let ii = 0, ilen = this.items.length; ii < ilen; ii++) {
          if (this.items[ii].tags.indexOf(this.tags[ti]) !== -1) {
            results.add(this.items[ii])
          }
        }
      }
      return Array.from(results)
    },
    'tags': function () {
      let tags = decodeURIComponent(this.$route.params.tags)
      if (tags) {
        tags = tags.split('&')
      }
      return tags
    },
    'pageTitle': function () {
      return this.tags.join(' ') + ' - Portfolio site of Vladimir Barkasov'
    }
  },
  'mounted': function () {},
  'components': {
    PortfolioCard
  },
  'methods': {}
}
</script>

<style scoped></style>
