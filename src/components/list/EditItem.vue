<template>
  <div v-if="item" class="full-width">
    <div class="q-mb-lg">
      <q-input outlined v-model="item.name" class="name-input q-my-lg"/>
      <div class="row items-center">
        <p class="q-mb-none fs-18">עדכן כמות</p>
        <div class="relative-position q-mx-md">
        <q-input outlined v-model="item.quantity" type="number" class="quan-input"></q-input>
        <div class="quantity-btns-container column absolute">
          <q-btn flat padding="0" class="arrow-btn" @click.stop="setQuantity(+1)">&#9650;</q-btn>
          <q-btn flat padding="0" class="arrow-btn" @click.stop="setQuantity(-1)">&#9660;</q-btn>
        </div>
        </div>
      </div>
    </div>
    <q-btn flat size="xl" class="add-btn fixed-bottom layout q-ma-sm" @click="updateItems">עדכן</q-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "EditItem",
  data: () => ({
    item: null
  }),
  computed: {
    ...mapState({
      items: state => state.list.items
    })
  },
  mounted() {
    const id = this.$route.params.id;
    const item = this.items.find(item => {
      return item.id === id;
    });
    this.item = JSON.parse(JSON.stringify(item));
  },
  methods: {
    ...mapActions({
      editItem: "list/editItem",
      getItems: "list/getItems"
    }),
    setQuantity(diff) {
      if (diff === -1 && this.item.quantity === 1) {
        return;
      }
      this.item.quantity += diff;
    },
    async updateItems() {
      this.editItem(this.item);
      await this.getItems();
      window.history.back();
    }
  }
};
</script>

<style lang="scss">

.name-input {
  width: 100%;
}
.quan-input {
  font-size: 20px;
  min-width: 100px;
  &::v-deep {
    .q-field__inner {
      margin: 0 10px;
    }
    .q-field__before {
      padding: 0;
    }
  }
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
