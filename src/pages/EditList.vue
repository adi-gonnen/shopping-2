<template>
  <q-page class="flex q-ma-sm">
    <q-spinner-hourglass v-if="loading" color="primary" size="4em"/>
    <edit-list v-else :list="list"/>
    <div v-if="error" class="error-text">{{errorText}}</div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EditList from "components/list/EditList.vue";

export default {
  name: "EditListPage",
  components: { EditList },
  data: () => ({}),
  computed: {
    ...mapState({
      loading: state => state.list.loading,
      error: state => state.list.error,
      lists: state => state.user.lists,
    }),
    list() {
      const id = this.$route.params.id;
      if (this.lists) {
        return this.lists.find((list) => {
          return list.id === id
        })
      }
    },
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
    const id = this.$route.params.id;
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
