<template>
  <div class="welcome-container text-center q-my-lg">
    <p class="page-title">שלום, {{name}}</p>
    <p class="q-mx-xl q-mb-lg fs-20">על מנת להשתמש באפליקציה, יש להוסיף רשימת קניות חדשה</p>
    <q-btn type="a" to="/list/add-list" color="primary" padding="sm md">לחץ להוספת רשימה</q-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Welcome",
  computed: {
    ...mapState({
      profile: state => state.user.profile
    }),
    name() {
      return this.profile && this.profile.auth.given_name || '';
    }
  }
};
</script>

<style lang="scss">
.page-title {
  font-size: 27px;
}
.q-btn {
  font-size: 17px;
}
</style>
