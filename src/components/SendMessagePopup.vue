<template>
  <transition name="fade">
    <div id="sendmail-popup" class="modal" v-if="emailPopupIsShown" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Send message</h2>
            <button v-on:click.prevent="hidePopup" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="sendmail-form" name="sendmail-form" method="POST">
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
              <vue-recaptcha :sitekey="gRecaptchaSitekey"></vue-recaptcha>
            </form>
            <div v-if="userMessage" :class="['alert-' + userMessageType]" class="mb-0 mt-3 alert">
              {{ userMessage }}
            </div>
          </div>
          <div class="modal-footer">
            <button v-on:click.prevent="sendMail" type="submit" class="btn btn-primary">Send</button>
            <button v-on:click.prevent="emailPopupIsShown = false" type="button" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import gRecaptchaSitekey from '../config'

export default {
  'name': 'SendMessagePopup',
  'components': {
    VueRecaptcha
  },
  data () {
    return {
      'userMessage': '',
      'userMessageType': '',
      'message': '',
      'email': '',
      'name': '',
      'gRecaptchaSitekey': gRecaptchaSitekey
    }
  },
  'methods': {
    'showPopup': function (e) {
      e.preventDefault()
      this.userMessage = ''
      this.userMessageType = ''
      this.$store.dispatch('setEmailPopupVisibilityStatus', true)
    },
    'hidePopup': function () {
      this.userMessage = ''
      this.userMessageType = ''
      this.$store.dispatch('setEmailPopupVisibilityStatus', false)
    },
    'sendMail': function () {
      const self = this

      const recaptchaResponse = document.getElementById('g-recaptcha-response')
        ? document.getElementById('g-recaptcha-response').value
        : ''
      // console.log('this.$refs.recaptcha');
      // console.log(this.$refs.recaptcha);

      fetch('/sendmail.php', {
        'method': 'POST',
        'headers': {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          'name': self.name,
          'email': self.email,
          'message': self.message,
          'g-recaptcha-response': recaptchaResponse
        })
      })
        .then(response => response.json())
        .then(() => {
          self.userMessage = 'The message is sent successfully'
          self.userMessageType = 'success'
        })
        .catch(() => {
          self.userMessage = 'The message is not delivered'
          self.userMessageType = 'danger'
        })
    }
  },
  'computed': {
    'emailPopupIsShown': {
      set (val) {
        this.$store.dispatch('setEmailPopupVisibilityStatus', val)
      },
      get () {
        return this.$store.getters.emailPopupVisibilityStatus
      }
    }
  },
  mounted () {
    const self = this
    const recaptchaScript = document.createElement('script')
    recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit'
    recaptchaScript.async = true
    recaptchaScript.defer = true
    document.head.appendChild(recaptchaScript)

    window.onloadCallback = function () {
      window.grecaptcha && window.grecaptcha.render('captcha', {
        'sitekey': self.gRecaptchaSitekey
      })
    }
  }
}
</script>

<style scoped>
  .modal {
    display: block;
  }
</style>
