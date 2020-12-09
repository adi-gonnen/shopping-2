<template>
  <div v-if="newItem[0]" class="full-width">
    <div v-for="(item, idx) in newItem" :key="idx" class="relative-position row no-wrap q-mb-lg">
      <input
        v-model="item.name"
        :autofocus="idx === 0"
        placeholder="הוסף פריט"
        class="name-input bg-white"
      >
      <input v-model="item.quantity" type="number" class="quan-input bg-white q-mr-xs">

      <div class="quantity-btns-container absolute column">
        <q-btn
          flat
          padding="0"
          class="arrow-btn absolute"
          @click.stop="setQuantity(idx, +1)"
        >&#9650;</q-btn>
        <q-btn
          flat
          padding="0"
          class="arrow-btn absolute"
          @click.stop="setQuantity(idx, -1)"
        >&#9660;</q-btn>
      </div>
    </div>
    <div class="footer-container layout">
      <q-btn flat size="xl" class="add-btn fixed-bottom layout q-ma-sm" @click="updateItems">עדכן</q-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddItem",
  data: () => ({
    newItem: [{ quantity: 1, name: "" }]
  }),
  computed: {},
  watch: {
    newItem: {
      handler(val) {
        this.addNewLine();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      addItem: "list/addNewItem",
      getItems: "list/getItems"
    }),
    addNewLine() {
      const idx = this.newItem.length - 1;
      if (this.newItem[idx].name !== "") {
        this.newItem.push({ quantity: 1, name: "" });
      }
    },
    setQuantity(idx, diff) {
      if (diff === -1 && this.newItem[idx].quantity === 1) {
        return;
      }
      this.newItem[idx].quantity += diff;
    },
    async updateItems() {
      for (let i = 0; i < this.newItem.length; i++) {
        if (this.newItem[i].name) {
          this.addItem(this.newItem[i]);
        }
      }
      this.newItem = [{ quantity: 1, name: "" }];
      await this.getItems();
      window.history.back();
    }
  }
};
</script>

<style lang="scss">
.name-input {
  width: 100%;
  height: 42px;
}
.quan-input {
  height: 42px;
  font-size: 20px;
  max-width: 66px;
}
.add-btn {
  background-color: $primary;
  color: #fff;
  width: 95%;
}
.quantity-btns-container {
  left: 0;
  bottom: 0;
}
.q-btn.arrow-btn {
  font-size: 19px;
  max-width: 25px;
  position: absolute;
  height: 24px;
  left: 0px;
  bottom: 1px;
  &:first-child {
    bottom: 24px;
  }
}
</style>
