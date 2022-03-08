<template>
  <div id="app" class="container-fluid">
    <Header></Header>
    <div class="row mb-3 content-container">
      <div class="col-12 p-0">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
    <Footer></Footer>
    <SendMessagePopup></SendMessagePopup>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SendMessagePopup from '@/components/SendMessagePopup.vue'
import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/styles/main.scss'

export default {
  name: 'App',
  data () {
    return {
      title: 'Vladimir Barkasov - Portfolio'
    }
  },
  components: {
    Header,
    Footer,
    SendMessagePopup
  }
}
</script>

<style>
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
