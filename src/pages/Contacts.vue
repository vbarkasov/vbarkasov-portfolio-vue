<template>
  <div class="static-content px-4 mx-auto">
    <h1 class="text-center">Contacts</h1>
    <address>
      <strong>Telegram:</strong>
      <a href="tg://resolve?domain=breakingmash">@vbarkasov</a>
    </address>

    <address>
      <strong>Skype:</strong>
      <a href="skype:vbarkasov?add">vbarkasov</a>
    </address>

    <address>
      <strong>Email:</strong>
      <a href="">vbarkasov4pub@gmail.com</a>
    </address>
  </div>
</template>

<script>
export default {
  name: 'Contacts',
  data () {
    return {
      title: 'Contacts',
    }
  }
}
</script>

<style scoped>
  .static-content {
    max-width: 300px;
  }
</style>
