<template>
  <div class="login-container">
    <div class="login-title column">
      <p>ברוכים הבאים!</p>
      <p>לכניסה נא הרשמו עם חשבון גוגל</p>
      <div id="buttonDiv" class="q-my-lg"></div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({}),
  mounted() {
    this.$nextTick(() => this.initAuth());
  },
  methods: {
    ...mapActions({
      login: "user/login",
    }),
    initAuth() {
      google.accounts.id.initialize({
        client_id:
          "719276631119-jd4backgl6vjdgq82vvdc3uir335p1cn.apps.googleusercontent.com",
        callback: this.handleCredentialResponse,
        auto_select: true,
      });
      google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
        size: "large",
      });
      google.accounts.id.prompt();
    },
    handleCredentialResponse(response) {
      this.login(response.credential).then((res) => {
        console.log("login response: " + res);
      });
    },
  },
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
