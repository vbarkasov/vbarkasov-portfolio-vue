<template>
  <div class="static-content px-4 mx-auto">
    <vue-headful
      title="Vladimir Barkasov - Contacts"
    />
    <h1 class="text-center">Contacts</h1>
    <address>
      <strong>Telegram: </strong>
      <a href="https://t.me/vbarkasov">@vbarkasov</a>
    </address>

    <address>
      <strong>Email: </strong>
      <a v-on:click.prevent="showPopup" href="">vbarkasov4pub@gmail.com</a>
    </address>
  </div>
</template>

<script>
export default {
  name: 'Contacts',
  data () {
    return {
      title: 'Contacts'
    }
  },
  methods: {
    showPopup () {
      this.$store.dispatch('setEmailPopupVisibilityStatus', true)
    }
  }
}
</script>

<style scoped>
  .static-content {
    max-width: 300px;
  }
</style>
