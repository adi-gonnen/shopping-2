<template>
  <div class="row justify-between no-wrap q-ma-sm">
    <q-btn color="primary" class="footer-btn" icon="delete" @click="onDeleteItems"/>
    <q-btn disable class="footer-btn">מיין</q-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Footer",
  props: ["selected"],
  methods: {
    ...mapActions({
      deleteItems: "list/deleteItems"
    }),
    onDeleteItems() {
     this.deleteItems(this.selected);
    }
  }
};
</script>

<style lang="scss">
.footer-btn {
    width: 45%;
}
</style>
