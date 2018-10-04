<template>
  <div>
    <div class="item-block pb-md-4 mx-auto text-center">
      <vue-headful
        :title="pageTitle"
      />
      <h1>{{ item.title }}</h1>
      <p v-html="item.description"></p>

      <ul class="features-list">
        <li v-for="feature in item.features" class="text-left">{{ feature }}</li>
      </ul>

      <div v-for="link in item.links" class="mb-3">
        <a :href="link.href" target="_blank" class="btn btn-secondary">
          <fa-icon :icon="link.icon" />
          {{ link.title }}
          <fa-icon icon="external-link-alt" />
        </a>
      </div>

      <div class="mb-3">
        <router-link
          v-for="tag in item.tags"
          :key="tag"
          :to="{ name: 'Tags', params: { tags: tag }}"
          class="btn btn-light btn-sm mr-1 mb-1">
          {{ tag }}
        </router-link>
      </div>

      <swiper :options="swiperOption" v-if="item.images.length > 1">
        <swiper-slide v-for="(image, index) in item.images" :key="`fruit-${index}`" class="mb-4">
          <img :src="image" alt="" class="img-thumbnail item-image"/>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <div v-else-if="item.images.length === 1" class="mb-4">
          <img :src="item.images[1]" alt="" class="img-thumbnail item-image"/>
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
      slug: '',
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
      }
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
    },
    pageTitle: function() {
      return this.item.title + ' - Portfolio of Vladimir Barkasov'
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

  .features-list {
    display: inline-block;
  }
</style>
