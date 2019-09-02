<template>
  <div id="app" class="container-fluid">
    <Header></Header>
    <div class="row mb-3 content-container">
      <div class="col-12">
        <transition name="fade" mode="out-in">
          <router-view v-bind:items="items"/>
        </transition>
      </div>
    </div>
    <Footer></Footer>
    <SendMessagePopup></SendMessagePopup>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import SendMessagePopup from './components/SendMessagePopup.vue'

export default {
  name: 'App',
  data () {
    return {
      title: 'Vladimir Barkasov - Portfolio',
      items: []
    }
  },
  mounted: function () {
    const self = this;

    fetch('/static/portfolio/data.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        const sortedItems = data.items.sort((a, b) => {
          // sort by time (newest in up)
          if (new Date(a.timeText) > new Date(b.timeText)) {
            return -1;
          }
          if (new Date(a.timeText) < new Date(b.timeText)) {
            return 1;
          }
          return 0
        });

        self.items = Object.assign([], self.items, sortedItems);
      });
  },
  components: {
    Header,
    Footer,
    SendMessagePopup
  }
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  @import 'assets/css/main.css';

  #app {}

  .card {
    border: 1px solid rgba(0,0,0,.3)
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
