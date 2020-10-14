<template>
  <q-page class="flex q-mt-sm">
    <q-spinner-hourglass v-if="loading" color="primary" size="4em"/>
    <edit-lists v-else/>
    <div v-if="error" class="error-text">{{errorText}}</div>
    <!-- <lists-footer/> -->
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EditLists from "components/EditLists.vue";
// import ListsFooter from "components/ListsFooter.vue";

export default {
  name: "Lists",
  components: { EditLists },
  data: () => ({
  }),
  computed: {
    ...mapState({
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
    })
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
