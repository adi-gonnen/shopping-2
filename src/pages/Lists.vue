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
import EditLists from "components/list/EditLists.vue";
// import ListsFooter from "components/ListsFooter.vue";

export default {
  name: "Lists",
  components: { EditLists },
  data: () => ({
  }),
  computed: {
    ...mapState({
      loading: state => state.list.loading,
      error: state => state.list.error,
      lists: state => state.user.lists,
    }),
    errorText() {
       switch (this.error) {
        case "add":
          return "תקלה- הרשימה לא התווספה";
          break;
        case "delete":
          return "תקלה- הרשימה לא נמחקה";
          break;
        case "edit":
          return "תקלה בעריכת רשימה";
          break;
        default:
          return "מצטערים, נראה שיש תקלה במערכת";
          break;
      }
    }
  },
  async mounted() {
    if (!this.lists) {
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
