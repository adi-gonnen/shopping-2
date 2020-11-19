<template>
  <q-page class="flex q-ma-sm">
    <q-spinner-hourglass v-if="loading" color="primary" size="4em"/>
    <edit-item v-else-if="items"/>
    <div v-if="error" class="error-text">{{errorText}}</div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EditItem from "components/list/EditItem.vue";

export default {
  name: "EditItemPage",
  components: { EditItem },
  data: () => ({}),
  computed: {
    ...mapState({
      loading: state => state.list.loading,
      error: state => state.list.error,
      items: state => state.list.items
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
    if (!this.items) {
      await this.loadLists();
    }
  },
  methods: {
    ...mapActions({
      loadLists: "user/loadLists"
    })
  }
};
</script>

<style lang="scss">
</style>
