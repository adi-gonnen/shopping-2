<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <main-header @toggleMenu="menu = !menu"/>
    </q-header>

    <q-drawer v-model="menu" show-if-above bordered content-class="bg-grey-1">
      <Menu/>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import MainHeader from "components/common/MainHeader.vue";
import Menu from "components/common/Menu.vue";

export default {
  name: "MainLayout",
  components: { MainHeader, Menu },
  data: () => ({
    menu: false
  }),
  computed: {
    ...mapState({
      auth: state => state.user.auth
    })
  },
  watch: {
    auth() {
      this.menu = false;
    }
  }
};
</script>

<style>
.q-layout {
  direction: rtl;
}
</style>
