<template>
  <div class="footer-container row justify-between no-wrap q-pa-sm">
    <q-btn color="primary" class="footer-btn" icon="delete" @click="deleteItems"/>
    <q-btn class="footer-btn bg-white" @click="sortItems">מיין</q-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "MainFooter",
  props: ["selected"],
  methods: {
    ...mapActions({
      deleteItem: "list/deleteItem",
      getItems: "list/getItems",
      setLoading: "list/setLoading"
    }),
    async deleteItems() {
      if (!this.selected[0]) {
        return;
      }
      this.setLoading(true);
      for (const id of this.selected) {
        await this.deleteItem(id);
      }
      await this.getItems();
      this.$emit("clear");
      this.setLoading(false);
    },
    sortItems() {
      this.$router.push('/sort')
    }
  }
};
</script>

<style lang="scss">
.footer-btn {
  width: 45%;
  height: 40px;
}
</style>
