<template>
  <q-page class="flex q-ma-sm">
    <q-spinner-hourglass v-if="loading" color="primary" size="4em"/>
    <add-item v-else :item="item"/>
    <div v-if="error" class="error-text">{{errorText}}</div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddItem from "components/list/AddItem.vue";

export default {
  name: "AddItemPage",
  components: { AddItem },
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
  async mounted() {
    // if (!this.lists) {
    //   await this.loadLists();
    // }
    // const id = this.$route.params.id;
  },
  methods: {
    ...mapActions({
      // loadLists: "user/loadLists"
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
  bottom: 65px;
  font-size: 18px;
  color: red;
  margin: 0 20px;
}
</style>
