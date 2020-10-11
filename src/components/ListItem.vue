<template>
  <div
    :class="isSelected && 'selected'"
    class="item-container row full-width justify-between q-px-sm"
    @click="toggleSelected"
  >
    <q-item-label class="item-label q-mt-xs">{{item.name}}</q-item-label>
    <q-item-label class="item-label">{{item.quantity}}</q-item-label>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: ["item", "selected"],
  data: () => ({
    // selected: false
  }),
  computed: {
    isSelected() {
      return this.selected.find(item => {return item === this.item.id})
    }
  },
  methods: {
    toggleSelected() {
      // this.selected = !this.selected;
      this.$emit('markItems', this.item.id)
    }
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
.q-item__label {
  font-size: 20px;
  line-height: 32px !important;
}
</style>
