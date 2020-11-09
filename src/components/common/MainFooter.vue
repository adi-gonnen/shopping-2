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
      this.setLoading(true);
      const promises = [];
      for (let i=0; i<this.selected.length; i++) {
        const id = this.selected[i];
        promises.push(this.deleteItem(id));
      }
      Promise.all(promises)
        .then(() => {
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
}
</style>
