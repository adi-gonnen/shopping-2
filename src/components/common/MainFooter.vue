<template>
  <div class="footer-container row justify-between no-wrap q-pa-sm">
    <q-btn color="primary" class="footer-btn" icon="delete" @click="deleteItems"/>
    <q-btn disable class="footer-btn bg-white">מיין</q-btn>
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
      const promises = [];
      for (let i=0; i<this.selected.length; i++) {
        const id = this.selected[i];
        promises.push(this.deleteItem(id));
      }
      Promise.all(promises)
        .then(() => {
          this.$emit('clearSelected')
          this.getItems();
          this.setLoading(false);
        })
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
