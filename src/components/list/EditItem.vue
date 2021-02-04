<template>
  <div v-if="item" class="full-width">
    <div class="q-mb-lg">
      <!-- item name -->
      <input v-model="item.name" class="name-input bg-white q-my-xl">

      <!-- item quantity -->
      <div class="row items-center q-mb-xl">
        <p class="q-mb-none fs-18">עדכן כמות</p>
        <div class="relative-position q-mx-md">
        <input v-model="item.quantity" type="number" class="quan-input bg-white">
        <div class="quantity-btns-container column absolute">
          <q-btn flat padding="0" class="arrow-btn" @click.stop="setQuantity(+1)">&#9650;</q-btn>
          <q-btn flat padding="0" class="arrow-btn" @click.stop="setQuantity(-1)">&#9660;</q-btn>
        </div>
        </div>
      </div>

      <!-- item category -->
      <div class="category-container">
        <p class="q-mb-none fs-18 full-width">עדכן קטגוריה</p>
        <div class="row">
          <i v-if="selectedCategory" :class="[selectedCategory.icon, selectedCategory.color]" class="self-center q-ml-md"></i>
          <div v-else class="icon-replace"/>
          <q-select 
            v-model="selectedCategory"
            :options="categories"
            option-value="id"
            option-label="name"
            @input="changeSelect"
          >
           <template v-slot:selectedCategory>
             <p v-if="selectedCategory" class="q-mb-none">{{selectedCategory.name}}</p>
           </template>
          </q-select>
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
    item: null,
    selectedCategory: null
  }),
  computed: {
    ...mapState({
      items: state => state.list.items,
      categories: state => state.list.categories,
    })
  },
  mounted() {
    const id = this.$route.params.id;
    const item = this.items.find(item => {
      return item.id === id;
    });
    this.item = JSON.parse(JSON.stringify(item));
    this.item.quantity = +this.item.quantity;
    this.selectedCategory = this.setSelected()
  },
  methods: {
    ...mapActions({
      editItem: "list/editItem",
      getItems: "list/getItems"
    }),
    setSelected() {
      return this.categories.find(category => {
        return category.id === this.item.category
      })
    },
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
    },
    changeSelect(value) {
      this.selectedCategory = value;
      this.item.category = value.id;
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
  font-size: 20px;
  min-width: 100px;
  height: 42px;
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
  font-size: 19px;
  max-width: 25px;
  position: absolute;
  height: 24px;
  left: 0px;
  bottom: -2px;
  &:first-child {
    bottom: 20px;
  }
}
.category-container .q-field {
  width: 90%;
}
.icon-replace {
  min-width: 30px;
}
</style>
