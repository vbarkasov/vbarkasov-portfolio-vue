<template>
  <div class="card" :data-id="item.id">
    <img class="card-img-top" :src="item.previewImage" :alt="item.title">
    <div class="card-body">
      <h5 class="card-title">{{ item.title }}</h5>
      <p class="card-text" v-html="item.description"></p>
      <div class="mb-3">
        <router-link v-for="tag in item.tags" :to="{ name: 'Tags', params: { tags: tag }}" class="btn btn-light btn-sm mr-1 mb-1">
          {{ tag }}
        </router-link>
      </div>
      <p class="card-text time-text">
        <small class="text-muted">{{ item.timeText }}</small>
      </p>
      <router-link :to="{ name: 'PortfolioItem', params: { itemSlug: item.slug }}" class="btn btn-outline-primary">
        Подробнее
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'portfolio-card',
  data () {
    return {
      title: 'Portfolio Card',
    }
  },
  props: ['item'],
  methods: {
    moreInfo: function(itemId) {
      alert('click ' + itemId);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .card .time-text {
    position: absolute;
    right: 20px;
    bottom: 3px;
  }
</style>
