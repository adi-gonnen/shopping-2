<template>
  <q-page class="flex q-ma-sm q-pt-none">
    <q-spinner-hourglass v-if="loading" color="primary" size="4em"/>
    <add-category v-else/>
    <div v-if="error" class="error-text">{{errorText}}</div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddCategory from "components/list/AddCategory.vue";

export default {
  name: "AddCategories",
  components: { AddCategory },
  data: () => ({}),
  computed: {
    ...mapState({
      loading: state => state.list.loading,
      error: state => state.list.error,
      items: state => state.list.items
    }),
    item() {
      const id = this.$route.params.id;
      if (id === "add-item") {
        return null;
      } else {
        return this.items.find(item => {
          return item.id === id;
        });
      }
    },
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
  methods: {}
};
</script>

<style lang="scss">
</style>
