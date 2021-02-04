<template>
  <div
    :class="{ 'selected': isSelected }"
    class="item-container row full-width justify-between q-px-sm"
    @click="toggleSelected"
    @dblclick="moveToEdit"
  >
    <q-item-label class="item-label q-mt-xs">{{item.name}}</q-item-label>
    <div class="row items-center">
      <q-item-label v-if="isSelected">
        <!-- <edit-item :item="item"/> -->
        <q-btn flat class="edit-btn" icon="edit" @click.stop="moveToEdit"/>
      </q-item-label>
      <q-item-label class="item-label">{{item.quantity}}</q-item-label>
    </div>

  </div>
</template>

<script>
import EditItem from "components/list/EditItem.vue";

export default {
  name: "ListItem",
  components: { EditItem },
  props: ["item", "selected"],
  computed: {
    isSelected() {
      return this.selected.find(item => {
        return item === this.item.id;
      });
    }
  },
  methods: {
    toggleSelected() {
      this.$emit("markItems", this.item.id);
    },
    moveToEdit() {
      this.$router.push(`edit-item/${this.item.id}`)
    },
  }
};
</script>

<style>
.item-container {
  border-bottom: 1px solid #000000;
}
.selected {
  background-color: aquamarine;
}
.item-label.q-item__label {
  font-size: 20px;
  line-height: 32px !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 77%;
  overflow: hidden;
}
</style>
