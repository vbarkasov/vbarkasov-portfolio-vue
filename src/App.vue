<template>
  <div id="app" class="container-fluid">
    <header class="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
      <a href="" class="navbar-brand mr-0 mr-md-2">
        <img src="./assets/logo-fire.png">
      </a>
      <Menu></Menu>
    </header>
    <div class="row">
      <div class="col-12 align-self-center">
        <router-view v-bind:items="items"/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  data () {
    return {
      title: 'Vladimir Barkasov - Portfolio',
      items: []
    }
  },
  mounted: function () {
    var self = this;
    $.ajax({
      url: '/static/portfolio/data.json',
      dataType: 'json'
    }).done(function(data) {
      self.items = Object.assign([], self.items, data.items);
    }).fail(function(jqXHR, textStatus) {
      console.log(jqXHR);
      console.log(textStatus);
    });
  },
  components: {
    Menu
  }
}
</script>

<style>
  @import '../static/bootstrap.min.css';
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;*/
  }

  .card {
    border: 1px solid rgba(0,0,0,.3)
  }
</style>
