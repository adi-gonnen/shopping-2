<template>
  <div v-if="newItem[0]" class="full-width">
    <div v-for="(item, idx) in newItem" :key="idx" class="relative-position row no-wrap q-mb-lg">
      <q-input
        outlined
        v-model="item.name"
        :autofocus="idx === 0"
        placeholder="הוסף פריט"
        class="name-input"
      />
      <q-input outlined v-model="item.quantity" type="number" class="quan-input"></q-input>
     
      <div class="quantity-btns-container absolute column">
        <q-btn flat padding="0" class="arrow-btn" @click.stop="setQuantity(idx, +1)">&#9650;</q-btn>
        <q-btn flat padding="0" class="arrow-btn" @click.stop="setQuantity(idx, -1)">&#9660;</q-btn>
      </div>
    </div>
    <!-- <q-btn class="add-item q-ml-sm" @click.stop="addNewLine">הקלד פריט נוסף</q-btn> -->
    <q-btn flat size="xl" class="add-btn fixed-bottom q-ma-sm" @click="updateItems">עדכן</q-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddItem",
  data: () => ({
    newItem: [{ quantity: 1, name: "" }],
    itemsCount: 1
  }),
  computed: {},
  watch: {
     newItem: {
     handler(val){
      this.addNewLine()
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
      const idx = this.newItem.length -1
      if (this.newItem[idx].name !== "") {
        this.newItem.push({ quantity: 1, name: "" })
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
.q-card {
  margin-top: -230px;
  width: 100%;
  direction: rtl;
}
.name-input {
  width: 100%;
}
.quan-input {
  font-size: 20px;
  max-width: 66px;
  &::v-deep {
    .q-field__inner {
      margin: 0 10px;
    }
    .q-field__before {
      padding: 0;
    }
  }
}
.add-item {
  // width: 20px;
}
.add-btn {
  background-color: $primary;
  color: #fff;
  width: 95%;
}
.quantity-btns-container {
  left: 0;
  bottom: 5px;
}
.q-btn.arrow-btn {
  font-size: 25px;
  max-width: 25px;
  height: 30px;
}
</style>
