<template>
  <q-page class="flex q-mt-sm">
    <Login v-if="!auth" />
    <div v-else class="full-width">
      <list-items v-if="items" :items="items" @markItems="markItems"/>
      <Footer :selected="selected" class="fixed-bottom"/>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Login from "components/Login.vue";
import ListItems from "components/ListItems.vue";
import Footer from "components/Footer.vue";

export default {
  name: "Home",
  components: { ListItems, Footer, Login },
  data: () => ({
    selected: [],
  }),
  computed: {
    ...mapState({
      items: state => state.list.items,
      auth: state => state.list.auth,
    })
  },
  async mounted() {
    await this.loadLists();
  },
  methods: {
    ...mapActions({
      loadLists: "list/loadLists"
    }),
    markItems(array) {
      this.selected = array
    }
  }
};
</script>
