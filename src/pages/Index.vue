<template>
  <q-page class="flex q-mt-sm">
    <Login v-if="!auth"/>
    <div v-else class="full-width">
      <q-spinner-hourglass v-if="loading" color="primary" size="4em"/>
      <list-items v-else-if="items" :items="items" @markItems="markItems"/>
      <div v-if="error" class="error-text">{{errorText}}</div>
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
    selected: []
  }),
  computed: {
    ...mapState({
      items: state => state.list.items,
      auth: state => state.user.auth,
      loading: state => state.list.loading,
      error: state => state.list.error
    }),
    errorText() {
      switch (this.error) {
        case "add":
          return "תקלה- הפריט לא התווסף";
          break;
        case "delete":
          return "תקלה- הפריט/ים לא נמחק/ו";
          break;
        case "edit":
          return "תקלה בעריכת פריט";
          break;
        default:
          return "מצטערים, נראה שיש תקלה במערכת";
          break;
      }
    }
  },
  async mounted() {
    await this.loadLists();
  },
  methods: {
    ...mapActions({
      loadLists: "user/loadLists"
    }),
    markItems(array) {
      this.selected = array;
    }
  }
};
</script>

<style lang="scss">
.q-spinner {
  display: flex;
  margin: 90px auto;
}
.error-text {
  position: fixed;
  bottom: 55px;
  font-size: 18px;
  color: red;
  margin: 0 20px;
}
</style>
