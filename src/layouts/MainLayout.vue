<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="layout">
      <main-header @toggleMenu="menu = !menu"/>
    </q-header>

    <q-drawer v-model="menu" show-if-above bordered side="right" content-class="bg-grey-1">
      <Menu @closeMenu="menu = false"/>
    </q-drawer>

    <q-page-container class="page-container layout">
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

@media (min-width: 600px) {
  .q-drawer {
    top: 0 !important;
  }
  /* .layout {
    max-width: 550px;
    width: 550px;
    margin: 0 auto;
    padding-left: 0 !important;
  } */
  .page-container {
    background-color: #f8f6f1;
    padding: 0 16px;
    /* margin:auto; */
  }
}

@media (min-width: 1024px) {
/* .layout {
    margin: 0 300px;
    left: unset !important;
  } */
}
</style>
