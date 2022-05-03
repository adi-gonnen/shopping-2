<template>
  <div class="footer-container row justify-between no-wrap q-pa-sm">
    <q-btn :loading="loading" color="primary" text-color="white" class="footer-btn" icon="delete" @click="deleteItems">
      <q-badge v-if="selected.length" color="red" floating>{{selected.length}}</q-badge>
      <template v-slot:loading>
        <q-spinner class="load-spinner q-my-sm"/>
      </template>
    </q-btn>
    <q-btn class="footer-btn bg-white" @click="sortItems">מיין</q-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "MainFooter",
  props: ["selected"],
  data: () => ({
    loading: false
  }),
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
      this.loading = true
      for (const id of this.selected) {
        await this.deleteItem(id);
      }
      await this.getItems();
      this.$emit("clear");
      this.loading = false
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
.load-spinner {
  margin: 4px auto;
}
.q-badge {
  font-size: 22px;
  padding: 8px;
  border-radius: 50%;
}

</style>
