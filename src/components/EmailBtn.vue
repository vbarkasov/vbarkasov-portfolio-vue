<template>
  <div>
    <a class="vb-icon email hvr-float-shadow" v-on:click="showPopup($event)" href="">Send email</a>
    <div id="sendmail-popup" class="modal" v-bind:class="{'showed' : popupIsVisible }" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Send message</h2>
            <button v-on:click.prevent="popupIsVisible = false" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="sendmail-form" name="sendmail-form">
              <div class="form-group">
                <label for="user-message">Your message *</label>
                <textarea v-model="message" class="form-control" id="user-message" rows="3" required></textarea>
              </div>
              <div class="form-group">
                <label for="user-email">Your email for answer *</label>
                <input v-model="email" type="email" class="form-control" id="user-email" placeholder="name@example.com" required>
              </div>
              <div class="form-group">
                <label for="user-name">Your name</label>
                <input v-model="name"  type="text" class="form-control" id="user-name" placeholder="Name">
              </div>
              <div class="g-recaptcha" data-sitekey="6LcUkV0UAAAAADuwEqgKLHC5P3lQ1KKx5OiMGXRP"></div>
            </form>
            <div v-if="userMessage" :class="['alert-' + userMessageType]" class="mb-0 mt-3 alert">
              {{ userMessage }}
            </div>
          </div>
          <div class="modal-footer">
            <button v-on:click.prevent="sendMail" type="submit" class="btn btn-primary">Send</button>
            <button v-on:click.prevent="popupIsVisible = false" type="button" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailBtn',
  data () {
    return {
      popupIsVisible: false,
      userMessage: '',
      userMessageType: '',
      message: '',
      email: '',
      name: ''
    }
  },
  methods: {
    showPopup: function(e){
      e.preventDefault();
      this.userMessage = '';
      this.userMessageType = '';
      this.popupIsVisible = true;
    },
    sendMail: function() {
      const self = this;

      $.ajax({
        type:'POST',
        url:'/sendmail.php',
        dataType: 'json',
        data: {
          name: self.name,
          email: self.email,
          message: self.message,
          'g-recaptcha-response': document.getElementById('g-recaptcha-response').value
        }
      }).done(function(data, textStatus, jqXHR) {
        self.userMessage = 'The message is sent successfully';
        self.userMessageType = 'success';
      }).fail(function(jqXHR, textStatus, errorThrown ) {
        self.userMessage = 'The message is not delivered';
        self.userMessageType = 'danger';
      });
    }
  },
  mounted() {
    let recaptchaScript = document.createElement('script');
    recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
    recaptchaScript.async = true;
    document.head.appendChild(recaptchaScript);
  },
}
</script>

<style scoped>
  .modal.showed {
    display: block;
  }
</style>
