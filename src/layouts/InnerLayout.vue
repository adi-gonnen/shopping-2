<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated  class="header">
      <inner-header/>
    </q-header>
    <q-page-container class="page-container q-my-md">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "vuex";
import InnerHeader from "components/common/InnerHeader.vue";

export default {
  name: "InnerLayout",
  components: { InnerHeader },
  data: () => ({}),
  computed: {
    ...mapState({
      auth: state => state.user.auth
    })
  }
};
</script>

<style>
.q-layout {
  direction: rtl;
}
</style>
