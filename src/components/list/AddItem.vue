<template>
  <div v-if="items[0]" class="full-width">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="relative-position row no-wrap q-mb-lg"
    >
      <q-input
        v-model="item.name"
        :autofocus="idx === 0"
        placeholder="הוסף פריט"
        outlined
        class="name-input bg-white"
        @input="addLine"
      />

      <q-input
        v-model="item.quantity"
        type="number"
        outlined
        class="quan-input bg-white q-mr-xs"
      />
      <div class="quantity-btns-container absolute column">
        <q-btn
          flat
          padding="0"
          class="arrow-btn absolute"
          @click.stop="setQuantity(idx, +1)"
          >&#9650;</q-btn
        >
        <q-btn
          flat
          padding="0"
          class="arrow-btn absolute"
          @click.stop="setQuantity(idx, -1)"
          >&#9660;</q-btn
        >
      </div>
    </div>
    <div class="footer-container fixed-bottom layout">
      <q-btn flat size="xl" class="add-btn q-ma-sm" @click="updateItems"
        >עדכן</q-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "AddItem",
  data: () => ({
    items: [{ quantity: 1, name: "" }],
  }),
  created() {
    this.$root.$on("update-items", this.updateItems);
  },
  beforeDestroy() {
    this.$root.$off("update-items", this.updateItems);
  },
  computed: {
    ...mapState({
      categories: (state) => state.list.categories,
    }),
    category() {
      return this.$route.params.category;
    },
    selectedCategory() {
      return this.categories.find((category) => {
        return category.id === this.category;
      });
    },
  },
  methods: {
    ...mapActions({
      addItem: "list/addNewItem",
      getItems: "list/getItems",
    }),
    async addItems() {
      for (let item of this.items) {
        if (item.name) {
          item = { ...item, category: this.category };
          await this.addItem(item);
        }
      }
      await this.getItems();
      this.items = [{ quantity: 1, name: "" }];
    },
    addLine() {
      const lastIdx = this.items.length - 1;
      if (this.items[lastIdx].name !== "") {
        this.items.push({ quantity: 1, name: "" });
      }
    },
    setQuantity(idx, diff) {
      if (diff === -1 && this.items[idx].quantity === 1) {
        return;
      }
      this.items[idx].quantity += diff;
    },
    changeSelect() {
      //
    },
    async updateItems() {
      await this.addItems();
      window.history.back();
    },
  },
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
  width: 98%;
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
