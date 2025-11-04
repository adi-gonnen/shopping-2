<template>
  <div class="login-container text-center q-my-lg">
    <p class="page-title">ברוכים הבאים!</p>
    <p class="q-mx-xl q-mb-lg fs-20">לכניסה נא הרשמו עם חשבון גוגל</p>
    <div id="buttonDiv" class="q-my-lg"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({}),
  mounted() {
    if (window.google) {
      this.initAuth();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = this.initAuth;
    document.head.appendChild(script);
  },
  computed: {
    clientId() {
      return "719276631119-jd4backgl6vjdgq82vvdc3uir335p1cn.apps.googleusercontent.com";
    },
  },
  methods: {
    ...mapActions({
      login: "user/login",
    }),
    initAuth() {
      google.accounts.id.initialize({
        client_id: this.clientId,
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
