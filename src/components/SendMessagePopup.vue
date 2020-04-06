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
          <form
            class="sendmail-form"
            name="sendmail-form"
            @submit.prevent="onSubmit"
            method="POST"
          >
            <div class="modal-body">
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
                <vue-recaptcha
                  ref="recaptcha"
                  :sitekey="gRecaptchaSitekey"
                  @expired="onCaptchaExpired"
                  @verify="sendMail"
                ></vue-recaptcha>
              <div v-if="userMessage" :class="['alert-' + userMessageType]" class="mb-0 mt-3 alert">
                {{ userMessage }}
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">
                <span v-if="emailSent">
                  Send again
                </span>
                <span v-else>
                  Send
                </span>
              </button>
              <button v-on:click.prevent="emailPopupIsShown = false" type="button" class="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import { gRecaptchaSitekey } from '../config'
console.log(gRecaptchaSitekey)

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
      'gRecaptchaSitekey': gRecaptchaSitekey,
      'emailSent': false
    }
  },
  'methods': {
    showPopup (e) {
      e.preventDefault()
      this.userMessage = ''
      this.userMessageType = ''
      this.$store.dispatch('setEmailPopupVisibilityStatus', true)
    },
    hidePopup () {
      this.userMessage = ''
      this.userMessageType = ''
      this.$store.dispatch('setEmailPopupVisibilityStatus', false)
    },
    onSubmit () {
      document.querySelector('[name="g-recaptcha-response"]').click()
      const el = document.querySelector('[name="g-recaptcha-response"]')
      if (el.value === '') {
        this.userMessage = 'Please confirm that you are human'
        this.userMessageType = 'danger'
      } else {
        this.sendMail(el.value)
      }
    },
    sendMail (recaptchaToken) {
      const self = this

      if (self.message === '' || self.email === '' || self.name === '') {
        self.userMessage = 'Please enter all data before sending a message'
        self.userMessageType = 'danger'
        return
      }

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
          'g-recaptcha-response': recaptchaToken
        })
      })
        .then(response => response.json())
        .then(() => {
          self.userMessage = 'The message is sent successfully'
          self.userMessageType = 'success'
          self.emailSent = true
        })
        .catch(() => {
          self.userMessage = 'The message is not delivered'
          self.userMessageType = 'danger'
        })
    },
    onCaptchaExpired () {
      this.$refs.recaptcha.reset()
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
    const recaptchaScript = document.createElement('script')
    // recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit'
    recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    recaptchaScript.async = true
    recaptchaScript.defer = true
    document.head.appendChild(recaptchaScript)

    /* window.onloadCallback = function () {
      return new
      Promise(function (resolve, reject) {
        resolve()
      })
    } */

    this.emailSent = false
  }
}
</script>

<style scoped>
  .modal {
    display: block;
  }
</style>
