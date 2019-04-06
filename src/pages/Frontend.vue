<template>
<div class="static-content px-4 mx-auto">
  <vue-headful
    title="front-end with a Vue.js - Portfolio site of Vladimir Barkasov "
  />
  <div class="text-center">
    <img class="mb-4 img-fluid rounded" src="/static/img/popeye-vue.png" alt="front-end with vue" />
  </div>
  <div>
    <h1 class="text-center">Front-end with Vue.js</h1>
    <p>
      Do you need create front-end for your site use one of modern front-end frameworks?
      Or do you need fast and cool single page application (SPA)?
      Choose <a href="https://vuejs.org/" target="_blank">Vue.js!</a>
    </p>

    <p>What is Vue.js? Vue.js is the progressive javascript framework for fast development.</p>

    <h2>Benefits of using Vue.js:</h2>
    <ul>
      <li>Development speed</li>
      <li>Ease of support</li>
      <li>Huge developer community</li>
      <li>Availability of ready-made themes and interface elements (I recommend <a href="https://vuetifyjs.com/" target="_blank">Vuetify</a>)</li>
    </ul>
  </div>
  <h2>Examples:</h2>
  <div class="portfolio-list card-columns px-6">
    <portfolio-card
      v-for="item in results"
      v-bind:item="item"
      v-bind:key="item.id"
    ></portfolio-card>
  </div>
</div>
</template>

<script>
import PortfolioCard from '../components/PortfolioCard.vue'

export default {
  name: 'Frontend',
  props: ['items'],
  components: {
    PortfolioCard
  },
  data () {
    return {
      title: 'Front-end with a Vue.js',
    }
  },
  computed: {
    results: function() {
      let results = [];

      if(this.items.length === 0) {
        return results;
      }

      for(let i=0, len=this.items.length; i<len; i++) {
        if(this.items[i].tags.indexOf('vue') !== -1) {
          results.push(this.items[i]);
        }
      }
      return results;
    }
  }
}
</script>

<style scoped></style>
