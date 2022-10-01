<template>
  <div class="login-container">
    <div class="login-title column">
      <div id="buttonDiv"></div> 
      <p>ברוכים הבאים!</p>
      <p>לכניסה נא הרשמו עם חשבון גוגל</p>
    </div>
    <div class="google-container row">
       <!-- <div id="g_id_onload"
         data-client_id="719276631119-jd4backgl6vjdgq82vvdc3uir335p1cn.apps.googleusercontent.com"
         data-login_uri="https://ztl2svc.appspot.com/login"
         data-auto_prompt="false">
      </div>
      <div class="g_id_signin"
         data-type="standard"
         data-size="large"
         data-theme="outline"
         data-text="sign_in_with"
         data-shape="rectangular"
         data-logo_alignment="left">
      </div> -->
     <!--  <div id="g_id_onload"
         :data-client_id="client_id"
         data-ux_mode="redirect"
         data-login_uri="https://ztl2svc.appspot.com/login">
    </div> -->
      <!-- <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError"
      >Sign in with Google</g-signin-button> -->
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
     googleSignInParams: {
      client_id:
        "719276631119-jd4backgl6vjdgq82vvdc3uir335p1cn.apps.googleusercontent.com"
    }
  }),
  created() {
    this.initAuth()
  },
  methods: {
    ...mapActions({
      login: "user/login",
    }),
    initAuth() {
      // window.onload = function () {
          google.accounts.id.initialize({
            client_id: '719276631119-jd4backgl6vjdgq82vvdc3uir335p1cn.apps.googleusercontent.com',
            callback: this.handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { size: "medium" }  // customization attributes
          );
          google.accounts.id.prompt(); // also display the One Tap dialog
        // }
    },
    handleCredentialResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
       this.login(response.credential).then((res) => {
        console.log("res: " + res)
        // gapi.load("auth2", function() {
        //   gapi.auth2.init();
        // });
      });
        },
    onSignInSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      this.login(id_token).then(() => {
        gapi.load("auth2", function() {
          gapi.auth2.init();
        });
      });
    },
    onSignInError(error) {
      console.log("OH NOES", error);
    }
  }
};
</script>

<style>
.login-container {
  text-align: center;
  margin: 50px;
}
.login-title {
  font-size: 25px;
  margin-bottom: 20px;
}
.google-container {
  justify-content: center;
}
.g-signin-button {
  display: inline-block;
  padding: 10px;
  cursor: pointer;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}

</style>
