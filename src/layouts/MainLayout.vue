<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
        <Header @toggleMenu="menu = !menu"/>
    </q-header>

    <q-drawer
      v-model="menu"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
     <Menu/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Header from 'components/Header.vue'
import Menu from 'components/Menu.vue'

export default {
  name: 'MainLayout',
  components: { Header, Menu },
  data: ()=> ({
    menu: false,
  }),
   computed: {
    ...mapState({
      auth: state => state.list.auth,
    })
  },
  watch: {
    auth() {
      this.menu = false;
    }
  }
}
</script>

<style>
.q-layout {
  direction: rtl;
}
</style>
