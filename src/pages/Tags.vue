<template>
  <div class="portfolio-list card-columns">
    <portfolio-card
      v-for="result in results"
      v-bind:item="result"
      v-bind:key="result.id"
    ></portfolio-card>
  </div>
</template>

<script>
import PortfolioCard from '../components/PortfolioCard.vue'

export default {
  name: 'Tags',
  data () {
    return {
      title: 'Tags'
    }
  },
  props: ['items'],
  computed: {
    results: function() {
      let results = new Set();

      if(this.items.length === 0 || this.tags.length === 0) {
        return;
      }

      for(let ti=0, tlen=this.tags.length; ti<tlen; ti++) {
        for(let ii=0, ilen=this.items.length; ii<ilen; ii++) {
          if(this.items[ii].tags.indexOf(this.tags[ti]) !== -1) {
            results.add(this.items[ii]);
          }
        }
      }
      return Array.from(results);
    },
    tags: function(){
      let tags = decodeURIComponent(this.$route.params.tags);
      if(!!tags) {
        tags = tags.split('&');
      }
      return tags;
    }
  },
  mounted: function(){},
  components: {
    PortfolioCard
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
