<template>
  <div>
    <div class="item-block pb-md-4 mx-auto text-center">
      <h1>{{ item.title }}</h1>
      <p v-html="item.description"></p>
      <div class="mb-3">
        <router-link v-for="tag in item.tags" :key="tag" :to="{ name: 'Tags', params: { tags: tag }}" class="btn btn-light btn-sm mr-1 mb-1">
          {{ tag }}
        </router-link>
      </div>
      <ul>
        <li v-for="feature in item.features" class="text-left">{{ feature }}</li>
      </ul>
      <div v-for="image in item.images" class="mb-4">
        <img :src="image" alt="" class="item-image"/>
      </div>
      <div>
        <small class="text-muted">{{ item.timeText }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioItem',
  data () {
    return {
      title: 'PortfolioItem',
      slug: ''
    }
  },
  props: ['items'],
  computed: {
    item: function() {
      let items = this.items;
      let resultItem = {
        slug: '',
        title: ''
      };

      for(let i in items) if(items.hasOwnProperty(i)) {
        if(items[i].slug === this.slug) {
          resultItem = items[i];
          break;
        }
      }

      return resultItem;
    }
  },

  mounted: function(){
    this.slug = this.$route.params.itemSlug;
    console.log('mounted');
    console.log(this.slug);
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-size: 30px;
  }

  .item-block {
    max-width: 700px;
  }

  .item-image {
    max-width: 100%;
  }
</style>
