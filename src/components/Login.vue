<template>
  <div class="login-container">
    <div class="login-title column">
      <p>ברוכים הבאים!</p>
      <p>לכניסה נא הרשמו עם חשבון גוגל</p>
    </div>
    <div class="google-container row">
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError"
      >Sign in with Google</g-signin-button>
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
  methods: {
    ...mapActions({
      login: "list/login",
      loadList: "list/loadList",
      loadLists: "list/loadLists"
    }),
    onSignInSuccess(googleUser) {
      const response = googleUser.getAuthResponse();

      const id_token = response.id_token;
      this.login(id_token).then(() => {
        gapi.load("auth2", function() {
          gapi.auth2.init();
        });
        this.loadLists();
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
