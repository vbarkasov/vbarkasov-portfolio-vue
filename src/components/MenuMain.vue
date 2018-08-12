<template>
  <nav class="my-2 my-md-0 mr-md-3 text-center">
    <a v-for="item in menuItems" :href="item.href" class="p-2 text-dark">{{ item.title }}</a>
  </nav>
</template>

<script>
export default {
  name: 'MenuMain',
  data () {
    return {
      menuItems: [
        {
          "title": 'Portfolio',
          "href": '#/'
        },
        {
          "title": 'Browser Extensions',
          "href": '#/page/browser-extensions-development'
        },
        {
          "title": 'About me',
          "href": '#/page/about'
        },
        {
          "title": 'Contact',
          "href": '#/page/contacts'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
