<template>
  <q-page class="flex q-mt-sm">
    <q-spinner-hourglass v-if="loading" color="primary" size="4em"/>
    <div v-else class="full-width">
      <Login v-if="!auth"/>
      <div v-else class="full-width">
        <list-items v-if="items" :items="items" @markItems="markItems"/>
        <div v-if="error" class="error-text q-pa-md">{{errorText}}</div>
        <main-footer :selected="selected" @clearSelected="clearSelected" class="layout fixed-bottom"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Login from "components/common/Login.vue";
import ListItems from "components/list/ListItems.vue";
import MainFooter from "components/common/MainFooter.vue";

export default {
  name: "Home",
  components: { ListItems, MainFooter, Login },
  data: () => ({
    selected: [],
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
    },
    clearSelected() {
      this.selected = []
    }
  }
};
</script>

<style lang="scss">
</style>
