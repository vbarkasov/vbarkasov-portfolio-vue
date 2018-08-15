<template>
  <div id="app" class="container-fluid">
    <Header></Header>
    <div class="row mb-3 content-container">
      <div class="col-12">
        <router-view v-bind:items="items"/>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

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
    $.ajax({
      url: '/static/portfolio/data.json',
      dataType: 'json'
    }).done(function(data) {
      const sortedItems = data.items.sort((a, b) => {
          // sort by time (newest in up)
          if(new Date(a.timeText) > new Date(b.timeText)) {
            return -1;
          }
          if(new Date(a.timeText) < new Date(b.timeText)) {
            return 1;
          }
          return 0
      });

      self.items = Object.assign([], self.items, sortedItems);
    }).fail(function(jqXHR, textStatus) {
      console.log(jqXHR);
      console.log(textStatus);
    });
  },
  components: {
    Header,
    Footer
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
</style>
