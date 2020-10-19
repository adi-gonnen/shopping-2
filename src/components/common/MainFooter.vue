<template>
  <div class="row justify-between no-wrap q-ma-sm">
    <q-btn color="primary" class="footer-btn" icon="delete" @click="deleteItems"/>
    <q-btn disable class="footer-btn">מיין</q-btn>
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
      for (const id of this.selected) {
        await this.deleteItem(id);
      }
      await this.getItems();
      this.setLoading(false);
    }
  }
};
</script>

<style lang="scss">
.footer-btn {
  width: 45%;
}
</style>
