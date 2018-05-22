<template>
  <nav class="my-2 my-md-0 mr-md-3">
    <a v-for="item in menuItems" :href="item.href" class="p-2 text-dark">{{ item.title }}</a>
  </nav>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
      menuItems: [
        {
          "title": 'Главная',
          "href": '#/'
        },
        {
          "title": 'Расширения',
          "href": '#/tags/extension'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
