<template>
  <div class="full-width">
    <q-list>
      <q-item v-for="(item, idx) in items" :key="idx" class="q-pa-none">
        <list-item :item="item" @markItems="markItems" :selected="selected"/>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import ListItem from "components/list/ListItem.vue";
import { mapState } from "vuex";

export default {
  name: "ListItems",
  components: { ListItem },
  props: ["items"],
  data: () => ({
    selected: [],
  }),
  methods: {
    markItems(id) {
      const idx = this.selected.findIndex(item => {
        return item === id;
      });
      if (idx !== -1) {
        this.selected.splice(idx, 1);
      } else {
        this.selected.push(id);
      }
      this.$emit('markItems', this.selected)
    }
  }
};
</script>

<style>
.q-list {
  margin-bottom: 70px;
}
.q-item {
    height: 40px;
}
</style>
