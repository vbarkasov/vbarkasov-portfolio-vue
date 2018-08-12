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
                <textarea class="form-control" id="user-message" rows="3" required></textarea>
              </div>
              <div class="form-group">
                <label for="user-email">Your email for answer *</label>
                <input type="email" class="form-control" id="user-email" placeholder="name@example.com" required>
              </div>
              <div class="form-group">
                <label for="user-email">Your name</label>
                <input type="email" class="form-control" id="user-name" placeholder="name@example.com">
              </div>
              <div class="g-recaptcha" data-sitekey="6LcUkV0UAAAAADuwEqgKLHC5P3lQ1KKx5OiMGXRP"></div>
            </form>
          </div>
          <div class="modal-footer">
            <button v-on:click.prevent="submitForm" type="submit" class="btn btn-primary">Send</button>
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
      successMessage: ''
    }
  },
  methods: {
    showPopup: function(e){
      e.preventDefault();
      this.popupIsVisible = true;
    },
    submitForm: function(){

    },
    sendMail: function() {
        $.ajax({
          type:'POST',
          url:'/sendmail.php',
          dataType: 'json',
          data: {
            name: $('#user-name').val(),
            email: $('#user-email').val(),
            message: $('#user-message').val(),
            'g-recaptcha-response': $('#g-recaptcha-response').val()
          },
          success: function(data){
            $(".email-success-message").append(data.success).fadeIn(999);
          }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal.showed {
    display: block;
  }
</style>
